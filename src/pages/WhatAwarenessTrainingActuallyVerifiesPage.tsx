import Link from '../components/site/link';
import { useTranslation } from '../i18n/LanguageContext';
import ReaderRail from '../components/site/reader-rail';
import { sectionSlug } from '../components/site/section-slug';
import ArticleProof from '../components/site/article-proof';
import { ArticleHeader } from '../components/site/article';

type Bi = { en: string; et: string };

type EssaySection = {
  heading: Bi;
  paragraphs: Bi[];
};

const title: Bi = { en: "What awareness training actually verifies", et: "Mida teadlikkuskoolitus tegelikult kontrollib" };

const standfirst: Bi = { en: "Cyber awareness training is bought as evidence of resilience. Under NIS2 and DORA it is the line item an auditor asks for. What a training platform can measure is who completed which task and what risk score the course assigned them. Whether an attack against that person fails is a different quantity, and two large field studies say the first does not predict the second. A worked example from an Estonian vendor whose public methodology is detailed enough to test.", et: "Küberteadlikkuse koolitust ostetakse vastupidavuse tõendina. NIS2 ja DORA alusel on see rida, mida audiitor küsib. Koolitusplatvorm suudab mõõta, kes millise ülesande lõpetas ja millise riskiskoori kursus talle andis. Kas rünne selle inimese vastu nurjub, on teine suurus, ja kaks suurt väliuuringut ütlevad, et esimene ei ennusta teist. Läbimängitud näide Eesti tarnijalt, kelle avalik metoodika on piisavalt üksikasjalik, et seda testida." };

