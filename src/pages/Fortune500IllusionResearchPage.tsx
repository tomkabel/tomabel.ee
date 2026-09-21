import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import ReaderRail, { sectionSlug } from '../components/site/reader-rail';

type Bi = { en: string; et: string };

type EssaySection = {
  heading: Bi;
  paragraphs: Bi[];
};

const title: Bi = {
  en: 'The Fortune 500 Illusion of Control',
  et: 'Fortune 500 kontrolliillusioon',
};

const standfirst: Bi = {
  en: 'The largest security budget, the most tooling, the most attestations — and a breach that runs from a stolen session cookie to a full database export in twenty minutes. Archetype B is an analytical composite from the Zero-Trust Octagon framework, not a real disclosed incident.',
  et: 'Suurim turbe-eelarve, kõige rohkem tööriistu, kõige rohkem vastavustunnistusi — ja rünne, mis jõuab varastatud seansiküpsisest täieliku andmebaasi väljavõtteni kahekümne minutiga. Arhetüüp B on analüütiline üldistus Zero-Trust Octagoni raamistikust, mitte tegelik avalikustatud intsident.',
};

const openingParagraphs: Bi[] = [
  {
    en: 'Archetype B is a composite. It is not a company and nothing here is a disclosed breach. It is a modelled organisation from the Zero-Trust Octagon framework: a large enterprise that bought an integrated vendor suite, mapped it onto its organisational chart, and passed every audit. Every step below follows from a decision made months earlier, in a procurement meeting.',
    et: 'Arhetüüp B on üldistatud mudel. See ei ole ettevõte ja miski siin ei ole avalikustatud turvaintsident. Tegu on Zero-Trust Octagoni raamistiku modelleeritud organisatsiooniga: suurettevõte, kes ostis integreeritud tarnijapaketi, sobitas selle oma organisatsiooniskeemiga ja läbis kõik auditid. Iga samm allpool tuleneb otsusest, mis tehti kuid varem hankekoosolekul.',
  },
];

