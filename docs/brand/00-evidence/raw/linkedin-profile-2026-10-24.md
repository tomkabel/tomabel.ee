# LinkedIn profile hr-abel — live capture 2026-10-24
Source: https://www.linkedin.com/in/hr-abel/

## main_profile
Tom Kristian Abel

Founding Engineer | Cyber-Kratt | Ex-Black Hat

Estonia

·

Contact info

kood/Jõhvi

244 connections

Open to
Add section
Enhance profile
Resources
Analytics

Private to you

198 profile views

Discover who’s viewed your profile.

36 post impressions

Check out who’s engaging with your posts.

Past 7 days

14 search appearances

See how often you appear in search results.

Show all
About

I construct and build highly secure systems for Design Partners - secure from the start, by considering how an attacker thinks.

In my previous role, I worked on the other side of authentication security where I analyzed, avoided and used weaknesses in browser defenses, TLS fingerprinting and anti fraud systems. 
It is important to me to be open about this history because it provides the basis for my current activities. 
As I understand the specific ways that authentication and browser defenses fail in real life scenarios, I leverage this specialized information to design systems that are secure from the start.

The name "Cyber-Kratt" is a reference to the kratt, which is a creature from Estonian stories, built from household items, that is made to collect riches for its maker. It is resourceful and effective but will turn on its owner if left without a task. A two-edged sword. Its strength needs careful direction so that it performs useful tasks.

I perform this work openly, and take full personal responsibility for my research and the opinions I express.
… more

Top skills

Phishing-resistant Authentication • FIDO2 / WebAuthn • Browser Security • TLS Fingerprint • Secure-by-Design

Featured

Reshared by Tom Kristian Abel

Vaatasid seda FBI "takedown" pilti ja märkasid PPA vappi seal keskel? See pole seal ilu pärast.
...

Mõned tüübid üritasid Eestis varjata 14 miljoni dollarise kelmuse "peamootorit". Ma ei tea, mis neil peas toimus – kas see oli mingi vene häkkerite kargokultus, loll lootus, et kui teised tegid, siis meil näkkab ka, või lihtsalt täielik suutmatus reaalsust analüüsida.

Kuidagi on tekkinud see väärarusaam, et Eesti on mingi mugav "vahejaam". Meenutatakse Fancy Beari Tallinna serverites 2016. aastal või seda, kuidas Cozy Bear kunagi siinset taristut kasutas. Arvatakse, et madal ping Moskva suunal ja hea IT-värk tähendab automaatselt "bulletproof" kaitset. Et siin on anonüümne ja keegi ei küsi küsimusi.

𝗩𝗶𝗴𝗮.

Nad unustavad ära, et e-Eesti ei ole lihtsalt läikiv turunduslause, millega konverentsidel eputada. See tähendab, et siin on kuradi raske märkamatult tegutseda. Kui su naabriks on NATO küberkaitsekeskus, siis Eesti on viimane koht maailmas, kuhu oma musta äri serverit peita. See on nagu üritaks narkoladu politseijaoskonna keldris pidada.

PPA ei tõmmanud lihtsalt juhet seinast. Nad võtsid terve seina. Professionaalselt. Enne kui keegi "delete" vajutada jõudis, oli neil juba käes kõik:

✅ Administraatori logid ja IP-aadressid
✅ Terved andmebaasid koos kasutajate infoga.
✅ Platvormi lähtekood viimse reani.


See müüt Eestist kui turvasadamast on nüüd ametlikult prügikastis. Serveri siia toomine on kurjategija poolt sisuliselt vabatahtlik ülestunnistus ja tõendite kandikul ettesöötmine. Eesti on FBI jaoks muutunud põhimõtteliselt "Google Drive’iks", kust saab mugavalt varukoopiaid kätte, kui keegi kuskil pätti teeb.

Väga kõva sooritus, PPA. Päriselt ka.

#CyberSecurity #OpSec #Estonia #PPA #FBI #LawEnforcement #PPA #InfoSec #CyberCrime

8 reactions · 1 comment
8 · 1 comment

Post

In 2022, on a Russian cybercrime forum, two threat actors discuss FAANG killing passwords. One of them predicts passkeys would flop and phishing would never die.
I was half right.

May 2022. Apple, Google and Microsoft announce they're killing the password. Someone on exploit.in posts the news under the title "End of phishing?"

My reply, as "Dead Souls"
 (yes, Dead Souls, see Nikolai Gogol. same name novel):

"FIDO was delivered half-assed."
"Nobody will buy a $45 dongle just to log in."
"They'll do nothing for it."
"Phishing will continue as it currently does."

(Excuse the language. 2022 me was more confidently ballsy than polite)

Four years later, here's my scorecard.

❌ The dongle. Passkeys ended up on the phone you already carry. I ordered 2 YubiKey dongles, both are MIA and lost I dunno where .
❌ "They'll do nothing." They built it into every major phone OS and browser.
✅ "They'll keep password logins." Most accounts with a passkey still accept a password, an SMS code or an email reset.
✅ Phishing continued. Passkeys work fine. Attackers just stopped going after the login.

Today's phishing kits don't try to steal your passkey. They push you onto the password path instead. Or they let you sign in properly and steal the session afterward.
The door got stronger, so they use the window next to it. Lol.

What I got right had nothing to do with cryptography. I was sitting where attackers sit, and from there it was obvious that defenders measure their strongest path and attackers use the weakest one.

So if your security story ends at "we support passkeys," ask:
→ do you also support password + OTP?
→ are passkeys enforced to all?
→ After login, how do you know the session still belongs to the same person?

I've spent the last while building an answer to that last one: Proksimity, and the results are getting ever so closer.

19 reactions · 2 comments
19 · 2 comments

Post

Eesti juurtega noormees, kurikuulus häkkerirühmitus Scattered Spider ja mitme miljoni dollarilised lunarahad. Tänane uudis ei ole lihtsalt järjekordne küberkriminaalne põnevuslugu – see on valus äratuskell kogu IT-sektorile.

Artiklist käib läbi markantne detail, kus ründaja kirjutab keset operatsiooni kaasosalisele: "i gtg to school" (ma pean kooli minema). See illustreerib ilmekalt tänapäeva kübermaailma asümmeetriat – üks nutikas teismeline sülearvutiga võib põlvili suruda globaalseid korporatsioone, kui nende turvaarvutektuuri vundament on habras.

Kuidas nad seda teevad? Rühmitus Scattered Spider ei murra sisse toore jõuga. Nende põhiline käekiri on IT-kasutajatoe sotsiaalne manipuleerimine (helpdesk vishing), "MFA väsitamine" ja AiTM (Adversary-in-the-Middle) ründed. 
Nad esinevad töötajatena, lasevad autentimisandmed lähtestada ja pääsevad sisse. Nii lihtne see ongi, kui süsteem on ehitatud pimesi usaldusele.

Olles varasemalt ründava poolega vägagi tuttav ja minevikus tegelenud pidevalt (klientide) süsteemide kompromiteerimisega läbi sarnaste meetodite (kasutades muuhulgas ründeraamistikke nagu Evilginx2), näen ma sama mustrit ikka ja jälle. 

