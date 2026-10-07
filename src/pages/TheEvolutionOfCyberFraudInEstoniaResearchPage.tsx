import Link from '../components/site/link';
import { useTranslation } from '../i18n/LanguageContext';
import ReaderRail from '../components/site/reader-rail';
import { sectionSlug } from '../components/site/section-slug';
import ArticleProof from '../components/site/article-proof';
import { ArticleHeader } from '../components/site/article';
import { PolicyText } from '../components/site/policy-link';

type Bi = { en: string; et: string };

type ReportSection = {
  heading: Bi;
  paragraphs: Bi[];
};

const title: Bi = {
  en: 'The evolution of cyber fraud in Estonia, 2017–2026',
  et: 'Küberpettuste areng Eestis, 2017–2026',
};

const standfirst: Bi = {
  en: "Estonia's small language was its cheapest security control. For years it kept out scammers who could not speak fluent Estonian. This report traces how that barrier held, how it collapsed, and what replaced it. The collapse came in two stages. First, organized crime recruited native speakers into call centers abroad; police date mass Estonian-language calls to late 2024. Then AI cut the remaining costs of entry: flawless Estonian text at almost no cost, and video that put the president's face on a fake investment platform. Fluent synthetic voice is the barrier still standing, and police cannot yet say how often it is used in live calls. Police-reported losses rose from about 8 million euros in 2023 to 16 million in 2024 and 29 million in 2025, with another 13.2 million in the first half of 2026.",
  et: 'Eesti väike keel oli riigi odavaim turvameede. Aastaid hoidis see eemal petturid, kes soravat eesti keelt ei rääkinud. See raport jälgib, kuidas barjäär pidas, kuidas see kokku varises ja mis selle asemele tuli. Kokkuvarisemine toimus kahes etapis. Esmalt värbas organiseeritud kuritegevus emakeelekõnelejaid välismaistesse kõnekeskustesse; politsei sõnul algasid massilised eestikeelsed kõned 2024. aasta lõpus. Seejärel kahandas tehisintellekt allesjäänud sisenemiskulusid: veatu eestikeelne tekst peaaegu tasuta ja video, mis pani presidendi näo võltsitud investeerimisplatvormile. Sorav tehishääl on barjäär, mis veel püsib, ja politsei ei oska veel öelda, kui sageli seda päris kõnedes kasutatakse. Politseile teatatud kahju kasvas umbes kaheksalt miljonilt eurolt 2023. aastal 16 miljonini 2024. aastal ja 29 miljonini 2025. aastal; 2026. aasta esimesel poolaastal lisandus 13,2 miljonit.',
};

const openingParagraphs: Bi[] = [
  {
    en: "This report is a synthesis of public reporting on fraud in Estonia from 2017, when Smart-ID arrived, to mid-2026. The spine is the Estonian Information System Authority's Cyber Security in Estonia yearbook and its accompanying articles (RIA, January-February 2026), the Police and Border Guard Board's public statements, SEB's Baltic fraud statistics for the first half of 2024, and the investigative work by ERR and Äripäev, including the Pealtnägija undercover recruitment experiment published in February 2026. It builds on an earlier research file compiled from these and other Estonian sources. Each figure is attributed to the publisher that released it; where a figure appears only in a news report, the report is named.",
    et: 'See raport on kokkuvõte avalikust teabest Eesti pettuste kohta alates 2017. aastast, mil turule jõudis Smart-ID, kuni 2026. aasta keskpaigani. Selgroog on Riigi Infosüsteemi Ameti aastaraamat "Küberturvalisus Eestis" ja selle juurde kuuluvad artiklid (RIA, jaanuar-veebruar 2026), Politsei- ja Piirivalveameti avalikud teated, SEB Balti pettusestatistika 2024. aasta esimese poolaasta kohta ning ERRi ja Äripäeva uurivad lood, sealhulgas Pealtnägija variidentiteedi all tehtud värbamiskatse, mis avaldati 2026. aasta veebruaris. Raport tugineb varasemale uurimismaterjalile, mis on koostatud nendest ja teistest Eesti allikatest. Iga arv on omistatud selle avaldajale; kui arv pärineb ainult uudisloost, on see uudislugu nimetatud.',
  },
  {
    en: 'Two limits apply. Estonian fraud statistics are published by several authorities that count different things, and the headline numbers do not always agree. Where sources conflict I say so explicitly instead of picking one. And this report describes public cases and statistics only. It discloses no vulnerability, describes no live system under test, and names no victim beyond what the sources already published. This version was updated on 4 October 2026. It covers police figures through June 2026 and news reports through August 2026.',
    et: 'Kehtib kaks piirangut. Eesti pettusestatistikat avaldavad mitu asutust, kes loevad eri asju, ja pealkirjadesse jõudvad arvud ei lange alati kokku. Kus allikad on vastuolus, ütlen seda otse, selle asemel et üks neist välja valida. Ja see raport kirjeldab ainult avalikke juhtumeid ja statistikat. See ei avalikusta ühtegi turvaauku, ei kirjelda ühtegi testitavat töötavat süsteemi ega nimeta ühtegi ohvrit rohkem, kui allikad on juba avaldanud. Seda versiooni uuendati 4. oktoobril 2026. See hõlmab politsei arve 2026. aasta juuni lõpuni ja uudiseid 2026. aasta augustini.',
  },
];

