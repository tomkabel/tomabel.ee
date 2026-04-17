# Analytics Tools Research: GDPR-Compliant, Privacy-First, Server-Side Solutions

**Project Context:** Personal portfolio website (React/TypeScript, Vite) hosted on GitHub Pages with Cloudflare DNS and proxying.  
**Research Date:** April 2026  
**Goal:** Find analytics tools that respect EU privacy law, require no cookies, support first-party server-side tracking, provide user flow/hotspot analytics, and are open source where possible.

---

## PART 1: HIGHLY COMPATIBLE SOLUTIONS

### Fully Compatible — Open Source, Cookie-less, First-Party Server-Side, GDPR/EU Law Compliant

| Tool | Type | Open Source | Self-Host | Cookieless | EU Hosting | Heatmaps | Session Replay | User Flows | Free Tier | Starting Price |
|------|------|-------------|-----------|------------|------------|----------|----------------|------------|-----------|----------------|
| **PostHog** | Product Analytics | ✅ MIT | ✅ | ✅* | ✅ | ❌ | ✅ | ✅ | 1M events/mo | Free / $20/mo |
| **Plausible** | Web Analytics | ✅ AGPL-3.0 | ✅ | ✅ | ✅ (Estonia) | ❌ | ❌ | ❌ | None | $9/mo |
| **Matomo** | Web Analytics | ✅ GPLv3 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100k/mo | Free self-host |
| **Umami** | Web Analytics | ✅ MIT | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | 100k events/mo | Free self-host |
| **Swetrix** | Web Analytics | ✅ AGPL-3.0 | ✅ | ✅ | ✅ (Germany) | ❌ | ❌ | ✅ | 10k events/mo | Free self-host / $19/mo cloud |
| **OpenPanel** | Web + Product | ✅ AGPL-3.0 | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | Free self-host | $2.50/mo cloud |
| **Pirsch** | Server-side Analytics | ✅ AGPL-3.0 | ✅ (License) | ✅ | ❌ | ❌ | ❌ | ❌ | None | $6/mo |
| **GoAccess** | Log Analyzer | ✅ MIT | ✅ | ✅ | ✅ | ✅ (HTML) | ❌ | ❌ | ✅ | Free |
| **Vemetric** | Web + Product | ✅ | ✅ | ✅ | ✅ (EU only) | ❌ | ❌ | ✅ | Free self-host | $0 |
| **OpenTrace** | Web Analytics | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (CDN) | Free | Free |
| **Liwan** | Web Analytics | ✅ Apache 2.0 | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | Free | Free |
| **NanoAnalytics** | Web Analytics | ✅ MIT | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | Free | Free |
| **SimpleData** | Web Analytics | ✅ | ❌ | ✅ | ✅ (EU only) | ❌ | ❌ | ❌ | Free | Free |
| **Prisme Analytics** | Web Analytics | ✅ | ✅ | ✅ | ✅ (Estonia) | ❌ | ❌ | ❌ | Unlimited self-host | €8.99/mo |
| **EuroMetrics** | Web Analytics | ✅ (core) | ❌ | ✅ | ✅ (Paris/Frankfurt/Amsterdam) | ❌ | ❌ | ❌ | 10k events/mo | Free |
| **Databuddy** | Web + Error Tracking | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | Unlimited self-host | Free |
| **Lytx** | Web + Product | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | Free self-host | $19/mo cloud |
| **Ninelytics** | Web Analytics | ✅ MIT | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | Unlimited self-host | Free |
| **Koko Analytics** | WordPress Plugin | ✅ GPLv3 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | Free (WordPress) |
| **Litlyx** | Web Analytics | ✅ | ✅ | ✅ | ✅ (Germany) | ❌ | ❌ | ❌ | ✅ | Free |
| **Flowsery** | Web Analytics | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | Free | Free |
| **Peek Analytics** | Web Analytics | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | Free | Free |
| **Swetrix Cloud** | Web + Funnels | ✅ AGPL-3.0 | ✅ | ✅ | ✅ (Germany) | ❌ | ❌ | ✅ | 10k events/mo | $19/mo |
| **Countly** | Enterprise Analytics | ✅ AGPL-3.0 | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | 500 MAU | Free / $2k+/mo enterprise |
| **TelemetryDeck** | App Analytics | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | Free / Custom |