Me võime investeerida miljoneid tulemüüridesse, bot-kaitsetesse ja monitooringusse, aga kui ettevõtte autentimisloogika toetub nõrkadele MFA lahendustele (SMS-koodid, tavalised push-teavitused, SmartID v2), on ründajatel uks pärani lahti. Nad ei varasta enam paroole, nad varastavad sessiooniküpsiseid.

Minu varasem uurimustöö Smart-ID+ ja BITB vahemeherünnaku ründevektorite teemal tõestas täpselt sama: kasutajaliidese tasemel paikamisest ei piisa. Vaja on arhitektuurilist pööret Secure-by-Design suunas.

Mida saavad ettevõtted sellest loost õppida?

🛡️ Ainus reaalne kaitse AiTM ja Scattered Spideri stiilis rünnete vastu on õngitsuskindla (phishing-resistant) FIDO2 / WebAuthn standardite juurutamine. Paroolide ja nõrga MFA aeg on läbi. Ainult riistvaralised turvavõtmed (nt YubiKey) või seadmepõhised passkey'd on olemuslikult andmepüügikindlad (phishing-resistant).

🛡️ Karmimad IT-kasutajatoe protsessid. Identiteedi taastamine ei saa põhineda küsimustel "mis on su isikukood ja telefoninumber?". See nõuab krüptograafilist või ranget biomeetrilist verifitseerimist.

🛡️ Eelista arhitektuurilist turvalisust pinnatasemelise kaitse asemel. Ära püüa lõputult blokeerida halbu tegutsejaid – ehita süsteem, kus nende eduka sisenemise mõju on nullitud läbi Zero Trust põhimõtete.

On kurb näha järjekordset tehnilist talenti valel poolel raisatuna. Kuid igale tehnoloogiajuhile ja arhitektile peaks see juhtum esitama ühe väga konkreetse küsimuse: kas ettevõtte autentimissüsteem peab vastu sihikindlale tehnosotsiaalse sahkerdamise ja hoolikalt üles ehitatud vahemeherünnakule?

Loe täpsemalt Ekspressi artiklist 👇
https://lnkd.in/d4C8JvA7

Koolipingist suurfirmade süsteemidesse: USA süüdistab Eesti taustaga noormeest rahvusvahelises häkkerijõugus osalemises

ekspress.delfi.ee

16 reactions · 1 comment
16 · 1 comment

Post

Nädal tagasi toimus KAITSEHÄKATON, kus ehitati Bilt.me platvormil riigikaitset tõstvaid äppe. Üks tiim (ProksiAbel OÜ) võttis luubi alla Eesti digiriigi vundamendi.

Kujuta ette, et su digitaalne isikutuvastus (Mobiil-ID, Smart-ID) on salaseltsi käepigistus – täpselt sama kõva sõna kui paberil sinise pastakaga antud allkiri. Küberpätid on aga leidnud viisi, kuidas see nahaalselt kaaperdada (nn QRLJacking). 

Kuidas see trikk käib? Kujuta ette, et klassi kiusaja Juku küsib õpetajalt sinu nimelise matatöö. Siis astub ta sinu juurde ja palub sul korraks lahendada ühe "laheda ristsõna". Sa lahendadki pahaaimamatult ülesande ära. Juku viib SINU tehtud töö õpetajale, õpetaja näeb sinu õigeid vastuseid, aga viie annab Jukule, kes tuimalt minema jalutab.

Töö oli päris. Sinu vastused olid päris. Aga Juku varastas autoriseeringu. Täpselt seesama trikk töötab ka telefonis.

Mida tiim häkatonil ehitas? Süsteem, mis selle pettuse peatavad. Loodi süsteem, millel on neli osa:

🔒 𝐊𝐨𝐫𝐫𝐚𝐩𝐢𝐝𝐚𝐣𝐚 (𝐁𝐫𝐚𝐮𝐬𝐞𝐫𝐢𝐥𝐚𝐢𝐞𝐧𝐝𝐮𝐬): Valvab ja kontrollib, kas käepigistust küsiv veebileht on päris uks või mingi papist pettus. (origin binding)
🔒 𝐊𝐚𝐧𝐭𝐬𝐞𝐥𝐞𝐢 (𝐓𝐮𝐫𝐯𝐚𝐬𝐞𝐫𝐯𝐞𝐫): Go keeles kirjutatud programm, mis teeb topeltkontrolli – kas inimene on ikka päriselt see, kes ta väidab end olevat? (phishing-resistance via Webauthn)
🔒 𝐓õ𝐥𝐤 (𝐀𝐧𝐝𝐫𝐨𝐢𝐝𝐢 𝐬𝐢𝐥𝐝): Programm, mis lubab äppidel käepigistuse tegemiseks omavahel turvaliselt juttu rääkida. (a11y-bridge)

(Tegemata jäi aga Dirigenti, mis tulevikus terve selle orkestri ühtselt tööle paneks).

Ja mis on lõppjäreldus? 

Uue põlvkonna lukk (ehk 3. versioon) peab vanast kordades paremini vastu. 

Aga see üksainus ukselink... see ikka veel logiseb. Uurimistiim teebki praegu tööd selle nimel, et täpselt kaardistada, mismoodi see logisemine välja näeb – et lukksepp saaks tulla ja ka selle viimase turvaaugu kinni panna.

Tehniline ja täpsem kirjeldus kommentaarides.

15 reactions · 1 comment
15 · 1 comment

Post

Riigikaitsest ja kübervärgist rääkides aetakse tihti sellist kõrgelennulist mulli – räägitakse koostöökeskustest ja mingitest hägusatest allianssidest. Aga tegelikult? Tegelikult käib päris töö seal, kus bürokraatia ja need lõputud käsuliinid lihtsalt ei ulatu. Punkt.

Kolm aastat tagasi sattusin ma Telegramis suhtlema Ukraina küberpolitsei Red Teami asejuhiga. Olin vabal ajal oma lõbuks Google’i sisselogimislehte torkinud ja leidnud viisi, kuidas MITM-tehnikaga päris usutavaid õngitsuslehti kokku klopsida. Viskasin selle koodi GitHubi üles – lihtsalt nii, uudishimust ja et vaadata, mis saab.

Asi algas ühest e-kirjast, aga kolisime kohe Telegrami üle. Mingit ametlikku uisutamist ega paberite määrimist polnud. Jagasin uurimistööd, nad küsisid lähtekoodi ja ma saatsin. Sõjaolukorras pole aega oodata mingeid kooskõlastusringe või protokolle. Kui on vaja tegutseda, siis tuleb tegutseda. Tark ei torma, aga kui sa jääd liiga kauaks passima, oled lihtsalt loll.

Hiljem kuulsin, mis sellest sai. Minu kood ei olnud muidugi mingi "valmis karp", mida nupust vajutada, aga see andis neile otsa kätte. Ukrainlased on ses suhtes täiesti teine tase – nad proovisid mu Golangi jupiga mässata, ei saanud seda kohe käima, aga selle asemel, et käega lüüa, tõstsid kogu loogika kiirelt oma Pythoni frameworki peale ringi. Ja see töötas.