const sections: ReportSection[] = [
  {
    heading: { en: 'The numbers, and why they disagree', et: 'Arvud ja miks need lahku lähevad' },
    paragraphs: [
      {
        en: 'ERR describes the years before the surge as ones in which annual fraud losses "ranged between five and ten million euros," without giving a source for the range. The Police and Border Guard Board (PPA) recorded nearly eight million euros lost to scams in 2023, roughly 22,000 euros a day, and 16 million euros in 2024. By the police count, the surge began in 2024.',
        et: 'ERR kirjeldab tõusule eelnenud aastaid ajana, mil aastane pettusekahju "jäi viie ja kümne miljoni euro vahele", kuid ei nimeta selle vahemiku allikat. Politsei- ja Piirivalveamet (PPA) registreeris 2023. aastal kelmustega tekitatud kahju ligi kaheksa miljoni euro ulatuses, ligikaudu 22 000 eurot päevas, ja 2024. aastal 16 miljoni euro ulatuses. Politsei arvestuse järgi algas tõus 2024. aastal.',
      },
      {
        en: "In 2025 losses reached 29 million euros. RIA's Cyber Security in Estonia 2026 yearbook calls that \"three times more than the year before\"; PPA calls it nearly double its 2024 figure of 16 million. Both 29-million figures are the same PPA number: RIA's yearbook says its fraud cases are drawn from reports by the Police and Border Guard Board and RIA, and PPA's total already includes fraud aimed at businesses. They differ only on the baseline. RIA's \"three times\" implies about 9.7 million euros for 2024, while PPA's own 2024 figure is 16 million, and neither source explains the gap. Eesti Pank, which tracks bank-reported payment fraud separately, put 2024 at 13.5 million euros. Anyone quoting a single \"Estonian fraud number\" should say which authority they mean.",
        et: '2025. aastal ulatus kahju 29 miljoni euroni. RIA aastaraamat "Küberturvalisus Eestis 2026" nimetab seda kolm korda suuremaks kui aasta varem; PPA nimetab seda oma 2024. aasta 16 miljoni euro peaaegu kahekordistumiseks. Mõlemad 29 miljoni suurused arvud on sama PPA arv: RIA aastaraamatu järgi pärinevad selle pettusejuhtumid Politsei- ja Piirivalveameti ning RIA teadetest ja PPA kogusumma sisaldab juba ka ettevõtetele suunatud pettusi. Erinevus on ainult lähtejoones. RIA kolmekordne kasv eeldab 2024. aasta kahjuks umbes 9,7 miljonit eurot, PPA enda 2024. aasta arv on aga 16 miljonit ja kumbki allikas seda vahet ei selgita. Eesti Pank, kes jälgib pankade teatatud maksepettusi eraldi, hindas 2024. aasta kahjuks 13,5 miljonit eurot. Igaüks, kes tsiteerib üht "Eesti pettuse numbrit", peaks ütlema, millist asutust ta silmas peab.',
      },
      {
        en: "PPA's 2025 breakdown counts 3,685 victims. Phone scams were the largest category, about 11.5 million euros of the 29 million (PPA, 19 January 2026), followed by investment fraud (6.3 million), fraud aimed at businesses (2.7 million) and sales fraud (1.7 million). Individuals are the most frequent victims; businesses take the largest single losses.",
        et: 'PPA 2025. aasta jaotuses on 3685 ohvrit. Suurim kategooria olid petukõned, umbes 11,5 miljonit eurot 29 miljonist (PPA, 19. jaanuar 2026), järgnesid investeerimispettused (6,3 miljonit), ettevõtetele suunatud pettused (2,7 miljonit) ja müügipettused (1,7 miljonit). Kõige sagedamini langevad ohvriks eraisikud, suurimad kahjud ühe juhtumi kohta kannavad ettevõtted.',
      },
    ],
  },
  {
    heading: { en: 'The language barrier, and how it held', et: 'Keelebarjäär ja kuidas see pidas' },
    paragraphs: [
      {
        en: "Estonian is the mother tongue of about 900,000 people, 67 percent of the population at the 2021 census. For years that smallness was the market's best defense. Phishing aimed at Estonia was mostly Russian-language, and the Estonian that appeared in scam material was visibly translated: wrong cases, wrong word order, tells a native speaker caught instantly.",
        et: 'Eesti keel on emakeeleks umbes 900 000 inimesele, 2021. aasta rahvaloenduse järgi 67 protsendile elanikkonnast. Aastaid oli see väiksus turu parim kaitse. Eestile suunatud õngitsemine oli enamasti venekeelne ja eesti keel, mis pettusematerjalides esines, oli nähtavalt tõlgitud: valed käänded, vale sõnajärg, vihjed, mille emakeelekõneleja tabas hetkega.',
      },
      {
        en: "The picture changed in 2017 with the arrival of Smart-ID as a mass authentication method. Large-scale phishing in Estonia began in 2019, when banks phased out password cards and moved customers to Smart-ID, and security researcher Arnis Paršovs of the University of Tartu has argued that the change traded one problem for another: a password card is clunky, but a scammer on the phone had to explicitly ask a victim for the password, which raised suspicion. With Smart-ID, the scammer only needs to talk the victim into approving something. The authentication rail itself was not the weakness. The consent step became the attack surface, and the full technical analysis is in my separate report on Smart-ID.",
        et: 'Pilt muutus 2017. aastal, kui Smart-ID jõudis massilise autentimisvahendina turule. Ulatuslik õngitsemine algas Eestis 2019. aastal, kui pangad loobusid paroolikaartidest ja viisid kliendid üle Smart-ID-le, ning Tartu Ülikooli turvateadlane Arnis Paršovs on väitnud, et see muudatus vahetas ühe probleemi teise vastu: paroolikaart on kohmakas, kuid telefonis olev pettur pidi ohvrilt parooli otsesõnu küsima, mis tekitas kahtlust. Smart-ID puhul peab pettur ohvri ainult millegi kinnitamiseni rääkima. Nõrk koht ei olnud autentimisrada ise. Rünnakupinnaks sai nõusolekusamm ja täielik tehniline analüüs on minu eraldi raportis Smart-ID kohta.',
      },
      {
        en: 'For a few years the language barrier still held. The scams that worked were Russian-language phone fraud, and the vishing that did reach Estonian speakers came with detectable accents. The barrier was doing real work, and nobody had to pay to maintain it.',
        et: 'Mõneks aastaks pidas keelebarjäär veel. Töötasid venekeelsed telefonipettused ja kõneõngitsus, mis eestikeelsete inimesteni jõudis, tuli tuvastatava aktsendiga. Barjäär tegi tõelist tööd ja kellelgi ei tulnud selle ülalhoidmise eest maksta.',
      },
    ],
  },
  {
    heading: {
      en: '2024: the barrier holds, then breaks',
      et: '2024: barjäär peab, siis murdub',
    },
    paragraphs: [
      {
        en: "SEB's Baltic fraud statistics for the first half of 2024 are the clearest single document in this story. In Estonia, Estonian-speaking clients were 65 percent of fraud incidents. Russian speakers were over 30 percent. Nearly half of all losses were borne by Estonian-speaking clients, with Russian-speaking clients contributing an equal share.",
        et: 'SEB Balti pettusestatistika 2024. aasta esimese poolaasta kohta on selle loo kõige selgem dokument. Eestis moodustasid eestikeelsed kliendid 65 protsenti pettusejuhtumitest. Venekeelseid oli üle 30 protsendi. Ligi pool kogu kahjust langes eestikeelsete klientide kanda ja venekeelsete klientide osa oli sama suur.',
      },
      {
        en: "In early 2024 the barrier was still working. SEB found that phone fraud in the Baltics was \"mainly conducted in Russian\" and that a significant part of the population in Estonia and Latvia speaks Russian as a native language or at a conversational level. SEB's security chief Katlin Kukk put it this way: contrary to the belief that non-native speakers are the easier targets, most victims are native speakers of their own language who can also converse in Russian. Lithuania, where fewer people speak Russian, had the lowest phone-fraud losses. Estonian-speaking victims were being reached in Russian.",
        et: '2024. aasta alguses barjäär veel töötas. SEB leidis, et Baltikumis tehakse telefonipettusi peamiselt vene keeles ja et märkimisväärne osa Eesti ja Läti elanikest räägib vene keelt emakeelena või suhtlemiseks piisaval tasemel. SEB turvajuht Katlin Kukk sõnastas selle nii: vastupidiselt arusaamale, et kergem sihtmärk on teise emakeelega inimesed, on enamik ohvreid oma keele emakeelekõnelejad, kes oskavad ka vene keeles vestelda. Leedus, kus vene keelt räägitakse vähem, olid telefonipettuste kahjud kõige väiksemad. Eestikeelseteni jõuti vene keeles.',
      },
      {
        en: "The break came at the end of that year. Hannes Kelt, head of the North Prefecture's cyber and economic crime unit, told ERR in April 2026 that from late 2024 the calls were being made on a mass scale in Estonian as well, which meant that people who speak Estonian had started working in call centers in Ukraine and other countries. PPA's Jaagup Toompuu gave the same reason for the 2025 jump: the calls are no longer made only in Russian, because Estonian speakers have been recruited to target the whole population.",
        et: 'Murdumine tuli sama aasta lõpus. Põhja prefektuuri küber- ja majanduskuritegude talituse juht Hannes Kelt ütles ERR-ile 2026. aasta aprillis, et alates 2024. aasta lõpust hakati neid kõnesid tegema massilisel skaalal ka eesti keeles, mis tähendab, et Ukraina ja muude riikide kõnekeskustesse on tööle asunud eesti keelt oskavad inimesed. PPA Jaagup Toompuu tõi 2025. aasta hüppe ühe põhjusena välja sama: petukõnesid ei tehta enam ainult vene keeles, vaid kõnekeskustesse on värvatud eesti keelt kõnelevaid inimesi, et sihtida kogu riigi elanikkonda.',
      },
      {
        en: 'The SEB data set also shows who the victims are. Most fraud cases fall in the 36-50 age group, the 51-64 group carries the highest financial losses at over 30 percent of the identified total, most victims are women, and men lose more money, 53 percent of total losses. The average loss per victim across the Baltics was about 3,000 euros. That is the working population: people with bank accounts who answer unknown calls.',
        et: 'SEB andmestik näitab ka, kes ohvrid on. Enamik pettusejuhtumeid jääb vanuserühma 36–50, vanuserühm 51–64 kannab suurimat rahalist kahju, üle 30 protsendi tuvastatud kogusummast, enamik ohvreid on naised ja mehed kaotavad rohkem raha, 53 protsenti kogukahjust. Keskmine kahju ohvri kohta oli Baltikumis umbes 3000 eurot. See on tööealine elanikkond: inimesed, kellel on pangakonto ja kes vastavad tundmatutele kõnedele.',
      },
    ],
  },
  {
    heading: { en: 'Vishing becomes the main vector', et: 'Kõneõngitsusest saab peamine rünnakuvektor' },
    paragraphs: [
      {
        en: "Phone fraud overtook email phishing as the dominant vector during this period. SEB Latvia put vishing at nearly two-thirds of identified fraud damages in Latvia, and first in Estonia. RIA's 2026 yearbook describes the surge in phone scams and notes that people lose tens of thousands of euros a day to them.",
        et: 'Telefonipettus möödus sel perioodil valdava vektorina e-posti õngitsemisest. SEB Läti hinnangul moodustas kõneõngitsus Lätis tuvastatud pettusekahjudest ligi kaks kolmandikku ja Eestis oli see esikohal. RIA 2026. aasta aastaraamat kirjeldab telefonipettuste hüppelist kasvu ja märgib, et inimesed kaotavad nendega kümneid tuhandeid eurosid päevas.',
      },
      {
        en: 'The methodology industrialized into a standard two-call sequence. The first call impersonates the Health Insurance Fund (Tervisekassa) with a hook: unused benefits, a refund, a cheaper specialist-visit rate if you "confirm your details." Confirming means entering a Smart-ID PIN1. The second call comes from someone posing as the European Central Bank, your own bank, or the police, claiming the first call was the scam and your money must be "rescued" immediately. The second call can last for hours and is engineered to extract PIN2, the code that authorizes payments and loans.',
        et: 'Metoodika on tööstuslikuks muutunud ja järgib kahe kõne standardset jada. Esimene kõne esineb Tervisekassana ja tuleb konksuga: kasutamata hüvitised, tagasimakse või soodsam eriarsti visiiditasu, kui "kinnitate oma andmed". Kinnitamine tähendab Smart-ID PIN1 sisestamist. Teine kõne tuleb kelleltki, kes esineb Euroopa Keskpanga, teie enda panga või politseina ja väidab, et esimene kõne oligi pettus ning teie raha tuleb kohe "päästa". Teine kõne võib kesta tunde ja on üles ehitatud PIN2 väljameelitamiseks, koodi, mis annab loa maksete ja laenude jaoks.',
      },
      {
        en: 'The sequence is well documented because it keeps working. RIA describes a non-profit that lost over 120,000 euros to a three-call variant built on a fake electricity switchboard appointment: the victim confirmed the appointment with Smart-ID PIN1, then followed instructions from callers posing as police and bank staff, entering PIN1 and PIN2 repeatedly. ERR reports the same pattern in the largest phone-scam criminal case in recent years, the same case whose courier network is described below: 59 victims defrauded of a combined 600,000 euros over about six months from late 2024, with losses per victim from a few hundred euros to 117,000. Elari Haugas, head of the North Prefecture serious crime unit, spoke to ERR about the recruitment and the sentences in that case.',
        et: 'Jada on hästi dokumenteeritud, sest see töötab järjepidevalt. RIA kirjeldab mittetulundusühingut, mis kaotas üle 120 000 euro kolme kõne variandile, mis oli üles ehitatud võltsitud elektrikilbi paigaldusaja ümber: ohver kinnitas aja Smart-ID PIN1-ga ja järgis seejärel politsei ning pangatöötajatena esinevate helistajate juhiseid, sisestades korduvalt PIN1 ja PIN2. ERR kirjeldab sama mustrit viimaste aastate suurimas telefonipettuse kriminaalasjas, samas asjas, mille kullerivõrku allpool kirjeldatakse: 59 ohvrit peteti kokku 600 000 euro võrra umbes kuue kuu jooksul alates 2024. aasta lõpust, kahjud ohvri kohta ulatusid mõnesajast eurost 117 000 euroni. Põhja prefektuuri raskete kuritegude talituse juht Elari Haugas rääkis ERR-ile selle asja värbamisest ja karistustest.',
      },
    ],
  },
  {
    heading: { en: 'The professional supply chain', et: 'Professionaalne tarneahel' },
    paragraphs: [
      {
        en: 'The sophistication is mostly organizational. ERR and Äripäev, working with the Pealtnägija investigation program, ran an undercover recruitment experiment in early 2026 that documents the industry in detail.',
        et: 'Keerukus on peamiselt organisatsiooniline. ERR ja Äripäev viisid koos saatega "Pealtnägija" 2026. aasta alguses läbi variidentiteedi all värbamiskatse, mis dokumenteerib selle tööstuse üksikasjalikult.',
      },
      {
        en: 'The jobs are advertised openly on Telegram, in Russian. A position in Uzhhorod, western Ukraine, a city about the size of Tartu, offers Estonian or Lithuanian speakers free flights, free housing, free meals, and a salary of 1,600 euros plus 10 percent of each transaction. The ad copy claims salaries can reach 5,000 euros a week. The recruiter in the undercover calls confirmed the terms directly: no contract, weekly settlements, "the conditions are the same for everyone." If you speak Estonian or Lithuanian the job is in Uzhhorod; if you speak German, Odesa. Applicants\' Estonian is verified at B2 level. The recruiter claimed seven Estonian-speaking employees already worked there.',
        et: 'Töökuulutused on avalikult Telegramis, vene keeles. Koht Ukraina lääneosas Užhorodis, linnas, mis on umbes Tartu suurune, pakub eesti või leedu keele oskajatele tasuta lennupileteid, tasuta majutust, tasuta toitlustust ja 1600 euro suurust palka pluss 10 protsenti igast tehingust. Kuulutuse tekst lubab, et palk võib ulatuda 5000 euroni nädalas. Värbaja kinnitas variidentiteediga tehtud kõnedes tingimusi otse: lepingut ei ole, arveldatakse nädalas, "tingimused on kõigile ühesugused". Kui räägid eesti või leedu keelt, on töökoht Užhorodis; kui räägid saksa keelt, siis Odessas. Kandidaatide eesti keelt kontrollitakse B2-tasemel. Värbaja väitis, et seal töötab juba seitse eesti keelt kõnelevat inimest.',
      },
      {
        en: "The domestic end is a courier economy. A court case covered by ERR involved five Tallinn-based native Russian speakers, barely twenty years old, who collected bank cards from victims across the country, from Pärnu to Narva. Coordination ran over Telegram with disappearing messages. Couriers kept 5 to 10 percent of each withdrawal. One courier, Darja, described the largest single transfer at around 150,000 euros; the court record caps individual victim losses at 117,000, and the two figures have not been reconciled. The group received suspended sentences and was ordered to repay the full 600,000 euros, a sum the couriers themselves do not expect to ever be recovered in full. The organizers in that case were not identified.",
        et: 'Kodumaine ots on kulleriäri. ERRi kajastatud kohtuasjas oli viis Tallinnas elavat vene emakeelega noort, vaevu kahekümneaastased, kes kogusid ohvritelt üle riigi pangakaarte, Pärnust Narvani. Koordineerimine käis Telegramis kaduvate sõnumitega. Kullerid jätsid endale 5 kuni 10 protsenti igast väljavõetud summast. Üks kulleritest, Darja, kirjeldas suurimat ühekordset ülekannet umbes 150 000 euro suurusena; kohtutoimik piirab üksiku ohvri kahju 117 000 euroga ja neid kaht arvu ei ole kokku viidud. Rühm sai tingimisi karistused ja kohustuse maksta tagasi kogu 600 000 eurot, summa, mille täielikku laekumist kullerid ise ei usu. Selles asjas korraldajaid ei tuvastatud.',
      },
      {
        en: 'The infrastructure layer is international. In mid-October 2025, an international police operation dismantled a network that sold phone numbers registered in various countries and provided anonymous accounts to fraud perpetrators. Latvian police arrested five suspects including the alleged leader and seized 40,000 active SIM cards. The network enabled losses exceeding 5 million euros across at least 3,200 victims in Estonia, Latvia, and Austria. This is the SIM box problem made visible at scale: local-looking numbers, no local presence.',
        et: 'Taristu on rahvusvaheline. 2025. aasta oktoobri keskel lammutas rahvusvaheline politseioperatsioon võrgustiku, mis müüs eri riikides registreeritud telefoninumbreid ja pakkus pettuste toimepanijatele anonüümseid kontosid. Läti politsei pidas kinni viis kahtlusalust, sealhulgas väidetava juhi, ja konfiskeeris 40 000 aktiivset SIM-kaarti. Võrgustik võimaldas Eestis, Lätis ja Austrias vähemalt 3200 ohvril tekkinud üle 5 miljoni euro suuruse kahju. See on SIM-boksi probleem suures mahus nähtavaks tehtud: kohaliku välimusega numbrid, kohalikku kohalolekut ei ole.',
      },
    ],
  },
  {
    heading: {
      en: 'Business fraud: fewer cases, the biggest single hits',
      et: 'Äripettus: vähem juhtumeid, suurimad kahjud juhtumi kohta',
    },
    paragraphs: [
      {
        en: "Phone scams hit individuals most often. RIA's yearbook says that \"by loss amount, business-related fraud causes the most significant financial damage.\" In aggregate the police count looks different: PPA puts fraud aimed at businesses at 2.7 million euros in 2025, against 11.5 million for phone scams and 6.3 million for investment fraud. Business cases are rarer, and single cases are the largest.",
        et: 'Telefonipettused tabavad kõige sagedamini eraisikuid. RIA aastaraamatu järgi tekitavad kahjusumma poolest kõige suuremat rahalist kahju ettevõtetega seotud pettused. Politsei kogusummades on pilt teine: PPA hindab ettevõtetele suunatud pettuste kahjuks 2025. aastal 2,7 miljonit eurot, petukõnede kahjuks 11,5 miljonit ja investeerimispettuste kahjuks 6,3 miljonit eurot. Ettevõtteid tabab pettus harvem, kuid ühe juhtumi kahju on suurim.',
      },
      {
        en: "The case RIA leads with is Hekotek, a machinery manufacturer. In August 2025 it became public that fraudsters had moved 1.6 million euros out of the company in 52 transfers within two hours. The chain: a call to the chief financial officer posing as the Health Insurance Fund, a new Smart-ID account created in the CFO's name with information from that call, further calls posing as bank staff and police, and remote access to the CFO's computer via AnyDesk. Part of the money was recovered; final losses still exceed one million euros, and the company is in litigation with its former CFO over responsibility.",
        et: 'Juhtum, millega RIA alustab, on masinaehitaja Hekotek. 2025. aasta augustis sai avalikuks, et petturid viisid ettevõttest kahe tunni jooksul 52 ülekandega välja 1,6 miljonit eurot. Ahel: kõne finantsjuhile Tervisekassana esinedes, sellest kõnest saadud andmetega finantsjuhi nimele loodud uus Smart-ID konto, edasised kõned pangatöötajate ja politseinikena esinedes ning AnyDeski kaudu saadud kaugligipääs finantsjuhi arvutile. Osa rahast saadi tagasi; lõplik kahju ületab endiselt miljonit eurot ja ettevõte on vastutuse üle kohtuvaidluses oma endise finantsjuhiga.',
      },
      {
        en: "The rest of the yearbook's case list reads like a taxonomy of preventable failure. An invoice scam in November 2025: a company received an email from a long-standing supplier stating its bank details had changed, paid an approximately 50,000-euro invoice, and the money was gone. A CEO-fraud case from 2022 at the Estonian Traditional Music Centre, which organizes the Viljandi folk festival, became public in November 2025: three transfers totaling over 53,000 euros to foreign accounts before discovery. A gift-card variant cost one company about 550 euros. The countermeasures RIA recommends are mundane and mostly free: two-person approval rules, SPF/DKIM/DMARC, verifying changed bank details by calling a known number.",
        et: 'Ülejäänud aastaraamatu juhtumiloend loeb nagu ennetatavate ebaõnnestumiste taksonoomia. Arvepettus 2025. aasta novembris: ettevõte sai pikaajaliselt tarnijalt e-kirja, milles teatati pangaandmete muutumisest, maksis ligikaudu 50 000 euro suuruse arve ja raha oli läinud. 2022. aastal ettevõtte juhi nimel tehtud kelmus Eesti Pärimusmuusika Keskuses, mis korraldab Viljandi pärimusmuusika festivali, sai avalikuks 2025. aasta novembris: kolm ülekannet kokku üle 53 000 euro välismaistele kontodele, enne kui asi avastati. Kinkekaardi variant maksis ühele ettevõttele umbes 550 eurot. Vastumeetmed, mida RIA soovitab, on argised ja enamasti tasuta: kahe inimese kinnitusreegel, SPF, DKIM ja DMARC ning muudetud pangaandmete kontrollimine teadaoleval numbril helistades.',
      },
      {
        en: "A large 2026 case followed the Hekotek script. In May 2026 the Estonian Artists' Association lost about 700,000 euros, mostly Ministry of Culture funding earmarked for artists' salaries. Police said the fraudsters first contacted the association's chief accountant on 7 May, posing as an employee of Omniva's delivery center with a registered letter to hand over. Smart-ID PINs and calls from people posing as officials followed. Police later detained two suspects.",
        et: 'Üks suur 2026. aasta juhtum järgis Hekoteki stsenaariumi. 2026. aasta mais kaotas Eesti Kunstnike Liit umbes 700 000 eurot, peamiselt Kultuuriministeeriumi sihtotstarbelist raha kunstnike palkadeks. Politsei sõnul võtsid petturid 7. mail ühendust liidu pearaamatupidajaga, esinedes Omniva kättetoimetamiskeskuse töötajana, kellel on üle anda tähitud kiri. Järgnesid Smart-ID PIN-koodid ja kõned ametnikena esinevatelt inimestelt. Hiljem pidas politsei kinni kaks kahtlusalust.',
      },
    ],
  },
  {
    heading: { en: 'AI is coming for the last barrier', et: 'Tehisintellekt läheneb viimasele barjäärile' },
    paragraphs: [
      {
        en: 'The final stage is the one the headlines reach for first, and the chronology matters. As of June 2025, the native-level Estonian calls were being made by real people. Taavi Kotka, former Estonian government CTO, told ERR in June 2025 that he had received a native-fluency Tervisekassa call himself, filmed it, and concluded the caller was definitely a real Estonian: "I haven\'t yet seen AI making calls in such good Estonian as yet." His forecast was that AI would close the gap "in the not too distant future," and that the economics already favor the scammers: "You can make and send hundreds of thousands of such calls to us in a few hours."',
        et: 'Viimane etapp on see, mille poole pealkirjad esimesena haaravad, ja kronoloogia on oluline. 2025. aasta juuni seisuga tegid emakeeletasemel eestikeelseid kõnesid päris inimesed. Taavi Kotka, Eesti riigi endine IT-juht, rääkis ERR-ile 2025. aasta juunis, et sai ise emakeeletasemel Tervisekassa kõne, filmis selle üles ja järeldas, et helistaja oli kindlasti päris eestlane: "Ma ei ole veel näinud, et tehisintellekt teeks nii head eesti keelt kõnesid." Tema prognoos oli, et tehisintellekt kaotab selle vahe "mitte kuigi kauges tulevikus" ja et majandusloogika on juba petturite poolel: "Selliseid kõnesid saab meile mõne tunniga teha ja saata sadu tuhandeid."',
      },
      {
        en: 'Where AI is already operational is in text and video. The 2026 yearbook describes a deepfake video of President Alar Karis that circulated in 2025, promoting a fake government investment platform that guaranteed 870 euros a week, and used the president\'s authority to build credibility. Investment fraud was the other growth line: RIA reports that people in Estonia lost nearly six million euros to investment scams in 2025 alone. The yearbook\'s individual cases include a 57-year-old man who transferred 504,400 euros from his company\'s accounts to a fake trading platform over six months under an adviser\'s guidance, and a 68-year-old woman who lost nearly 15,000 euros to a broker who disappeared with her deposits.',
        et: 'Kus tehisintellekt juba töötab, on tekst ja video. 2026. aasta aastaraamat kirjeldab 2025. aastal levinud süvavõltsitud videot president Alar Karisest, mis reklaamis võltsitud riiklikku investeerimisplatvormi, lubas 870 eurot nädalas ja kasutas usaldusväärsuse loomiseks presidendi autoriteeti. Investeerimispettus oli teine kasvuliin: RIA teatel kaotasid Eesti inimesed ainuüksi 2025. aastal investeerimiskelmustele ligi kuus miljonit eurot. Aastaraamatu üksikjuhtumite hulgas on 57-aastane mees, kes kandis poole aasta jooksul nõustaja juhendamisel oma ettevõtte kontodelt võltsitud kauplemisplatvormile 504 400 eurot, ja 68-aastane naine, kes kaotas ligi 15 000 eurot maaklerile, kes tema sissemaksetega kadus.',
      },
      {
        en: "Across these cases, AI lowered the cost of the parts of the fraud economy that were still expensive. RIA's yearbook already describes fluent-Estonian scams as the norm, and 2025 produced a deepfake of the president. Voice is the input still made by humans. In May 2026 police told ERR it is still difficult to confirm how often AI voices are used in scam calls, and TalTech's Tanel Alumäe said synthetic Estonian voices are not yet as convincing as English ones. Both expect that to change; Kotka's forecast is the same.",
        et: 'Nendes juhtumites alandas tehisintellekt pettusemajanduse nende osade hinda, mis olid veel kallid. RIA aastaraamat kirjeldab soravat eesti keelt kasutavaid pettusi juba normina ja 2025. aasta tõi presidendi süvavõltsingu. Hääl on sisend, mida teevad veel inimesed. 2026. aasta mais ütles politsei ERR-ile, et endiselt on raske kindlaks teha, kui sageli petukõnedes tehishääli kasutatakse, ning TalTechi Tanel Alumäe sõnul ei ole sünteetilised eestikeelsed hääled veel nii veenvad kui ingliskeelsed. Mõlemad ootavad, et see muutub; sama on Kotka prognoos.',
      },
    ],
  },
  {
    heading: { en: '2026 so far', et: '2026. aasta seni' },
    paragraphs: [
      {
        en: 'ERR, citing the Police and Border Guard Board, reported on 13 August 2026 that police received 1,816 reports of phone and internet fraud in the first six months of 2026, and that people in Estonia lost 13.2 million euros. This is a news report citing PPA, not a PPA release. According to PPA\'s Jaagup Toompuu, more than half of the cases were multi-stage phone scams: a call from a supposed service provider hands the victim on to a fake bank security department, and then to someone posing as a police officer. Investment fraud now runs on fake news pages featuring well-known Estonians, among them Arvo Pärt and Ott Tänak.',
        et: 'ERR teatas 13. augustil 2026 Politsei- ja Piirivalveametile viidates, et politsei sai 2026. aasta esimese kuue kuuga 1816 teadet telefoni- ja internetikelmuste kohta ning Eesti elanikud kaotasid 13,2 miljonit eurot. Tegu on PPA-le viitava uudislooga, mitte PPA enda teatega. PPA Jaagup Toompuu sõnul olid enam kui pooled juhtumid mitmeastmelised kõnekelmused: väidetava teenusepakkuja kõne järel helistab ohvrile panga turvaosakonnana esinev kelm ja seejärel politseinikuna esinev kelm. Investeerimiskelmused kasutavad nüüd libauudiseid tuntud eestlaste nägudega, nende seas Arvo Pärt ja Ott Tänak.',
      },
      {
        en: 'The banks have started to change the approval step. SK ID Solutions made Smart-ID+ available to integrators on 26 June 2025. With it, the user starts the login by scanning a QR code shown on the screen, so a caller can no longer simply trigger a request for the victim to approve. Bigbank became the first Estonian bank to go live with it on 11 June 2026, LHV followed from 16 June, and SEB and Swedbank say they will introduce it later in 2026. Smart-ID+ makes this kind of vishing much harder. It does not rule it out: LHV said in January 2026 that QR flows stay vulnerable when the fraudster is in live contact with the victim.',
        et: 'Pangad on hakanud kinnitussammu muutma. SK ID Solutions tegi Smart-ID+ liidestajatele kättesaadavaks 26. juunil 2025. Selle puhul alustab kasutaja sisselogimist ise, skannides ekraanil kuvatud QR-koodi, nii et helistaja ei saa enam lihtsalt algatada päringut, mille ohver kinnitab. Bigbank võttis selle Eesti pankadest esimesena kasutusele 11. juunil 2026, LHV alates 16. juunist ning SEB ja Swedbank lubavad selle kasutusele võtta 2026. aasta jooksul. Smart-ID+ muudab sellise kõneõngitsuse palju raskemaks, kuid ei välista seda: LHV ütles 2026. aasta jaanuaris, et QR-koodiga lahendused jäävad haavatavaks, kui pettur on ohvriga samal ajal ühenduses.',
      },
      {
        en: 'Enforcement has also reached an organizer. In April 2026 Harju County Court convicted Artur Yermolayev, the Ukrainian leader of a criminal organization specializing in phone fraud, under a plea bargain. He received a five-year sentence, most of it suspended, a deportation order and a ten-year Schengen entry ban; the court took into account his agreement to pay 8.5 million euros to the Estonian state. Telecom operators work earlier in the chain: Telia blocked about 24 million scam calls in 2025, and the three large operators about 35 million together (Eesti Pank seminar, March 2026).',
        et: 'Õiguskaitse on jõudnud ka korraldajani. 2026. aasta aprillis mõistis Harju maakohus kokkuleppemenetluses süüdi telefonipettustele spetsialiseerunud kuritegeliku ühenduse Ukraina päritolu juhi Artur Jermolajevi. Ta sai viieaastase vangistuse, millest suurem osa on tingimisi, väljasaatmise ja kümneaastase Schengeni ala sissesõidukeelu; karistuse määramisel arvestati, et ta oli nõus maksma Eesti riigile 8,5 miljonit eurot. Telekomioperaatorid tegutsevad ahelas varem: Telia blokeeris 2025. aastal umbes 24 miljonit petukõnet ja kolm suurt operaatorit kokku umbes 35 miljonit (Eesti Panga seminar, märts 2026).',
      },
    ],
  },
  {
    heading: { en: 'What the pattern means', et: 'Mida muster tähendab' },
    paragraphs: [
      {
        en: 'Five conclusions follow from the sources.',
        et: 'Allikatest järeldub viis asja.',
      },
      {
        en: 'The language barrier was a security control. Estonia was protected for years by the fact that fluent Estonian was scarce. That protection was real, invisible, and free, and its collapse is the single most important event in this story. Everything else is a consequence.',
        et: 'Keelebarjäär oli turvameede. Eestit kaitses aastaid see, et sorav eesti keel oli haruldane. Kaitse oli tõeline, nähtamatu ja tasuta ning selle kokkuvarisemine on selle loo kõige olulisem sündmus. Kõik ülejäänu on tagajärg.',
      },
      {
        en: 'The collapse was structural. Nothing in the sources suggests Estonians became more gullible; the supply chain changed, first with recruited native speakers, then with AI. Campaigns and warnings ran for the entire year of 2025, as RIA notes, and losses still rose to 29 million euros, nearly double by PPA\'s count. Awareness campaigns cannot replace a barrier that has gone.',
        et: 'Kokkuvarisemine oli struktuurne. Miski allikates ei viita sellele, et eestlased oleksid muutunud kergeusklikumaks; muutus tarneahel, esmalt värvatud emakeelekõnelejatega, seejärel tehisintellektiga. Kampaaniad ja hoiatused käisid, nagu RIA märgib, terve 2025. aasta ja kahju kasvas ikkagi 29 miljoni euroni, PPA arvestuse järgi peaaegu kahekordseks. Teavituskampaaniad ei asenda barjääri, mida enam ei ole.',
      },
      {
        en: "The banking system chose the attack surface. Paršovs argued in January 2026 that the technical options for protecting Smart-ID approval flows had far outpaced deployment. The fixes existed long before banks deployed them. Smart-ID+, which makes the user start the operation by scanning a QR code, finally went live at Bigbank and LHV in June 2026, with SEB and Swedbank promising it later in the year. The protocol analysis is in my Smart-ID report; the fraud data up to mid-2026 is its cost column.",
        et: 'Pangandussüsteem valis rünnakupinna. Paršovs väitis 2026. aasta jaanuaris, et tehnilised võimalused Smart-ID kinnitusprotsessi kaitsmiseks on juurutamisest kaugele ette jõudnud. Lahendused olid olemas ammu enne, kui pangad need kasutusele võtsid. Smart-ID+, mille puhul kasutaja alustab toimingut ise QR-koodi skannides, jõudis Bigbanki ja LHV-sse lõpuks 2026. aasta juunis ning SEB ja Swedbank lubavad selle samal aastal hiljem. Protokolli analüüs on minu Smart-ID raportis; pettusestatistika kuni 2026. aasta keskpaigani on selle kulurida.',
      },
      {
        en: 'Vishing is the vector that matters. Email phishing is a mass-market lottery. Phone fraud is a two-hour interactive process that harvests both PINs and, in the courier cases, the physical card. It is higher-touch, higher-yield, and it is what the call centers are staffed for. Defenses that focus on email miss the part of the pipeline that is actually industrialized.',
        et: 'Kõneõngitsus on vektor, mis loeb. E-posti õngitsemine on massiturule suunatud loterii. Telefonipettus on kahetunnine vahetu protsess, mis kogub kokku mõlemad PIN-koodid ja kulleritega juhtumites ka füüsilise kaardi. See nõuab rohkem vahetut kontakti, annab rohkem tulu ja just selle jaoks on kõnekeskused mehitatud. Kaitsemeetmed, mis keskenduvad e-kirjale, jätavad vahele selle osa ahelast, mis on tegelikult tööstuslikuks muudetud.',
      },
      {
        en: "The next stage is predictable. AI voice synthesis in fluent Estonian is the obvious completion of the trajectory, Kotka's forecast, and nothing in the 2025 data argues against it. The defense that works against it is the same one that works against the current wave: make the approval step itself phishing-resistant, move verification off the phone call, and treat the user's PIN as a secret that no legitimate party ever asks for.",
        et: 'Järgmine etapp on ette näha. Soravat eesti keelt kõnelev tehishääl on selle trajektoori ilmne lõpp, Kotka prognoos, ja miski 2025. aasta andmetes ei räägi sellele vastu. Kaitse selle vastu on sama, mis töötab praeguse laine vastu: muuta kinnitussamm ise õngitsemiskindlaks, viia kontrollimine telefonikõnest välja ja kohelda kasutaja PIN-koodi saladusena, mida ükski seaduslik osapool kunagi ei küsi.',
      },
    ],
  },
];

