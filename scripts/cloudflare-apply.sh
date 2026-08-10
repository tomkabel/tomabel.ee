#!/usr/bin/env bash
# cloudflare-apply.sh — tomabel.ee ideal Cloudflare config (2026-27 standard)
# Architecture: static Vite SPA on GitHub Pages origin, proxied through Cloudflare.
# Usage: CF_API_TOKEN=<token> ./scripts/cloudflare-apply.sh [--apply]
#   (no --apply = dry run: verify token, dump current state, show what WOULD change)
# Idempotent: safe to re-run.
set -euo pipefail

ZONE="tomabel.ee"
TOKEN="${CF_API_TOKEN:-${CLOUDFLARE_API_TOKEN:-}}"
APPLY="${1:-}"

if [ -z "$TOKEN" ]; then
  echo "ERROR: CF_API_TOKEN not set (or paste token into ~/.hermes/.env as CF_API_TOKEN=...)"
  exit 1
fi

AUTH=(-H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json")
API="https://api.cloudflare.com/client/v4"

echo "== verify token =="
curl -sf "${AUTH[@]}" -X GET "$API/user/tokens/verify" | jq -r '"token: \(.result.status) (\(.result.id))"' || { echo "TOKEN INVALID"; exit 1; }

echo "== resolve zone =="
ZONE_ID=$(curl -sf "${AUTH[@]}" "$API/zones?name=$ZONE" | jq -r '.result[0].id')
[ -n "$ZONE_ID" ] && [ "$ZONE_ID" != "null" ] || { echo "zone not found"; exit 1; }
echo "zone_id: $ZONE_ID"

cfg() { # cfg <id> <value>
  curl -sf "${AUTH[@]}" -X PATCH "$API/zones/$ZONE_ID/settings/$1" -d "{\"value\":$2}" | jq -r '"  \(.result.id): \(.result.value) (\(.success))"' || echo "  $1: FAILED (may need different permission)"
}

echo "== current relevant settings =="
for s in ssl always_use_https min_tls_version tls_1_3 brotli early_hints crawler_hints rocket_loader automatic_https_rewrites security_level zero_rtt http3; do
  v=$(curl -sf "${AUTH[@]}" "$API/zones/$ZONE_ID/settings/$s" | jq -r '.result.value // "n/a"' 2>/dev/null || echo "?")
  echo "  $s: $v"
done

echo "== ai bot policy settings (2026) =="
curl -sf "${AUTH[@]}" "$API/zones/$ZONE_ID/settings" | jq -r '.result[] | select(.id | test("ai|bot|rum|web_analytics")) | "  \(.id): \(.value)"' || true

echo "== current rulesets (transform/cache/waf) =="
for phase in http_response_header_modification http_request_cache_settings http_request_firewall_managed; do
  echo "  -- $phase --"
  curl -sf "${AUTH[@]}" "$API/zones/$ZONE_ID/rulesets/phases/$phase/entrypoint" | jq -r '.result.rules[]? | "    \(.description // .action) | \(.expression)"' || echo "    (empty)"
done

echo "== current DNS (relevant) =="
curl -sf "${AUTH[@]}" "$API/zones/$ZONE_ID/dns_records?per_page=100" | jq -r '.result[] | "  \(.type) \(.name) -> \(.content)"' | grep -E "tomabel.ee|www|_dmarc|MX|TXT" || true

[ "$APPLY" != "--apply" ] && { echo; echo "DRY RUN — re-run with --apply to make changes"; exit 0; }

echo; echo "== APPLY: zone settings =="
cfg always_use_https '"on"'
cfg min_tls_version '"1.2"'
cfg tls_1_3 '"on"'
cfg brotli '"on"'
cfg early_hints '"on"'
cfg crawler_hints '"on"'
cfg rocket_loader '"off"'
cfg automatic_https_rewrites '"on"'
# SSL mode: strict is correct for GH Pages (valid public cert, HTTPS-only origin).
# Only move from flexible/off; never downgrade from strict.
CUR_SSL=$(curl -sf "${AUTH[@]}" "$API/zones/$ZONE_ID/settings/ssl" | jq -r '.result.value')
case "$CUR_SSL" in
  strict|full) echo "  ssl: $CUR_SSL (keep)" ;;
  *) cfg ssl '"strict"' ;;
esac

echo "== APPLY: security headers via response-header transform rule =="
RT_RULES=$(curl -sf "${AUTH[@]}" "$API/zones/$ZONE_ID/rulesets/phases/http_response_header_modification/entrypoint")
if echo "$RT_RULES" | jq -e '.result.rules[]? | select(.description == "tomabel security headers")' >/dev/null 2>&1; then
  echo "  rule exists, skip"
