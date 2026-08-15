// Hand-picked EXTRA first-person declarations (deepen every theme pool) and
// curated SPECIAL DAYS — fixed (New Year, Christmas, Year End) and movable
// (Good Friday, Easter — computed per year).
import { Bilingual, DayVerse, ThemeKey, Verse } from "./types";

export const EXTRA_VERSES: Record<ThemeKey, Verse[]> = {
  faith: [
    { ref: { hi: "मत्ती 21:22", en: "Matthew 21:22" }, hi: "मैं प्रार्थना में विश्वास से जो माँगता हूँ, वह मुझे मिलता है।", en: "Whatever I ask in prayer with faith, I receive." },
    { ref: { hi: "2 कुरिन्थियों 1:20", en: "2 Corinthians 1:20" }, hi: "परमेश्वर की सब प्रतिज्ञाएँ मेरे लिए मसीह में 'हाँ' और 'आमीन' हैं।", en: "All God's promises are Yes and Amen for me in Christ." },
    { ref: { hi: "इब्रानियों 10:23", en: "Hebrews 10:23" }, hi: "मैं अपनी आशा के अंगीकार को दृढ़ता से थामे रहता हूँ, क्योंकि परमेश्वर विश्वासयोग्य है।", en: "I hold fast my confession of hope, for God is faithful." },
    { ref: { hi: "याकूब 1:6", en: "James 1:6" }, hi: "मैं विश्वास से माँगता हूँ और सन्देह नहीं करता।", en: "I ask in faith, without doubting." },
    { ref: { hi: "रोमियों 4:20", en: "Romans 4:20" }, hi: "मैं विश्वास में दृढ़ होकर परमेश्वर की महिमा करता हूँ।", en: "I grow strong in faith and give glory to God." },
  ],
  blessing: [
    { ref: { hi: "मलाकी 3:10", en: "Malachi 3:10" }, hi: "परमेश्वर मेरे लिए आकाश के झरोखे खोलकर आशीष की वर्षा करता है।", en: "God opens heaven's windows and pours blessing on me." },
    { ref: { hi: "भजन संहिता 84:11", en: "Psalm 84:11" }, hi: "यहोवा मुझ से कोई अच्छी वस्तु नहीं रोकता, क्योंकि मैं सीधाई से चलता हूँ।", en: "The LORD withholds no good thing from me as I walk uprightly." },
    { ref: { hi: "इफिसियों 3:20", en: "Ephesians 3:20" }, hi: "परमेश्वर मेरी विनती और समझ से कहीं अधिक बढ़कर मेरे लिए करता है।", en: "God does far more for me than I ask or think." },
    { ref: { hi: "फिलिप्पियों 4:19", en: "Philippians 4:19" }, hi: "मेरा परमेश्वर मेरी हर घटी को मसीह में अपने धन के अनुसार पूरा करता है।", en: "My God supplies my every need according to His riches in Christ." },
    { ref: { hi: "भजन संहिता 5:12", en: "Psalm 5:12" }, hi: "यहोवा मुझ धर्मी को आशीष देता और अपनी कृपा की ढाल से ढाँपता है।", en: "The LORD blesses me and covers me with favor as a shield." },
  ],
  healing: [
    { ref: { hi: "मत्ती 11:28", en: "Matthew 11:28" }, hi: "मैं यीशु के पास आता हूँ, और वह मुझे विश्राम देता है।", en: "I come to Jesus, and He gives me rest." },
    { ref: { hi: "भजन संहिता 30:2", en: "Psalm 30:2" }, hi: "मैंने पुकारा और परमेश्वर ने मुझे चंगा किया।", en: "I cried to God, and He healed me." },
    { ref: { hi: "3 यूहन्ना 1:2", en: "3 John 1:2" }, hi: "मैं सब बातों में उन्नति करता और भला-चंगा रहता हूँ।", en: "I prosper in all things and am in good health." },
    { ref: { hi: "यशायाह 40:31", en: "Isaiah 40:31" }, hi: "मैं यहोवा की बाट जोहता हूँ और नया बल पाता हूँ; मैं उकाब सा उड़ता हूँ।", en: "I wait on the LORD and renew my strength; I soar like an eagle." },
    { ref: { hi: "भजन संहिता 34:18", en: "Psalm 34:18" }, hi: "यहोवा मेरे टूटे मन के समीप है और मुझे बचाता है।", en: "The LORD is near my broken heart and saves me." },
  ],
  protection: [
    { ref: { hi: "भजन संहिता 91:11", en: "Psalm 91:11" }, hi: "परमेश्वर अपने दूतों को मेरी रक्षा की आज्ञा देता है, जहाँ भी मैं जाऊँ।", en: "God commands His angels to guard me in all my ways." },
    { ref: { hi: "यशायाह 54:17", en: "Isaiah 54:17" }, hi: "जो हथियार मेरे विरुद्ध बने, वह सफल नहीं होगा।", en: "No weapon formed against me shall prosper." },
    { ref: { hi: "भजन संहिता 3:3", en: "Psalm 3:3" }, hi: "यहोवा मेरे चारों ओर मेरी ढाल है, वह मेरे सिर को ऊँचा करता है।", en: "The LORD is a shield around me, the lifter of my head." },
    { ref: { hi: "व्यवस्थाविवरण 31:6", en: "Deuteronomy 31:6" }, hi: "मैं दृढ़ और साहसी हूँ; परमेश्वर मुझे कभी न छोड़ेगा।", en: "I am strong and courageous; God will never leave me." },
    { ref: { hi: "भजन संहिता 4:8", en: "Psalm 4:8" }, hi: "मैं शान्ति से लेट कर सो जाता हूँ, क्योंकि यहोवा मुझे निडर रखता है।", en: "I lie down and sleep in peace, for the LORD keeps me safe." },
  ],
  victory: [
    { ref: { hi: "रोमियों 8:31", en: "Romans 8:31" }, hi: "परमेश्वर मेरी ओर है, तो मेरे विरुद्ध कौन हो सकता है?", en: "God is for me—who can be against me?" },
    { ref: { hi: "निर्गमन 14:14", en: "Exodus 14:14" }, hi: "यहोवा मेरे लिए लड़ता है; मुझे केवल शान्त रहना है।", en: "The LORD fights for me; I only need to be still." },
    { ref: { hi: "1 यूहन्ना 4:4", en: "1 John 4:4" }, hi: "जो मुझ में है, वह उससे बड़ा है जो संसार में है।", en: "He who is in me is greater than he who is in the world." },
    { ref: { hi: "भजन संहिता 118:6", en: "Psalm 118:6" }, hi: "यहोवा मेरी ओर है, मैं नहीं डरता; मनुष्य मेरा क्या कर सकता है?", en: "The LORD is with me; I will not fear. What can man do to me?" },
    { ref: { hi: "यशायाह 40:29", en: "Isaiah 40:29" }, hi: "परमेश्वर मुझे थके होने पर बल देता और मेरी सामर्थ्य बढ़ाता है।", en: "God gives me strength when I am weary and increases my power." },
  ],
  grace: [
    { ref: { hi: "लूका 1:37", en: "Luke 1:37" }, hi: "परमेश्वर के लिए कोई भी बात असम्भव नहीं है।", en: "Nothing is impossible with God." },
    { ref: { hi: "इफिसियों 1:7", en: "Ephesians 1:7" }, hi: "मुझे मसीह के लहू से छुटकारा और पापों की क्षमा मिली है।", en: "In Christ I have redemption and forgiveness of sins." },
    { ref: { hi: "याकूब 4:6", en: "James 4:6" }, hi: "परमेश्वर मुझ नम्र को और भी अनुग्रह देता है।", en: "God gives me more grace as I stay humble." },
    { ref: { hi: "1 कुरिन्थियों 15:10", en: "1 Corinthians 15:10" }, hi: "मैं परमेश्वर के अनुग्रह से जो कुछ हूँ, वही हूँ।", en: "By the grace of God I am what I am." },
    { ref: { hi: "विलापगीत 3:22-23", en: "Lamentations 3:22-23" }, hi: "यहोवा की करुणा प्रति भोर मेरे लिए नई होती है।", en: "The LORD's mercies are new for me every morning." },
  ],
  love: [
    { ref: { hi: "1 यूहन्ना 4:16", en: "1 John 4:16" }, hi: "परमेश्वर प्रेम है, और मैं उसके प्रेम में बना रहता हूँ।", en: "God is love, and I abide in His love." },
    { ref: { hi: "यूहन्ना 15:9", en: "John 15:9" }, hi: "जैसे पिता ने यीशु से प्रेम किया, वैसे ही यीशु ने मुझ से प्रेम किया; मैं उसके प्रेम में रहता हूँ।", en: "As the Father loved Jesus, so He loves me; I abide in His love." },
    { ref: { hi: "भजन संहिता 103:11", en: "Psalm 103:11" }, hi: "आकाश जैसा ऊँचा है, वैसी ही परमेश्वर की करुणा मुझ पर बड़ी है।", en: "As high as the heavens, so great is God's love toward me." },
    { ref: { hi: "1 यूहन्ना 3:1", en: "1 John 3:1" }, hi: "पिता ने मुझ से ऐसा प्रेम किया कि मैं परमेश्वर की सन्तान कहलाता हूँ।", en: "The Father loves me so that I am called a child of God." },
    { ref: { hi: "यशायाह 43:4", en: "Isaiah 43:4" }, hi: "मैं परमेश्वर की दृष्टि में अनमोल और आदरणीय हूँ, और वह मुझ से प्रेम करता है।", en: "I am precious and honored in God's sight, and He loves me." },
  ],
};

