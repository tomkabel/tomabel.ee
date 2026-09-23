import { Link } from 'react-router-dom';
import { ArticleHeader } from '../components/site/article';
import { useTranslation } from '../i18n/LanguageContext';
import ReaderRail from '../components/site/reader-rail';
import { sectionSlug } from '../components/site/section-slug';

type Bi = { en: string; et: string };

type EssaySection = {
  heading: Bi;
  paragraphs: Bi[];
};

const title: Bi = {
  en: 'How client-side anti-fraud actually works, and why VLMs break it',
  et: 'Kuidas kliendipoolne pettusetõrje tegelikult töötab ja miks visuaal-keelemudelid selle murravad',
};

const standfirst: Bi = {
  en: 'Fifteen years of bot detection rests on one premise: an automated client has to fake something a real browser produces naturally. A vision-language model driving a stock browser fakes nothing. This is a plain-language walkthrough of my systematization of the field — the five defensive paradigms, which of them survive that shift, and why the interesting question is no longer detection but who controls the root of trust.',
  et: 'Viisteist aastat botituvastust tugineb ühel eeldusel: automaatne klient peab võltsima midagi, mida päris brauser toodab loomulikult. Visuaal-keelemudel, mis juhib muutmata brauserit, ei võltsi midagi. See on lihtsas keeles ülevaade minu valdkonna süstemaatilisest ülevaatest — viis kaitseparadigmat, millised neist selle nihke üle elavad ja miks huvitav küsimus ei ole enam tuvastamine, vaid see, kes kontrollib usalduse juurt.',
};

const openingParagraphs: Bi[] = [
  {
    en: 'I spent the last stretch of my research writing a systematization-of-knowledge paper on client-side anti-automation: what the industry built between roughly 2010 and 2024, why it worked, and what happens to it when the adversary is an AI agent that looks at the page and operates it. This page is the readable version of that argument. The full manuscript, with the citations and the tables, is on GitHub.',
    et: 'Veetsin oma uurimistöö viimase etapi kliendipoolse automaatikatõrje süstemaatilise ülevaate kirjutamisel: mida tööstus ehitas umbes aastatel 2010–2024, miks see toimis ja mis sellest saab, kui vastane on tehisintellekti agent, kes vaatab lehte ja kasutab seda. See lehekülg on sama argumendi loetav versioon. Täielik käsikiri koos viidete ja tabelitega on GitHubis.',
  },
];

