import { Link } from 'react-router-dom';
import { ArticleHeader } from '../components/site/article';
import { useTranslation } from '../i18n/LanguageContext';
import ReaderRail from '../components/site/reader-rail';
import { sectionSlug } from '../components/site/section-slug';

type Bi = { en: string; et: string };

type Source = { label: Bi; url: string; note?: Bi };

type EssaySection = {
  heading: Bi;
  paragraphs: Bi[];
};

const title: Bi = {
  en: 'Move Fast, Fix It In Prod: A Full Breach Trace of the Startup Archetype',
  et: 'Liigu kiiresti, paranda toodangus: idufirma arhetüübi täielik rünnaku jälg',
};

const standfirst: Bi = {
  en: 'A composite analytical archetype from the Zero Trust Octagon framework, traced end to end: a malicious dependency enters through a pull request, robs the pipeline of its secrets on the way through, passes the only verification gate the architecture has, and arrives in production holding a cryptographically valid identity. The detection was fast. The prevention did not exist.',
  et: 'Zero Trust Octagoni raamistiku koondanalüütiline arhetüüp, jälgitud algusest lõpuni: pahatahtlik sõltuvus siseneb pull requesti kaudu, röövib teel konveieri saladused, läbib ainsa kontrollpunkti, mis arhitektuuril on, ja jõuab toodangusse krüptograafiliselt kehtiva identiteediga. Avastamine oli kiire. Ennetust ei olnud olemas.',
};

const openingParagraphs: Bi[] = [
  {
    en: 'Archetype C is a composite. It is not a company, and the breach traced below did not happen to any named organisation. It is one of the deployment archetypes in the Zero Trust Octagon framework: a profile assembled from nine architectural dimensions, run against a plausible attack and followed step by step.',
    et: 'Arhetüüp C on üldistatud mudel. See ei ole ettevõte ja allpool jälgitud rünnak ei juhtunud ühegi nimetatud organisatsiooniga. See on üks Zero Trust Octagoni raamistiku arhetüüpe: üheksast arhitektuurilisest mõõtmest kokku pandud profiil, mille vastu lastakse usutav rünnak ja mida jälgitakse samm-sammult.',
  },
];