const sections: EssaySection[] = [
  {
    heading: { en: 'The posture before the breach', et: 'Olukord enne rünnet' },
    paragraphs: [
      {
        en: 'Identity rests on a software certificate authority that signs tokens. Access decisions are attribute-based: role, time, location, clearance. Enforcement lives at the network perimeter, attestation has a single source, and the response is hard deny — lock, block, quarantine. The SIEM is ground truth. Identity, Network and Security Operations are separate teams, with a 24/7 SOC.',
        et: 'Identiteet tugineb tarkvaralisele sertifitseerimiskeskusele, mis lubasid allkirjastab. Ligipääsuotsused on atribuudipõhised: roll, aeg, asukoht, õiguste tase. Jõustamine toimub võrgu perimeetril, kinnitusel on üks allikas ja reageerimismehhanism on karm keeld — lukusta, blokeeri, isoleeri. SIEM on tõe allikas. Identiteedi-, võrgu- ja turbeoperatsioonide meeskonnad on eraldi ning SOC töötab ööpäev läbi.',
      },
      {
        en: 'On paper this is comprehensive. Audits measure the presence of controls, not the conditions under which they hold, so the blind spot appears on no artefact. Every control here assumes that authentication and access are the same moment, and that the network boundary separates trusted from untrusted. Neither assumption survives a session cookie lifted off an unmanaged home laptop.',
        et: 'Paberil on see põhjalik. Auditid mõõdavad kontrollide olemasolu, mitte tingimusi, mille korral need püsivad, nii et pimenurk ei ilmu üheski dokumendis. Iga kontroll siin eeldab, et autentimine ja ligipääs on sama hetk ning et võrgu piir eraldab usaldatava mitteusaldatavast. Kumbki eeldus ei pea vastu seansiküpsisele, mis varastati haldamata koduarvutist.',
      },
    ],
  },
  {
    heading: { en: 'On paper and in practice', et: 'Paberil ja praktikas' },
    paragraphs: [
      {
        en: 'The Octagon states eight axioms an architecture must satisfy structurally, not nominally. Archetype B satisfies two: real cryptographic identity, and real operational redundancy with someone genuinely watching. Those two are why the breach is detected at all.',
        et: 'Octagon esitab kaheksa aksioomi, mida arhitektuur peab täitma struktuurselt, mitte nimeliselt. Arhetüüp B täidab kaks: tõeline krüptograafiline identiteet ja tõeline operatiivne varu, kus keegi tõepoolest jälgib. Just need kaks on põhjus, miks rünne üldse avastatakse.',
      },
      {
        en: 'Six it violates. Freedom from intrinsic trust holds in name only: the database trusts anything from the DevOps subnet. Policy is not verifiable, because the decision point is a vendor black box no auditor can replay. Mediation is bypassable, happening at the perimeter and nowhere after. Verification is not continuous, happening at login and then not again. Epistemic integrity is absent, because the only evidence pipeline is one the attacker can reach. Byzantine fault tolerance is absent, because the response can do more damage than the attack.',
        et: 'Kuut aksioomi rikub. Sisemise usalduse puudumine kehtib ainult nimeliselt: andmebaas usaldab kõike, mis tuleb DevOps-alamvõrgust. Poliitika ei ole kontrollitav, sest otsustuspunkt on tarnija must kast, mida ükski audiitor korrata ei saa. Vahendamisest saab mööda, sest see toimub perimeetril ja mitte kusagil pärast seda. Kontroll ei ole pidev, sest see toimub sisselogimisel ja seejärel mitte enam. Episteemiline terviklikkus puudub, sest ainus tõendiahel on seesama, milleni ründaja ulatub. Bütsantsi vigade talumine puudub, sest reaktsioon suudab teha rohkem kahju kui rünne.',
      },
    ],
  },
  {
    heading: { en: 'The breach, step by step', et: 'Rünne samm-sammult' },
    paragraphs: [
      {
        en: 'It begins outside the perimeter. A senior DevOps engineer\'s personal laptop picks up commodity infostealer malware, which harvests browser-stored cookies, passwords and live OIDC tokens. Among the haul is a corporate session cookie, still inside its twelve-hour lifetime.',
        et: 'Kõik algab väljaspool perimeetrit. Vanem DevOps-inseneri isiklik sülearvuti nakatub levinud infovarga pahavaraga, mis kogub brauserisse salvestatud küpsised, paroolid ja kehtivad OIDC-load. Saagi hulgas on ettevõtte seansiküpsis, mis on veel oma kaheteisttunnise eluea sees.',
      },
      {
        en: 'At T+0 the attacker replays the token through the corporate VPN. The signature checks out and the token has not expired. Because attestation has a single source, nothing else is asked: not whether this is the device that authenticated, not hardware attestation, not the behavioural baseline. The token is valid, therefore the user is present.',
        et: 'Hetkel T+0 esitab ründaja loa ettevõtte VPN-i kaudu uuesti. Allkiri klapib ja luba ei ole aegunud. Kuna kinnitusel on üks allikas, ei küsita midagi muud: ei seda, kas tegu on sama seadmega, mis autentis, ei riistvaralist kinnitust ega käitumise võrdlusalust. Luba kehtib, järelikult on kasutaja kohal.',
      },
      {
        en: 'At T+3 minutes the attacker requests the production database. The policy engine checks role, hours, clearance and source network. All four match, because all four describe the engineer, and the attacker is wearing the engineer. No auditor can replay that decision, because the decision point does not export its reasoning.',
        et: 'Hetkel T+3 minutit taotleb ründaja ligipääsu tootmisandmebaasile. Poliitikamootor kontrollib rolli, kellaaega, õiguste taset ja lähtevõrku. Kõik neli klapivad, sest kõik neli kirjeldavad inseneri, ja ründaja kannab inseneri. Ükski audiitor ei saa seda otsust hiljem korrata, sest otsustuspunkt oma põhjendust ei väljasta.',
      },
      {
        en: 'At T+5 minutes the attacker is inside, and inside is flat. There is no application-layer mediation between the VPN subnet and the database subnet; mediation was a perimeter property and the perimeter is behind them. The database accepts the connection without its own identity check, because anything from that subnet has always been the DevOps team. Bulk exports begin, and the TLS-encrypted egress is not inspected.',
        et: 'Hetkel T+5 minutit on ründaja sees ja sisemus on lame. Rakenduskihi vahendamist VPN-alamvõrgu ja andmebaasi-alamvõrgu vahel ei ole; vahendamine oli perimeetri omadus ja perimeeter jääb selja taha. Andmebaas võtab ühenduse vastu ilma oma identiteedikontrollita, sest kõik sellest alamvõrgust on alati olnud DevOps-meeskond. Algavad mahukad väljavõtted ja TLS-iga krüpteeritud väljuvat liiklust ei kontrollita.',
      },
    ],
  },
  {
    heading: { en: 'What fired and what did not', et: 'Mis käivitus ja mis mitte' },
    paragraphs: [
      {
        en: 'The export generates very large logs, shipped to the SIEM by an agent on the database host the attacker now controls. At T+8 minutes the attacker pauses that agent. The SIEM registers a drop in log volume from one host, which happens routinely during maintenance windows, so it is not a priority-one event. Silence is read as normality.',
        et: 'Väljavõte tekitab väga suuri logisid, mis saadetakse SIEM-i agendiga andmebaasiserverist, mida ründaja nüüd kontrollib. Hetkel T+8 minutit peatab ründaja selle agendi. SIEM registreerib logimahu languse ühest masinast, mis juhtub rutiinselt hooldusakende ajal, seega ei ole see esimese prioriteedi sündmus. Vaikust loetakse normaalsuseks.',
      },
      {
        en: 'What eventually fires is not part of the zero-trust programme. At T+20 minutes the attacker attempts SSH into a legacy server carrying a hardcoded rule against SSH from an unrecognised ASN. The rule predates the vendor suite and is the one control that never assumed a valid token meant a legitimate user. The gap is twenty minutes to the tripwire and twenty-two to the moment the organisation knows it has an incident — long enough for full exfiltration.',
        et: 'See, mis lõpuks käivitub, ei kuulu zero-trust programmi juurde. Hetkel T+20 minutit üritab ründaja SSH-ga siseneda vanasse serverisse, millel on vana kõvakodeeritud reegel tundmatust ASN-ist tuleva SSH vastu. Reegel on tarnijapaketist vanem ja on ainus kontroll, mis ei eeldanud kunagi, et kehtiv luba tähendab õiguspärast kasutajat. Lünk on kakskümmend minutit häireni ja kakskümmend kaks minutit hetkeni, mil organisatsioon teab, et tegu on intsidendiga — piisavalt kaua täielikuks andmete väljaveoks.',
      },
    ],
  },
  {
    heading: { en: 'The token that outlived its context', et: 'Luba, mis elas üle oma konteksti' },
    paragraphs: [
      {
        en: 'The most consequential failure has the least visible symptom. The cookie stayed valid for twelve hours regardless of what changed around it: the device, the network path, the autonomous system, the behaviour. None of it mattered, because validity was a property of the token rather than of the situation.',
        et: 'Kõige tagajärjekamal tõrkel on kõige vähem nähtav sümptom. Küpsis jäi kehtima kaksteist tundi olenemata sellest, mis selle ümber muutus: seade, võrgutee, autonoomne süsteem, käitumine. Miski sellest ei lugenud, sest kehtivus oli loa, mitte olukorra omadus.',
      },
      {
        en: 'This is what continuous verification means, and it is routinely misread as shorter token lifetimes. A shorter lifetime narrows the window without changing the model: a five-minute token still answers only whether it was signed, never whether the holder is still the entity that was authenticated. Continuous verification asks the second question at every access decision, using signals the token cannot carry — device binding, hardware attestation, behavioural baselines.',
        et: 'Just seda tähendab pidev kontroll ja seda tõlgendatakse rutiinselt valesti loa lühema elueana. Lühem eluiga kitsendab akent, muutmata mudelit: viieminutine luba vastab endiselt ainult sellele, kas see on allkirjastatud, mitte kunagi sellele, kas hoidja on ikka see, keda autenditi. Pidev kontroll esitab teise küsimuse iga ligipääsuotsuse juures, kasutades signaale, mida luba kaasas ei kanna — seadmega sidumine, riistvaraline kinnitus, käitumise võrdlusalus.',
      },
    ],
  },
  {
    heading: { en: 'The defence that did more damage than the attack', et: 'Kaitse, mis tegi rohkem kahju kui rünne' },
    paragraphs: [
      {
        en: 'When the tripwire fires, hard deny executes as designed. It revokes the engineer\'s certificates, terminates the VPN pool address — locking out every user on it — locks the directory account, and quarantines the database server. Each action is defensible. Together they take production down.',
        et: 'Kui häire käivitub, täidetakse karm keeld täpselt nii, nagu projekteeritud. See tühistab inseneri sertifikaadid, lõpetab VPN-i aadressi töö — lukustades välja kõik selle kasutajad —, lukustab kataloogikonto ja isoleerib andmebaasiserveri. Iga tegevus on eraldi kaitstav. Koos võtavad nad tootmise maha.',
      },
      {
        en: 'At T+22 minutes the real engineer is paged at three in the morning and finds their own account locked. The siloed organisation processes one incident as three unrelated tickets: a lockout assumed to be a forgotten password, a blocked address closed as working as intended, and an alert investigated without knowing the three are one event. The responders are themselves locked out by the response, and the lockout does not revoke the service account the attacker created before the tripwire fired.',
        et: 'Hetkel T+22 minutit kutsutakse tõeline insener kell kolm öösel välja ja ta leiab oma konto lukust. Jaotatud organisatsioon töötleb üht intsidenti kolme sidumata piletina: lukustus, mida peetakse unustatud parooliks, blokeeritud aadress, mis suletakse kui ootuspärane, ja häire, mida uuritakse teadmata, et need kolm on üks sündmus. Reageerijad on reageerimise tõttu ise välja lukustatud ja lukustus ei tühista teenusekontot, mille ründaja lõi enne häire käivitumist.',
      },
      {
        en: 'The recurring story of a CISO removed six months after a lockout cascade takes down a critical business function is not a personnel failure. A defensive response that harms the business more than the attacker did is itself a Byzantine fault.',
        et: 'Korduv lugu infoturbejuhist, kes vabastatakse ametist kuus kuud pärast lukustuste ahelreaktsiooni, mis võttis maha kriitilise äriprotsessi, ei ole personaliviga. Kaitsereaktsioon, mis kahjustab äri rohkem kui ründaja, on ise Bütsantsi viga.',
      },
    ],
  },
  {
    heading: { en: 'Prevention versus shortening', et: 'Ennetamine versus lühendamine' },
    paragraphs: [
      {
        en: 'Two controls would have prevented the breach rather than trimmed it. Device-bound credentials break the chain at T+0: a copied cookie is worthless on hardware the engineer does not physically hold. Identity-aware mediation at the workload breaks it at T+5: the database asks who is calling instead of where from, and network position stops being a credential.',
        et: 'Kaks kontrolli oleksid rünnet ennetanud, mitte lühendanud. Seadmega seotud mandaadid katkestavad ahela hetkel T+0: kopeeritud küpsis on väärtusetu riistvaral, mida insener füüsiliselt ei hoia. Identiteeditundlik vahendamine töökoormuse juures katkestab ahela hetkel T+5: andmebaas küsib, kes helistab, mitte kust, ja asukoht võrgus lakkab olemast mandaat.',
      },
      {
        en: 'Other controls only shorten the incident. Independent telemetry that alarms when a logging agent goes silent turns the T+8 blind spot into a detection, after exfiltration has started. Behavioural re-verification catches the shift to bulk extraction, after data has moved. A replayable policy engine makes the T+3 decision auditable, which matters afterwards and not during.',
        et: 'Muud kontrollid üksnes lühendavad intsidenti. Sõltumatu telemeetria, mis annab häire, kui logimisagent vaikib, muudab T+8 pimenurga avastuseks, kuid alles pärast väljaveo algust. Käitumise korduskontroll tabab ülemineku massiliseks väljaveoks, kuid pärast andmete liikumist. Korratav poliitikamootor muudab T+3 otsuse auditeeritavaks, mis loeb hiljem ja mitte rünnaku ajal.',
      },
      {
        en: 'There is an ordering constraint most programmes get backwards. Replacing hard deny with graduated friction — step-up verification, rate limiting, read-only degradation — must come before improving detection. Better detection with hard deny produces more outages, not more safety, and each outage ratchets the organisation away from zero trust through exceptions.',
        et: 'On üks järjekorranõue, mille enamik programme ajab tagurpidi. Karmi keelu asendamine astmelise takistusega — täiendav kinnitus, kiiruse piiramine, kirjutusõiguse eemaldamine — peab tulema enne avastamise parandamist. Parem avastamine koos karmi keeluga toodab rohkem katkestusi, mitte rohkem turvalisust, ja iga katkestus nihutab organisatsiooni erandite kaudu zero trustist kaugemale.',
      },
    ],
  },
  {
    heading: { en: 'If you recognise your own organisation', et: 'Kui tunned ära oma organisatsiooni' },
    paragraphs: [
      {
        en: 'Archetype B does not describe incompetence. Procurement bought an integrated suite because integration reduces deployment risk, Identity ran a clean PKI, Network enforced at the boundary it owned. The failure lives in the joints between those decisions, and no team owns a joint. One weakness in a shared management plane reaches every layer at once: the suite is a single trust anchor, not zero trust.',
        et: 'Arhetüüp B ei kirjelda saamatust. Hankemeeskond ostis integreeritud paketi, sest integratsioon vähendab juurutamise riski, identiteedimeeskond haldas puhast PKI-d, võrgumeeskond jõustas piiril, mis oli tema oma. Tõrge peitub nende otsuste liidestes ja ükski üksik meeskond liidest ei oma. Üks nõrkus jagatud haldustasandil ulatub korraga igasse kihti: pakett on üksainus usalduse ankur, mitte zero trust.',
      },
      {
        en: 'The practical test is short. Pick one production system and ask three questions. If a valid session token for it were copied to an unknown machine now, what would refuse it? If someone reached it from an approved internal subnet, what would ask who they are? If its telemetry went quiet, what independent signal would tell you? An architecture that cannot answer all three has this shape.',
        et: 'Praktiline kontroll on lühike. Vali üks tootmissüsteem ja esita kolm küsimust. Kui selle kehtiv seansiluba kopeeritaks praegu tundmatusse masinasse, mis selle tagasi lükkaks? Kui keegi jõuaks selleni lubatud sisevõrgust, mis küsiks, kes ta on? Kui selle telemeetria vaikiks, milline sõltumatu signaal sellest teataks? Arhitektuur, mis ei suuda kõigile kolmele vastata, on selle kujuga.',
      },
    ],
  },
];