const sections: EssaySection[] = [
  {
    heading: { en: "The claim and the measurement", et: "Väide ja mõõtmine" },
    paragraphs: [
      { en: "A security control has two descriptions. One is what it claims to verify. The other is what it actually verifies. Most of the work on this site lives in the gap between the two, usually at the protocol or opcode layer. This piece applies the same question to a control that runs on people.", et: "Turvameetmel on kaks kirjeldust. Üks on see, mida ta väidab end kontrollivat. Teine on see, mida ta tegelikult kontrollib. Suurem osa selle saidi tööst elab nende kahe vahel, enamasti protokolli või käsukoodi tasandil. See lugu esitab sama küsimuse meetmele, mis töötab inimeste peal." },
      { en: "Awareness training claims to verify that an organisation's staff will not fall for an attack. What the platform can observe is narrower: a task was opened, a task was completed, an answer was given, a risk score was computed from those answers. None of those observations is an attack failing. The distance between 'completed the module' and 'the phish bounced off' is the whole question, and in most procurement it is never measured.", et: "Teadlikkuskoolitus väidab end kontrollivat, et organisatsiooni töötajad ei lange ründe ohvriks. Platvorm näeb kitsamat pilti: ülesanne avati, ülesanne lõpetati, vastus anti, vastustest arvutati riskiskoor. Ükski neist vaatlustest ei ole nurjunud rünne. Vahemaa „mooduli lõpetas“ ja „õngitsus põrkas tagasi“ vahel on kogu küsimus, ja enamikus hangetes ei mõõda seda keegi." },
      { en: "This matters in Estonia for a plain reason. People in Estonia lost over 29 million euros to fraud in 2025, against 16 million in 2024, with phone scams accounting for about 11.5 million of the total, according to the Police and Border Guard Board. The Information System Authority's yearbook for the same year carries the same 29 million figure. The fraud essay on this site traces how that happened. This essay asks what the organisational control bought against it actually verifies.", et: "Eestis on sellel lihtne põhjus. Politsei- ja Piirivalveameti andmetel kaotasid Eesti inimesed 2025. aastal petturitele üle 29 miljoni euro, 2024. aastal 16 miljonit, ja petukõned moodustasid sellest ligi 11,5 miljonit. Riigi Infosüsteemi Ameti sama aasta aastaraamat kannab sama 29 miljoni numbrit. Selle saidi pettuste essee jälgib, kuidas selleni jõuti. See essee küsib, mida selle vastu ostetud organisatsiooniline meede tegelikult kontrollib." },
    ],
  },
  {
    heading: { en: "What the law asks for", et: "Mida seadus nõuab" },
    paragraphs: [
      { en: "NIS2 requires essential and important entities to take measures that include \"basic cyber hygiene practices and cybersecurity training\" (Article 21(2)(g)). It also requires members of management bodies to \"follow training\", and asks Member States to encourage similar training for employees \"on a regular basis\" (Article 20(2)). DORA requires financial entities to \"develop ICT security awareness programmes and digital operational resilience training as compulsory modules in their staff training schemes\" (Article 13(6)).", et: "NIS2 nõuab olulistelt ja tähtsatelt üksustelt meetmeid, mille hulgas on küberhügieeni põhitavad ja küberturvalisuse koolitus (artikkel 21 lõige 2 punkt g). Samuti nõuab see juhtorganite liikmetelt koolituse läbimist ja palub liikmesriikidel soodustada sarnast koolitust töötajatele korrapäraselt (artikkel 20 lõige 2). DORA nõuab finantsüksustelt IKT-turbe teadlikkuse programme ja digitaalse tegevuskerksuse koolitust kohustuslike moodulitena töötajate koolituskavades (artikkel 13 lõige 6)." },
      { en: "Read those three provisions again for the word they do not contain. None of them requires the training to work. They require it to exist, to recur and to be documented. An auditor checking NIS2 Article 21(2)(g) is checking for a programme, not for an outcome. That is not a criticism of the law. It is the reason a completion certificate satisfies the audit, and the reason completion is what gets measured.", et: "Loe need kolm sätet uuesti läbi ja otsi sõna, mida seal ei ole. Ükski neist ei nõua, et koolitus toimiks. Nõutakse, et see oleks olemas, korduks ja oleks dokumenteeritud. Audiitor, kes kontrollib NIS2 artikli 21 lõike 2 punkti g, kontrollib, kas programm on olemas, mitte selle tulemust. See ei ole seaduse kriitika. See on põhjus, miks lõpetamistunnistus auditi rahuldab, ja põhjus, miks mõõdetakse just lõpetamist." },
    ],
  },
  {
    heading: { en: "What the field studies measure instead", et: "Mida väliuuringud selle asemel mõõdavad" },
    paragraphs: [
      { en: "Lain, Kostiainen and Capkun ran a 15-month study at a partner company from July 2019 to October 2020, with 14,773 employees as participants, published as an arXiv preprint in December 2021. They measured click rates, credential submission and macro enabling on simulated phishing in the employees' normal work context. On embedded training, the kind shown to an employee right after they click a simulated phish, their finding is stated without hedging: it \"does not make employees more resilient to phishing, but instead it can have unexpected side effects that can make employees even more susceptible to phishing.\" Two things did work in that study. Warnings on suspicious emails were effective. And a reporting button turned the workforce into a detection sensor: new campaigns were reported \"within few minutes from their launch\", and the employees kept reporting over the full 15 months.", et: "Lain, Kostiainen ja Capkun tegid partnerettevõttes 15 kuud kestnud uuringu, 2019. aasta juulist 2020. aasta oktoobrini, 14 773 töötajaga, ja avaldasid selle 2021. aasta detsembris arXivi eelprindina. Nad mõõtsid klikkimise määra, paroolide sisestamist ja makrode lubamist simuleeritud õngitsuskirjades töötajate tavalises töökeskkonnas. Sisseehitatud koolitust näidatakse töötajale kohe pärast simuleeritud õngitsuskirjal klikkimist. Selle kohta on nende järeldus hoiakuta: see ei tee töötajaid õngitsuse suhtes vastupidavamaks ja võib hoopis muuta nad veelgi vastuvõtlikumaks. Originaalis: \"does not make employees more resilient to phishing, but instead it can have unexpected side effects that can make employees even more susceptible to phishing.\" Kaks asja selles uuringus töötasid. Hoiatused kahtlaste kirjade peal olid tõhusad. Ja teavitusnupp muutis töötajaskonna avastussensoriks: uued kampaaniad teatati \"within few minutes from their launch\" ehk mõne minuti jooksul käivitamisest, ja töötajad teavitasid edasi kõik 15 kuud." },
      { en: "Ho and colleagues ran an 8-month randomised controlled experiment at a large healthcare organisation, with ten simulated phishing campaigns sent to over 19,500 employees, published at the IEEE Symposium on Security and Privacy in 2025. The abstract reports \"no significant relationship between whether users have recently completed cybersecurity awareness training and their likelihood of failing a phishing simulation.\" For embedded training, \"the absolute difference in failure rates between trained and untrained users is extremely low across a variety of training content.\" Most users \"spend minimal time interacting with embedded phishing training material\", and for some content types, users who completed more training \"can have an increased likelihood of failing subsequent phishing simulations.\" The authors' conclusion is that such programmes \"in their current and commonly deployed forms, are unlikely to offer significant practical value in reducing phishing risks.\"", et: "Ho ja kaasautorid tegid suures tervishoiuorganisatsioonis 8 kuud kestnud juhusliku jaotusega kontrollkatse, kümne simuleeritud õngitsemiskampaaniaga üle 19 500 töötajale, ja avaldasid selle 2025. aastal IEEE turvalisuse ja privaatsuse sümpoosionil. Kokkuvõte ütleb, et hiljuti läbitud teadlikkuskoolituse ja õngitsemissimulatsioonis läbikukkumise vahel ei leitud statistiliselt olulist seost: \"no significant relationship between whether users have recently completed cybersecurity awareness training and their likelihood of failing a phishing simulation.\" Sisseehitatud koolituse puhul oli koolitatud ja koolitamata kasutajate läbikukkumise määra absoluutne erinevus \"extremely low across a variety of training content\". Enamik kasutajaid veedab koolitusmaterjaliga minimaalselt aega, ja mõne sisutüübi puhul võib rohkem koolitust läbinud kasutajatel olla \"an increased likelihood of failing subsequent phishing simulations\". Autorite järeldus: sellised programmid praegusel ja tavapärasel kujul \"are unlikely to offer significant practical value in reducing phishing risks.\"" },
      { en: "The limit of both studies is the same. They tested the forms of training deployed in those two organisations, under simulated phishing designed by the researchers. A different programme, measured the same way, could produce a different number. The point is that the number can be produced. Completion rate and a self-assessed risk score are not that number.", et: "Mõlema uuringu piir on sama. Nad testisid neis kahes organisatsioonis kasutusel olnud koolituse vorme, teadlaste kavandatud simuleeritud õngitsuse all. Teistsugune programm, sama moodi mõõdetuna, võib anda teistsuguse numbri. Mõte on selles, et selle numbri saab välja mõõta. Lõpetamise määr ja enesehinnanguline riskiskoor ei ole see number." },
    ],
  },
  {
    heading: { en: "RiskSight, as published on risksight.io on 2026-11-12", et: "RiskSight, nagu risksight.io avaldas 12. novembril 2026" },
    paragraphs: [
      { en: "RiskSight's About page gives its address as \"Pirni 7/1, Tallinn 10617, Estonia\". I have no affiliation with RiskSight, commercial or personal. They are the example here because they are an Estonian vendor whose public methodology is detailed enough to test, which is a compliment to their transparency. The findings are not softened to compensate.", et: "RiskSighti tutvustusleht annab aadressiks \"Pirni 7/1, Tallinn 10617, Estonia\". Mul ei ole RiskSightiga mingit seost, ei ärilist ega isiklikku. Nad on siin näide, sest nad on Eesti tarnija, kelle avalik metoodika on piisavalt üksikasjalik testimiseks. See on kompliment nende läbipaistvusele. Leide ei ole selle tasakaalustamiseks pehmendatud." },
      { en: "The evidence is a frozen snapshot of 52 English pages from risksight.io, fetched on 2026-11-12, with a SHA-256 per file. Every sentence attributed to RiskSight below is a verbatim quotation from that snapshot, checked by script, or a count computed over it. Nothing here names their clients, although the home page lists several. Nothing is said about revenue, staff or motives, because the snapshot says nothing checkable about those.", et: "Tõendusmaterjal on külmutatud hetktõmmis 52 ingliskeelsest risksight.io lehest, alla laaditud 12. novembril 2026, iga faili kohta SHA-256 räsi. Iga allpool RiskSightile omistatud lause on sõnasõnaline tsitaat sellest tõmmisest, skriptiga kontrollitud, või selle pealt arvutatud arv. Tsitaadid on inglise keeles, sest tõmmis on ingliskeelne. Siin ei nimetata nende kliente, kuigi avaleht loetleb mitu. Käibe, töötajate ega motiivide kohta ei öelda midagi, sest tõmmis ei ütle nende kohta midagi kontrollitavat." },
      { en: "Start with what the product is sold as. The home page reads: \"Your partner for building the human firewall.\" The product page lists the benefits, and one of them is headed \"Evidence for NIS2, DORA and ISO 27001\", explained as \"A documented, continuous programme that showcases compliance to auditors and supervisory authorities.\" The outcome benefit is \"Regular cyber hygiene training cuts click-through on malicious emails and credential reuse.\" The reference case on the home page is an \"Annual cyber awareness training programme since 2017 in six countries for 500 to 700 users with a visibly decreasing risk level.\"", et: "Alustame sellest, millena toodet müüakse. Avaleht ütleb: \"Your partner for building the human firewall.\" Tooteleht loetleb kasud, ja üks neist kannab pealkirja \"Evidence for NIS2, DORA and ISO 27001\", selgitusega \"A documented, continuous programme that showcases compliance to auditors and supervisory authorities.\" Tulemuskasu on \"Regular cyber hygiene training cuts click-through on malicious emails and credential reuse.\" Avalehe näidisjuhtum on \"Annual cyber awareness training programme since 2017 in six countries for 500 to 700 users with a visibly decreasing risk level.\"" },
      { en: "Now what is measured. The product FAQ answers the question directly: \"Progress is measured on a completion and risk basis. Analysts monitor completion rates and overdue users are flagged and notified. Similarly, analysts monitor risk levels and are notified of high-risk users.\" The risk level comes from inside the course: \"Risk is assessed in 12 threat vectors which are categorised into four classes – knowledge, exposure, belonging, and personality.\" Those profiles \"outline results in different categories and threat vectors respective of their decisions, opinions and knowledge throughout the course.\" The certificate \"becomes available once all of the current training cycle tasks are completed.\"", et: "Nüüd see, mida mõõdetakse. Toote korduma kippuvad küsimused vastavad otse: \"Progress is measured on a completion and risk basis. Analysts monitor completion rates and overdue users are flagged and notified. Similarly, analysts monitor risk levels and are notified of high-risk users.\" Riskitase tuleb kursuse seest: \"Risk is assessed in 12 threat vectors which are categorised into four classes – knowledge, exposure, belonging, and personality.\" Need profiilid \"outline results in different categories and threat vectors respective of their decisions, opinions and knowledge throughout the course\", seega kursuse jooksul antud otsuste, arvamuste ja teadmiste põhjal. Tunnistus \"becomes available once all of the current training cycle tasks are completed.\"" },
      { en: "So the claim is fewer successful attacks and the published measurement is completion plus a score built from answers, opinions and knowledge given inside the course. In 52 pages, the phrases \"click-through\" or \"click rate\" appear in 2 files, and neither carries a number. Across the 86 verified quotations in the evidence file, the number of training-outcome claims that state a measured figure is 0. The effect size is 'visibly'.", et: "Niisiis on väide vähem õnnestunud ründeid ja avaldatud mõõdik on lõpetamine pluss skoor, mis on ehitatud kursuse sees antud vastustest, arvamustest ja teadmistest. 52 lehel esinevad fraasid \"click-through\" või \"click rate\" 2 failis, ja kummalgi ei ole numbrit. Tõendusfaili 86 kontrollitud tsitaadi seas on koolituse tulemust mõõdetud arvuga väitvaid lauseid 0. Mõjusuurus on „visibly“, silmaga nähtavalt." },
      { en: "Then what the control rests on. The methodology page states the premise: \"Cyber readiness requires constant vigilance and adaptability to the threat landscape.\" The phishing guidance says \"To avoid falling victim, you must stay vigilant\" and \"To verify a link, hover your mouse over it without clicking.\" The malware guidance says \"The best way to protect against malware is by being attentive when browsing the internet.\" And on the ordering of controls: \"Anti-virus software should not be the only thing that a computer user relies on. It should be a backup force in case the user has missed something.\"", et: "Siis see, millele meede toetub. Metoodikaleht sõnastab eelduse: \"Cyber readiness requires constant vigilance and adaptability to the threat landscape.\" Õngitsemisjuhis ütleb \"To avoid falling victim, you must stay vigilant\" ja \"To verify a link, hover your mouse over it without clicking.\" Pahavarajuhis ütleb \"The best way to protect against malware is by being attentive when browsing the internet.\" Ja meetmete järjekorra kohta: \"Anti-virus software should not be the only thing that a computer user relies on. It should be a backup force in case the user has missed something.\" Viirusetõrje on varujõud juhuks, kui kasutajal jäi midagi kahe silma vahele." },
      { en: "The doctrine criteria sit in a file whose hash is pinned inside the evidence file. On the criterion that prevention must assume zero vigilance, 43 of the 86 verified quotations make prevention depend on the user noticing, 5 are partial, and 0 are aligned. 0 of 52 files match the fail-closed patterns, such as a control that holds even if the user clicks. The terms passkey, FIDO, WebAuthn and phishing-resistant appear in 0 of 52 files. Adversary-in-the-middle, MFA fatigue, MFA bypass and session hijacking also appear in 0 files. The MFA options the site lists are \"PIN codes sent to the user’s mobile phone, fingerprint scanners, smart cards and specialised hardware tokens\", and the reason given is that the account is \"more protected against possible database leaks and random intrusion attempts\". Smart cards and hardware tokens are listed without saying which kind. The form of MFA that defeats the phish the hover advice is meant to catch is never named as such.", et: "Doktriinikriteeriumid on failis, mille räsi on tõendusfaili sisse kinnitatud. Kriteeriumi järgi, et ennetus peab eeldama null valvsust, seab 86 kontrollitud tsitaadist 43 ennetuse sõltuvusse sellest, kas kasutaja märkab, 5 on osalised ja 0 on kooskõlas. 52 failist 0 vastab tõrkekindla meetme mustritele, näiteks meede, mis peab vastu ka siis, kui kasutaja klikib. Terminid passkey, FIDO, WebAuthn ja phishing-resistant esinevad 0 failis 52-st. Adversary-in-the-middle, MFA fatigue, MFA bypass ja session hijacking esinevad samuti 0 failis. Saidi loetletud mitmeastmelise autentimise valikud on \"PIN codes sent to the user’s mobile phone, fingerprint scanners, smart cards and specialised hardware tokens\", ja põhjendus on, et konto on \"more protected against possible database leaks and random intrusion attempts\". Kiipkaardid ja riistvaralised tokenid on loetletud ütlemata, mis liiki. Seda mitmeastmelise autentimise vormi, mis nurjab just selle õngitsuse, mida hiirega lingi kohal hõljumise nõuanne püüab tabada, ei nimetata kordagi selle nimega." },
    ],
  },
  {
    heading: { en: "The steelman, in their own words", et: "Tugevaim versioon, nende enda sõnadega" },
    paragraphs: [
      { en: "The full-strength version of RiskSight's position can be assembled from their own pages, and it is a serious one.", et: "RiskSighti seisukoha täie jõuga versiooni saab kokku panna nende enda lehtedelt, ja see on tõsine." },
      { en: "Technology misses what training catches: \"Conventional security measures rely on detecting known patterns or fingerprints and can therefore be inflexible when it comes to emerging threats or social engineering attacks targeting the human element.\" The human layer is where breaches happen: \"68% of breaches involved a non-malicious human element, like a person falling victim to a social engineering attack or making an error.\" So instrument it rather than trust it. No pass or fail: \"instead of evaluating correct or incorrect answers, we focus on identifying risk areas and evaluating risk. This means that a score of 90% can still mean a potential risk level.\" Route the measurement into controls: training \"must provide clear and actionable outcomes, allowing supervisory staff to implement post-training improvements such as technical measures, operational procedures or additional training to further reduce the possible impact of the human risk behaviour.\" Respect the limits of people: \"Incorrect and unreasonably strict guidance can be demotivating and force users to create shortcuts with potential security vulnerabilities.\" And, flatly: \"Awareness on its own does not build cyber readiness.\"", et: "Tehnoloogia jätab vahele selle, mille koolitus tabab: \"Conventional security measures rely on detecting known patterns or fingerprints and can therefore be inflexible when it comes to emerging threats or social engineering attacks targeting the human element.\" Inimkiht on koht, kus rikkumised toimuvad: \"68% of breaches involved a non-malicious human element, like a person falling victim to a social engineering attack or making an error.\" Seega tuleb seda kihti mõõta, mitte usaldada. Ei mingit läbisaamist ega läbikukkumist: \"instead of evaluating correct or incorrect answers, we focus on identifying risk areas and evaluating risk. This means that a score of 90% can still mean a potential risk level.\" Mõõtmistulemus tuleb suunata meetmetesse: koolitus \"must provide clear and actionable outcomes, allowing supervisory staff to implement post-training improvements such as technical measures, operational procedures or additional training to further reduce the possible impact of the human risk behaviour.\" Inimeste piiridega tuleb arvestada: \"Incorrect and unreasonably strict guidance can be demotivating and force users to create shortcuts with potential security vulnerabilities.\" Ja otsesõnu: \"Awareness on its own does not build cyber readiness.\"" },
      { en: "That is a risk-quantification programme for a fallible component. It does not claim that people are reliable. It claims that their unreliability can be measured per person and per vector, and that the measurement should drive technical change.", et: "See on riski mõõtmise programm ebakindla komponendi jaoks. See ei väida, et inimesed on usaldusväärsed. See väidab, et nende ebausaldusväärsust saab mõõta inimese ja ohuvektori kaupa ja et mõõtmine peaks viima tehnilise muutuseni." },
    ],
  },
  {
    heading: { en: "The steelman, on the same evidence", et: "Tugevaim versioon samade tõendite valguses" },
    paragraphs: [
      { en: "As a measurement argument it holds. The 68% figure, the no-pass/fail design and the routing of results into \"technical measures\" are all consistent with treating the human as a failure-prone part. That is the right premise.", et: "Mõõtmisargumendina see peab. 68% number, läbikukkumiseta ülesehitus ja tulemuste suunamine \"technical measures\" alla on kõik kooskõlas sellega, et inimest käsitletakse tõrkealti osana. See on õige eeldus." },
      { en: "As a prevention argument it does not get there, for three reasons that the snapshot itself supplies.", et: "Ennetusargumendina see kohale ei jõua, kolmel põhjusel, mille tõmmis ise annab." },
      { en: "First, the measurement is of the wrong quantity. A risk score built from \"decisions, opinions and knowledge throughout the course\" is a self-report under no adversarial pressure. The Ho study measured exactly the gap between that kind of training state and behaviour under a live simulated attack, and found no significant relationship. A programme that wants to claim \"cuts click-through\" needs to measure click-through, under attack, against a baseline, over time. The snapshot describes no such measurement.", et: "Esiteks mõõdetakse vale suurust. Riskiskoor, mis on ehitatud \"decisions, opinions and knowledge throughout the course\" pealt, on enesehinnang ilma ründesurveta. Ho uuring mõõtis täpselt lõhet sellise koolitusseisundi ja käitumise vahel elava simuleeritud ründe all, ja ei leidnud olulist seost. Programm, mis tahab väita \"cuts click-through\", peab mõõtma klikkimist ründe all, lähtetaseme vastu, läbi aja. Tõmmis sellist mõõtmist ei kirjelda." },
      { en: "Second, the site knows people route around friction, and draws no architectural conclusion from it. The shortcuts sentence is correct. The engineering response to it is a control that still holds when the shortcut is taken: a passkey that cannot be relayed, a payment that needs a second approver, a token bound to the device. In 52 pages, 0 sentences describe a passkey, a second approver or a device-bound token. The one use of \"fail-safe\" concerns redundant systems for disaster recovery, which is recovery, not prevention.", et: "Teiseks teab sait, et inimesed lähevad hõõrdumisest ringiga mööda, ega tee sellest arhitektuurilist järeldust. Otseteede lause on õige. Inseneri vastus sellele on meede, mis peab vastu ka siis, kui otsetee võetakse. Näiteks pääsuvõti, mida ei saa vahendada, teist kinnitajat vajav makse või seadmega seotud tunnus. 52 lehel kirjeldab pääsuvõtit, teist kinnitajat või seadmega seotud tunnust 0 lauset. Ainus \"fail-safe\" kasutus puudutab varusüsteeme taasteplaanis, ja see on taastamine, mitte ennetus." },
      { en: "Third, the \"inflexible when it comes to emerging threats\" premise only supports human detection if humans catch what technology missed. The five phishing indicators the site teaches are headed \"Sender Address\", a link to hover over, \"Suspicious Attachments\", \"Sense of Urgency\" and the content of the email. Sender, destination and attachment are properties a mail gateway, a browser and an origin-bound authenticator check without a human, at a failure rate that does not depend on how tired the human is. That sentence is my inference and not a quotation. It is also why the ordering in \"a backup force in case the user has missed something\" reads inverted to an engineer: the mechanism is the primary control and the human is the backup, because the mechanism's failure rate is measurable and the human's shows up in 68% of breaches.", et: "Kolmandaks toetab eeldus \"inflexible when it comes to emerging threats\" inimese kaudu avastamist ainult siis, kui inimene tabab selle, mis tehnoloogial vahele jäi. Saidi õpetatud viis õngitsemistunnust kannavad pealkirju \"Sender Address\", link, mille kohal hõljuda, \"Suspicious Attachments\", \"Sense of Urgency\" ja kirja sisu. Saatjat, sihtkohta ja manust kontrollivad kirjavärav, brauser ja päritoluga seotud autentija ilma inimeseta. Nende veamäär ei sõltu sellest, kui väsinud inimene on. See lause on minu järeldus, mitte tsitaat. See on ka põhjus, miks järjekord lauses \"a backup force in case the user has missed something\" tundub insenerile tagurpidi: mehhanism on esmane meede ja inimene on varu, sest mehhanismi veamäära saab mõõta ja inimese oma ilmub 68% rikkumistest." },
    ],
  },
  {
    heading: { en: "What they get right", et: "Mida nad õigesti teevad" },
    paragraphs: [
      { en: "Three things in the snapshot deserve to be said plainly.", et: "Kolm asja tõmmises väärivad otse väljaütlemist." },
      { en: "No pass or fail. \"it is not possible to fail the dynamic cyber hygiene course.\" A quiz pass is a claim of verification with nothing behind it, and dropping it is honest.", et: "Ei mingit läbisaamist ega läbikukkumist. \"it is not possible to fail the dynamic cyber hygiene course.\" Testi läbimine on kontrollimise väide, mille taga ei ole midagi, ja sellest loobumine on aus." },
      { en: "The DBIR framing. Leading with \"68% of breaches involved a non-malicious human element\" is leading with the number that argues against your own product's sufficiency.", et: "DBIR-i raamistus. Alustada lausega \"68% of breaches involved a non-malicious human element\" tähendab alustada numbrist, mis räägib su enda toote piisavuse vastu." },
      { en: "The shortcuts point, and its cousin: \"Taking courses that are too extensive for the attention span can lead to “phantom learners” where the material is simply “clicked through” while actually not learning much.\" That is the completion metric being criticised from inside a platform that sells completion. It is a correct and uncomfortable observation.", et: "Otseteede tähelepanek ja selle sugulane: \"Taking courses that are too extensive for the attention span can lead to “phantom learners” where the material is simply “clicked through” while actually not learning much.\" Lõpetamise mõõdikut kritiseeritakse platvormi seest, mis müüb lõpetamist. See on õige ja ebamugav tähelepanek." },
    ],
  },
  {
    heading: { en: "A test a buyer can put to any vendor", et: "Test, mille ostja võib esitada igale tarnijale" },
    paragraphs: [
      { en: "Four questions, each with a falsifiable answer. A vendor who cannot answer them is selling evidence of completion.", et: "Neli küsimust, igaühele on võimalik vastata kontrollitavalt. Tarnija, kes neile vastata ei suuda, müüb lõpetamise tõendit." },
      { en: "1. What outcome is measured? Not completion, not a quiz, not a self-assessed score. The rate at which staff take the dangerous action under a realistic attack.", et: "1. Millist tulemust mõõdetakse? Mitte lõpetamist, mitte testi, mitte enesehinnangulist skoori. Määra, millega töötajad teevad realistliku ründe all ohtliku toimingu." },
      { en: "2. Against what baseline? The same rate, in the same population, before the programme, or in a randomised control group running alongside it.", et: "2. Millise lähtetaseme vastu? Sama määr samas rahvastikus enne programmi või paralleelselt jooksvas juhuvalimiga kontrollrühmas." },
      { en: "3. Under what adversarial conditions? Simulations designed by someone whose job is to get through, including the lures that work in Estonia today: a call from the bank, a Smart-ID prompt, an invoice from a known supplier.", et: "3. Milliste ründetingimuste all? Simulatsioonid, mille on kavandanud keegi, kelle töö on läbi saada. Kaasa arvatud Eestis praegu töötavad lõksud: kõne pangast, Smart-ID viip, arve tuttavalt tarnijalt." },
      { en: "4. What control holds when the employee fails? The thing that stops the loss after the click, and whether the programme's results feed into it.", et: "4. Milline meede peab vastu, kui töötaja eksib? See, mis peatab kahju pärast klikki, ja kas programmi tulemused jõuavad sinna." },
      { en: "Scored on the snapshot, as of 2026-11-12:", et: "Tõmmise pealt hinnatuna, seisuga 12. november 2026:" },
      { en: "1. Outcome measured: completion and an in-course risk level (\"Progress is measured on a completion and risk basis\"). The click-through claim carries no figure. Not met.", et: "1. Mõõdetav tulemus: lõpetamine ja kursusesisene riskitase (\"Progress is measured on a completion and risk basis\"). Klikkimise väitel ei ole numbrit. Täitmata." },
      { en: "2. Baseline: the reference case states \"a visibly decreasing risk level\" with no number and no comparison group. Not met.", et: "2. Lähtetase: näidisjuhtum ütleb \"a visibly decreasing risk level\" ilma numbri ja võrdlusrühmata. Täitmata." },
      { en: "3. Adversarial conditions: the site says \"Conducting periodic phishing simulations tests employees’ knowledge in a practical context.\" Phishing simulations are named in 5 of 52 files; results from them appear in 0. Partly met.", et: "3. Ründetingimused: sait ütleb \"Conducting periodic phishing simulations tests employees’ knowledge in a practical context.\" Õngitsemissimulatsioone nimetatakse 5 failis 52-st, nende tulemusi 0 failis. Osaliselt täidetud." },
      { en: "4. Control that holds on failure: 0 of 52 files match the fail-closed patterns, and 0 of 86 quotations are aligned on that criterion. The results are routed to \"technical measures, operational procedures or additional training\", which is the right direction and is left open. Not met.", et: "4. Meede, mis peab eksimisel vastu: 52 failist 0 vastab tõrkekindla meetme mustritele ja 86 tsitaadist 0 on selle kriteeriumiga kooskõlas. Tulemused suunatakse \"technical measures, operational procedures or additional training\" alla, mis on õige suund ja jääb lahtiseks. Täitmata." },
      { en: "One out of four, partly. The score is of the public methodology. A customer may hold data the site does not publish, and the right of reply below asks for exactly that.", et: "Üks neljast, osaliselt. Hinne käib avaliku metoodika kohta. Kliendil võib olla andmeid, mida sait ei avalda, ja allpool kirjeldatud vastulause õigus küsib just neid." },
    ],
  },
  {
    heading: { en: "Limits, and the right of reply", et: "Piirid ja vastulause õigus" },
    paragraphs: [
      { en: "Only English URLs were fetched. The absence counts search all 52 files; the quotations come from 22 of them. The doctrine labels on individual quotations are my reading, and a different reader could move some. The counts that carry the argument are far from any boundary: 43 vigilance-dependent quotations against 0 that design for user failure.", et: "Alla laaditi ainult ingliskeelsed URL-id. Puudumise loendused otsisid kõigist 52 failist; tsitaadid pärinevad neist 22-st. Doktriinisildid üksikutel tsitaatidel on minu lugemine, ja teine lugeja võiks mõne ümber tõsta. Argumenti kandvad arvud on igast piirist kaugel: 43 valvsusest sõltuvat tsitaati 0 vastu, mis arvestaks kasutaja eksimusega." },
      { en: "A short email with the questions that would change each conclusion has been drafted and is held for the author's decision. If RiskSight publishes outcome data measured under adversarial conditions, this page will carry it as an addendum, dated.", et: "Lühike kiri küsimustega, mis iga järelduse ümber pööraksid, on koostatud ja ootab autori otsust. Kui RiskSight avaldab ründetingimustes mõõdetud tulemusandmed, lisab see leht need kuupäevaga lisana." },
    ],
  },
];