const sections: EssaySection[] = [
  {
    heading: { en: 'What Archetype C actually is', et: 'Mis arhetüüp C tegelikult on' },
    paragraphs: [
      {
        en: 'Archetype C is the Series B or Series C technology company. Fifty deploys a day is unremarkable. Infrastructure is declarative and lives in version control; a GitOps controller reconciles the cluster to whatever the repository says. Identity comes from a software certificate authority, credentials are short-lived tokens, and there is no security operations centre: you build it, you run it, you secure it.',
        et: 'Arhetüüp C on B- või C-ringi tehnoloogiaettevõte. Viiskümmend juurutust päevas ei ole midagi erilist. Taristu on deklaratiivne ja elab versioonihalduses; GitOps-kontroller viib klastri vastavusse sellega, mida hoidla ütleb. Identiteet tuleb tarkvaralisest sertifitseerimiskeskusest, mandaadid on lühiajalised märgised ja turvaoperatsioonide keskust ei ole: sa ehitad selle, sa käitad seda, sa turvad seda.',
      },
      {
        en: 'It does real things better than the enterprise it gets compared against. The team is fused rather than layered, so there is no handoff between the person who notices something and the person who can fix it. Remediation is a commit — in the trace below, about three minutes from recognition to full rollback, with nobody logging into a firewall or killing pods by hand.',
        et: 'See teeb mõnda asja päriselt paremini kui suurettevõte, millega teda võrreldakse. Meeskond on kokku sulanud, mitte kihiline, nii et märkaja ja parandaja vahel ei ole üleandmist. Tõrke kõrvaldamine on üks commit — allpool jälgitud käigus umbes kolm minutit äratundmisest täieliku tagasipööramiseni, ilma et keegi logiks tulemüüri sisse või tapaks poode käsitsi.',
      },
      {
        en: 'The cost is stated plainly in the architecture. Trust is established once, on first use: code that passes CI/CD is trusted at runtime indefinitely. Dashboards are treated as ground truth. Availability wins every tie. None of these choices is stupid; each is correct for the failure mode the team was worried about, which was downtime.',
        et: 'Hind on arhitektuuris otse välja öeldud. Usaldus luuakse ühe korra, esmakasutusel: koodi, mis läbib CI/CD, usaldatakse käitusajal tähtajatult. Seirepaneele käsitletakse tõe allikana. Kättesaadavus võidab iga vaidluse. Ükski neist valikutest ei ole rumal. Iga valik on õige selle ohu jaoks, mille pärast meeskond muretses, ja see oli seisak.',
      },
      {
        en: 'Scored against the Octagon\'s eight axioms (pass, partial or fail), Archetype C passes one: verifiable policy (Axiom 2), because GitOps makes every policy change replayable from Git history. It fails five outright: no intrinsic trust (1), continuous verification (4), bounded authority (5), Byzantine fault tolerance (6) and epistemic integrity (7). It meets two only partially: mediation (3), because the gateway mediates but nothing does pod to pod, and bilateral symmetry (8), because cluster-CA TLS is the minimum form. That is the same score as the overview\'s violation matrix.',
        et: 'Octagoni kaheksa aksioomi järgi (täidetud, osaliselt täidetud või rikutud) täidab arhetüüp C ühe: kontrollitava poliitika (2. aksioom), sest GitOps teeb iga poliitikamuudatuse Giti ajaloost korratavaks. Viit rikub täielikult: sisemise usalduse puudumist (1), pidevat kontrolli (4), piiratud volitust (5), Bütsantsi tõrketaluvust (6) ja episteemilist terviklust (7). Kahte täidab ainult osaliselt: vahendamist (3), sest lüüs vahendab, kuid podide vahel ei vahenda miski, ja kahepoolset sümmeetriat (8), sest klastri sertifitseerimiskeskuse TLS on selle miinimumvorm. See on sama hinnang mis ülevaate rikkumiste maatriksis.',
      },
    ],
  },
  {
    heading: { en: 'Where the trust actually sits', et: 'Kus usaldus tegelikult asub' },
    paragraphs: [
      {
        en: 'List what the pipeline holds. Production secrets: database passwords, API keys, signing material. The ability to modify Terraform state, Kubernetes manifests and IAM policy. Network reachability into production. The ability to merge on a green build without human review. Compromising it is equivalent to compromising the infrastructure.',
        et: 'Loetle, mida konveier endas hoiab. Toodangu saladused: andmebaasiparoolid, API-võtmed, allkirjastamismaterjal. Võime muuta Terraformi olekut, Kubernetese manifeste ja IAM-poliitikat. Võrguligipääs toodangusse. Võime koodi rohelise ehituse peal ilma inimese ülevaatuseta liita. Selle kompromiteerimine on võrdne kogu taristu kompromiteerimisega.',
      },
      {
        en: 'Now list the scrutiny it gets. Production is monitored, alerted on and reviewed. The pipeline is internal tooling, configured once and then left alone because it works. That asymmetry is not an oversight: every control placed on the pipeline is friction on the metric the company runs on. The result is verify-once: exactly one verification gate, at build time, with nothing downstream re-checking it. Whoever gets past it is inside with the authority of whatever they replaced.',
        et: 'Nüüd loetle, kui palju tähelepanu see saab. Toodangut seiratakse, sellest teavitatakse ja see vaadatakse üle. Konveier on sisemine töövahend, mis seadistatakse ühe korra ja jäetakse siis rahule, sest see töötab. See ebasümmeetria ei ole tähelepanematus: iga konveierile pandud kontroll on hõõrdumine just selle mõõdiku peal, mille järgi ettevõte elab. Tulemus on ühekordne kontroll: täpselt üks kontrollpunkt, ehitusajal, ja miski sellest allpool ei kontrolli otsust uuesti. See, kes sellest mööda saab, on sees selle volitusega, mille ta asendas.',
      },
    ],
  },
  {
    heading: { en: 'The compromise, step by step', et: 'Kompromiteerimine samm-sammult' },
    paragraphs: [
      {
        en: 'A developer needs a small utility library and installs one whose name differs from a well-known package by a single character, a typosquat, fictional here. Plausible documentation, believable version history, a few hundred downloads. The more common 2025 route is worse: a hijacked maintainer account pushes a malicious version of a package the team already trusts, as in the Shai-Hulud npm worm. Either way the package carries two payloads. Its install hook runs at install time, on the developer\'s laptop and again on the CI runner. The library code itself does nothing under test and activates only when it sees production configuration.',
        et: 'Arendaja vajab väikest abiteeki ja paigaldab sellise, mille nimi erineb tuntud paki omast ühe tähemärgi võrra: kirjaveale lootev võltspakk, siin väljamõeldud. Usutav dokumentatsioon, usutav versiooniajalugu, paarsada allalaadimist. 2025. aasta levinum tee on veel hullem: ülevõetud hooldaja konto avaldab pahatahtliku versiooni pakist, mida meeskond juba usaldab, nagu npm-i uss Shai-Hulud. Igal juhul kannab pakk kahte koormat. Selle paigaldusskript käivitub paigaldamisel, arendaja sülearvutis ja uuesti CI-agendis. Teegi kood ise on testides tegevusetu ja aktiveerub alles siis, kui näeb toodangu seadistust.',
      },
      {
        en: 'The pull request opens and CI installs dependencies. The install hook reads the runner\'s environment and sends out what the pipeline holds: the registry publishing token and the cloud deploy key. Nothing alarms, because the build is green. This is the step real attacks made the main event in 2025: the compromise of tj-actions/changed-files, an action used by more than 23,000 repositories, dumped CI secrets into workflow logs, and Shai-Hulud used an install hook to steal tokens and republish itself. The test suite passes because the library code is inert under test, and the merge lands. The GitOps controller deploys the new containers with no attestation at admission: the only verification that ever happened is that CI built it, and CI was not what was subverted. The provenance record is accurate and useless.',
        et: 'Pull request avatakse ja CI paigaldab sõltuvused. Paigaldusskript loeb agendi keskkonda ja saadab välja selle, mida konveier hoiab: registrisse avaldamise märgise ja pilve juurutusvõtme. Midagi ei häiri, sest ehitus on roheline. Just selle sammu tegid tegelikud rünnakud 2025. aastal peamiseks: enam kui 23 000 hoidlas kasutatud tj-actions/changed-files kompromiteerimine paiskas CI saladused töövoo logidesse ja Shai-Hulud kasutas paigaldusskripti märgiste varastamiseks ja enda uuesti avaldamiseks. Testikomplekt läbitakse, sest teegi kood on testides tegevusetu, ja liitmine läheb läbi. GitOps-kontroller juurutab uued konteinerid ilma vastuvõtul päritolu kontrollimata: ainus kontroll, mis üldse toimus, on see, et CI need ehitas, ja CI ei olnud see, mida õõnestati. Päritolukirje on täpne ja kasutu.',
      },
      {
        en: 'The pod boots and requests an identity. The API server issues a valid bound ServiceAccount token, nominally one hour (and often extended for legacy compatibility). There is no workload attestation and no code-hash check, so nothing in the issuing path can tell this pod from the legitimate one. It claims to be the billing service and gets exactly the billing service permissions, because authority was scoped to the service, not to the code.',
        et: 'Pod käivitub ja küsib identiteeti. API-server väljastab kehtiva seotud ServiceAccounti märgise, nimiväärtusena üheks tunniks (vanema tarkvara ühilduvuse huvides sageli pikendatult). Töökoormuse atesteerimist ega koodi räsi kontrolli ei toimu, nii et miski väljastusteel ei erista seda podi õigest. Ta väidab end olevat arveldusteenus ja saab täpselt arveldusteenuse õigused, sest volitus oli seotud teenuse, mitte koodiga.',
      },
      {
        en: 'The code activates and scrapes the internal user database over thousands of API calls. The gateway checks the token on each one: valid, unexpired, passed. Past the gateway there is no pod-to-pod mediation, so the same identity is good for lateral movement. Nothing here is a bypass.',
        et: 'Kood aktiveerub ja kraabib sisemist kasutajate andmebaasi tuhandete API-päringutega. Lüüs kontrollib igal päringul märgist: kehtiv, aegumata, läbi lastud. Lüüsist edasi podide vahel vahendamist ei ole, nii et sama identiteet kõlbab ka külgsuunas liikumiseks. Miski siin ei ole möödahiilimine.',
      },
    ],
  },
  {
    heading: { en: 'Why the automation enlarges the blast radius', et: 'Miks automatiseerimine suurendab mõjuraadiust' },
    paragraphs: [
      {
        en: 'The mechanism is not that speed makes people careless. It is that commit-to-production is a single automated channel with no second evaluation point, and the channel does not care what it carries. Automation amplifies risk by removing the intermediate states where a different decision could have been made.',
        et: 'Mehhanism ei ole see, et kiirus teeks inimesed hooletuks. Asi on selles, et commitist toodanguni viib üksainus automatiseeritud kanal, millel ei ole teist hindamispunkti, ja see kanal ei hooli sellest, mida ta kannab. Automatiseerimine võimendab riski sellega, et ta eemaldab vahepealsed olekud, kus oleks saanud teha teistsuguse otsuse.',
      },
      {
        en: 'The properties form a loop. Velocity forbids friction at the build gate, which forces verify-once, which is what makes supply-chain injection viable. Fused teams and GitOps then deliver excellent detection and recovery, both of which begin after an injection they cannot prevent.',
        et: 'Omadused moodustavad ringi. Kiirus keelab ehitusväravas hõõrdumise, mis sunnib peale ühekordse kontrolli, mis teebki tarneahela süstimise võimalikuks. Kokku sulanud meeskonnad ja GitOps annavad seejärel suurepärase avastamise ja taastumise, mis mõlemad algavad pärast süstimist, mida nad ära hoida ei suuda.',
      },
      {
        en: 'The degradation policy compounds it. When the burst trips the circuit breaker, the system rate-limits rather than terminating the pod, because terminating might affect a paying customer. Exfiltration continues at reduced rate for about eight minutes. Graceful degradation is right when the threat is load. When the threat is theft, slowing the attacker is a discount, not containment.',
        et: 'Nõrgenemispoliitika süvendab seda. Kui purse vallandab kaitselüliti, piirab süsteem kiirust, selle asemel et pod lõpetada, sest lõpetamine võiks mõjutada maksvat klienti. Andmete väljavedu jätkub vähendatud kiirusel umbes kaheksa minutit. Sujuv nõrgenemine on õige siis, kui oht on koormus. Kui oht on vargus, on ründaja aeglustamine allahindlus, mitte ohjeldamine.',
      },
    ],
  },
  {
    heading: { en: 'What was logged and what nobody read', et: 'Mis logiti ja mida keegi ei lugenud' },
    paragraphs: [
      {
        en: 'Nothing was missing from the telemetry. The platform recorded the traffic spike, the breaker trip and the rate-limit plateau, and graphed all three accurately. The instrumentation was faithfully reporting what the compromised system said about itself.',
        et: 'Telemeetriast ei puudunud midagi. Platvorm salvestas liiklusepurske, kaitselüliti vallandumise ja kiiruspiirangu platoo ning joonistas kõik kolm täpselt välja. Mõõdistus kajastas ustavalt seda, mida kompromiteeritud süsteem enda kohta ise ütles.',
      },
      {
        en: 'Nobody was reading it, because the dashboards answer an availability question. They are alerted around latency, error rate and saturation, and the alert that fired was a performance signal. No alert existed for the signal that mattered: a service querying a datastore that is not in its dependency graph, visible from the first second.',
        et: 'Keegi ei lugenud seda, sest paneelid vastavad kättesaadavuse küsimusele. Nende häired on seatud latentsuse, veamäära ja küllastuse järgi ning häire, mis käivitus, oli jõudlussignaal. Selle signaali jaoks, millel oli tähtsust, häiret ei olnud: teenus pärib andmehoidlat, mida tema sõltuvusgraafis ei ole, ja see oli nähtav esimesest sekundist.',
      },
      {
        en: 'A person detected the attack. The alert pulled the on-call engineer, an SRE and the engineering manager into one channel, and within about three minutes one of them asked why the new billing pod was querying the user-profile database instead of the ledger. That is the only detection mechanism in this architecture, and it depends on the right person being awake.',
        et: 'Rünnaku avastas inimene. Häire tõmbas valvearendaja, SRE ja insenerijuhi ühte kanalisse ning umbes kolme minuti jooksul küsis üks neist, miks uus arvelduse pod pärib kasutajaprofiilide andmebaasi, mitte pearaamatut. See on arhitektuuri ainus avastusmehhanism ja see sõltub sellest, et õige inimene on ärkvel.',
      },
    ],
  },
  {
    heading: { en: 'Fixes that survive contact with a startup', et: 'Parandused, mis peavad idufirmaga kokkupuutes vastu' },
    paragraphs: [
      {
        en: 'Start from the constraint. A team at this stage will not adopt an enterprise control set, and any control that inserts a human approval gate into the deploy path will be quietly disabled within a quarter by someone under release pressure. The question is which controls buy runtime verification without buying deployment friction.',
        et: 'Alusta piirangust. Selles etapis olev meeskond ei võta kasutusele suurettevõtte kontrollide komplekti ja iga kontroll, mis lisab juurutusteele inimese kinnitusnõude, lülitab väljalaskesurve all olev inimene kvartali jooksul vaikselt välja. Küsimus on selles, millised kontrollid ostavad käitusaegse kontrolli, ostmata juurde juurutushõõrdumist.',
      },
      {
        en: 'The missing gate has to sit on the dependency itself, and that part is cheap. Image signing stops images that never came through CI; it does not stop a malicious dependency CI built in, so on its own it would have passed this attack. What the dependency gate needs: a committed lockfile installed with npm ci, install scripts off by default (pnpm 10 does this, with an allowlist for packages that need them), a minimum release age before new versions are installable, and provenance or trusted-publisher checks where the registry offers them. In the pipeline, use GitHub Actions OIDC instead of stored cloud keys and pin third-party actions to a commit SHA, which is what the tj-actions victims lacked.',
        et: 'Puuduv värav peab asuma sõltuvusel endal ja see osa on odav. Konteineripildi allkirjastamine peatab pildid, mis ei tulnud CI kaudu; see ei peata pahatahtlikku sõltuvust, mille CI sisse ehitas, nii et üksi oleks see selle rünnaku läbi lasknud. Sõltuvuse värav vajab järgmist: hoidlasse salvestatud lukufail, mis paigaldatakse käsuga npm ci, vaikimisi välja lülitatud paigaldusskriptid (pnpm 10 teeb seda, lubatud nimekirjaga pakkidele, mis neid vajavad), uute versioonide minimaalne vanus enne nende paigaldatavaks muutumist ning päritolu või usaldatud avaldaja kontroll seal, kus register seda pakub. Konveieris kasuta salvestatud pilvevõtmete asemel GitHub Actionsi OIDC-d ja kinnita kolmandate osapoolte toimingud commit-räsiga; just see puudus tj-actionsi ohvritel.',
      },
      {
        en: 'The other fix is structural. A pipeline runner that can publish packages, change IAM policy and deploy to production on one token is a single credential that owns the company. Split that authority by purpose and expire it in minutes, so the token the install hook steals is scoped and already dead. Cryptographic workload identity for the runner is the durable version, but it establishes who the runner is, not what the runner is running.',
        et: 'Teine parandus on struktuurne. Ehitusagent, kes suudab sama märgisega pakke avaldada, IAM-poliitikat muuta ja toodangusse juurutada, on üksainus mandaat, mis omab kogu ettevõtet. Jaga see volitus otstarbe järgi ja lase sellel minutitega aeguda, nii et paigaldusskripti varastatud märgis on piiratud ja juba aegunud. Krüptograafiline töökoormuse identiteet agendi jaoks on selle püsiv versioon, kuid see tuvastab, kes agent on, mitte selle, mida agent käitab.',
      },
      {
        en: 'Then add runtime verification and containment that actually removes the bad image. Runtime anomaly detection as an eBPF DaemonSet needs no code changes and watches syscall and network behaviour independently of what the application reports. When it says a workload is outside its profile, isolate the pod with a deny-all network-policy label, scale the deployment to zero and revert the image digest in Git; deleting the pod alone just lets the ReplicaSet start the same image again. Network policy, staged first (Cilium\'s policy audit mode or Calico\'s staged policies, since upstream Kubernetes NetworkPolicy has no audit mode), removes lateral movement without a cutover that breaks production. Finally, rotate every secret the pipeline held, because the install hook already has them.',
        et: 'Seejärel lisa käitusaegne kontroll ja ohjeldamine, mis halva pildi päriselt eemaldab. eBPF-DaemonSetina käiv käitusaegne anomaaliatuvastus ei nõua koodimuudatusi ja jälgib süsteemikutsete ja võrgu käitumist sõltumatult sellest, mida rakendus ise teatab. Kui see ütleb, et töökoormus on väljaspool oma profiili, isoleeri pod kõike keelava võrgupoliitika sildiga, skaleeri juurutus nullini ja pööra pildi räsi Gitis tagasi; podi kustutamine üksi laseb ReplicaSetil sama pildi uuesti käivitada. Võrgupoliitika, esmalt etapiviisiliselt (Ciliumi poliitika auditirežiim või Calico etapiviisilised poliitikad, sest Kubernetese tavalisel NetworkPolicyl auditirežiimi pole), kaotab külgsuunas liikumise ilma üleminekuta, mis toodangu katki teeb. Lõpuks vaheta välja kõik konveieri hoitud saladused, sest paigaldusskriptil on need juba olemas.',
      },
    ],
  },
  {
    heading: { en: 'The transferable lesson', et: 'Ülekantav õppetund' },
    paragraphs: [
      {
        en: 'Count the verification gates between a developer typing a package name and that package executing with production authority. If the answer is one, and it sits at build time, the blast radius of getting past it is everything downstream: all of production, holding a valid identity, until somebody looks at the right graph.',
        et: 'Loe kokku kontrollpunktid selle vahel, kui arendaja kirjutab paki nime, ja selle vahel, kui see pakk täidetakse toodangu volitusega. Kui vastus on üks ja see asub ehitusajal, siis on sellest möödasaamise mõjuraadius kõik allpool olev: kogu toodang, kehtiva identiteediga, kuni keegi õiget graafikut vaatab.',
      },
      {
        en: 'Fast detection and recovery begin after the injection has already succeeded. The fix is not slower deployments; it is a second verification on the dependency and a third at runtime, in a trust domain the deploying pipeline does not control. If an architecture cannot say when a given trust decision is re-evaluated, that decision is the attack surface.',
        et: 'Kiire avastamine ja taastumine algavad pärast seda, kui süstimine on juba õnnestunud. Lahendus ei ole aeglasemad juurutused, vaid teine kontroll sõltuvuse juures ja kolmas käitusajal, usaldusdomeenis, mida juurutav konveier ei juhi. Kui arhitektuur ei oska öelda, millal mingit usaldusotsust uuesti hinnatakse, siis just see otsus ongi ründepind.',
      },
    ],
  },
];