else
  curl -sf "${AUTH[@]}" -X PUT "$API/zones/$ZONE_ID/rulesets/phases/http_response_header_modification/entrypoint" -d @- <<'JSON' | jq -r '"  created: \(.result.rules[-1].description) (id \(.result.rules[-1].id))"'
{
  "rules": [{
    "description": "tomabel security headers",
    "expression": "true",
    "action": "rewrite",
    "action_parameters": {
      "headers": {
        "Content-Security-Policy": {
          "operation": "set",
          "value": "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; manifest-src 'self'"
        },
        "Strict-Transport-Security": { "operation": "set", "value": "max-age=63072000; includeSubDomains; preload" },
        "X-Content-Type-Options": { "operation": "set", "value": "nosniff" },
        "X-Frame-Options": { "operation": "set", "value": "DENY" },
        "Referrer-Policy": { "operation": "set", "value": "strict-origin-when-cross-origin" },
        "Permissions-Policy": { "operation": "set", "value": "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        "Cross-Origin-Opener-Policy": { "operation": "set", "value": "same-origin" }
      }
    }
  }]
}
JSON
fi

echo "== APPLY: cache rule for hashed /assets/* =="
CR_RULES=$(curl -sf "${AUTH[@]}" "$API/zones/$ZONE_ID/rulesets/phases/http_request_cache_settings/entrypoint")
if echo "$CR_RULES" | jq -e '.result.rules[]? | select(.description == "tomabel hashed assets")' >/dev/null 2>&1; then
  echo "  rule exists, skip"
else
  curl -sf "${AUTH[@]}" -X PUT "$API/zones/$ZONE_ID/rulesets/phases/http_request_cache_settings/entrypoint" -d @- <<'JSON' | jq -r '"  created: \(.result.rules[-1].description) (id \(.result.rules[-1].id))"'
{
  "rules": [{
    "description": "tomabel hashed assets",
    "expression": "starts_with(http.request.uri.path, \"/assets/\")",
    "action": "cache_eligible",
    "action_parameters": {
      "cache": true,
      "edge_ttl": { "mode": "override_origin", "default": 2592000 },
      "browser_ttl": { "mode": "override_origin", "default": 2592000 }
    }
  }]
}
JSON
fi

echo "== APPLY: WAF managed ruleset (free) =="
WAF_RULES=$(curl -sf "${AUTH[@]}" "$API/zones/$ZONE_ID/rulesets/phases/http_request_firewall_managed/entrypoint")
if echo "$WAF_RULES" | jq -e '.result.rules[]? | select(.action_parameters.id == "efb7b8c949ac4650a09736fc376e9aee")' >/dev/null 2>&1; then
  echo "  Cloudflare Managed Ruleset deployed, skip"
else
  curl -sf "${AUTH[@]}" -X PUT "$API/zones/$ZONE_ID/rulesets/phases/http_request_firewall_managed/entrypoint" -d @- <<'JSON' | jq -r '"  deployed: \(.result.rules[-1].description) (id \(.result.rules[-1].id))"'
{
  "rules": [{
    "description": "Cloudflare Managed Ruleset",
    "expression": "true",
    "action": "execute",
    "action_parameters": { "id": "efb7b8c949ac4650a09736fc376e9aee", "version": "latest" }
  }]
}
JSON
fi

echo "== APPLY: DMARC (only if domain sends no mail) =="
MX_COUNT=$(curl -sf "${AUTH[@]}" "$API/zones/$ZONE_ID/dns_records?type=MX&per_page=10" | jq '.result | length')
DMARC_EXISTS=$(curl -sf "${AUTH[@]}" "$API/zones/$ZONE_ID/dns_records?type=TXT&name=_dmarc.tomabel.ee" | jq '.result | length')
if [ "$DMARC_EXISTS" -gt 0 ]; then
  echo "  DMARC exists, skip"
elif [ "$MX_COUNT" -eq 0 ]; then
  curl -sf "${AUTH[@]}" -X POST "$API/zones/$ZONE_ID/dns_records" -d '{"type":"TXT","name":"_dmarc","content":"v=DMARC1; p=reject; adkim=s; aspf=s","ttl":3600}' | jq -r '"  created: \(.result.name) = \(.result.content)"'
else
  echo "  MX records present — DMARC needs SPF review first, SKIPPED (manual)"
fi

echo; echo "== DONE. Verifying live =="
sleep 3
curl -sI --max-time 15 "https://$ZONE/" | grep -iE "content-security|strict-transport|x-frame|x-content|referrer|permissions|cross-origin" || echo "  headers not live yet (propagation) — re-run verify in a minute"
echo "  http -> "; curl -sI --max-time 15 "http://$ZONE/" | head -1