Nad said sisse sihtmärkidesse, mis olid varem täiesti kättesaamatud. Lihtsalt nii.

See tuletab meelde ühe lihtsa asja: suured mõttekojad on toredad, aga päris innovatsioon tuleb ikkagi rohujuuretasandilt. Üks tüüp oma arvutiga, kes jagab õigel hetkel õiget infot, võib muuta rohkem kui terve osakond pintsaklipslasi. Sul ei pea olema ametlikku luba, et olla riigikaitses kasulik. Piisab sellest, kui jagad oma oskusi õige asja nimel ja ei karda käsi mustaks teha.

Lõpuks loebki ainult see, kas sa viitsid midagi päriselt ära teha. Hea tunne oli, et sain neile sel hetkel kasulik olla.

Au Ukrainale!

#CyberSecurity #RedTeam #InfoSec #Ukraine #TBT #CyberWarfare #SlavaUkraini

3 reactions
3

Activity

271 followers

Create a post
Posts
Comments
Images

Tom Kristian Abel

 
 • You

Founding Engineer | Cyber-Kratt | Ex-Black Hat

Oct 7

In 2022, on a Russian cybercrime forum, two threat actors discuss FAANG killing passwords. One of them predicts passkeys would flop and phishing would never die.
I was half right.

May 2022. Apple, Google and Microsoft announce they're killing the password. Someone on exploit.in posts the news under the title "End of phishing?"

My reply, as "Dead Souls"
 (yes, Dead Souls, see Nikolai Gogol. same name novel):

"FIDO was delivered half-assed."
"Nobody will buy a $45 dongle just to log in."
"They'll do nothing for it."
"Phishing will continue as it currently does."

(Excuse the language. 2022 me was more confidently ballsy than polite)

Four years later, here's my scorecard.

❌ The dongle. Passkeys ended up on the phone you already carry. I ordered 2 YubiKey dongles, both are MIA and lost I dunno where .
❌ "They'll do nothing." They built it into every major phone OS and browser.
✅ "They'll keep password logins." Most accounts with a passkey still accept a password, an SMS code or an email reset.
✅ Phishing continued. Passkeys work fine. Attackers just stopped going after the login.

Today's phishing kits don't try to steal your passkey. They push you onto the password path instead. Or they let you sign in properly and steal the session afterward.
The door got stronger, so they use the window next to it. Lol.

What I got right had nothing to do with cryptography. I was sitting where attackers sit, and from there it was obvious that defenders measure their strongest path and attackers use the weakest one.

So if your security story ends at "we support passkeys," ask:
→ do you also support password + OTP?
→ are passkeys enforced to all?
→ After login, how do you know the session still belongs to the same person?

I've spent the last while building an answer to that last one: Proksimity, and the results are getting ever so closer.
… more

19
2
1
​

18,243 impressions

View analytics
View analytics

Tom Kristian Abel

 
 • You

Founding Engineer | Cyber-Kratt | Ex-Black Hat

Sep 4 • Edited

Aivo Olev märkis siin tabavalt, et väiksemad keelemudelid kirjutavad küll ladusat eesti keelt, aga kujundlike väljenditega (nagu "viskas püssi põõsasse") jookseb neil juhe kokku.

Küsisin temalt lõimes: kas pelk eestikeelse tekstimassiivi juurdekallamine muudaks midagi?

Enne kui vastust ootama jääda, kaevusin EKI mõõdupuu andmetesse (moodupuu.eki.ee): 73 mudelit, 29 avatud ja 44 suletud, seitse eesti keele testi.

Lühike vastus: jah, avatud mudelitel (Llama, Gemma, Qwen, gpt-oss) on eesti idioomidega selge puudujääk, mida ainuüksi nende üldise nõrkusega serveris  elavate suletud hiidude (GPT, Claude, Gemini) kõrval ära ei seleta.

Küsimus pole ju, kas avatud jäävad suletutele alla – muidugi jäävad. Küsimus on, kas nad saavad piltliku keelega ebaproportsionaalselt rohkem peksa, kui nende üldine tase ette näeks.

Rehkendasin igale mudelile välja oodatava tulemuse ja katsetasin läbi 264 arvutusviisi (mida lugeda "tasemeks", millist joont sobitada, keda valimisse võtta).

Tulemus jäi kangekaelselt samaks: idioomitestis jäävad avatud mudelid eranditult miinusesse, tüüpiliselt 7 punktiga. Teine komistuskivi: propagandakindlus, miinuses 98% juhtudest.

Vahe paistab ka samast laborist pärit eri mudelite vahel:
- Gemma jääb Geminile idioomides ~15 punkti rohkem alla, kui üldine tasemevahe seletaks;
- gpt-oss GPT-le ~21 punkti;
- lahtised Qwenid Qwen Maxile ~11 punkti.

Aga siin on statistiline konks. Esimese hooga lugesin need 73 mudelit sõltumatuteks vaatlusteks ja sain pealtnäha kaljukindla seose. Kindlustunne oli petlik: mudelid pärinevad vaid 18 perekonnast ning Llama 3 ja Llama 4 pole kaks tõendit, vaid ühest puust nikerdatud.

Perekonna tasemel ütleb julgem test ühes kahest põhiarvutusest "kindel" (p
= 0,01), ettevaatlikum kummaski mitte (0,10 ja 0,14; p-väärtus näitab, kui kergesti tuleks selline vahe paljast juhusest).

Usun ettevaatlikumat: suund on püsiv, suurus lahtine.

Kaks asja muutsid mu pilti veel:

Esiteks: mis üldse on "tase"? Kui mudeli tasemeks võtta ta skoor ülejäänud kuues eesti testis, on puudujääk tõesti ainult idioomides (−5 punkti). 
Kui võrdlusaluseks võtta rahvusvaheline võimekusindeks, mis eesti keelt ei puuduta,
on avatud mudelid maas kõigil seitsmel testil, idioomides suisa −13. Esimene küsib, kas idioomid on muust eesti keelest erilisemad; teine, kas puudujääk on üldse olemas.

Teiseks: mudelid ei põru mitte eesti rahvapärastes väljendites (vahe −4, nullist eristamatu), vaid mitmekeelsetes ja universaalsemates kujundites (−7) ning piiripealsetes (−6).

See tõmbab kriipsu peale lootusele, et piisab eesti fraseoloogia kokkukraapimisest: tõrge on kujundliku keelega üldiselt, mitte meie oma
pärimusega.

Põhjuste osas ei tasu järeldusi teha: andmetes pole mudelite suurust ega treeningueelarvet, nii et Aivo tähelepanek just väiksemate mudelite kohta jääb siin tõestamata. Ja mu enda esialgne "raudkindel leid" oli osalt arvutuslik
illusioon.
… more

Show translation
3
4
​
​

656 impressions

View analytics
View analytics

Tom Kristian Abel

 
 • You

Founding Engineer | Cyber-Kratt | Ex-Black Hat