*PostHog uses cookies by default but can be configured for cookieless tracking.

---

## PART 2: DETAILED TOOL PROFILES

### 2.1 PostHog — All-in-One Product Analytics Suite

**Best for:** Product teams, startups, engineering-led companies that need session replay, feature flags, A/B testing, and user flows in one platform.

**Key Features:**
- Session recordings with automatic PII masking
- Feature flags and A/B testing
- Heatmaps (requires additional setup)
- User funnels and cohort analysis
- EU data hosting available
- Self-hostable via Docker/Cloud
- 1M events/mo free tier

**GDPR Compliance:**
- Cookieless mode configurable (data aggregated without cookies)
- EU cloud hosting available
- Self-hosted option gives complete data sovereignty
- GDPR DPA available for enterprise

**Tracking Architecture:**
- Uses `posthog.js` for client-side tracking
- Server-side SDKs available for Node.js, Python, Go, Ruby, PHP, Java, .NET
- Can be deployed behind Cloudflare with Workers or separate subdomain

**Integration with GitHub Pages + Cloudflare:**
```html
<script>
  posthog.init('YOUR_API_KEY', {
    api_host: 'https://your-analytics.example.com', // Self-hosted endpoint
    person_profiles: 'identified_only', // Reduces cookie usage
    session_recording: {
      maskAllInputs: true // Auto PII masking
    }
  })
</script>
```

**Known Limitations:**
- Session recording requires significant storage
- Cookieless mode reduces user-level precision
- Self-hosting requires DevOps resources

---

### 2.2 Plausible Analytics — Lightweight, EU-Made Privacy Analytics

**Best for:** Simple websites that need clean pageview data without complexity.

**Key Features:**
- Sub-1KB script size
- No cookies, no consent banner needed
- Simple one-page dashboard
- Custom event tracking
- GDPR, CCPA, PECR compliant by default
- Made and hosted in EU (Estonia)
- Open source (AGPL-3.0)

**GDPR Compliance:**
- Zero personal data collection
- No cookies or fingerprinting
- IP addresses discarded immediately
- EU hosting (Estonia)

**Tracking Architecture:**
- JavaScript snippet (`plausible.js`)
- Server-side conversion API for accurate tracking
- No cross-site tracking

**Known Limitations:**
- No heatmaps or session replays
- No user flow visualization
- Aggregate data only (no individual journeys)
- No self-hosted free tier (cloud only)

---

### 2.3 Matomo — Full-Featured Google Analytics Replacement

**Best for:** Teams that need feature parity with Google Analytics (heatmaps, session replays, goals, ecommerce) with full data ownership.

**Key Features:**
- Heatmaps and session recordings
- Form analytics
- Goal tracking and ecommerce
- Google Analytics importer
- A/B testing (via plugin)
- Unlimited self-hosted
- EU cloud hosting available

**GDPR Compliance:**
- First-party cookies by default (configurable to cookieless)
- IP anonymization built-in
- GDPR consent manager available
- Self-hosted = complete data sovereignty
- GDPR DPA available

**Tracking Architecture:**
- `matomo.js` client-side tracker
- Server-side PHP/Node SDKs
- Logs analytics option (no JavaScript)
- GDPR-compliant cookie banner built-in

**Integration with GitHub Pages + Cloudflare:**
```html
<script>
  var _paq = window._paq || [];
  _paq.push(['disableCookies']);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//analytics.yourdomain.com/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', 'YOUR_SITE_ID']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
```

**Known Limitations:**
- More complex setup than lightweight alternatives
- Self-hosted requires server maintenance
- Heatmaps/session replay require additional setup and storage

---

### 2.4 Swetrix — Developer-Friendly, Open Source, EU-Hosted

**Best for:** Developers who want a modern, clean dashboard with funnels, custom events, and server-side tracking capabilities.

**Key Features:**
- Real-time dashboard
- Custom events and goals
- Funnel analysis
- Campaign/UTM tracking
- Built-in bot protection (proof-of-work challenge)
- Performance monitoring (real-user metrics)
- DAU/MAU tracking
- Open source (AGPL-3.0)
- EU-hosted cloud (Germany, Hetzner)
- Self-hostable Community Edition