const sections: EssaySection[] = [
  {
    heading: {
      en: 'What the check is actually trying to prove',
      et: 'Mida kontroll tegelikult tõestada püüab',
    },
    paragraphs: [
      {
        en: 'Every client-side anti-fraud system makes the same advertised claim: a human is present at the other end of this session. None of them verify that. They verify that the environment producing the request looks like one a human would be sitting in front of — a browser whose properties are internally consistent, whose timers behave like real hardware, whose mouse moves the way arms and wrists move.',
        et: 'Iga kliendipoolne pettusetõrjesüsteem esitab sama väite: selle seansi teises otsas on inimene. Ükski neist seda ei kontrolli. Nad kontrollivad, et päringut tootev keskkond näeb välja selline, mille ees inimene istuks — brauser, mille omadused on omavahel kooskõlas, mille taimerid käituvad nagu päris riistvara ja mille hiir liigub nii, nagu liiguvad käed ja randmed.',
      },
      {
        en: 'That gap is the whole story. The defence is not measuring humanity, it is measuring the cost of forgery. A bot is caught not because it is a bot but because faking a coherent environment is expensive, and cheap fakes are incoherent. Every paradigm below is a different way of raising that price.',
        et: 'Kogu lugu peitub selles lõhes. Kaitse ei mõõda inimlikkust, vaid võltsimise hinda. Bott jääb vahele mitte seetõttu, et ta on bott, vaid seetõttu, et sidusa keskkonna võltsimine on kallis ja odavad võltsingud on ebajärjekindlad. Iga allolev paradigma on erinev viis seda hinda tõsta.',
      },
    ],
  },
  {
    heading: {
      en: 'Five paradigms, briefly',
      et: 'Viis paradigmat lühidalt',
    },
    paragraphs: [
      {
        en: 'Point-in-time VM attestation runs a small custom virtual machine inside the browser. It executes obfuscated bytecode that probes the environment, traps debuggers, checks timers, and emits a bearer token. Google BotGuard is the canonical example, and I have published a separate opcode-level teardown of it.',
        et: 'Hetkeline virtuaalmasina-atesteerimine käivitab brauseris väikese omatehtud virtuaalmasina. See täidab hägustatud baitkoodi, mis uurib keskkonda, püüab silureid, kontrollib taimereid ja väljastab loa, mida server usub. Google BotGuard on kanooniline näide ja olen sellest avaldanud eraldi opkoodi tasemel lahtivõtmise.',
      },
      {
        en: 'Stateful behavioural telemetry does the opposite: instead of one deep probe it accumulates a shallow profile over weeks. Cookies, storage, navigation cadence, dwell time. Its real weapon is latency. You cannot buy a three-month-old browsing history; you have to wait for one.',
        et: 'Olekupõhine käitumistelemeetria teeb vastupidist: ühe sügava sondeerimise asemel kogub see nädalate jooksul pinnapealset profiili. Küpsised, salvestusruum, navigeerimise rütm, lehel viibimise aeg. Selle tegelik relv on ooteaeg. Kolme kuu vanust sirvimisajalugu ei saa osta, seda tuleb oodata.',
      },
      {
        en: 'Behavioural biometrics and sensor telemetry model the body: mouse velocity and acceleration curves, scroll physics, click timing, touch pressure, accelerometer noise. The cost floor here has historically been human labour — solving farms at roughly a dollar per thousand challenges.',
        et: 'Käitumisbiomeetria ja andurite telemeetria modelleerivad keha: hiire kiiruse- ja kiirenduskõverad, kerimise füüsika, klikkide ajastus, puudutuse surve, kiirendusmõõdiku müra. Kulupõrand on siin ajalooliselt olnud inimtööjõud — lahendusteenused umbes dollari eest tuhande ülesande kohta.',
      },
      {
        en: 'Platform-level anonymous attestation replaces inference with cryptography: Apple Private Access Tokens and Privacy Pass issue blind-signed tokens backed by a Secure Enclave or TPM, rate-limited per device. Hardware-anchored determinism — DBSC, FIDO2, passkeys — extends that from a one-off token to a session bound to a key the device cannot export.',
        et: 'Platvormitasandi anonüümne atesteerimine asendab järeldamise krüptograafiaga. Apple Private Access Tokens ja Privacy Pass väljastavad pimesignatuuriga märke, mille taga on Secure Enclave või TPM ja mille väljastamine on seadme kohta piiratud. Riistvaraga ankurdatud determinism — DBSC, FIDO2 ja pääsuvõtmed — laiendab sama mõtet ühekordselt märgilt seansile või mandaadile, mis on seotud võtmega, mida seade ei saa välja anda.',
      },
    ],
  },
  {
    heading: {
      en: 'The old arms race was about forgery',
      et: 'Vana võidurelvastumine käis võltsimise ümber',
    },
    paragraphs: [
      {
        en: 'For a decade the contest had a clean shape. The defender shipped an obfuscated VM and rotated the compile often. The attacker ran it through symbolic execution and deobfuscation tooling to recover the logic, then forged the answers. The race condition was whether reverse-engineering time stayed below the lifetime of a build.',
        et: 'Kümme aastat oli võistlusel selge kuju. Kaitsja saatis välja hägustatud virtuaalmasina ja vahetas kompilatsiooni sageli. Ründaja lasi selle läbi sümboolse täitmise ja hägustuse eemaldamise tööriistade, et loogika taastada, ning võltsis seejärel vastused. Võidujooksu tingimus oli lihtsalt see, kas pöördprojekteerimise aeg püsis ehituse elueast lühem.',
      },
      {
        en: 'That framing assumes the attacker inspects the defence. Every obfuscation budget in the industry was spent on that assumption. It no longer holds.',
        et: 'See raamistik eeldab, et ründaja uurib kaitset. Sellele eeldusele kulutati tööstuses iga hägustuse eelarve. See enam ei kehti.',
      },
    ],
  },
  {
    heading: {
      en: 'Operator synthesis',
      et: 'Operaatori süntees',
    },
    paragraphs: [
      {
        en: 'I call the new vector operator synthesis. A vision-language model screenshots a real, unmodified browser, decides where to click, and an orchestration layer turns that coordinate into an OS-level mouse event. Nothing is patched. The navigator object is real. The WebGL renderer is real. The timers are real, because they are.',
        et: 'Nimetan uut ründevektorit operaatori sünteesiks. Visuaal-keelemudel teeb päris muutmata brauserist ekraanipildi, otsustab, kuhu klõpsata, ja orkestreerimiskiht muudab selle koordinaadi operatsioonisüsteemi tasandi hiiresündmuseks. Brauseris ei paranda keegi midagi. Objekt navigator on ehtne. WebGL-i renderdaja on ehtne. Taimerid on ehtsad, sest nad ongi.',
      },
      {
        en: 'This does not solve the forgery problem, it walks around it. The VM still runs and still checks everything, and every check passes honestly. Reverse-engineering time at the bytecode level goes to roughly zero — not because the obfuscation broke, but because nobody looked at it.',
        et: 'See ei lahenda võltsimisprobleemi. See läheb sellest mööda. Virtuaalmasin töötab endiselt, kontrollib endiselt kõike, mida varem, ja iga kontroll läbitakse ausalt. Pöördprojekteerimise aeg baitkoodi tasandil langeb ligikaudu nulli — mitte sellepärast, et hägustus murti, vaid sellepärast, et keegi ei vaadanudki seda.',
      },
      {
        en: 'Two honest caveats. The model outputs a coordinate, not a trajectory: something else moves the cursor, and naive interpolation still looks like a machine. And industrial scale means containers, which leak — missing system fonts, a WebGL stack that does not match the declared operating system, odd TCP/IP fingerprints. The cognitive half of the problem is solved. The deployment half is not.',
        et: 'Kaks ausat märkust. Mudel väljastab koordinaadi, mitte trajektoori: kursorit liigutab miski muu ja naiivne interpolatsioon näeb endiselt välja nagu masin. Ja tööstuslik maht tähendab konteinereid, mis lekivad — puuduvad süsteemifondid, WebGL-i virn, mis ei sobi kokku deklareeritud operatsioonisüsteemiga, veidrad TCP/IP sõrmejäljed. Ülesande tunnetuslik pool on lahendatud. Juurutamise pool ei ole.',
      },
    ],
  },
  {
    heading: {
      en: 'What survives, paradigm by paradigm',
      et: 'Mis jääb püsima, paradigma kaupa',
    },
    paragraphs: [
      {
        en: 'VM attestation degrades but does not vanish. The environmental probe still catches container artefacts, and the timing layer gets a new target: a human finishes a challenge in two to five seconds, a model needs five to fifteen per inference cycle. Microsecond instrumentation detection closes; second-scale latency profiling opens.',
        et: 'Virtuaalmasina-atesteerimine nõrgeneb, kuid ei kao. Keskkonna sondeerimine tabab endiselt konteineri jälgi ja ajastuskiht saab uue sihtmärgi: inimene lõpetab ülesande kahe kuni viie sekundiga, mudel vajab järeldustsükli kohta viis kuni viisteist. Mikrosekundiline instrumenteerimise tuvastus sulgub, sekundiskaalas viivituse profileerimine avaneb.',
      },
      {
        en: 'Stateful telemetry loses its best property outright. The model inherits a real browser profile, so profile ageing — the one cost that could not be paid for, only waited out — stops being a barrier. What replaces it is operational: isolating thousands of cookie jars without cross-contamination is real infrastructure work. But infrastructure can be bought, and latency cannot.',
        et: 'Olekupõhine telemeetria kaotab oma parima omaduse täielikult. Mudel pärib päris brauseriprofiili, nii et profiili vanandamine — ainus kulu, mida ei saanud maksta, vaid pidi välja ootama — lakkab olemast takistus. Selle asemele tuleb operatiivne kulu: tuhandete küpsisehoidlate isoleerimine ilma ristsaastumiseta on tõeline taristutöö. Kuid taristut saab osta, ooteaega mitte.',
      },
      {
        en: 'Behavioural biometrics degrade partially rather than fully. Target selection is genuinely solved by the model; kinematics are not, because the model never produces them. Against a sloppy orchestration layer biometrics still work; against a careful one they do not. Narrower than the pre-VLM literature assumed, but not zero.',
        et: 'Käitumisbiomeetria nõrgeneb osaliselt, mitte täielikult. Sihtmärgi valiku lahendab mudel tõepoolest ära. Kinemaatikat mitte, sest mudel seda kunagi ei tooda. Lohaka orkestreerimiskihi vastu biomeetria endiselt toimib. Hoolika vastu mitte. See on kitsam pind, kui varasem kirjandus eeldas, kuid see ei ole olematu.',
      },
      {
        en: 'Hardware-anchored attestation and session binding survive structurally, because the cryptography does not care who moves the mouse. Their ceiling is elsewhere: device compromise, and increasingly the SDK-based residential proxy market, where users consent to apps that route traffic through their own devices. A valid attestation from a consented device an attacker is renting leaves the defender nothing at the attestation layer, and he falls back to server-side signals — ASN reputation, IP-to-account cardinality, velocity. Those unglamorous controls are the complement, not the legacy.',
        et: 'Riistvaraga ankurdatud atesteerimine ja seansi sidumine riistvaraga jäävad struktuurselt püsima, sest krüptograafiat ei huvita, kes hiirt liigutab. Nende lagi on mujal: seadme ülevõtmine ja üha enam SDK-põhine kodukasutajate prokside turg, kus kasutajad nõustuvad rakendustega, mis suunavad liiklust läbi nende endi seadmete. Kehtiv atesteerimistõend nõusoleku andnud seadmest, mida ründaja rendib, ei jäta kaitsjale atesteerimiskihis midagi ja ta taandub serveripoolsetele signaalidele — ASN-i maine, IP ja konto suhtarv, kiirus. Need tagasihoidlikud meetmed on täiendus, mitte pärand.',
      },
    ],
  },
  {
    heading: {
      en: 'What sets the attacker floor now',
      et: 'Mis määrab nüüd ründaja põranda',
    },
    paragraphs: [
      {
        en: 'Three costs, roughly. Inference: on Q1 2026 frontier pricing one screen capture plus one action selection costs a quarter of a cent to a cent, so a ten-interaction flow runs two to ten cents per token obtained, and failure rates multiply that — a sixty per cent success rate is a 1.67x multiplier, forty per cent is 2.5x. Proxies: session continuity pushes the attacker off the commodity tier onto less elastic premium supply. State orchestration: containers, isolated profiles, rotation infrastructure.',
        et: 'Ligikaudu kolm kulu. Järeldamine: 2026. aasta esimese kvartali tipptasemel hindadega maksab üks ekraanipilt koos ühe tegevusvalikuga umbes veerand senti kuni sent, nii et kümne suhtlusega voog maksab saadud märgi kohta kaks kuni kümme senti. Ebaõnnestumise määr korrutab seda — kuuekümneprotsendiline õnnestumismäär tähendab kordajat 1,67, neljakümneprotsendiline kordajat 2,5. Proksid: seansi järjepidevus surub ründaja ühe kuni kuue dollari suuruselt gigabaidihinnaga tavatasemelt vähem elastsele kallimale pakkumisele. Oleku orkestreerimine: konteinerid, isoleeritud profiilid, rotatsioonitaristu, mis asendab tuvastusvastase brauseri litsentsi.',
      },
      {
        en: 'The important asymmetry is direction. Proxy prices and human labour rates are roughly floor-stable. Inference prices fall, historically by a factor of two to five per model generation. A defence priced against today\'s inference cost is priced against a number that only moves one way.',
        et: 'Oluline asümmeetria on suund. Proksihinnad ja inimtööjõu määrad on üsna paigal. Järeldamise hinnad langevad, ajalooliselt kaks kuni viis korda mudelipõlvkonna kohta. Kaitse, mille hind on seatud tänase järeldamiskulu vastu, on seatud numbri vastu, mis liigub ainult ühes suunas.',
      },
      {
        en: 'Be precise about the status of these numbers. This is an accounting exercise, not an economic model: it tallies costs, it does not derive equilibria or predict behaviour. There are no published measurements of agent-driven attack throughput at scale, no reliable data on proxy supply elasticity under this demand, no longitudinal study of inference deflation. The paper is analytical, and that gap is the first item on its own research agenda.',
        et: 'Nende arvude staatuse osas tuleb olla täpne. Tegemist on kuluarvestusega, mitte majandusmudeliga: see loeb kulud kokku, kuid ei tuleta tasakaalupunkte ega ennusta käitumist. Puuduvad avaldatud mõõtmised agendipõhise ründe läbilaskevõimest suures mahus, usaldusväärsed andmed proksipakkumise elastsuse kohta sellise nõudluse juures ning pikaajaline uuring järeldamise hinnalangusest. Töö on analüütiline ja see lünk on tema enda uurimiskava esimene punkt.',
      },
    ],
  },
  {
    heading: {
      en: 'The centralization problem',
      et: 'Tsentraliseerimise probleem',
    },
    paragraphs: [
      {
        en: 'Follow the argument to its end and it points somewhere uncomfortable. If probabilistic detection degrades against the top of the capability distribution, the defences that remain are hardware-anchored, and those require a platform-level root of trust. Today that is Apple, Google and Microsoft. Three companies decide which clients count as legitimate, at what rate, and for which origins — and each runs an advertising business whose incentives need not match the site consuming the attestation.',
        et: 'Kui argumenti lõpuni järgida, viib see ebamugavasse kohta. Kui tõenäosuslik tuvastus nõrgeneb võimekuse jaotuse tipu vastu, jäävad alles riistvaraga ankurdatud kaitsed ja need nõuavad platvormitasandi usaldusjuurt. Täna on selleks Apple, Google ja Microsoft. Kolm ettevõtet otsustavad, millised kliendid loetakse seaduslikeks, millise määraga ja milliste saitide jaoks — ja igaüks neist peab reklaamiäri, mille huvid ei pruugi kattuda atesteerimistõendit tarbiva saidi huvidega.',
      },
      {
        en: 'The 2026 PACT proposal tries a different anchor: instead of device hardware, an issuer vouches for a user based on account standing, a subscription, or a first-party relationship. That widens the issuer set. It does not remove the Sybil problem, it relocates it — scarcity becomes a credentialed account, and bulk registration, credential stuffing and cheap subscriptions are automatable upstream of the protocol. As announced, PACT has no issuer accreditation model, no public issuer directory, no revocation lists and no audit requirement. PACT builds on established cryptographic foundations, but its protocol design and governance are still under development.',
        et: '2026. aasta PACT-i ettepanek on tööstuse katse proovida teistsugust ankrut: seadme riistvara asemel käendab väljastaja kasutajat konto seisundi, tellimuse või esmapoolse suhte alusel. See laiendab väljastajate ringi. See ei kõrvalda Sybili probleemi, vaid tõstab selle ümber — nappuse ühikuks saab mandaadiga konto ning masskonto loomine, mandaadi toppimine ja odavad tellimused on kõik protokollist ülalpool automatiseeritavad. Sellisena, nagu PACT välja kuulutati, puudub sellel väljastajate akrediteerimise mudel, avalik väljastajate register, tühistusnimekirjad ja auditinõue. PACT tugineb väljakujunenud krüptograafilistele alustele, kuid selle protokolli ülesehitus ja juhtimismudel on alles väljatöötamisel.',
      },
      {
        en: 'There is a ratchet in this that nobody has to decide on. Tokens start as optional friction reducers. Tokened traffic passes cleanly, untokened traffic is challenged harder, thresholds recalibrate, and a class of legitimate traffic with no issuer relationship — measurement systems, archival crawlers, RSS readers, Tor users, alternative browsers — becomes structurally suspect. No single actor made tokens mandatory. They became mandatory anyway.',
        et: 'Selles on ühesuunaline mehhanism, mille kohta ei pea keegi otsust tegema. Märgid algavad valikulise hõõrdumise vähendajana. Märgiga liiklus pääseb puhtalt läbi, märgita liiklust kontrollitakse rangemalt, lävendid kalibreeritakse ümber ja struktuurselt kahtlaseks muutub terve klass seaduslikku liiklust, millel puudub suhe väljastajaga — mõõtmissüsteemid, arhiiviroomajad, RSS-lugejad, Tori kasutajad, alternatiivsed brauserid. Ükski üksik osaleja ei muutnud märke kohustuslikuks. Need muutusid kohustuslikuks niikuinii.',
      },
      {
        en: 'That is why I consider this the defining open question rather than detection. The anonymous authentication gap has been technically narrowed. What replaced it is a centralization gap, and it is a governance problem wearing a cryptography costume.',
        et: 'Seetõttu pean seda määravaks lahtiseks küsimuseks, mitte tuvastamist. Anonüümse autentimise lõhe on tehniliselt ahenenud. Selle asemele tuli tsentraliseerimise lõhe ja see on juhtimisprobleem krüptograafia kostüümis.',
      },
    ],
  },
];