function Fortune500IllusionResearchPage() {
  const { language } = useTranslation();
  const isEn = language === 'en';

  return (
    <article>
      <header className="relative overflow-hidden border-b border-border px-6 pb-20 pt-24">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />
        <div className="relative mx-auto max-w-4xl">
          <Link
            to="/disclosures"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-accent hover:underline"
          >
            ← {isEn ? 'Back to disclosures' : 'Tagasi avalikustatute juurde'}
          </Link>
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {isEn ? 'Framework Analysis · Zero-Trust Octagon · Archetype B' : 'Raamistiku analüüs · Zero-Trust Octagon · Arhetüüp B'}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
            {title[language]}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted md:text-2xl">
            {standfirst[language]}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="border border-border bg-white/[0.03] px-3 py-2">
              {isEn ? 'Published · September 22, 2026' : 'Avaldatud · 22. september 2026'}
            </span>
            <span className="border border-border bg-white/[0.03] px-3 py-2">
              {isEn ? '6 min read' : '6 min lugemist'}
            </span>
            <span className="border border-border bg-white/[0.03] px-3 py-2">Tom Kristian Abel</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-24">
            <ReaderRail
              sections={sections.map((s) => ({ heading: s.heading[language] }))}
              backHref="/disclosures"
              backLabel={isEn ? 'All disclosures' : 'Kõik avalikustatud'}
            />
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
            {openingParagraphs.map((paragraph) => (
              <p key={paragraph.en}>{paragraph[language]}</p>
            ))}
            <p>
              {isEn
                ? 'The eight axioms referenced throughout are defined in '
                : 'Kaheksa aksioomi, millele siin viidatakse, on määratletud artiklis '}
              <Link to="/disclosures/zero-trust-octagon" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                {isEn ? 'the Zero-Trust Octagon overview' : 'Zero-Trust Octagoni ülevaade'}
              </Link>
              {isEn
                ? ', which compresses this breach into a single paragraph. This page is the full trace. The complete book text is at '
                : ', mis surub selle ründe kokku ühte lõiku. See lehekülg on täielik jälitus. Raamatu täistekst on aadressil '}
              <a href="https://github.com/tomkabel/zero-trust-octagon" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                github.com/tomkabel/zero-trust-octagon
              </a>
              .
            </p>
          </div>

          {sections.map((section, i) => (
            <section
              key={section.heading.en}
              id={sectionSlug(section.heading[language])}
              className="mt-16 max-w-3xl scroll-mt-24"
            >
              <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="font-display text-3xl font-bold leading-tight text-foreground">
                {section.heading[language]}
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.en}>{paragraph[language]}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-16 max-w-3xl">
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground">
              {isEn ? 'Related reading' : 'Seotud lugemine'}
            </h2>
            <ul className="mt-6 space-y-3 text-lg leading-relaxed text-muted">
              <li>
                <Link to="/disclosures/zero-trust-octagon" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                  {isEn ? 'The Zero-Trust Octagon' : 'Zero-Trust Octagon'}
                </Link>
                {isEn ? ' — the eight axioms and the nine-dimension matrix this archetype is scored against.' : ' — kaheksa aksioomi ja üheksamõõtmeline maatriks, mille alusel seda arhetüüpi hinnatakse.'}
              </li>
              <li>
                <Link to="/disclosures/the-pin-that-cannot-be-delegated" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                  {isEn ? 'The PIN that cannot be delegated' : 'PIN-kood, mida ei saa delegeerida'}
                </Link>
                {isEn ? ' — why a credential that outlives its context is an authorisation failure, not a key-management one.' : ' — miks mandaat, mis elab üle oma konteksti, on autoriseerimisviga, mitte võtmehalduse viga.'}
              </li>
              <li>
                <Link to="/disclosures/what-client-side-trust-is-actually-worth" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                  {isEn ? 'What client-side trust is actually worth' : 'Mida kliendipoolne usaldus tegelikult väärt on'}
                </Link>
                {isEn ? ' — the same signature-check-is-not-authorisation problem, one layer down.' : ' — sama allkirjakontrolli ja autoriseerimise segiajamise probleem ühe kihi võrra allpool.'}
              </li>
              <li>
                <Link to="/disclosures/i-used-to-break-authentication" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                  {isEn ? 'I used to break authentication' : 'Ma murdsin varem autentimist'}
                </Link>
                {isEn ? ' — the offensive perspective on why perimeter enforcement fails after the first valid credential.' : ' — ründaja vaade sellele, miks perimeetri jõustamine esimese kehtiva mandaadi järel laguneb.'}
              </li>
            </ul>
          </section>

          <section className="mt-16 max-w-3xl">
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground">
              {isEn ? 'Note on the source' : 'Märkus allika kohta'}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                {isEn
                  ? 'Archetype B is an analytical composite from the author\'s own framework. It is not a real organisation, not a disclosed breach, and no company, product, vulnerability or financial figure named or implied here should be read as a factual incident report. The timings are the model\'s, chosen to make the causal chain legible.'
                  : 'Arhetüüp B on autori enda raamistiku analüütiline üldistus. See ei ole tegelik organisatsioon ega avalikustatud turvaintsident ning ükski siin nimetatud või vihjatud ettevõte, toode, haavatavus või rahaline näitaja ei ole faktiline intsidendiaruanne. Ajamärgid pärinevad mudelist ja on valitud selleks, et põhjuslik ahel oleks loetav.'}
              </p>
              <p>
                <strong className="text-foreground">{isEn ? 'Author.' : 'Autor.'}</strong>{' '}
                {isEn
                  ? 'Tom Kristian Abel, ProksiAbel OÜ. Corrections: research@proksiabel.ee.'
                  : 'Tom Kristian Abel, ProksiAbel OÜ. Parandused: research@proksiabel.ee.'}
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}

export default Fortune500IllusionResearchPage;