**GDPR Compliance:**
- Cookieless by design
- No personal data collection
- All data anonymized
- GDPR compliant, no consent banners required
- EU-only data storage

**Tracking Architecture:**
- Sub-2KB JavaScript snippet
- Server-side tracking API available
- Events tracked via `swetrix.track(event, data)`

**Known Limitations:**
- No heatmaps or session replay
- Limited to web analytics only

---

### 2.5 Umami — Simple, Privacy-First, Self-Hostable

**Best for:** Teams that want a simple, no-frills alternative to Google Analytics with full data ownership.

**Key Features:**
- Clean, simple dashboard
- Pageviews, referrers, countries, devices
- Custom event tracking
- UTM campaign tracking
- Embed share links
- Open source (MIT)
- Self-hosted, no pricing tiers for self-host
- 100k events/mo free cloud tier

**GDPR Compliance:**
- No cookies by default
- No personal data collection
- Self-hosted = complete sovereignty
- GDPR compliant by design

**Known Limitations:**
- No heatmaps, session replays, or user flows
- Aggregate data only
- No built-in funnel analysis

---

### 2.6 Vemetric — Open Source User Journey Analytics

**Best for:** Developers and SaaS founders wanting complete user journey tracking without cookies.

**Key Features:**
- User journey tracking (anonymous and logged-in)
- Funnel analysis
- Real-time dashboards
- Custom event tracking
- Anonymous hashing with daily salt rotation
- SDKs for popular frameworks
- EU-based servers
- Open source

**GDPR Compliance:**
- Cookieless by default
- No PII collection
- EU-only data storage
- Open source codebase for verification

**Known Limitations:**
- Newer tool, smaller community
- Limited third-party integrations

---

### 2.7 OpenTrace — ClickHouse-Powered Analytics

**Best for:** Teams that need high-performance analytics at scale with complete privacy.

**Key Features:**
- Process 100k+ events/second
- ClickHouse-powered analytics engine
- Sub-millisecond query speed
- Sub-2KB tracking script
- Custom reports (BI engine)
- Cohort analysis
- Complete user timeline
- GDPR compliant by design
- Zero tracking (no cookies, no fingerprinting, no device ID)

**GDPR Compliance:**
- Zero cookies, fingerprinting, device identification
- Complete anonymization by default
- GDPR native by architectural design
- No consent banners needed

**Known Limitations:**
- Self-hosted only (no managed cloud)
- Requires infrastructure management

---

### 2.8 GoAccess — Open Source Web Log Analyzer

**Best for:** Teams that want zero-script server log analysis with real-time HTML output.

**Key Features:**
- Real-time HTML dashboard
- Processes Apache/Nginx/Cloudflare access logs
- No JavaScript required
- GEOIP support
- Open source (MIT)
- Runs on any server
- Lightweight

**GDPR Compliance:**
- Log file analysis only (no client-side tracking)
- IP addresses in logs are your responsibility
- No cookies by definition
- Self-hosted

**Known Limitations:**
- No real-time visitor tracking (batch log analysis)
- No heatmaps or session replays
- Requires access to server logs

---

### 2.9 Liwan — Rust-Powered Single Binary Analytics

**Best for:** Developers who want a single, self-contained binary with zero dependencies.

**Key Features:**
- Single binary deployment
- No database required
- Sub-1KB tracking script
- Real-time analytics dashboard
- Bot and crawler filtering
- Apache 2.0 license
- Rust-based for performance

**GDPR Compliance:**
- No cookies, no cross-site tracking
- No persistent identifiers
- All data on your server
- Privacy-first by design

**Known Limitations:**
- Newer project (smaller community)
- Limited features compared to full platforms

---

### 2.10 NanoAnalytics — Flask + SQLite Minimalist

**Best for:** Developers who want a minimal, Flask-based analytics with AI/MCP readiness.

**Key Features:**
- Sub-400-byte beacon
- SQLite backend (no infra overhead)
- 15 API endpoints
- OpenAPI 3.1 spec
- MCP server support for AI tools
- No cookies, no GDPR banner
- MIT license
- SPA-ready with history.pushState support

**GDPR Compliance:**
- Sessions in sessionStorage (not cookies)
- No personal data stored
- No cross-site tracking

**Known Limitations:**
- Limited to basic metrics
- No heatmaps or session replay

---