const sources = [
  {
    label: 'RIA, "A surge in scams costs Estonian people 29 million euros", Cyber Security in Estonia 2026',
    url: 'https://www.ria.ee/en/surge-scams-costs-estonian-people-29-million-euros',
    note: '2025 losses of 29 million euros, "three times more than the year before"; Hekotek case; electricity-switchboard case; Karis deepfake; investment fraud cases; October 2025 SIM network takedown',
  },
  {
    label: 'RIA, "Pettustelaviini kahju: 29 miljonit" (Estonian), Cyber Security in Estonia 2026',
    url: 'https://www.ria.ee/pettustelaviini-kahju-29-miljonit',
    note: 'Estonian-language version of the same yearbook article',
  },
  {
    label: 'ERR News, "Investigation: How phone scammers hire Estonian-speaking recruits" (Taavi Eilat, 11.02.2026)',
    url: 'https://news.err.ee/1609938083/investigation-how-phone-scammers-hire-estonian-speaking-recruits',
    note: 'Uzhhorod recruitment terms, B2 verification, courier case, 600,000-euro case (ERR narration), ERR\'s own 5-10 million historical range, 29 million "official police figures", Elari Haugas quotes',
  },
  {
    label: 'ERR News, "Phone scammers now speaking in native-level Estonian" (09.06.2025)',
    url: 'https://news.err.ee/1609717383/phone-scammers-now-speaking-in-native-level-estonian',
    note: 'Taavi Kotka quotes on native-fluency calls and the AI trajectory',
  },
  {
    label: 'ERR News, "Banks fail to implement measures against Smart-ID phishing" (Arnis Paršovs, January 2026)',
    url: 'https://news.err.ee/1609910821/arnis-parsovs-banks-fail-to-implement-measures-against-smart-id-phishing',
    note: 'Smart-ID phishing losses over six years; deployment lag behind technical options',
  },
  {
    label: 'Baltic Times / LETA, "Fraud in the Baltics: Phishing targeting predominantly local language speakers" (30.07.2024)',
    url: 'https://www.baltictimes.com/fraud_in_the_baltics__phishing_targeting_predominantly_local_language_speakers/',
    note: 'SEB Baltic fraud statistics H1 2024: 65% Estonian-speaking incidents, phone fraud "mainly conducted in Russian", victim demographics, SEB Latvia vishing share, Katlin Kukk quotes',
  },
  {
    label: 'Police and Border Guard Board, "Kelmid petsid Eesti inimestelt välja 29 miljonit eurot" (19.01.2026)',
    url: 'https://www.politsei.ee/et/uudised/kelmid-petsid-eesti-inimestelt-vaelja-29-miljonit-eurot-13196',
    note: '16 million euros lost in 2024, nearly doubled in 2025; 3,685 victims; phone scams 11.5M, investment 6.3M, business-targeted 2.7M, sales 1.7M; Jaagup Toompuu on Estonian-speaking call-center recruits',
  },
  {
    label: 'RIA, Cyber Security in Estonia 2026 (PDF, ENISA mirror)',
    url: 'https://www.enisa.europa.eu/sites/default/files/ncss-map/strategies/additional-documents/Cyber-security-in-Estonia-2026.pdf',
    note: 'fraud cases "drawn from reports by the Police and Border Guard Board and RIA"; business fraud and loss amount',
  },
  {
    label: 'ERR, "ERR Ukrainas: sõda pakub petistele uusi võimalusi kuritegudeks" (05.04.2026)',
    url: 'https://www.err.ee/1609987236/err-ukrainas-soda-pakub-petistele-uusi-voimalusi-kuritegudeks',
    note: 'Hannes Kelt: mass Estonian-language calls from late 2024; phone scams 11.5 million euros in 2025',
  },
  {
    label: 'ERR, "Kelmid petsid Eesti elanikelt poole aastaga välja 13,2 miljonit eurot" (13.08.2026)',
    url: 'https://www.err.ee/1610109475/kelmid-petsid-eesti-elanikelt-poole-aastaga-valja-13-2-miljonit-eurot',
    note: 'secondary report citing PPA: 1,816 reports and 13.2 million euros lost in H1 2026; multi-stage phone scams over half of cases',
  },
  {
    label: 'ERR News, "Banks taking on scammers with new Smart-ID+ upgrade" (June 2026)',
    url: 'https://news.err.ee/1610054356/banks-taking-on-scammers-with-new-smart-id-upgrade',
    note: 'Smart-ID+ QR flow; Bigbank first, LHV next; SEB and Swedbank later in 2026',
  },
  {
    label: 'ERR News, "Estonian Artists\' Association taken for €700,000 in massive scam" (19.05.2026)',
    url: 'https://news.err.ee/1610027830/estonian-artists-association-taken-for-700-000-in-massive-scam',
    note: 'Omniva pretext, about 700,000 euros lost',
  },
  {
    label: 'ERR, "Politsei pidas kinni kunstnike liidu rahavarguse kaks kahtlusalust"',
    url: 'https://www.err.ee/1610039407/politsei-pidas-kinni-kunstnike-liidu-rahavarguse-kaks-kahtlusalust',
    note: 'two suspects detained in the Artists\' Association case',
  },
  {
    label: 'ERR News, "Phone scammer handed suspended sentence in €8.5 million plea bargain" (30.04.2026)',
    url: 'https://news.err.ee/1610011252/phone-scammer-handed-suspended-sentence-in-8-5-million-plea-bargain',
    note: 'Artur Yermolayev plea bargain, sentence and 8.5 million euro payment',
  },
  {
    label: 'ERR News, "Improved Estonian AI voice cloning making phone scams harder to spot" (21.05.2026)',
    url: 'https://news.err.ee/1610029993/improved-estonian-ai-voice-cloning-making-phone-scams-harder-to-spot',
    note: 'police on confirming AI voice use; Tanel Alumäe on Estonian speech synthesis',
  },
  {
    label: 'Eesti Pank, payment-fraud seminar (05.03.2026)',
    url: 'https://www.eestipank.ee/en/press/prevention-systematic-cooperation-and-increased-awareness-help-tackle-payment-fraud-05032026',
    note: 'Telia blocked about 24 million scam calls in 2025; about 35 million across the three large operators',
  },
  {
    label: 'Statistics Estonia, "Population census: 76% of Estonia\'s population speak a foreign language"',
    url: 'https://www.stat.ee/en/news/population-census-76-estonias-population-speak-foreign-language',
    note: '2021 census: Estonian is the mother tongue of 67% of the population',
  },
  {
    label: 'Baltic Times, "Number of impactful cyber incidents in Estonia nearly doubled on year"',
    url: 'https://www.baltictimes.com/number_of_impactful_cyber_incidents_in_estonia_nearly_doubled_on_year/',
    note: 'Police and Border Guard Board: nearly 8 million euros lost to scams in 2023, about 22,000 euros per day',
  },
  {
    label: 'Eesti Pank, "The average loss in bank transfer frauds last year was 1,500 euros" (03.12.2025)',
    url: 'https://www.eestipank.ee/en/press/average-loss-bank-transfer-frauds-last-year-was-1500-euros-03122025',
    note: '13.5 million euros in payment fraud in 2024',
  },
  {
    label: "Companion report on this site: The Achilles' heel of Estonia's e-state — Smart-ID / eID research",
    url: 'https://tomabel.ee/disclosures/smart-id-achilles-heel/',
    note: 'protocol analysis of the consent layer that the fraud statistics exploit',
  },
];