Jun 15

CR14 toimetab üht küberkotka lendu. nägin kuulutust. 16–23.

olen 24.

natuke naljakas see number. täpselt aasta liiga vana noortesarja jaoks, aga samal ajal piisavalt noor, et kui kandideerisin govtechi häkatonile, läksin screeningust läbi ilma et keegi küsimusi esitaks.

istun praegu bussis. kaheksa tundi veel kiievini. minu ümber on mehed, kes on minust kaks korda vanemad. riigi cio. cert-ee spetsialist. riigihangete kontori juhid. ja mina. hakkame ehitama ai-d riigi taristut kaitsma.

keegi ei küsinud hinnetelehte. ülikooli paberit. kedagi ei kottinud kust ma tulin. neid kottis, kas ma asja oskan.

aga küberkotka lendu? ei. uks on kinni sünniaasta tõttu.

ja point pole minus. ma olen bussis. kõik on korras. aga kuskil on keegi teine 24-aastane, kellel ei ole istet selles bussis. kelle ainus võimalus näidata et ta oskab midagi olnuks see võistlus. ja ta ei saanudki.

sest keegi otsustas, et 23 on see maagiline piir, kust edasi sa oled juba liiga vana, et noor olla, aga mitte piisavalt vana, et keegi sind päriselt tõsiselt võtaks.
… more

Show translation
7
1
​
​

591 impressions

View analytics
View analytics

Tom Kristian Abel

 
 • You

Founding Engineer | Cyber-Kratt | Ex-Black Hat

May 21

Nädal tagasi toimus KAITSEHÄKATON, kus ehitati Bilt.me platvormil riigikaitset tõstvaid äppe. Üks tiim (ProksiAbel OÜ) võttis luubi alla Eesti digiriigi vundamendi.

Kujuta ette, et su digitaalne isikutuvastus (Mobiil-ID, Smart-ID) on salaseltsi käepigistus – täpselt sama kõva sõna kui paberil sinise pastakaga antud allkiri. Küberpätid on aga leidnud viisi, kuidas see nahaalselt kaaperdada (nn QRLJacking). 

Kuidas see trikk käib? Kujuta ette, et klassi kiusaja Juku küsib õpetajalt sinu nimelise matatöö. Siis astub ta sinu juurde ja palub sul korraks lahendada ühe "laheda ristsõna". Sa lahendadki pahaaimamatult ülesande ära. Juku viib SINU tehtud töö õpetajale, õpetaja näeb sinu õigeid vastuseid, aga viie annab Jukule, kes tuimalt minema jalutab.

Töö oli päris. Sinu vastused olid päris. Aga Juku varastas autoriseeringu. Täpselt seesama trikk töötab ka telefonis.

Mida tiim häkatonil ehitas? Süsteem, mis selle pettuse peatavad. Loodi süsteem, millel on neli osa:

🔒 𝐊𝐨𝐫𝐫𝐚𝐩𝐢𝐝𝐚𝐣𝐚 (𝐁𝐫𝐚𝐮𝐬𝐞𝐫𝐢𝐥𝐚𝐢𝐞𝐧𝐝𝐮𝐬): Valvab ja kontrollib, kas käepigistust küsiv veebileht on päris uks või mingi papist pettus. (origin binding)
🔒 𝐊𝐚𝐧𝐭𝐬𝐞𝐥𝐞𝐢 (𝐓𝐮𝐫𝐯𝐚𝐬𝐞𝐫𝐯𝐞𝐫): Go keeles kirjutatud programm, mis teeb topeltkontrolli – kas inimene on ikka päriselt see, kes ta väidab end olevat? (phishing-resistance via Webauthn)
🔒 𝐓õ𝐥𝐤 (𝐀𝐧𝐝𝐫𝐨𝐢𝐝𝐢 𝐬𝐢𝐥𝐝): Programm, mis lubab äppidel käepigistuse tegemiseks omavahel turvaliselt juttu rääkida. (a11y-bridge)

(Tegemata jäi aga Dirigenti, mis tulevikus terve selle orkestri ühtselt tööle paneks).

Ja mis on lõppjäreldus? 

Uue põlvkonna lukk (ehk 3. versioon) peab vanast kordades paremini vastu. 

Aga see üksainus ukselink... see ikka veel logiseb. Uurimistiim teebki praegu tööd selle nimel, et täpselt kaardistada, mismoodi see logisemine välja näeb – et lukksepp saaks tulla ja ka selle viimase turvaaugu kinni panna.

Tehniline ja täpsem kirjeldus kommentaarides.
… more

Show translation
15
1
1
​

859 impressions

View analytics
View analytics

Tom Kristian Abel

 
 • You

Founding Engineer | Cyber-Kratt | Ex-Black Hat

Apr 28

Eesti juurtega noormees, kurikuulus häkkerirühmitus Scattered Spider ja mitme miljoni dollarilised lunarahad. Tänane uudis ei ole lihtsalt järjekordne küberkriminaalne põnevuslugu – see on valus äratuskell kogu IT-sektorile.

Artiklist käib läbi markantne detail, kus ründaja kirjutab keset operatsiooni kaasosalisele: "i gtg to school" (ma pean kooli minema). See illustreerib ilmekalt tänapäeva kübermaailma asümmeetriat – üks nutikas teismeline sülearvutiga võib põlvili suruda globaalseid korporatsioone, kui nende turvaarvutektuuri vundament on habras.

Kuidas nad seda teevad? Rühmitus Scattered Spider ei murra sisse toore jõuga. Nende põhiline käekiri on IT-kasutajatoe sotsiaalne manipuleerimine (helpdesk vishing), "MFA väsitamine" ja AiTM (Adversary-in-the-Middle) ründed. 
Nad esinevad töötajatena, lasevad autentimisandmed lähtestada ja pääsevad sisse. Nii lihtne see ongi, kui süsteem on ehitatud pimesi usaldusele.

Olles varasemalt ründava poolega vägagi tuttav ja minevikus tegelenud pidevalt (klientide) süsteemide kompromiteerimisega läbi sarnaste meetodite (kasutades muuhulgas ründeraamistikke nagu Evilginx2), näen ma sama mustrit ikka ja jälle. 

Me võime investeerida miljoneid tulemüüridesse, bot-kaitsetesse ja monitooringusse, aga kui ettevõtte autentimisloogika toetub nõrkadele MFA lahendustele (SMS-koodid, tavalised push-teavitused, SmartID v2), on ründajatel uks pärani lahti. Nad ei varasta enam paroole, nad varastavad sessiooniküpsiseid.

Minu varasem uurimustöö Smart-ID+ ja BITB vahemeherünnaku ründevektorite teemal tõestas täpselt sama: kasutajaliidese tasemel paikamisest ei piisa. Vaja on arhitektuurilist pööret Secure-by-Design suunas.

Mida saavad ettevõtted sellest loost õppida?