export interface SpecialDay {
  title: Bilingual;
  verses: DayVerse[];
  confession: Bilingual;
  prayer: Bilingual;
  encouragement: Bilingual;
}

function v(theme: ThemeKey, refHi: string, refEn: string, hi: string, en: string): DayVerse {
  return { theme, ref: { hi: refHi, en: refEn }, hi, en };
}

export const FIXED_SPECIAL_DAYS: Record<string, SpecialDay> = {
  "01-01": {
    title: { hi: "नववर्ष की आशीष", en: "New Year Blessing" },
    verses: [
      v("grace", "विलापगीत 3:22-23", "Lamentations 3:22-23", "परमेश्वर की दया मेरे लिए प्रति भोर नई है; उसकी सच्चाई महान है।", "God's mercies are new for me every morning; great is His faithfulness."),
      v("faith", "यशायाह 43:19", "Isaiah 43:19", "परमेश्वर मेरे जीवन में एक नई बात कर रहा है; अभी वह प्रगट होगी।", "God is doing a new thing in my life; now it springs forth."),
      v("blessing", "यिर्मयाह 29:11", "Jeremiah 29:11", "परमेश्वर की मेरे लिए योजनाएँ कुशल की हैं, जो मुझे आशा और भविष्य देती हैं।", "God's plans for me are for good, to give me hope and a future."),
      v("protection", "भजन संहिता 90:1", "Psalm 90:1", "प्रभु पीढ़ी से पीढ़ी तक मेरा धाम रहा है।", "The Lord has been my dwelling place in every generation."),
      v("victory", "फिलिप्पियों 3:13-14", "Philippians 3:13-14", "मैं पिछली बातें भूलकर आगे की ओर बढ़ता जाता हूँ।", "Forgetting what is behind, I press on toward what lies ahead."),
      v("healing", "यशायाह 40:31", "Isaiah 40:31", "मैं यहोवा की बाट जोहता हूँ और नया बल पाता हूँ।", "I wait on the LORD and renew my strength."),
      v("love", "भजन संहिता 65:11", "Psalm 65:11", "परमेश्वर मेरे वर्ष को अपनी भलाई का मुकुट पहनाता है।", "God crowns my year with His goodness."),
    ],
    confession: { hi: "इस नए वर्ष में मैं परमेश्वर की नई दया और योजनाओं में विश्वास से आगे बढ़ता हूँ।", en: "In this new year I step forward in faith into God's new mercies and plans." },
    prayer: { hi: "हे पिता, इस नए वर्ष को तेरे हाथ में सौंपता हूँ। मेरे हर दिन को अपनी आशीष और अगुवाई से भर दे। यीशु के नाम में, आमीन।", en: "Father, I place this new year in Your hands. Fill every day with Your blessing and guidance. In Jesus' name, Amen." },
    encouragement: { hi: "नया वर्ष, नई दया — परमेश्वर तेरे आगे भला ही भला रखे हुए है।", en: "A new year, new mercies—God has only good ahead for you." },
  },
  "12-24": {
    title: { hi: "क्रिसमस संध्या", en: "Christmas Eve" },
    verses: [
      v("love", "यूहन्ना 3:16", "John 3:16", "परमेश्वर ने मुझ से ऐसा प्रेम किया कि अपना एकलौता पुत्र दे दिया।", "God so loved me that He gave His only Son."),
      v("blessing", "यशायाह 9:6", "Isaiah 9:6", "मेरे लिए एक बालक उत्पन्न हुआ, मुझे एक पुत्र दिया गया है।", "For me a child is born, to me a son is given."),
      v("faith", "लूका 2:11", "Luke 2:11", "आज मेरे लिए एक उद्धारकर्ता जन्मा है, जो मसीह प्रभु है।", "Today a Savior is born for me, who is Christ the Lord."),
      v("grace", "तीतुस 2:11", "Titus 2:11", "परमेश्वर का उद्धार देने वाला अनुग्रह मुझ पर प्रगट हुआ है।", "God's grace that brings salvation has appeared to me."),
      v("victory", "मत्ती 1:23", "Matthew 1:23", "उसका नाम इम्मानुएल है — परमेश्वर मेरे साथ है।", "His name is Immanuel—God is with me."),
      v("protection", "लूका 2:14", "Luke 2:14", "परमेश्वर की महिमा हो, और मुझ में उसकी शान्ति बनी रहे।", "Glory to God, and may His peace rest on me."),
      v("healing", "यशायाह 9:2", "Isaiah 9:2", "मैं अन्धकार में था, पर मैंने बड़ी ज्योति देखी है।", "I walked in darkness, but I have seen a great light."),
    ],
    confession: { hi: "मैं आनन्द से अंगीकार करता हूँ कि यीशु मेरा उद्धारकर्ता है — परमेश्वर मेरे साथ है।", en: "I joyfully confess that Jesus is my Savior—God is with me." },
    prayer: { hi: "हे पिता, यीशु के इस अनमोल वरदान के लिये धन्यवाद। मेरे हृदय में उसकी ज्योति और शान्ति भर दे। आमीन।", en: "Father, thank You for the precious gift of Jesus. Fill my heart with His light and peace. Amen." },
    encouragement: { hi: "परमेश्वर तेरे साथ है — इम्मानुएल! उसका आनन्द तेरी शक्ति है।", en: "God is with you—Immanuel! His joy is your strength." },
  },
  "12-25": {
    title: { hi: "मेरी क्रिसमस!", en: "Merry Christmas!" },
    verses: [
      v("love", "1 यूहन्ना 4:9", "1 John 4:9", "परमेश्वर ने अपने पुत्र को भेजा, कि मैं उसके द्वारा जीवन पाऊँ।", "God sent His Son so that I might live through Him."),
      v("blessing", "लूका 2:10", "Luke 2:10", "मैं नहीं डरता — यह बड़े आनन्द का सुसमाचार मेरे लिए भी है।", "I will not fear—this good news of great joy is for me too."),
      v("grace", "यूहन्ना 1:14", "John 1:14", "वचन देहधारी हुआ, अनुग्रह और सच्चाई से भरा, और मेरे बीच रहा।", "The Word became flesh, full of grace and truth, and dwelt with me."),
      v("faith", "यशायाह 7:14", "Isaiah 7:14", "इम्मानुएल आया है — परमेश्वर मेरे साथ है।", "Immanuel has come—God is with me."),
      v("victory", "इब्रानियों 1:3", "Hebrews 1:3", "यीशु परमेश्वर की महिमा का प्रकाश है, और वह मेरी आशा है।", "Jesus is the radiance of God's glory, and He is my hope."),
      v("protection", "भजन संहिता 98:1", "Psalm 98:1", "मैं यहोवा के लिए नया गीत गाता हूँ, क्योंकि उसने आश्चर्यकर्म किए हैं।", "I sing a new song to the LORD, for He has done marvelous things."),
      v("healing", "गलातियों 4:4-5", "Galatians 4:4-5", "समय पूरा होने पर परमेश्वर ने अपने पुत्र को भेजा, कि मुझे छुड़ा ले।", "In the fullness of time God sent His Son to redeem me."),
    ],
    confession: { hi: "आज मैं आनन्द मनाता हूँ — उद्धारकर्ता का जन्म हुआ है, और उसकी ज्योति मुझ में चमकती है।", en: "Today I rejoice—the Savior is born, and His light shines in me." },
    prayer: { hi: "हे प्रभु यीशु, तेरे जन्म के लिये धन्यवाद। तेरा प्रेम और आनन्द आज मेरे घर और हृदय में भर दे। आमीन।", en: "Lord Jesus, thank You for Your birth. Fill my home and heart with Your love and joy today. Amen." },
    encouragement: { hi: "आनन्दित हो! स्वर्ग का सबसे बड़ा वरदान तेरे लिये आया है।", en: "Rejoice! Heaven's greatest gift has come for you." },
  },
  "12-31": {
    title: { hi: "वर्ष का अंतिम दिन", en: "Year's End" },
    verses: [
      v("grace", "भजन संहिता 103:2", "Psalm 103:2", "मैं यहोवा को धन्य कहता हूँ और उसके किसी उपकार को नहीं भूलता।", "I bless the LORD and forget none of His benefits."),
      v("faith", "इब्रानियों 13:8", "Hebrews 13:8", "यीशु मसीह कल, आज और सदा एक सा है — और वह मेरे साथ है।", "Jesus Christ is the same yesterday, today and forever—and He is with me."),
      v("blessing", "भजन संहिता 31:15", "Psalm 31:15", "मेरे समय परमेश्वर के हाथ में हैं।", "My times are in God's hands."),
      v("victory", "2 कुरिन्थियों 5:17", "2 Corinthians 5:17", "मैं मसीह में नई सृष्टि हूँ; पुरानी बातें बीत गईं।", "I am a new creation in Christ; the old has passed away."),
      v("protection", "भजन संहिता 121:8", "Psalm 121:8", "यहोवा मेरे आने-जाने में अब से लेकर सदा तक मेरी रक्षा करता है।", "The LORD keeps my going out and coming in, now and forever."),
      v("healing", "भजन संहिता 147:3", "Psalm 147:3", "वह मेरे टूटे मन को चंगा करता और मेरे घावों पर पट्टी बाँधता है।", "He heals my broken heart and binds up my wounds."),
      v("love", "भजन संहिता 136:1", "Psalm 136:1", "मैं यहोवा का धन्यवाद करता हूँ, क्योंकि उसकी करुणा सदा की है।", "I give thanks to the LORD, for His love endures forever."),
    ],
    confession: { hi: "मैं इस बीते वर्ष की हर आशीष के लिये परमेश्वर का धन्यवाद करता हूँ, और आगे विश्वास से चलता हूँ।", en: "I thank God for every blessing of this past year, and I move forward in faith." },
    prayer: { hi: "हे पिता, बीते वर्ष की तेरी विश्वासयोग्यता के लिये धन्यवाद। मेरे समय तेरे हाथ में हैं — मेरा भविष्य तुझे सौंपता हूँ। आमीन।", en: "Father, thank You for Your faithfulness this past year. My times are in Your hands—I commit my future to You. Amen." },
    encouragement: { hi: "पीछे मुड़कर धन्यवाद कर, आगे बढ़कर विश्वास कर — परमेश्वर विश्वासयोग्य है।", en: "Look back with thanks, step forward in faith—God is faithful." },
  },
};