const disclosureParagraphs: Bi[] = [
  {
    en: 'This report is a synthesis of public reporting and statistics. It describes no live system under test, discloses no vulnerability, and contains no private or client material. All cases cited were already public in Estonian and English media before this report. Figures are attributed to the authority that published them; where authorities disagree, both figures are given with their sources.',
    et: 'See raport on kokkuvõte avalikest teadetest ja statistikast. See ei kirjelda ühtegi testitavat töötavat süsteemi, ei avalikusta ühtegi turvaauku ega sisalda ühtegi privaatset ega kliendimaterjali. Kõik viidatud juhtumid olid enne selle raporti valmimist juba avalikud Eesti ja ingliskeelses meedias. Arvud on omistatud asutusele, kes need avaldas; kus asutused on eri meelt, on mõlemad arvud koos allikatega esitatud.',
  },
  {
    en: "Research conduct follows the site's security research policy.",
    et: 'Uurimistöö järgib saidi turvauuringute põhimõtteid.',
  },
  {
    en: "Disclosure: the author runs ProksiAbel OÜ, which builds Proksimity, a commercial server-side traffic identity-assurance product. The conclusions also point to the author's own Smart-ID research.",
    et: 'Huvide avalikustamine: autor juhib ettevõtet ProksiAbel OÜ, mis arendab Proksimityt, kommertslikku serveripoolset liikluse identiteedi tagamise toodet. Järeldused viitavad ka autori enda Smart-ID uurimistööle.',
  },
  {
    en: 'Corrections, 4 October 2026: an earlier version read SEB\'s H1 2024 data as proof that the language barrier had already fallen; SEB said phone fraud was then mainly conducted in Russian, and the shift is now dated to late 2024 from police statements. I also removed an unsupported explanation of the RIA/PPA gap, corrected phone scams from "the majority" to the largest category (about 40 percent) of 2025 losses, attributed the five-to-ten-million range to ERR, limited SEB\'s two-thirds vishing share to Latvia, narrowed the period to 2017–2026, and added the 2026 police figures and the Smart-ID+ rollout.',
    et: 'Parandused, 4. oktoober 2026: varasem versioon tõlgendas SEB 2024. aasta esimese poolaasta andmeid tõendina, et keelebarjäär oli juba langenud; SEB sõnul tehti telefonipettusi siis peamiselt vene keeles ja nihe on nüüd politsei ütluste põhjal dateeritud 2024. aasta lõppu. Lisaks eemaldasin RIA ja PPA arvude erinevuse põhjendamata selgituse, parandasin väite, et petukõned moodustasid 2025. aasta kahjust "enamiku" (tegelikult suurim kategooria, umbes 40 protsenti), omistasin viie kuni kümne miljoni vahemiku ERR-ile, piirasin SEB kahe kolmandiku suuruse kõneõngitsuse osakaalu Lätiga, kitsendasin käsitletavat perioodi aastatele 2017–2026 ning lisasin 2026. aasta politseiandmed ja Smart-ID+ kasutuselevõtu.',
  },
];