const sources: Source[] = [
  {
    label: { en: 'Kubernetes documentation, Managing Service Accounts', et: 'Kubernetese dokumentatsioon, Managing Service Accounts' },
    url: 'https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/',
    note: { en: 'bound token lifetime and legacy extension', et: 'seotud märgise eluiga ja pikendamine ühilduvuse huvides' },
  },
  {
    label: { en: 'Cilium documentation, policy creation and policy audit mode', et: 'Ciliumi dokumentatsioon, poliitikate loomine ja auditirežiim' },
    url: 'https://docs.cilium.io/en/stable/security/policy-creation/',
  },
  {
    label: { en: 'InfoWorld, GitHub suffers a cascading supply chain attack compromising CI/CD secrets (March 2025)', et: 'InfoWorld, GitHubi CI/CD saladusi ohustanud ahelrünnak (märts 2025)' },
    url: 'https://www.infoworld.com/article/3849245/github-suffers-a-cascading-supply-chain-attack-compromising-ci-cd-secrets.html',
    note: { en: 'tj-actions/changed-files, CVE-2025-30066', et: 'tj-actions/changed-files, CVE-2025-30066' },
  },
  {
    label: { en: 'Check Point Research, Shai-Hulud 2.0 (November 2025)', et: 'Check Point Research, Shai-Hulud 2.0 (november 2025)' },
    url: 'https://blog.checkpoint.com/research/shai-hulud-2-0-inside-the-second-coming-the-most-aggressive-npm-supply-chain-attack-of-2025/',
  },
  {
    label: { en: 'SD Times, GitHub details npm security changes after Shai-Hulud (September 2025)', et: 'SD Times, GitHubi npm-i turvamuudatused pärast Shai-Huludi (september 2025)' },
    url: 'https://sdtimes.com/security/github-details-upcoming-changes-to-improve-security-in-wake-of-shai-hulud-worm-in-npm-ecosystem/',
  },
  {
    label: { en: 'pnpm 10.0.0 release notes', et: 'pnpm 10.0.0 väljalaskemärkmed' },
    url: 'https://newreleases.io/project/npm/pnpm/release/10.0.0',
    note: { en: 'dependency lifecycle scripts off by default', et: 'sõltuvuste elutsükliskriptid vaikimisi välja lülitatud' },
  },
  {
    label: { en: 'SLSA v1.2 announcement (November 2025)', et: 'SLSA v1.2 teadaanne (november 2025)' },
    url: 'https://slsa.dev/blog/2025/11/announce-slsa-v1.2',
  },
];