const GOOD_FRIDAY: SpecialDay = {
  title: { hi: "गुड फ्राइडे", en: "Good Friday" },
  verses: [
    v("love", "यशायाह 53:5", "Isaiah 53:5", "वह मेरे अपराधों के कारण घायल हुआ; उसके कोड़े खाने से मैं चंगा हुआ।", "He was pierced for my transgressions; by His wounds I am healed."),
    v("grace", "1 पतरस 2:24", "1 Peter 2:24", "उसने मेरे पापों को अपनी देह पर क्रूस पर उठा लिया।", "He bore my sins in His body on the cross."),
    v("faith", "रोमियों 5:8", "Romans 5:8", "जब मैं पापी ही था, तब मसीह मेरे लिए मरा।", "While I was still a sinner, Christ died for me."),
    v("blessing", "यूहन्ना 3:16", "John 3:16", "परमेश्वर ने मुझ से इतना प्रेम किया कि अपना पुत्र दे दिया।", "God so loved me that He gave His Son."),
    v("victory", "कुलुस्सियों 2:14", "Colossians 2:14", "मेरे विरुद्ध जो दोषपत्र था, उसे उसने क्रूस पर कीलों से जड़ दिया।", "He nailed to the cross the record of debt that stood against me."),
    v("healing", "लूका 23:34", "Luke 23:34", "'हे पिता, इन्हें क्षमा कर' — उसका अनुग्रह मुझ पर है।", "'Father, forgive them'—His grace is upon me."),
    v("protection", "2 कुरिन्थियों 5:21", "2 Corinthians 5:21", "वह मेरे लिए पाप ठहरा, कि मैं उसमें परमेश्वर की धार्मिकता बनूँ।", "He became sin for me, so that I might become God's righteousness in Him."),
  ],
  confession: { hi: "मैं अंगीकार करता हूँ कि यीशु मेरे पापों के लिए क्रूस पर मरा, और उसके लहू से मैं छुड़ाया गया हूँ।", en: "I confess that Jesus died on the cross for my sins, and by His blood I am redeemed." },
  prayer: { hi: "हे प्रभु यीशु, क्रूस पर तेरे बलिदान के लिये धन्यवाद। तेरा प्रेम मेरे हृदय में सदा बना रहे। आमीन।", en: "Lord Jesus, thank You for Your sacrifice on the cross. May Your love remain in my heart forever. Amen." },
  encouragement: { hi: "क्रूस पर उसका प्रेम तेरे लिए था — तू क्षमा किया गया और प्रिय है।", en: "His love on the cross was for you—you are forgiven and beloved." },
};