🛡️ Ainus reaalne kaitse AiTM ja Scattered Spideri stiilis rünnete vastu on õngitsuskindla (phishing-resistant) FIDO2 / WebAuthn standardite juurutamine. Paroolide ja nõrga MFA aeg on läbi. Ainult riistvaralised turvavõtmed (nt YubiKey) või seadmepõhised passkey'd on olemuslikult andmepüügikindlad (phishing-resistant).

🛡️ Karmimad IT-kasutajatoe protsessid. Identiteedi taastamine ei saa põhineda küsimustel "mis on su isikukood ja telefoninumber?". See nõuab krüptograafilist või ranget biomeetrilist verifitseerimist.

🛡️ Eelista arhitektuurilist turvalisust pinnatasemelise kaitse asemel. Ära püüa lõputult blokeerida halbu tegutsejaid – ehita süsteem, kus nende eduka sisenemise mõju on nullitud läbi Zero Trust põhimõtete.

On kurb näha järjekordset tehnilist talenti valel poolel raisatuna. Kuid igale tehnoloogiajuhile ja arhitektile peaks see juhtum esitama ühe väga konkreetse küsimuse: kas ettevõtte autentimissüsteem peab vastu sihikindlale tehnosotsiaalse sahkerdamise ja hoolikalt üles ehitatud vahemeherünnakule?

Loe täpsemalt Ekspressi artiklist 👇
https://lnkd.in/d4C8JvA7
… more

Show translation

Koolipingist suurfirmade süsteemidesse: USA süüdistab Eesti taustaga noormeest rahvusvahelises häkkerijõugus osalemises
Koolipingist suurfirmade süsteemidesse: USA süüdistab Eesti taustaga noormeest rahvusvahelises häkkerijõugus osalemises

ekspress.delfi.ee

16
1
​
​

1,544 impressions

View analytics
View analytics

Tom Kristian Abel

 
 • You

Founding Engineer | Cyber-Kratt | Ex-Black Hat

Apr 1

Suvaline skriptipõnn klopsib täna toimiva AiTM (vahemeheründe) skripti kokku viie minutiga. 

Endisest häkkerist senior arendaja paneb sellele skaleeruva pilvearhitektuuri taha kümnega.

Ja SK ID Solutions? Nemad nimetavad seda endiselt "juhitud riskiks".

Oota, mida?

Avalikuks läks täna ProksiAbeli projekti raames eelmise aasta novembris tehtud turvalisusuuring. Plaan: parandame Eesti digiriigi vaadates asja läbi ründaja pilgu

Leid: Smart-ID+ QR-koodi voos haigutava arhitektuurilise augu.

Lühidalt: ründaja viskab ohvrile ette Browser-in-the-Browser (BITB) keskkonna. See on viimse pikslini identne, isegi domeeninimi URL-riba peal näitab originaalset. Ka muutuv QR-kood klapib. Ohver skaneerib QR koodi.
Ja ongi kõik. Konto läinud.

125 päeva anti heldelt aega SK ID Solutions'ile tulla välja plaaniga.

Seda plaani tänaseni ma näinud ei ole.

SK ID Solutionsiga kontakt loodud, teavitatud, lahendus pakutud, ei ole vastaust

RIA-ga kontakt loodud, teavitatud, väidetavalt analüüsivad olukorda, lahendus pakutud, ei ole vastust

CERT-ga kontakt loomata, piirdus vaid nende automaatvastajaga (what?)

Oskam asju lõhkuda, ei tea mitte midagi, oled mingi paar CTF teinud mõttetu häkker? Sama asja karjus LHV CISO mu kõrva telefonikõnes üks suvi. Saime aga asja lahendatud.

Järgmine kuu läheb avalikuks brauseri plugin. Paikab täielikult selle vea ära. Lisaks saab pankadesse ja igalepoole sisse logida ilma PIN1 sisestamata.

Jään vihaseid telefonikõnesi ootama.
#cybersecurity #SmartID #FIDO #SK #CERT #RIA #proksiabel #infosec
… more

Show translation

ProksiAbel OÜ

Apr 1

LLM-ide ajastul paneb suvaline skriptipõnn täiusliku vahemeheründe (AiTM) arhitektuuri kokku umbes viie minutiga. Skaleerib selle pilve seitsmega. SK ID Solutions aga nimetab seda endiselt... "juhitud riskiks". 

Oota, mida?

Tutvustame avalikult üht eelmise aasta novembrikuu käigus tehtud turvauuringut Smart-ID+ kohta, mis tõi päevavalgele kriitilise arhitektuurilise apsaka Smart-ID+ QR-koodi voos.

Lühidalt: ründaja kuvab ohvrile Browser-in-the-Browser (BITB) ründega viimse pikslini identse keskkonna. Isegi dünaamiline QR-kood klapib, sest ründaja masinas on reaalne sessioon juba lahti. Ohver skaneerib seda pahaaimamatult oma telefoniga. Konto läinud.

Aga probleem pole ainult ühes tehnilises augus. Mind teeb päriselt vihaseks riiklike asutuste (RIA, CERT) ja teenusepakkuja bürokraatlik tuimus. Me turundame "maksimaalset kaitset", aga tegelikult istume mugavalt 2018. aasta ohumudelis ja keeldume implementeerimast krüptograafiliselt kindlaid FIDO2/WebAuthn standardeid. 

Kirjutasin äsja avaldatud artiklis lahti kogu selle turvanõrkuse anatoomia. Räägin täpsemalt, miks QR-kood on praegusel kujul lihtsalt "rumal toru" ja miks Norra BankID teeb sarnaseid asju kordades turvalisemalt.

👉 Tiri täis exploit alla siit: https://lnkd.in/dc7J5eQJ
Loe pikemat arhitektuurilist kriitikat siit 👇
#cybersecurity #SmartID #FIDO #SK #CERT #RIA #proksiabel #infosec
… more

Show translation

Eesti e-Riigi Achilleuse kand

ProksiAbel OÜ

2
2
​
​

728 impressions

View analytics
View analytics

Tom Kristian Abel reposted this

Siim Kiskonen

 
 • 1st

GenAI engineer at Elisa Eesti AS

Jan 25

Vajame viimase hetke abi! Oleme Pärnu Häkkil loomas platvormi, mis koondab toidupoe digitaalsed tšekid ühele platvormile. 

Peale integreerumist tulevad uued ostutšekid automaatselt meie platvormile. 

Plaan on ostutšekkidele lisada toiteväärtused juurde ja platvormil kuvada 30/90/180 päeva keskmiseid makrode vahekordi(V/S/R)

Mis analüüsi võiks veel teha ostutšekkide pealt kuhu on toiteväärtused külge lisatud? Või mis statistikat võiks teha nende andmetega? 

Igasugused mõtted on tere tulnud. 

Ja kõige tähtsam küsimus. Kas keegi on huvitatud sellise platvormi kasutamisest?
… more

Show translation
22
3
1
​

Tom Kristian Abel

 
 • You

Founding Engineer | Cyber-Kratt | Ex-Black Hat

Dec 24, 2025 • Edited

Vaatasid seda FBI "takedown" pilti ja märkasid PPA vappi seal keskel? See pole seal ilu pärast.
...