export default function TheEvolutionOfCyberFraudInEstoniaResearchPage() {
  const { language } = useTranslation();
  const isEn = language === 'en';

  return (
    <article>
      <ArticleHeader
        backTo="/disclosures"
        back={<>← {isEn ? 'Back to research' : 'Tagasi uuringute juurde'}</>}
        kicker={isEn ? 'Research · Reference Paper · Anti-Fraud' : 'Uurimus · Viitetöö · Pettusevastane'}
        title={title[language]}
        standfirst={standfirst[language]}
        published="2026-08-26"
        updated="2026-10-04"
        meta={[<>
              {isEn ? 'Published · August 26, 2026' : 'Avaldatud · 26. august 2026'}
            </>, <>
              {isEn ? 'Updated · October 4, 2026' : 'Uuendatud · 4. oktoober 2026'}
            </>, <>
              {isEn ? '16 min read' : '16 min lugemist'}
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
                {isEn
                  ? 'The separate technical report referenced above is '
                  : 'Ülal viidatud eraldi tehniline raport on '}
                <Link
                  to="/disclosures/smart-id-achilles-heel"
                  className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
                >
                  {isEn
                    ? "The Achilles' heel of Estonia's e-state"
                    : "Eesti e-riigi Achilleuse kand"}
                </Link>
                {isEn
                  ? ', which covers the Smart-ID consent-step weakness this fraud data measures the cost of.'
                  : ', mis käsitleb Smart-ID nõusolekusammu nõrkust, mille kulu see pettuseandmestik mõõdab.'}
              </p>
            </div>
          </section>

          <section className="mt-16 max-w-measure">
            <h2 className="font-display text-3xl leading-tight text-foreground">
              {isEn ? 'Disclosure status' : 'Avalikustamise staatus'}
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted">
              {disclosureParagraphs.map((paragraph) => (
                <p key={paragraph.en}>
                  <PolicyText text={paragraph[language]} />
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>

      <ArticleProof
        slug="the-evolution-of-cyber-fraud-in-estonia"
        expectedSha256="8b2068b35918aa25538ab61f1f54a6c55a219ce4af2576e8b163057115b5fcb7"
      />
    </article>
  );
}