const EASTER: SpecialDay = {
  title: { hi: "ईस्टर — पुनरुत्थान", en: "Easter — Resurrection" },
  verses: [
    v("victory", "1 कुरिन्थियों 15:57", "1 Corinthians 15:57", "परमेश्वर मुझे प्रभु यीशु मसीह के द्वारा जय दिलाता है।", "God gives me the victory through my Lord Jesus Christ."),
    v("faith", "लूका 24:6", "Luke 24:6", "वह यहाँ नहीं, जी उठा है — और उसका जीवन मुझ में है।", "He is not here, He has risen—and His life is in me."),
    v("grace", "रोमियों 6:4", "Romans 6:4", "जैसे मसीह जी उठा, वैसे ही मैं भी नए जीवन में चलता हूँ।", "As Christ was raised, so I too walk in newness of life."),
    v("love", "यूहन्ना 11:25", "John 11:25", "यीशु पुनरुत्थान और जीवन है; उस पर विश्वास करके मैं जीवित रहूँगा।", "Jesus is the resurrection and the life; believing in Him, I will live."),
    v("blessing", "1 पतरस 1:3", "1 Peter 1:3", "यीशु के जी उठने से मुझे एक जीवित आशा मिली है।", "Through Jesus' resurrection I have a living hope."),
    v("healing", "रोमियों 8:11", "Romans 8:11", "जिस आत्मा ने यीशु को जिलाया, वही आत्मा मुझ में वास करती है।", "The Spirit who raised Jesus lives in me."),
    v("protection", "1 कुरिन्थियों 15:20", "1 Corinthians 15:20", "मसीह सचमुच मरे हुओं में से जी उठा है — मेरी आशा जीवित है।", "Christ has indeed risen from the dead—my hope is alive."),
  ],
  confession: { hi: "मैं अंगीकार करता हूँ कि यीशु जी उठा है, और उसका पुनरुत्थान जीवन मुझ में सामर्थ्य से काम करता है।", en: "I confess that Jesus is risen, and His resurrection life works powerfully in me." },
  prayer: { hi: "हे जीवित प्रभु, तेरे पुनरुत्थान के लिये धन्यवाद। मुझे नए जीवन और जीवित आशा से भर दे। आमीन।", en: "Living Lord, thank You for Your resurrection. Fill me with new life and living hope. Amen." },
  encouragement: { hi: "कब्र खाली है — तेरी आशा जीवित है! मसीह में तू विजयी है।", en: "The tomb is empty—your hope is alive! In Christ you are victorious." },
};

// Western (Gregorian) Easter via the Anonymous Gregorian algorithm.
function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3=March, 4=April
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function sameYmd(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function getMovableSpecial(date: Date): SpecialDay | null {
  const easter = easterSunday(date.getFullYear());
  const goodFriday = new Date(easter);
  goodFriday.setDate(easter.getDate() - 2);
  if (sameYmd(date, easter)) return EASTER;
  if (sameYmd(date, goodFriday)) return GOOD_FRIDAY;
  return null;
}