Mõned tüübid üritasid Eestis varjata 14 miljoni dollarise kelmuse "peamootorit". Ma ei tea, mis neil peas toimus – kas see oli mingi vene häkkerite kargokultus, loll lootus, et kui teised tegid, siis meil näkkab ka, või lihtsalt täielik suutmatus reaalsust analüüsida.

Kuidagi on tekkinud see väärarusaam, et Eesti on mingi mugav "vahejaam". Meenutatakse Fancy Beari Tallinna serverites 2016. aastal või seda, kuidas Cozy Bear kunagi siinset taristut kasutas. Arvatakse, et madal ping Moskva suunal ja hea IT-värk tähendab automaatselt "bulletproof" kaitset. Et siin on anonüümne ja keegi ei küsi küsimusi.

𝗩𝗶𝗴𝗮.

Nad unustavad ära, et e-Eesti ei ole lihtsalt läikiv turunduslause, millega konverentsidel eputada. See tähendab, et siin on kuradi raske märkamatult tegutseda. Kui su naabriks on NATO küberkaitsekeskus, siis Eesti on viimane koht maailmas, kuhu oma musta äri serverit peita. See on nagu üritaks narkoladu politseijaoskonna keldris pidada.

PPA ei tõmmanud lihtsalt juhet seinast. Nad võtsid terve seina. Professionaalselt. Enne kui keegi "delete" vajutada jõudis, oli neil juba käes kõik:

✅ Administraatori logid ja IP-aadressid
✅ Terved andmebaasid koos kasutajate infoga.
✅ Platvormi lähtekood viimse reani.


See müüt Eestist kui turvasadamast on nüüd ametlikult prügikastis. Serveri siia toomine on kurjategija poolt sisuliselt vabatahtlik ülestunnistus ja tõendite kandikul ettesöötmine. Eesti on FBI jaoks muutunud põhimõtteliselt "Google Drive’iks", kust saab mugavalt varukoopiaid kätte, kui keegi kuskil pätti teeb.

Väga kõva sooritus, PPA. Päriselt ka.

#CyberSecurity #OpSec #Estonia #PPA #FBI #LawEnforcement #PPA #InfoSec #CyberCrime
… more

Show translation

FBI Cyber Division

Dec 23, 2025

Yesterday, the #FBI and DOJ announced the seizure of a web domain that hosted stolen login credentials for bank account takeover fraud. Victims provided login credentials on phishing websites that mimicked legitimate financial institutions, resulting in millions of dollars in losses. Read more here: https://lnkd.in/euJMDhMD

The domain seizure comes less than three weeks after the FBI issued a Public Service Announcement on bank account takeover fraud. Learn how to protect your information here: https://lnkd.in/e52j4x_c
… more

8
1
1
​

720 impressions

View analytics
View analytics

Tom Kristian Abel

 
 • You

Founding Engineer | Cyber-Kratt | Ex-Black Hat

Aug 8, 2025 • Edited

Riigikaitsest ja kübervärgist rääkides aetakse tihti sellist kõrgelennulist mulli – räägitakse koostöökeskustest ja mingitest hägusatest allianssidest. Aga tegelikult? Tegelikult käib päris töö seal, kus bürokraatia ja need lõputud käsuliinid lihtsalt ei ulatu. Punkt.

Kolm aastat tagasi sattusin ma Telegramis suhtlema Ukraina küberpolitsei Red Teami asejuhiga. Olin vabal ajal oma lõbuks Google’i sisselogimislehte torkinud ja leidnud viisi, kuidas MITM-tehnikaga päris usutavaid õngitsuslehti kokku klopsida. Viskasin selle koodi GitHubi üles – lihtsalt nii, uudishimust ja et vaadata, mis saab.

Asi algas ühest e-kirjast, aga kolisime kohe Telegrami üle. Mingit ametlikku uisutamist ega paberite määrimist polnud. Jagasin uurimistööd, nad küsisid lähtekoodi ja ma saatsin. Sõjaolukorras pole aega oodata mingeid kooskõlastusringe või protokolle. Kui on vaja tegutseda, siis tuleb tegutseda. Tark ei torma, aga kui sa jääd liiga kauaks passima, oled lihtsalt loll.

Hiljem kuulsin, mis sellest sai. Minu kood ei olnud muidugi mingi "valmis karp", mida nupust vajutada, aga see andis neile otsa kätte. Ukrainlased on ses suhtes täiesti teine tase – nad proovisid mu Golangi jupiga mässata, ei saanud seda kohe käima, aga selle asemel, et käega lüüa, tõstsid kogu loogika kiirelt oma Pythoni frameworki peale ringi. Ja see töötas.

Nad said sisse sihtmärkidesse, mis olid varem täiesti kättesaamatud. Lihtsalt nii.

See tuletab meelde ühe lihtsa asja: suured mõttekojad on toredad, aga päris innovatsioon tuleb ikkagi rohujuuretasandilt. Üks tüüp oma arvutiga, kes jagab õigel hetkel õiget infot, võib muuta rohkem kui terve osakond pintsaklipslasi. Sul ei pea olema ametlikku luba, et olla riigikaitses kasulik. Piisab sellest, kui jagad oma oskusi õige asja nimel ja ei karda käsi mustaks teha.

Lõpuks loebki ainult see, kas sa viitsid midagi päriselt ära teha. Hea tunne oli, et sain neile sel hetkel kasulik olla.

Au Ukrainale!

#CyberSecurity #RedTeam #InfoSec #Ukraine #TBT #CyberWarfare #SlavaUkraini
… more

Show translation
3
​
​
​

510 impressions

View analytics
View analytics

Show all
Profile language

English

Public profile & URL

www.linkedin.com/in/hr-abel

Who your viewers also viewed

Private to you

Nadzeya Harbuzava 

· 2nd

Junior Software Engineer | Full-Stack Developer (JavaScript, Go, React, Node.js) | Generative AI | Open to Internships & Junior Roles 2026

Connect

Hugo Di Maria 

· 1st

Web Developer | Software Developer

Message

Nikita Menshikov 

· 2nd

Junior Software Engineer | Computer Science @ Taltech

Connect

Mark Perman 

· 2nd

Member of Software Team at MTÜ Lapikud

Connect

Kevin Poljans

· 1st

Soon to be Software Developer / Software Tester / Sys. Admin

Message
Show all
People you may know

Peeter P. Mõtsküla 

· 2nd

Attorney-at-law at TRINITI. IT, IP, startups, defence.

Connect

Kätlin Tamm 

· 2nd

Student at TalTech – Tallinn University of Technology

Connect

Siim Vene 

· 2nd

Architect | Founder | Lecturer

Connect

Mihkel Hõbemagi 

· 2nd

founder @ keegi · ask who at your company has dealt with this, and see what they did · co-founder @ built in baltics

Connect

Margus Rebane 

· 2nd

Better architecture decisions, better engineering practice. Senior Software Engineer & Architect. Ex-Skype / Wise / Playtech / Microsoft.

Connect
Show all
You might like

Pages for you

Digit Conference