const sources = [
  { label: "Police and Border Guard Board, \"Kelmid petsid Eesti inimestelt välja 29 miljonit eurot\" (2026)", url: "https://www.politsei.ee/et/uudised/kelmid-petsid-eesti-inimestelt-vaelja-29-miljonit-eurot-13196", note: "2025 losses over 29 million euros, 16 million in 2024, phone scams about 11.5 million; frozen copy SHA-256 408e472350d01bbb451137b88ef65183fce778115ee856ff3d3f6ad014a89303" },
  { label: "RIA, Cyber Security in Estonia 2026 (February 2026)", url: "https://www.ria.ee/sites/default/files/documents/2026-02/Cyber-security-in-Estonia-2026.pdf", note: "29 million euros lost to fraud in 2025; frozen copy SHA-256 13f52f63e902de66afc372151fc8c24bfd30ebec2c701465aefa233c4cff9a85" },
  { label: "Lain, Kostiainen, Capkun, \"Phishing in Organizations: Findings from a Large-Scale and Long-Term Study\", arXiv:2112.07498 (14 December 2021)", url: "https://arxiv.org/abs/2112.07498", note: "15-month study, 14,773 participants, embedded training finding, crowd-sourced reporting; frozen copy SHA-256 6a75f4b7d8f593880a53f47b5ce755c8af6c8809593e70886c9cc0d5ac21af96" },
  { label: "Ho et al., \"Understanding the Efficacy of Phishing Training in Practice\", IEEE S&P 2025", url: "https://ieeexplore.ieee.org/document/11023357", note: "8-month randomised controlled experiment, over 19,500 employees, abstract quoted; frozen copy SHA-256 5f7a76432b2b0bf3fd9ee28d9df79e47127e2b1d54c389de83e9474692e9ce85" },
  { label: "Directive (EU) 2022/2555 (NIS2), Articles 20(2) and 21(2)(g)", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2555", note: "frozen copy SHA-256 667451539d947cac83721f24607fca47291665e5971365daf84f421122f2389d" },
  { label: "Regulation (EU) 2022/2554 (DORA), Article 13(6)", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32022R2554", note: "frozen copy SHA-256 7c59394b258ce3cb9ca501d458723a76179e9c0f8b8965efda271bd624c19e1b" },
  { label: "RiskSight, risksight.io, 52 English pages as published on 2026-11-12", url: "https://risksight.io/", note: "frozen snapshot with per-file SHA-256; 91 evidence rules, 86 verified by script against the frozen text" },
];

export default function WhatAwarenessTrainingActuallyVerifiesPage() {
  const { language } = useTranslation();
  const isEn = language === 'en';

  return (
    <article>
      <ArticleHeader
        backTo="/disclosures"
        back={<>← {isEn ? 'Back to research' : 'Tagasi uuringute juurde'}</>}
        kicker={isEn ? 'Essay · Awareness Training · NIS2 / DORA' : 'Essee · Teadlikkuskoolitus · NIS2 / DORA'}
        title={title[language]}
        standfirst={standfirst[language]}
        published="2026-11-13"
        meta={[<>
              {isEn ? 'Published · November 13, 2026' : 'Avaldatud · 13. november 2026'}
            </>, <>
              {isEn ? '12 min read' : '12 min lugemist'}
            </>]}
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-12">
        <aside aria-label="Article navigation" className="lg:col-span-3">
          <div className="sticky top-24">
            <ReaderRail
              sections={sections.map((s) => ({ id: sectionSlug(s.heading.en), heading: s.heading[language] }))}
              backHref="/disclosures"
              backLabel={isEn ? 'All disclosures' : 'Kõik avalikustatud'}
            />
          </div>
        </aside>

        <div className="lg:col-span-9">
          {sections.map((section, i) => (
            <section
              key={section.heading.en}
              id={sectionSlug(section.heading.en)}
              className={`${i === 0 ? '' : 'mt-16 '}max-w-measure scroll-mt-24`}
            >
              <p aria-hidden data-n={String(i + 1).padStart(2, '0')} className="mb-4 label font-medium text-accent before:content-[attr(data-n)]" />
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
                  <a
                    href={source.url}
                    className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
                  >
                    {source.label}
                  </a>
                  <span className="text-muted-foreground"> — {source.note}</span>
                </p>
              ))}
            </div>
          </section>

          <section className="mt-16 max-w-measure">
            <h2 className="font-display text-3xl leading-tight text-foreground">
              {isEn ? 'Related reading' : 'Seotud lugemine'}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                {isEn ? 'The fraud figures above are traced in ' : 'Ülaltoodud pettusearvud on lahti kirjutatud essees '}
                <Link to="/disclosures/the-evolution-of-cyber-fraud-in-estonia" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                  {isEn ? 'The evolution of cyber fraud in Estonia, 2017–2026' : 'Küberpettuste areng Eestis, 2017–2026'}
                </Link>
                {isEn ? '. The control that holds when the user fails is the subject of ' : '. Meede, mis peab vastu ka kasutaja eksimisel, on teema essees '}
                <Link to="/disclosures/identity-is-the-root-proof-is-the-gate" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                  {isEn ? 'Identity Is the Root. Proof Is the Gate.' : 'Identiteet on juur. Tõend on värav.'}
                </Link>
                .
              </p>
            </div>
          </section>
        </div>
      </div>

      <ArticleProof
        slug="what-awareness-training-actually-verifies"
        expectedSha256="d41022f88f500cd72968b98a9532247dc4ab6689829e954642d924a0a9c4cccf"
      />
    </article>
  );
}