### 2.11 Prisme Analytics — EU-Based, Zero-Cookie, JavaScript-Optional

**Best for:** EU businesses needing JavaScript-less tracking option and forever data retention.

**Key Features:**
- JavaScript-less tracking via 1x1 transparent pixel
- Real-time analytics
- No cookies, no consent banners
- Made in EU (Estonian company)
- Open source
- Forever data retention (no deletion)
- White-label/custom domain option
- GDPR, PECR, CCPA, Schrems II compliant

**GDPR Compliance:**
- Cookieless, consent-free
- No PII collection
- EU-only data residency
- Full data ownership
- No third-party subprocessors

**Pricing:** €8.99/month (all-inclusive, unlimited websites/pageviews/events)

---

### 2.12 EuroMetrics — EU-Only Data Residency, No US Subprocessors

**Best for:** European businesses concerned about US surveillance laws (FISA Section 702) and Schrems II compliance.

**Key Features:**
- Data stored exclusively in EU (Paris, Frankfurt, Amsterdam)
- No US subprocessors
- Designed for GDPR from ground up
- Under 2KB script (45x smaller than GA)
- White-label/custom domain included
- Open-source core
- Full REST API
- 10k events/mo free

**GDPR Compliance:**
- Built for EU law, not retrofitted
- No US data transfers
- No cookies, no consent banners
- Open source core

**Pricing:** Free (10k events) to €69/mo (Corporate) to €149/mo (Agency)

---

### 2.13 Lytx — Lightweight, Open Source, Self-Hostable on Cloudflare

**Best for:** Indie developers wanting a modern UI with product analytics and user flow visualization.

**Key Features:**
- Real-time visitor counts
- Top pages and referrers
- Custom event tracking
- Funnel analysis
- Retention cohorts
- User flow visualization
- Under 5KB script
- Self-host on Cloudflare (Alchemy deploy script)
- Open source

**GDPR Compliance:**
- No IP tracking, no fingerprinting, no cookies
- GDPR, CCPA, PECR compliant
- Open source, auditable

**Pricing:** Free self-host / $19/mo cloud

---

### 2.14 Databuddy — Under 30KB All-in-One Script

**Best for:** Teams wanting analytics, error tracking, and feature flags in one script.

**Key Features:**
- Web analytics
- Error tracking
- Feature flags
- Conversion funnels
- Real-time users and sessions
- Sub-30KB script
- Open source
- No consent banners

**GDPR Compliance:**
- GDPR compliant by default
- No personal data collected

**Known Limitations:**
- Newer tool, smaller community

---

### 2.15 Swetrix Cloud — EU-Hosted, Self-Hostable, Funnels

**Key Features (Cloud distinction):**
- Fully managed EU hosting
- Real-time analytics
- Custom events and goals
- Funnel analysis
- Bot protection
- Free 14-day trial

**Self-Host (Community Edition):**
- Same core features
- Docker deployment
- MySQL/PostgreSQL backend
- Full data ownership

**Pricing:** From $19/mo cloud / Free self-host

---

### 2.16 Countly — Enterprise-Grade, Self-Hostable

**Best for:** Enterprises needing comprehensive analytics with mobile app support.

**Key Features:**
- Web and mobile analytics
- Session replay
- User profiles
- Push notifications
- Crash reporting
- Open source (AGPL-3.0)
- Self-hosted or cloud
- EU hosting available

**GDPR Compliance:**
- Self-hosted = complete data sovereignty
- GDPR tools built-in
- Full data ownership

**Pricing:** Free up to 500 MAU / Enterprise from $2k/mo

---

### 2.17 TelemetryDeck — App-First, Privacy-Focused

**Best for:** Mobile app analytics (iOS/Android) with minimal data collection.

**Key Features:**
- App analytics for iOS/Android
- Event-based tracking
- Retention and funnel analysis
- Minimal personal data collection
- No tracking permission banners needed
- GDPR compliant

**GDPR Compliance:**
- Doesn't collect enough PII to require opt-out
- EU cloud hosting available

**Known Limitations:**
- Primarily app-focused, less web-oriented
- Not open source

---

## PART 3: SESSION REPLAY + HEATMAP TOOLS (Partial Compatibility)

These tools require cookies for session identification but offer strong privacy controls:

| Tool | Cookie-Free | EU Hosting | PII Masking | Heatmaps | Session Replay | Starting Price |
|------|-------------|-----------|-------------|----------|----------------|----------------|
| **PostHog** (replay) | ⚠️ Optional | ✅ | ✅ Auto | ❌ | ✅ | Free tier |
| **Mouseflow** | ❌ | ✅ (EU option) | ⚠️ Partial | ✅ | ✅ | €31/mo |
| **Microsoft Clarity** | ❌ | ❌ | ⚠️ Partial | ✅ | ✅ | Free |
| **Hotjar** | ❌ | ❌ | ⚠️ Partial | ✅ | ✅ | $32/mo |
| **FullStory** | ❌ | ❌ | ✅ | ✅ | ✅ | Custom |
| **Smartlook** | ❌ | ✅ (EU option) | ✅ | ✅ | ✅ | $55/mo |
| **UXtweak** | ❌ | ❌ (AWS) | ✅ | ✅ | ✅ | Free tier |
| **Mouseprints** | ✅ | ❌ | ✅ | ✅ | ✅ | Free |
| **VulpaSoft** | ✅ | ✅ | ✅ | ✅ | ✅ | $19/mo |
| **FullSession** | ✅ | ❌ | ✅ | ✅ | ✅ | $24/mo |

### 3.1 PostHog Session Replay — Best Privacy-First Option

- Automatic PII masking for inputs
- Configurable cookieless mode
- EU hosting available
- Self-hosted option
- Free tier: 5k recordings/mo, 1M events/mo

### 3.2 Mouseflow — Strong Heatmaps, EU Option

- 7 heatmap types (click, scroll, movement, attention, geo, interactive, friction)
- Form analytics with friction score
- Journey analytics (Business plan+)
- EU data center option
- GDPR, CCPA compliant

### 3.3 Microsoft Clarity — Free, Basic Heatmaps

- Completely free
- Session replays and heatmaps
- React Native, Android, iOS support
- Microsoft Copilot AI summaries

**Limitation:** Data shared with Microsoft for AI training

### 3.4 Mouseprints — Developer-Friendly, Self-Hostable

- Session recordings as JSON files you control
- No third-party trackers
- GDPR ready
- Free tier: 100 sessions/mo

---

## PART 4: NOT COMPATIBLE BUT INTERESTING

### Google Analytics 4 (GA4)
**Why not:** Cookie-based, US jurisdiction, requires consent banners, data shared with Google for ad targeting.

### Mixpanel
**Why not:** Uses cookies/profiles, US-based, not GDPR-native without significant configuration.

### Amplitude
**Why not:** Cookie-based user identification, US-hosted, enterprise pricing.

### Heap
**Why not:** Automatic event capture (lots of data), cookie-based, US jurisdiction.

### Segment (Twilio)
**Why not:** CDP-focused, uses cookies, complex enterprise setup.

### Odoo Analytics
**Why not:** Part of larger ERP suite, not privacy-first by design.

---

## PART 5: DEPLOYMENT ARCHITECTURES FOR GITHUB PAGES + CLOUDFLARE

### Option A: Subdomain Analytics Endpoint

```
User → Cloudflare → GitHub Pages (main site)
                 └→ analytics.yourdomain.com (analytics server)
```

**Recommended for:** Self-hosted solutions (PostHog, Matomo, Umami, Swetrix self-host)

**Setup:**
1. Create subdomain `analytics.yourdomain.com`
2. Deploy analytics server (e.g., PostHog Docker on Railway, Railway, VPS)
3. Point CNAME through Cloudflare to your server
4. Add tracking script to GitHub Pages via custom `analytics.js` file or injection

### Option B: Cloudflare Workers Analytics Proxy

```
User → Cloudflare Worker → Analytics Server
                      ↓
               GitHub Pages (if SSR)
```

**Recommended for:** Server-side tracking without exposing your analytics infrastructure.

### Option C: Managed Privacy-First Service (Simplest)

```
User → Cloudflare → GitHub Pages
                 └→ Plausible/Fathom/Simple Analytics (tracking)
```

**Recommended for:** Minimal setup, managed solutions, no server maintenance.

---

## PART 6: RECOMMENDATIONS BY USE CASE

### For Personal Portfolio (Simple Pageviews + Basic Flow)
**Recommended:** Plausible, Simple Analytics, or Umami (self-hosted)