IT Services and IT Consulting

750 followers

Elise Marie & 6 other connections follow this page

Follow

Estonian Academy of Sciences

Research Services

635 followers

Mehdi & 2 other connections follow this page

Follow
Show all

## experience
Experience

Founding Engineer

ProksiAbel OÜ · Full-time

Jan 2025 - Present · 1 yr 10 mos

Estonia · On-site

Architecting and shipping ProksiAbel's enterprise security infrastructure from first principles. Our core focus is translating advanced adversarial intelligence into deployable defensive products—including zero-trust authentication frameworks and highly specialized anti-bot proxies (e.g., fingerprintproxy).

Go-To-Market & Growth: Bootstrapping product development through highly selective Design Partnerships. By providing advanced red-teaming/advisory for confidential clients, we pressure-test and validate our zero-trust architectures in real-world environments before public release.

Currently establishing the foundational architecture and preparing to scale the engineering team.
(Note: Our core tools and methodologies are public; our Design Partners and clients remain strictly confidential).

ProksiAbel

ProksiAbel is a security product studio. We build the tools that fix the architectural failures we find — phishing-resistant authentication, zero-trust frameworks, anti-bot infrastructure — funded by a confidential security-consulting practice.

 Go (Programming Language), Python (Programming Language) and +22 skills

Independent Exploitation Researcher & Tool Developer

Independent Researcher · Full-time

Jun 2021 - Jul 2024 · 3 yrs 2 mos

On-site

→ Reverse-Engineering Google BotGuard: Successfully analyzed and bypassed Google's dynamically changing anti-bot virtual machine (now reCAPTCHA) at the opcode level. This required deep architectural work across compilers, cryptography, and TLS fingerprinting, resulting in a functional bypass developed within a matter of months.
→ The Reality of Client-Side Defenses: The core methodology of this bypass highlights a fundamental, persistent flaw in how modern browser defenses and anti-fraud systems are architected—a flaw that remains largely unpatched in the wider industry today.
→ I applied this research to build a highly customized, commercially viable iteration of the Evilginx Adversary-in-the-Middle (AiTM) framework. Operating this tool resulted in a 2024 conviction. I take absolute, unmitigated responsibility for my actions and the legal outcome. That chapter of my life is permanently closed. I am completely transparent about this history because my sole professional focus is now applying this adversarial insight to build the very Zero Trust systems and anti-bot proxies required to defeat these exact attacks.

A Case Study in Bypassing Client-Side Anti-Fraud Mechanisms

Developed a proof-of-concept bypass for Google's 'Botguard' client-side detection system, demonstrating expertise in browser automation, network traffic analysis, and advanced detection-evasion techniques.

 Python (Programming Language),  Obfuscation & Deobfuscation and +24 skills

Software Developer

Smaily - intentionally simple email marketing and automation · Full-time

Sep 2019 - May 2021 · 1 yr 9 mos

Tallinn, Harjumaa, Estonia · Hybrid

• Built and maintained plugins for major platforms, directly improving the core integration ecosystem. 
• Worked directly with product and support teams to patch bugs and deploy client-requested features

Lead Developer & Creator: Smaily for Contact Form 7 WordPress Plugin

I architected and developed the "Smaily for Contact Form 7" plugin from scratch, serving both as a key project during my tenure at Smaily and as the final graduation work for my degree at Tallinn Polytechnic School.

The plugin provided a seamless integration between the popular Contact Form 7 and Smaily's email marketing platform, enabling thousands of WordPress users to automatically capture and sync newsletter subscribers directly from their web forms.

 Docker, MySQL and +14 skills

Profile language

English

Who your viewers also viewed

Private to you

Nadzeya Harbuzava 

· 2nd

Junior Software Engineer | Full-Stack Developer (JavaScript, Go, React, Node.js) | Generative AI | Open to Internships & Junior Roles 2026

Connect

Hugo Di Maria 

· 1st

Web Developer | Software Developer

Message

Nikita Menshikov 

· 2nd

Junior Software Engineer | Computer Science @ Taltech

Connect

Mark Perman 

· 2nd

Member of Software Team at MTÜ Lapikud

Connect

Kevin Poljans

· 1st

Soon to be Software Developer / Software Tester / Sys. Admin

Message

Karl Hannes Pallon 

· 2nd

Junior Software Engineer at Billity

Connect

Alexander S. 

· 2nd

Software Engineer | Java Various freelance projects

Connect

Lee Paju 

· 2nd

Career changer into tech | Junior software development student | Interested in AI, product management and customer experience | Background in customer experience, marketing and service design

Connect

Denis B.

· 2nd

Full-stack dev | JavaScript && React/Next.js

Connect

Sergei Martõnov 

· 2nd

Founder at URBALT | Building the first micro-mobility ecosystem in the Baltics | Seeking partners 🤝

Connect
Show less

## education
Education

koodtech

2026 – 2027

Continuous, lifelong learning in an innovative, peer-to-peer, project-based coding school. Plus no lectures.

Skills: Java, Data Architecture, +7 skills

TalTech – Tallinn University of Technology

 Micro-degree in Software Engineering: Junior to Senior Developer, Computer Science

Jan 2026 – May 2026

An intensive professional development program focused on advanced architecture, security, and cloud infrastructure. Managed to build a distributed YouTube downloader API with the resilience of a banking gateway.
… more

Skills: Cloud Computing, SQL, +25 skills

Tallinn Polytechnic School

Software Developer, 

2017 – 2020

Skills: SQL, Data Architecture, +10 skills

Profile language

English

Who your viewers also viewed

Private to you

Nadzeya Harbuzava 

· 2nd

Junior Software Engineer | Full-Stack Developer (JavaScript, Go, React, Node.js) | Generative AI | Open to Internships & Junior Roles 2026

Connect

Hugo Di Maria 

· 1st

Web Developer | Software Developer

Message

Nikita Menshikov 

· 2nd

Junior Software Engineer | Computer Science @ Taltech

Connect

Mark Perman 

· 2nd

Member of Software Team at MTÜ Lapikud

Connect

Kevin Poljans

· 1st

Soon to be Software Developer / Software Tester / Sys. Admin

Message

Karl Hannes Pallon 

· 2nd

Junior Software Engineer at Billity

Connect

Alexander S. 

· 2nd

Software Engineer | Java Various freelance projects

Connect

Lee Paju 

· 2nd

Career changer into tech | Junior software development student | Interested in AI, product management and customer experience | Background in customer experience, marketing and service design

Connect

Denis B.

· 2nd

Full-stack dev | JavaScript && React/Next.js

Connect

Sergei Martõnov 

· 2nd

Founder at URBALT | Building the first micro-mobility ecosystem in the Baltics | Seeking partners 🤝

Connect
Show less

## honors
Honors & awards

AI GovTech Hackathon #2 Place

Issued by ESTDEV · Jun 2026

Red SWAT

Presidential Hackathon | OpenAI Special Award

Issued by TI-Hüpe · May 2026

MATx

Fellin Häkk 2026 #1

Issued by StarHub · Feb 2026

MATx