const disclosureParagraphs: Bi[] = [
  {
    en: 'Corrections, 4 October 2026: image signing is no longer presented as a second gate against this attack (CI signs the malicious image too); containment now isolates the pod and reverts the image digest instead of deleting a pod the ReplicaSet recreates; ServiceAccount tokens are issued by the API server, not a CA; "audit mode" is attributed to Cilium and Calico; the install-hook mechanism is corrected and the pipeline-secret theft step added; and the axiom score now matches the overview.',
    et: 'Parandused, 4. oktoober 2026: konteineripildi allkirjastamist ei esitata enam selle rünnaku vastu teise väravana (CI allkirjastab ka pahatahtliku pildi); ohjeldamine isoleerib nüüd podi ja pöörab pildi räsi tagasi, mitte ei kustuta podi, mille ReplicaSet uuesti loob; ServiceAccounti märgiseid väljastab API-server, mitte sertifitseerimiskeskus; „auditirežiim" omistatakse Ciliumile ja Calicole; paigaldusskripti mehhanism on parandatud ja lisatud konveieri saladuste varguse samm; ning aksioomide hinnang vastab nüüd ülevaatele.',
  },
];

export default function MoveFastFixItInProdResearchPage() {
  const { language } = useTranslation();
  const isEn = language === 'en';

  return (
    <article>
      <ArticleHeader
        backTo="/disclosures"
        back={<>← {isEn ? 'Back to research' : 'Tagasi uuringute juurde'}</>}
        kicker={isEn ? 'Breach Trace · Zero Trust Octagon · Archetype C' : 'Rünnaku jälg · Zero Trust Octagon · Arhetüüp C'}
        title={title[language]}
        standfirst={standfirst[language]}
        meta={[<>
              {isEn ? 'Published · September 22, 2026' : 'Avaldatud · 22. september 2026'}
            </>, <>
              {isEn ? 'Updated · October 4, 2026' : 'Uuendatud · 4. oktoober 2026'}
            </>, <>
              {isEn ? '11 min read' : '11 min lugemist'}
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
              {isEn ? 'Sources' : 'Allikad'}
            </h2>
            <div className="mt-6 space-y-4">
              {sources.map((source) => (
                <p key={source.url} className="text-lg leading-relaxed text-muted">
                  <a href={source.url} className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                    {source.label[language]}
                  </a>
                  {source.note ? <span className="text-muted-foreground"> — {source.note[language]}</span> : null}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-16 max-w-measure">
            <h2 className="font-display text-3xl leading-tight text-foreground">
              {isEn ? 'Further reading' : 'Edasine lugemine'}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                {isEn
                  ? 'The nine architectural dimensions and the axioms referenced throughout this trace are set out in '
                  : 'Üheksa arhitektuurilist mõõdet ja kogu selle jälituse vältel viidatud aksioomid on kirjas artiklis '}
                <Link to="/disclosures/zero-trust-octagon" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                  {isEn ? 'The Zero Trust Octagon' : 'Zero Trust Octagon'}
                </Link>
                {isEn
                  ? ', which compresses this breach into a single paragraph. The full book text is at '
                  : ', mis surub selle rünnaku kokku üheks lõiguks. Raamatu täistekst asub aadressil '}
                <a href="https://github.com/tomkabel/zero-trust-octagon" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                  github.com/tomkabel/zero-trust-octagon
                </a>
                .
              </p>
              <p>
                {isEn
                  ? 'For the same reasoning applied to a client-side trust boundary rather than a build pipeline, see '
                  : 'Sama arutluskäiku kliendipoolse usalduspiiri, mitte ehituskonveieri peal vaata artiklist '}
                <Link to="/disclosures/what-client-side-trust-is-actually-worth" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                  {isEn ? 'What Client-Side Trust Is Actually Worth' : 'Mida kliendipoolne usaldus tegelikult väärt on'}
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mt-16 max-w-measure">
            <h2 className="font-display text-3xl leading-tight text-foreground">
              {isEn ? 'Scope note' : 'Ulatuse märkus'}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                {isEn
                  ? 'Archetype C is a composite analytical model from the author\'s own framework. It is not a real named company, the breach traced here is not a real incident, and the package described is fictional. The real incidents named (tj-actions/changed-files, Shai-Hulud, and the s1ngularity and TeamPCP campaigns) are analogues; the first two are sourced below, the last two in the overview.'
                  : 'Arhetüüp C on koondanalüütiline mudel autori enda raamistikust. See ei ole päris ettevõte, siin jälgitud rünnak ei ole päris intsident ja kirjeldatud pakk on väljamõeldud. Nimetatud tegelikud intsidendid (tj-actions/changed-files, Shai-Hulud ning s1ngularity ja TeamPCP kampaaniad) on analoogid; kahe esimese allikad on allpool, kahe viimase omad ülevaates.'}
              </p>
              {disclosureParagraphs.map((paragraph) => (
                <p key={paragraph.en}>{paragraph[language]}</p>
              ))}
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