### For Product/Startup (User Flows + Funnels + Session Replay)
**Recommended:** PostHog (self-hosted or cloud), or Swetrix + PostHog replay

### For Enterprise/Regulated (Full Compliance + Audit Trail)
**Recommended:** Matomo (self-hosted), Countly, or PostHog Enterprise

### For Maximum Privacy + No Cookies
**Recommended:** OpenTrace, Vemetric, Pirsch, NanoAnalytics, Liwan

### For EU Data Sovereignty Only
**Recommended:** EuroMetrics, Prisme, SimpleData, Swetrix (EU hosted)

### For Heatmaps + Session Replay Only
**Recommended:** Mouseflow (EU option) or Microsoft Clarity (free)

### For Zero Infrastructure (Managed)
**Recommended:** Plausible, Fathom, Simple Analytics, EuroMetrics Cloud

---

## PART 7: QUICK DECISION MATRIX

| Priority | Best Choice |
|----------|-------------|
| Open source + self-hosted + free | Umami, PostHog, Swetrix, GoAccess |
| EU-only hosting | EuroMetrics, Prisme, Plausible, SimpleData |
| No cookies, no consent | Plausible, Fathom, SimpleData, OpenTrace, Pirsch |
| User flows + journey analytics | PostHog, Vemetric, OpenTrace, Lytx |
| Heatmaps + session replay | PostHog + Mouseflow, or Mouseflow alone |
| Server-side, no JS | Pirsch, GoAccess, Prisme (pixel tracking) |
| Lightest script (<1KB) | Plausible, NanoAnalytics, Liwan |
| AI/ML ready | PostHog, NanoAnalytics (MCP), OpenTrace (ClickHouse) |
| WordPress integration | Koko Analytics, Matomo |
| Mobile + Web analytics | Countly, TelemetryDeck |

---

## PART 8: IMPLEMENTATION NOTES

### Cloudflare Configuration for Self-Hosted Analytics

1. **DNS:** Create A/CNAME record for `analytics.yourdomain.com` pointing to your server IP
2. **SSL:** Enable Full or Full (strict) SSL for the analytics subdomain
3. **Proxy:** Enable Cloudflare proxy for the analytics subdomain
4. **Workers (optional):** Use Worker to proxy tracking requests for additional privacy

### GitHub Pages Integration

Since GitHub Pages doesn't support server-side rendering, client-side tracking is required. However, you can:
1. Add tracking script to your built `index.html` before publishing
2. Use Cloudflare to inject analytics script via Workers
3. Deploy your own tracking endpoint subdomain

### GDPR Considerations for Cloudflare

Cloudflare acts as a data processor. For strict GDPR compliance:
- Use Cloudflare's EU-based data centers
- Consider Cloudflare's Data Localization Suite
- Add Cloudflare to your DPA as sub-processor

---

## APPENDIX: COMPARISON TABLES

### Privacy Scoring (Higher = More Private)

| Tool | Privacy Score | Notes |
|------|---------------|-------|
| OpenTrace | 10/10 | Zero tracking, no fingerprinting, complete anonymization |
| SimpleData | 10/10 | No cookies, no IP storage, no fingerprinting |
| Pirsch | 10/10 | Server-side only, no cookies |
| Plausible | 9/10 | No fingerprinting, EU hosted |
| Prisme | 9/10 | No cookies, EU-only, zero PII |
| EuroMetrics | 9/10 | EU-only, no US subprocessors |
| PostHog | 8/10 | Cookieless mode available, EU hosting |
| Matomo | 7/10 | Cookie mode default, cookieless available |
| Mouseflow | 6/10 | Cookie-based but with EU option |

### Script Size Comparison

| Tool | Script Size | Notes |
|------|-------------|-------|
| NanoAnalytics | ~400 bytes | Smallest beacon |
| Plausible | ~1KB | Lightweight |
| SimpleData | <1KB | Tiny |
| Umami | ~2KB | Small |
| Swetrix | ~2KB | Sub-2KB |
| EuroMetrics | ~2KB | 45x smaller than GA |
| Matomo | ~50KB | Full feature set |
| Google Analytics 4 | ~45KB+ | Largest |

---

*Document generated April 2026. Tool features and pricing may have changed. Always verify current specifications before implementation.*