Who your viewers also viewed

Private to you

Nadzeya Harbuzava 

· 2nd

Junior Software Engineer | Full-Stack Developer (JavaScript, Go, React, Node.js) | Generative AI | Open to Internships & Junior Roles 2026

Connect

Hugo Di Maria 

· 1st

Web Developer | Software Developer

Message

Nikita Menshikov 

· 2nd

Junior Software Engineer | Computer Science @ Taltech

Connect

Mark Perman 

· 2nd

Member of Software Team at MTÜ Lapikud

Connect

Kevin Poljans

· 1st

Soon to be Software Developer / Software Tester / Sys. Admin

Message

Karl Hannes Pallon 

· 2nd

Junior Software Engineer at Billity

Connect

Alexander S. 

· 2nd

Software Engineer | Java Various freelance projects

Connect

Lee Paju 

· 2nd

Career changer into tech | Junior software development student | Interested in AI, product management and customer experience | Background in customer experience, marketing and service design

Connect

Denis B.

· 2nd

Full-stack dev | JavaScript && React/Next.js

Connect

Sergei Martõnov 

· 2nd

Founder at URBALT | Building the first micro-mobility ecosystem in the Baltics | Seeking partners 🤝

Connect
Show less

## skills
Skills

All
Industry Knowledge
Tools & Technologies
Interpersonal Skills
Other Skills

Microsoft EDR

SC-200T00-A: Defend against cyberthreats with Microsoft Security Operations Analyst

Microsoft Azure

SC-200T00-A: Defend against cyberthreats with Microsoft Security Operations Analyst

Microsoft Entra ID

SC-200T00-A: Defend against cyberthreats with Microsoft Security Operations Analyst

TLS Fingerprint

Phishing-resistant Authentication

FIDO2 / WebAuthn

Security Architecture Design

Redis

Vooglaadija

FastAPI

Vooglaadija

Selenium

2 experiences at ProksiAbel OÜ and 1 other company

Tallinn Polytechnic School

Software Solution Architecture

Founding Engineer at ProksiAbel OÜ

TalTech – Tallinn University of Technology

Java

kood/Jõhvi

Software Development

3 experiences at ProksiAbel OÜ and 2 other companies

3 educational experiences at kood/Jõhvi and 2 other schools

Phishing

Independent Exploitation Researcher & Tool Developer at Independent Researcher

Tallinn Polytechnic School

Data Architecture

3 educational experiences at kood/Jõhvi and 2 other schools

Security

2 experiences at ProksiAbel OÜ and 1 other company

3 educational experiences at kood/Jõhvi and 2 other schools

Cloud Computing

TalTech – Tallinn University of Technology

Node.js

3 experiences at ProksiAbel OÜ and 2 other companies

3 educational experiences at kood/Jõhvi and 2 other schools

SQL

3 experiences at ProksiAbel OÜ and 2 other companies

2 educational experiences at TalTech – Tallinn University of Technology and 1 other school

Test Automation

Software Developer at Smaily

3 educational experiences at kood/Jõhvi and 2 other schools

Who your viewers also viewed

Private to you

Nadzeya Harbuzava 

· 2nd

Junior Software Engineer | Full-Stack Developer (JavaScript, Go, React, Node.js) | Generative AI | Open to Internships & Junior Roles 2026

Connect

Hugo Di Maria 

· 1st

Web Developer | Software Developer

Message

Nikita Menshikov 

· 2nd

Junior Software Engineer | Computer Science @ Taltech

Connect

Mark Perman 

· 2nd

Member of Software Team at MTÜ Lapikud

Connect

Kevin Poljans

· 1st

Soon to be Software Developer / Software Tester / Sys. Admin

Message

Karl Hannes Pallon 

· 2nd

Junior Software Engineer at Billity

Connect

Alexander S. 

· 2nd

Software Engineer | Java Various freelance projects

Connect

Lee Paju 

· 2nd

Career changer into tech | Junior software development student | Interested in AI, product management and customer experience | Background in customer experience, marketing and service design

Connect

Denis B.

· 2nd

Full-stack dev | JavaScript && React/Next.js

Connect

Sergei Martõnov 

· 2nd

Founder at URBALT | Building the first micro-mobility ecosystem in the Baltics | Seeking partners 🤝

Connect
Show less

## projects
Projects

Projects from connected apps sync automatically and can’t be edited on LinkedIn.

Vooglaadija

Jan 2026 – May 2026

Vooglaadija — Built a production-grade asynchronous YouTube media download service with a focus on reliability, security, and a lightning-fast HTMX + Tailwind CSS frontend.

The backend is pure FastAPI with async SQLAlchemy 2.0, PostgreSQL, and Redis queues. What sets this apart architecturally is the transactional outbox pattern for guaranteed job delivery, atomic worker job claiming, and exponential backoff retries via Redis sorted sets — all while running as non-root containers with read-only filesystems, dropped capabilities, and full SBOM/SLSA provenance.

The frontend? Zero React overhead. HTMX delivers instant partial page updates with server-sent events for real-time job status, styled with a custom Tailwind build that's visually polished without a byte of unnecessary JavaScript. The result feels as responsive as a single-page app but stays true to hypermedia principles.

Built with: FastAPI · SQLAlchemy 2.0 async · PostgreSQL · Redis · yt-dlp/ffmpeg · HTMX · Tailwind CSS · Docker (7-stage multi-stage build) · pytest · ruff · mypy · prometheus-client

Security: JWT (access + refresh tokens) · bcrypt · CSRF protection · rate limiting · path traversal prevention · entropy-validated secrets · CSP headers
… more

Contributors: Kevin

 Python (Programming Language), FastAPI and +3 skills

Associated with TalTech – Tallinn University of Technology

Ukrainian collaboration

2022 – 2022

Provided technical research to Ukrainian cyber defense efforts, 2022.

Associated with Independent Researcher

Who your viewers also viewed

Private to you

Nadzeya Harbuzava 

· 2nd

Junior Software Engineer | Full-Stack Developer (JavaScript, Go, React, Node.js) | Generative AI | Open to Internships & Junior Roles 2026

Connect

Hugo Di Maria 

· 1st

Web Developer | Software Developer

Message

Nikita Menshikov 

· 2nd

Junior Software Engineer | Computer Science @ Taltech

Connect

Mark Perman 

· 2nd

Member of Software Team at MTÜ Lapikud

Connect

Kevin Poljans

· 1st

Soon to be Software Developer / Software Tester / Sys. Admin

Message

Karl Hannes Pallon 

· 2nd

Junior Software Engineer at Billity

Connect

Alexander S. 

· 2nd

Software Engineer | Java Various freelance projects

Connect

Lee Paju 

· 2nd

Career changer into tech | Junior software development student | Interested in AI, product management and customer experience | Background in customer experience, marketing and service design

Connect

Denis B.

· 2nd

Full-stack dev | JavaScript && React/Next.js

Connect

Sergei Martõnov 

· 2nd

Founder at URBALT | Building the first micro-mobility ecosystem in the Baltics | Seeking partners 🤝

Connect
Show less