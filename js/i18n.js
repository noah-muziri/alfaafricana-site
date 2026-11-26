/* English / Luganda switch.
   Every visible text node (and a few attributes) is looked up by its English text.
   The English original is kept on the node, so switching back is exact.
   The Luganda here is a first draft: have a native speaker review it before launch. */
(function () {
  var LG = {
    /* navigation + menu */
    'About': 'Ebitukwatako', 'Partners': 'Bakolagana naffe', 'Products': 'Ebintu byaffe', 'Services': 'Obuweereza',
    'Why us': 'Lwaki ffe', 'Get in touch': 'Tukwate', 'Home': 'Awaka', 'Benefits': 'Emigaso', 'Contact': 'Tukwatagane',
    'Master Distributor': 'Omugabi Omukulu', 'Distributor': 'Omugabi', 'Find us': 'Gye tubeera',
    'The Prism building, B-13 Kampala Road,': 'Ekizimbe kya Prism, B-13 Kampala Road,', 'Kampala, Uganda': 'Kampala, Uganda',
    'Next step': 'Ekiddako', 'Free site survey': 'Okukebera ekifo ku bwereere', 'Advisory & estimate': 'Okuteesa n’okubalirira',

    /* hero */
    'Innovative IT Solutions, Built on': 'Eby’okugonjoola mu IT eby’obuyiiya, Ebizimbibwa ku',
    'Legacy and Trust.': 'Ebyafaayo n’Obwesige.',
    'At Alfa Africana, we prioritize reliability, innovation, and a customer-centric approach, delivering solutions that enhance business performance and security.':
      'Ku Alfa Africana, tukulembeza obwesigwa, obuyiiya n’okuweereza bakasitoma baffe obulungi, nga tuleeta eby’okugonjoola ebyongera ku nkola ya bizinensi n’obukuumi.',
    'Know more': 'Weeyongere okumanya',
    'What we supply': 'Bye tutunda',
    'Since 1970': 'Kuva mu 1970',
    'Plugging Uganda in since 1970.': 'Tuyunga Uganda okuva mu 1970.',
    'Still family. Still here.': 'Tukyali maka. Tukyaliwo.',
    'It began in our father’s time with TVs and fridges. Today it’s IT, security and access control, with ZKTeco and ASSA ABLOY behind us. Same family. Same promise: we’ll help you choose well. Webale, Uganda.': 'Byatandika mu biseera bya kitaffe nga tutunda TV ne firiigi. Leero ye IT, obukuumi n’okufuga okuyingira, nga ZKTeco ne ASSA ABLOY batuwagira. Amaka agamu. Ekisuubizo kimu: tujja kukuyamba okulonda obulungi. Webale, Uganda.',

    'The world builds the brands.': 'Ensi ekola ebika ebinene.',
    'Uganda trusts us to bring them home.': 'Uganda etwesiga okubireeta awaka.',
    'We fell in love with Uganda.': 'Twayagala Uganda.',
    'Fifty years on, we still are.': 'Emyaka amakumi ataano oluvannyuma, tukyakagala.',
    'Family-owned since 1970': 'Bizinensi y’amaka okuva mu 1970',
    'Alfa Group · Since 1970': 'Alfa Group · Kuva mu 1970',
    'IT · Electronics · Distribution': 'IT · Eby’amasannyalaze · Okugabanya',
    'Kampala, Uganda': 'Kampala, Uganda',

    'Family owned': 'Kya maka',
    'IT, electronics': 'IT, eby’amasannyalaze',
    '& distribution.': 'n’okugabanya.',
    'A Ugandan family business since 1970.': 'Bizinensi y’amaka ga Uganda okuva mu 1970.',
    'From TVs, fridges and home appliances to IT hardware, networking and access control. Master Distributor of ZKTeco, Distributor of ASSA ABLOY, and a family business that loves this market.': 'Okuva ku TV, firiigi n’ebikozesebwa mu maka okutuuka ku IT hardware, networking n’okufuga okuyingira. Master Distributor wa ZKTeco, Distributor wa ASSA ABLOY, era bizinensi y’amaka eyagala akatale kano.',
    'Family-owned. Uganda-built.': 'Kya maka. Kizimbiddwa mu Uganda.',
    'Ready for what’s next.': 'Kyetegefu eby’omu maaso.',
    'From brown goods and white goods in Ugandan homes to IT, security and access control for businesses, we’ve grown with the people and the market we love. Master Distributor of ZKTeco. Distributor of ASSA ABLOY.': 'Okuva ku bikozesebwa mu maka ga Uganda okutuuka ku IT, obukuumi n’okuyingira mu bizinensi, tukulidde wamu n’abantu n’akatale bye twagala. Master Distributor wa ZKTeco. Distributor wa ASSA ABLOY.',

    'Biometrics & smart ID': 'Biometrics ne smart ID', 'Access control': 'Okufuga okuyingira',
    'IT hardware & networking': 'IT hardware ne networking', 'Smart POS & terminals': 'Smart POS ne terminals',
    'Master distributor of ZKTeco': 'Omugabi omukulu owa ZKTeco', 'Distributor of ASSA ABLOY': 'Omugabi owa ASSA ABLOY',
    'Cyber security': 'Obukuumi bwa cyber',

    /* about */
    'About Us': 'Ebitukwatako',
    'Alfa Africana is a premier provider of IT services and a trusted supplier of IT hardware equipment and devices, offering comprehensive technology solutions across industries. As part of the ALFA Group, which was established in 1970 in the UAE, we bring decades of experience and dedication to every project. Alfa Africana has grown to become a leader in innovative technology solutions for sectors including security, telecommunications, corporate IT, and networking infrastructure.':
      'Alfa Africana y’emu ku bakola obuweereza bwa IT obw’oku mwanjo era omugabi omwesigwa owa IT hardware n’ebyuma, nga tuwa eby’okugonjoola bya tekinologiya mu makolero ag’enjawulo. Nga kitundu kya ALFA Group eyatandikibwawo mu 1970 mu UAE, tuleeta obumanyirivu bw’emyaka mingi n’okwewaayo mu buli pulojekiti. Alfa Africana ekuze n’efuuka omukulembeze mu by’okugonjoola bya tekinologiya ebipya mu by’obukuumi, essimu, IT ya kampuni, ne networking.',
    'ALFA Group established': 'ALFA Group yatandikibwawo', 'Branches': 'Amatabi', 'Languages served': 'Ennimi ze tuweereza',
    'Global brands distributed': 'Ba brand ab’ensi yonna be tugaba',
    'Perfect Equipment': 'Ebyuma Ebituukiridde',
    'We partner with over 5,000 hardware, software and cloud providers to ensure that your business is fast, efficient and cost-effective.':
      'Tukolagana n’abagaba hardware, software ne cloud abasoba 5,000 okukakasa nti bizinensi yo etambula bwangu, bulungi era ku bbeeyi ennungi.',
    'Fantastic Service': 'Obuweereza Obw’ekitalo',
    'Our global network means that we’ll be here to help scale your business and drive innovation no matter your long-term goals.':
      'Omukutu gwaffe ogw’ensi yonna gutegeeza nti tujja kuba wano okukuyamba okugaziya bizinensi yo n’okuleeta obuyiiya, ebiruubirirwa byo bwe biba nga bikuumi nnyo.',
    'Leading IT Experts': 'Abakugu ba IT Abakulembeze',
    'Our team is made up of top IT professionals who can solve your toughest IT challenges quickly, affordably and always on time.':
      'Ttiimu yaffe erimu abakugu ba IT abasingayo abayinza okugonjoola ebizibu byo ebikalubo mu bwangu, ku bbeeyi ennungi era buli kiseera ku ssaawa.',
    'Top Tech Brands': 'Ba Brand ba Tekinologiya Abasinga',
    'Working with hundreds of the leading global tech manufacturers from right here in Africa, to provide unmatched quality and value.':
      'Tukolagana n’ebikumi by’abakola tekinologiya abakulu mu nsi yonna nga tuli wano mu Africa, okuwa omutindo n’omugaso ogutaliiko ky’ogeraageranya.',
    'Our Mission': 'Omulimu Gwaffe',
    'Our mission is to empower businesses by delivering high-quality IT services and hardware solutions that enable innovation, efficiency, and security. We strive to be a dependable partner in transforming technology-driven businesses and aim to exceed client expectations with unmatched expertise and support.':
      'Omulimu gwaffe kwe kuyamba bizinensi nga tuwa obuweereza bwa IT obw’omutindo omulungi ne hardware ebiyamba obuyiiya, obukugu n’obukuumi. Tufuba okuba bakolagana abesigwa mu kukyusa bizinensi ezikozesa tekinologiya, era tuluubirira okusukka ku bakasitoma kye basuubira nga tuwa obukugu n’obuyambi obutaliiko kya kugeraageranya.',
    'Our Vision': 'Okwolesebwa Kwaffe',
    'To be the leading IT solutions provider in the region, known for our excellence in service, reliability, and cutting-edge solutions.':
      'Okubeera omuweereza asinga mu by’okugonjoola bya IT mu kitundu, amanyiddwa olw’obukugu mu buweereza, obwesigwa, n’eby’okugonjoola ebipya.',

    /* partners */
    'Our Partners': 'Abakolagana Naffe',
    'Two of the world’s leading names in identity and access,': 'Amannya abiri ag’oku mwanjo mu nsi mu by’okutegeeza omuntu n’okuyingira,',
    'under one roof': 'wansi w’ekibanda kimu', 'in Kampala.': 'mu Kampala.',
    'East Africa': 'Obuvanjuba bwa Africa',
    'Alfa Africana is the Master Distributor of ZKTECO CO., LTD., an internationally renowned enterprise which specializes in pioneering biometric recognition techniques, and provides products and solutions of smart entrance management, smart identity authentication and smart office.':
      'Alfa Africana ye Mugabi Omukulu owa ZKTECO CO., LTD., kampuni emanyiddwa mu nsi yonna eyeekenneenya mu tekinologiya ow’okutegeera omuntu (biometric), era egaba ebintu n’eby’okugonjoola eby’okufuga okuyingira, okukakasa endagamuntu, ne ofiisi ey’amagezi.',
    'Biometrics': 'Biometrics', 'Turnstiles & barriers': 'Turnstiles ne barriers', 'Video surveillance': 'Okulondoola n’ebifaananyi', 'Smart POS': 'Smart POS',
    'Authorized dealer of': 'Omugabi omukkirizibbwa owa', 'products, East Africa': 'ebintu, Obuvanjuba bwa Africa',
    'Access solutions': 'Eby’okuyingira',
    'Alfa Africana is a distributor of ASSA ABLOY, the global leader in access solutions, bringing trusted locking and door-opening technology to businesses, institutions and homes.':
      'Alfa Africana mugabi wa ASSA ABLOY, omukulembeze w’ensi yonna mu by’okuyingira, aleeta tekinologiya ow’okukonkona n’okuggulawo enzigi eri bizinensi, ebitongole n’amaka.',
    'Mechanical & electronic locks': 'Ebikonkona eby’ekyuma n’eby’amasannyalaze', 'Door hardware': 'Ebyuma by’enzigi',
    'Electric strikes & maglocks': 'Electric strikes ne maglocks', 'Keys & cylinders': 'Ebisumuluzo ne cylinders',
    'Distributor of': 'Omugabi owa', 'access solutions': 'eby’okuyingira',

    /* catalogue */
    'What We Sell': 'Kye Tutunda',
    'From the first fingerprint to the last locked door, we supply every step of a secure site.':
      'Okuva ku ngalo esooka okutwalibwa okutuuka ku luggi olusembayo okukonkonebwa, tuwa buli kifo ekikuumibwa buli kyetaago.',
    'Scroll': 'Wanula',
    'Identify': 'Tegeera', 'Know exactly who is at the door, by fingerprint, face or card.': 'Manya ddala ani ali ku luggi, okuyita mu ngalo, ku maaso oba kaadi.',
    'ZKTeco · Master Distributor': 'ZKTeco · Omugabi Omukulu',
    'Fingerprint terminals': 'Ebyuma by’engalo', 'Time & attendance and access': 'Ebiseera, okubaawo n’okuyingira',
    'Face recognition': 'Okutegeera amaaso', 'Touchless identity checks': 'Okukebera endagamuntu nga tokutteko',
    'Card & RFID readers': 'Ebisoma kaadi ne RFID', 'Proximity and smart-card entry': 'Okuyingira n’ekaadi ey’amagezi',
    'Control entry': 'Fuga okuyingira', 'Gates, barriers and locks that open only for the right people.': 'Emiryango, barriers n’ebikonkona ebiggulwawo abantu abatuufu bokka.',
    'ZKTeco + ASSA ABLOY': 'ZKTeco + ASSA ABLOY',
    'Turnstiles & speed gates': 'Turnstiles ne speed gates', 'Pedestrian access control': 'Okufuga abatambula n’ebigere',
    'Boom barriers': 'Boom barriers', 'Vehicle and parking control': 'Okufuga mmotoka ne parking',
    'Smart & door locks': 'Ebikonkona eby’amagezi n’eby’enzigi', 'Keypad, lever and electronic locks': 'Ebikonkona bya keypad, lever n’eby’amasannyalaze',
    'Maglocks & door hardware': 'Maglocks n’ebyuma by’enzigi', 'Electromagnetic and fail-safe locking': 'Okukonkona kwa electromagnetic ne fail-safe',
    'Watch & connect': 'Londoola era Yunga', 'Cameras, networks and devices that keep the whole site running.': 'Kamera, networks n’ebyuma ebikuuma ekifo kyonna nga kitambula.',
    'ZKTeco + leading IT brands': 'ZKTeco + ba brand ba IT abakulu',
    'CCTV & surveillance': 'CCTV n’okulondoola', 'Cameras and recorders': 'Kamera n’ebikwata',
    'IT hardware': 'IT hardware', 'Servers & storage': 'Servers ne storage', 'Enterprise computing': 'Kompyuta za kampuni',
    'Networking': 'Networking', 'Switches, routers and cabling': 'Switches, routers ne cabling',
    'Laptops & desktops': 'Laptops ne desktops', 'Devices and accessories': 'Ebyuma n’ebikozesebwa',
    'Retail and hospitality terminals': 'Terminals ez’amaduuka n’amakolero g’abagenyi',

    /* services */
    'Our Services': 'Obuweereza Bwaffe',
    'Alfa Africana specializes in offering customized IT services, including managed services, corporate IT solutions, and AI-based security solutions. We work closely with our clients to address their unique requirements, ensuring effective, secure, and scalable solutions.':
      'Alfa Africana eyeekenneenya mu kuwa obuweereza bwa IT obukoleddwa ng’omuntu bw’ayagala, nga mwotwalidde managed services, eby’okugonjoola bya IT ebya kampuni, n’eby’obukuumi ebikozesa AI. Tukolagana kumpi ne bakasitoma baffe okutuukiriza ebyetaago byabwe eby’enjawulo, nga tukakasa eby’okugonjoola ebikola obulungi, ebyobukuumi era ebiyinza okugaziwa.',
    'We are an authorized distributor and retail supplier of leading IT brands, offering a wide range of hardware products to support both enterprise and small business needs. Our extensive inventory covers everything from networking equipment to advanced security devices.':
      'Tuli bagabi abakkirizibbwa era abatunda ba brand za IT ez’oku mwanjo, nga tuwa ebyuma bingi okuyamba bizinensi ennene n’entono. Ebintu byaffe bingi nnyo, okuva ku byuma bya networking okutuuka ku byuma by’obukuumi eby’omulembe.',
    'Laptops, Desktops & Accessories': 'Laptops, Desktops n’Ebikozesebwa', 'IT Hardware & Networking Solutions': 'IT Hardware n’Eby’okugonjoola bya Networking',
    'quickly, affordably and always on time.': 'mu bwangu, ku bbeeyi ennungi era buli kiseera ku ssaawa.',
    'Our team is made up of top IT professionals who can solve your toughest IT challenges': 'Ttiimu yaffe erimu abakugu ba IT abasingayo abayinza okugonjoola ebizibu byo ebikalubo',
    'Leading IT experts': 'Abakugu ba IT abakulembeze',
    'Cybersecurity & Application Development': 'Obukuumi bwa Cyber n’Okukola Applications', 'Home & Office Appliances - Retail Sales': 'Ebyuma by’awaka ne ofiisi - Okutunda',
    'Our expertise in telecommunications and network infrastructure allows us to deliver robust, reliable, and future-ready solutions that ensure seamless connectivity and communication for businesses of all sizes.':
      'Obukugu bwaffe mu by’essimu ne network infrastructure butusobozesa okuleeta eby’okugonjoola ebikakamu, ebyesigwa era ebiteekeddwateekeddwa eby’omu maaso, ebikakasa okuyungibwa n’empuliziganya etaliimu kutaataaganyizibwa eri bizinensi zonna.',
    'As security concerns rise globally, we leverage AI to provide sophisticated and adaptable security solutions. From advanced surveillance to predictive analytics, we help organizations protect their assets and operations with intelligent technology.':
      'Okweraliikirira obukuumi bwe kweyongera mu nsi yonna, tukozesa AI okuwa eby’okugonjoola eby’obukuumi eby’omulembe era ebikyukakyuka. Okuva ku kulondoola okw’omulembe okutuuka ku kwekebejja data okulaba eby’omu maaso, tuyamba ebitongole okukuuma ebintu byabyo n’emirimu nga bakozesa tekinologiya ow’amagezi.',
    'Our managed services are designed to help businesses optimize their operations, reduce IT complexity, and enhance their productivity. Our team of experts manages all aspects of IT infrastructure, allowing clients to focus on their core business objectives.':
      'Managed services zaffe zikoleddwa okuyamba bizinensi okulongoosa emirimu gyazo, okukendeeza obuzibu bwa IT, n’okwongera ku bivaamu. Ttiimu yaffe ey’abakugu etwala ebintu byonna ebya IT infrastructure, bakasitoma ne bakola ku bubaka bwabwe obukulu.',
    'Happy Customers': 'Bakasitoma Abasanyufu', 'Projects Completed': 'Pulojekiti Ezaggwa', 'Our Branches': 'Amatabi Gaffe',

    /* why us */
    'Why Us': 'Lwaki Ffe',
    'When you choose to partner with a company like us, you get a highly efficient team with a host of business benefits. Also you can embrace the future with confidence.':
      'Bw’olonda okukolagana ne kampuni nga ffe, afuna ttiimu ey’obukugu obw’amaanyi n’emigaso mingi eri bizinensi. Era osobola okwaniriza eby’omu maaso n’obwesige.',
    'Free Advisory & Estimate Survey': 'Okuteesa n’Okubalirira ku Bwereere', 'Online Help and Support': 'Obuyambi ku Mutimbagano',
    'We Serve in 7 Global Languages': 'Tuweereza mu Nnimi 7 ez’Ensi Yonna', 'One Day Process for Guarantee Claims': 'Okuddamu Okusaba Okuddaabiriza mu Lunaku Lumu',
    'Free Sourcing for Unavailable Products': 'Okunoonya Ebintu Ebitaliwo ku Bwereere',

    /* contact + footer */
    'Contact Us': 'Tukwatagane',
    'Let Alfa Africana be your trusted technology partner, dedicated to helping your business achieve its full potential. Reach out to us for a consultation and experience the difference of working with an industry leader committed to excellence.':
      'Leka Alfa Africana ebe munno wa tekinologiya omwesigwa, eyeewaddeyo okuyamba bizinensi yo okutuuka ku busobozi bwayo bwonna. Tukwate okufuna amagezi olabe enjawulo y’okukolagana n’omukulembeze mu mulimu ogwewaddeyo eri obulungi.',
    'Visit or call': 'Jjangu oba Kuba', 'Address:': 'Endagiriro:', 'Phone:': 'Essimu:', 'E-mail:': 'Email:', 'Email:': 'Email:',
    'First Name': 'Erinnya erisooka', 'Last Name': 'Erinnya ery’enda', 'Email': 'Email', 'First name': 'Erinnya erisooka', 'Last name': 'Erinnya ery’enda',
    'Submit': 'Weereza', 'All Rights Reserved.': 'Eddembe Lyonna Likuumibwa.', 'by': 'okuva ku',
    'Company': 'Kampuni', 'Support': 'Obuyambi', 'Help Center': 'Ekifo ky’Obuyambi', 'More Links': 'Ebirala', 'Feedback': 'Endowooza',
    'Please enter your name and a valid email.': 'Nsaba wandiike erinnya lyo ne email entuufu.', 'Opening your email app…': 'Tuggulawo email yo…',
    'Explore': 'Funoona', 'Master Distributor of ZKTeco and Distributor of ASSA ABLOY, serving businesses across Uganda since the ALFA Group began in 1970.': 'Omugabi Omukulu owa ZKTeco era Omugabi owa ASSA ABLOY, aweereza bizinensi mu Uganda okuva ALFA Group lwe yatandika mu 1970.', 'Alfa Africana. All rights reserved.': 'Alfa Africana. Eddembe lyonna likuumibwa.',
    'Skip to content': 'Simbuka ogende ku biri munda', 'Menu': 'Menu', 'Language': 'Olulimi'
  };

  var ATTRS = ['placeholder', 'aria-label', 'alt'];
  var orig = new WeakMap();         // text node -> original text; element -> {attr: original}
  var norm = function (s) { return s.replace(/\s+/g, ' ').trim(); };

  function eachText(fn) {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        return p === 'SCRIPT' || p === 'STYLE' || p === 'CANVAS' || !n.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var n; while ((n = w.nextNode())) fn(n);
  }

  function apply(lang) {
    var lg = lang === 'lg';
    eachText(function (n) {
      if (!orig.has(n)) orig.set(n, n.nodeValue);
      var o = orig.get(n), key = norm(o);
      if (lg && LG[key]) { var lead = o.match(/^\s*/)[0], trail = o.match(/\s*$/)[0]; n.nodeValue = lead + LG[key] + trail; }
      else n.nodeValue = o;
    });
    Array.prototype.forEach.call(document.querySelectorAll('[placeholder],[aria-label],[alt]'), function (el) {
      var saved = orig.get(el) || {}; orig.set(el, saved);
      ATTRS.forEach(function (a) {
        if (!el.hasAttribute(a)) return;
        if (!(a in saved)) saved[a] = el.getAttribute(a);
        var t = lg && LG[norm(saved[a])];
        el.setAttribute(a, t || saved[a]);
      });
    });
    document.documentElement.lang = lg ? 'lg' : 'en';
    Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function (b) {
      var on = b.dataset.lang === lang; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on));
    });
    var t = document.querySelector('title');
    if (t) { if (!t.dataset.en) t.dataset.en = t.textContent; t.textContent = lg ? 'Alfa Africana | Omugabi Omukulu owa ZKTeco & Omugabi owa ASSA ABLOY, Kampala' : t.dataset.en; }
    try { localStorage.setItem('alfa-lang', lang); } catch (e) {}
    window.ALFA_LANG = lang;
    window.dispatchEvent(new CustomEvent('alfa-lang', { detail: lang }));
  }

  window.ALFA_T = function (s) { return window.ALFA_LANG === 'lg' && LG[s] ? LG[s] : s; };

  var box = document.querySelector('.lang');
  if (box) box.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) apply(b.dataset.lang); });
  var saved = null; try { saved = localStorage.getItem('alfa-lang'); } catch (e) {}
  if (saved === 'lg') apply('lg'); else window.ALFA_LANG = 'en';
})();