function VlmAntiFraudResearchPage() {
  const { language } = useTranslation();
  const isEn = language === 'en';

  return (
    <article>
      <ArticleHeader
        backTo="/disclosures"
        back={<>← {isEn ? 'Back to disclosures' : 'Tagasi avalikustatute juurde'}</>}
        kicker={isEn ? 'Threat Model · Anti-Automation · SoK' : 'Ohumudel · Automaatikatõrje · SoK'}
        title={title[language]}
        standfirst={standfirst[language]}
        meta={[<>
              {isEn ? 'Published · September 22, 2026' : 'Avaldatud · 22. september 2026'}
            </>, <>
              {isEn ? '8 min read' : '8 min lugemist'}
            </>, <>Tom Kristian Abel</>]}
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-24">
            <ReaderRail
              sections={sections.map((s) => ({ id: sectionSlug(s.heading.en), heading: s.heading[language] }))}
              backHref="/disclosures"
              backLabel={isEn ? 'All disclosures' : 'Kõik avalikustatud'}
            />
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="max-w-measure space-y-6 text-lg leading-relaxed text-muted">
            {openingParagraphs.map((paragraph) => (
              <p key={paragraph.en}>{paragraph[language]}</p>
            ))}
          </div>

          {sections.map((section, i) => (
            <section
              key={section.heading.en}
              id={sectionSlug(section.heading.en)}
              className="mt-16 max-w-measure scroll-mt-24"
            >
              <p className="mb-4 label font-medium text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="font-display text-3xl leading-tight text-foreground">
                {section.heading[language]}
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.en}>{paragraph[language]}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-16 max-w-measure">
            <h2 className="font-display text-3xl leading-tight text-foreground">
              {isEn ? 'Related reading' : 'Seotud lugemist'}
            </h2>
            <ul className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <li>
                <Link to="/disclosures/botguard-disassembled" className="-my-2.5 inline-block py-2.5 text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                  {isEn ? 'BotGuard disassembled' : 'BotGuard lahti võetud'}
                </Link>
                {' — '}
                {isEn
                  ? 'the opcode-level teardown of the mechanism this article describes from the outside.'
                  : 'opkoodi tasemel lahtivõtmine mehhanismist, mida see artikkel kirjeldab väljastpoolt.'}
              </li>
              <li>
                <Link to="/disclosures/what-client-side-trust-is-actually-worth" className="-my-2.5 inline-block py-2.5 text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                  {isEn ? 'What client-side trust is actually worth' : 'Mida kliendipoolne usaldus tegelikult väärt on'}
                </Link>
                {' — '}
                {isEn
                  ? 'the structural argument that any check running on a machine you do not control is negotiable.'
                  : 'struktuurne argument, et iga kontroll, mis töötab masinas, mida sa ei kontrolli, on läbiräägitav.'}
              </li>
              <li>
                <Link to="/disclosures/zero-trust-octagon" className="-my-2.5 inline-block py-2.5 text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                  {isEn ? 'The Zero-Trust Octagon' : 'Zero-Trust Octagon'}
                </Link>
                {' — '}
                {isEn ? 'the wider framework these disclosures sit inside.' : 'laiem raamistik, mille sees need avalikustused asuvad.'}
              </li>
              <li>
                <a href="https://github.com/tomkabel/google-botguard-security-research" className="-my-2.5 inline-block py-2.5 text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                  google-botguard-security-research
                </a>
                {' — '}
                {isEn
                  ? 'the full SoK manuscript, with the citations, tables and cost equations summarized here.'
                  : 'täielik SoK käsikiri koos viidete, tabelite ja kuluvalemitega, mida siin kokku võetakse.'}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}

export default VlmAntiFraudResearchPage;
