// Offline Bible confession content. Bilingual (Hindi default + English).
// Verses are organized by 7 themes; each day composes one verse per theme,
// plus a daily confession, prayer and encouragement. This deterministically
// generates a unique-feeling plan for every day of the year (offline).

import { dayOfYear } from "@/src/utils/date";
import { Bilingual, DayContent, DayVerse, ThemeKey, Verse } from "./types";
import { EXTRA_VERSES, SPECIAL_DAYS } from "./special";

export type { ThemeKey, Verse, DayVerse, Bilingual, DayContent } from "./types";
export const THEME_LABELS: Record<ThemeKey, Bilingual> = {
  faith: { hi: "विश्वास", en: "Faith" },
  blessing: { hi: "आशीष", en: "Blessing" },
  healing: { hi: "चंगाई", en: "Healing" },
  protection: { hi: "सुरक्षा", en: "Protection" },
  victory: { hi: "विजय", en: "Victory" },
  grace: { hi: "अनुग्रह", en: "Grace" },
  love: { hi: "परमेश्वर का प्रेम", en: "God's Love" },
};

export const THEME_ORDER: ThemeKey[] = [
  "faith",
  "blessing",
  "healing",
  "protection",
  "victory",
  "grace",
  "love",
];

const VERSES: Record<ThemeKey, Verse[]> = {
  faith: [
    { ref: { hi: "इब्रानियों 11:1", en: "Hebrews 11:1" }, hi: "अब विश्वास आशा की हुई वस्तुओं का निश्चय, और अनदेखी वस्तुओं का प्रमाण है।", en: "Now faith is the assurance of things hoped for, the conviction of things not seen." },
    { ref: { hi: "मरकुस 11:24", en: "Mark 11:24" }, hi: "जो कुछ तुम प्रार्थना करके माँगते हो, विश्वास करो कि तुम्हें मिल गया, तो तुम्हारे लिये हो जाएगा।", en: "Whatever you ask in prayer, believe that you have received it, and it will be yours." },
    { ref: { hi: "2 कुरिन्थियों 5:7", en: "2 Corinthians 5:7" }, hi: "क्योंकि हम रूप देखकर नहीं, पर विश्वास से चलते हैं।", en: "For we walk by faith, not by sight." },
    { ref: { hi: "रोमियों 10:17", en: "Romans 10:17" }, hi: "विश्वास सुनने से, और सुनना मसीह के वचन से होता है।", en: "So faith comes from hearing, and hearing through the word of Christ." },
    { ref: { hi: "मरकुस 9:23", en: "Mark 9:23" }, hi: "विश्वास करने वाले के लिये सब कुछ सम्भव है।", en: "All things are possible for one who believes." },
    { ref: { hi: "इब्रानियों 11:6", en: "Hebrews 11:6" }, hi: "और विश्वास बिना उसे प्रसन्न करना अनहोना है।", en: "And without faith it is impossible to please God." },
    { ref: { hi: "नीतिवचन 3:5", en: "Proverbs 3:5" }, hi: "अपने सम्पूर्ण मन से यहोवा पर भरोसा रख, और अपनी समझ का सहारा न ले।", en: "Trust in the LORD with all your heart, and do not lean on your own understanding." },
  ],
  blessing: [
    { ref: { hi: "गिनती 6:24", en: "Numbers 6:24" }, hi: "यहोवा तुझे आशीष दे और तेरी रक्षा करे।", en: "The LORD bless you and keep you." },
    { ref: { hi: "यिर्मयाह 17:7", en: "Jeremiah 17:7" }, hi: "धन्य है वह पुरुष जो यहोवा पर भरोसा रखता है, जिसका आसरा यहोवा है।", en: "Blessed is the man who trusts in the LORD, whose trust is the LORD." },
    { ref: { hi: "इफिसियों 1:3", en: "Ephesians 1:3" }, hi: "परमेश्वर ने मसीह में हमें स्वर्गीय स्थानों में सब प्रकार की आत्मिक आशीषें दी हैं।", en: "God has blessed us in Christ with every spiritual blessing in the heavenly places." },
    { ref: { hi: "नीतिवचन 10:22", en: "Proverbs 10:22" }, hi: "यहोवा की आशीष ही से समृद्धि होती है, और वह उसके साथ दुःख नहीं मिलाता।", en: "The blessing of the LORD makes rich, and he adds no sorrow with it." },
    { ref: { hi: "भजन संहिता 23:1", en: "Psalm 23:1" }, hi: "यहोवा मेरा चरवाहा है, मुझे कुछ घटी न होगी।", en: "The LORD is my shepherd; I shall not want." },
    { ref: { hi: "भजन संहिता 1:3", en: "Psalm 1:3" }, hi: "वह उस वृक्ष के समान है, जो जल के सोतों के किनारे लगाया गया है और अपने समय पर फलता है।", en: "He is like a tree planted by streams of water that yields its fruit in its season." },
    { ref: { hi: "व्यवस्थाविवरण 28:2", en: "Deuteronomy 28:2" }, hi: "ये सब आशीषें तुझ पर आएँगी और तुझे मिलेंगी, यदि तू यहोवा की सुने।", en: "All these blessings shall come upon you if you obey the voice of the LORD." },
  ],
  healing: [
    { ref: { hi: "यिर्मयाह 30:17", en: "Jeremiah 30:17" }, hi: "यहोवा की यह वाणी है, मैं तुझे भला चंगा कर दूँगा और तेरे घावों को अच्छा कर दूँगा।", en: "For I will restore health to you, and your wounds I will heal, declares the LORD." },
    { ref: { hi: "यशायाह 53:5", en: "Isaiah 53:5" }, hi: "उसके कोड़े खाने से हम चंगे हो जाते हैं।", en: "And with his wounds we are healed." },
    { ref: { hi: "भजन संहिता 103:3", en: "Psalm 103:3" }, hi: "वह तेरे सब अधर्म को क्षमा करता, और तेरे सब रोगों को चंगा करता है।", en: "He forgives all your iniquity and heals all your diseases." },
    { ref: { hi: "1 पतरस 2:24", en: "1 Peter 2:24" }, hi: "उसके मार खाने से तुम चंगे हुए।", en: "By his wounds you have been healed." },
    { ref: { hi: "निर्गमन 15:26", en: "Exodus 15:26" }, hi: "क्योंकि मैं यहोवा तेरा चंगा करने वाला हूँ।", en: "For I am the LORD, your healer." },
    { ref: { hi: "भजन संहिता 147:3", en: "Psalm 147:3" }, hi: "वह टूटे मन वालों को चंगा करता है, और उनके घावों पर पट्टी बाँधता है।", en: "He heals the brokenhearted and binds up their wounds." },
    { ref: { hi: "याकूब 5:15", en: "James 5:15" }, hi: "और विश्वास की प्रार्थना से रोगी बच जाएगा।", en: "And the prayer of faith will save the one who is sick." },
  ],
  protection: [
    { ref: { hi: "भजन संहिता 91:1", en: "Psalm 91:1" }, hi: "जो परमप्रधान के छाए हुए स्थान में रहता है, वह सर्वशक्तिमान की छाया में ठहरेगा।", en: "He who dwells in the shelter of the Most High will abide in the shadow of the Almighty." },
    { ref: { hi: "भजन संहिता 121:7", en: "Psalm 121:7" }, hi: "यहोवा सारी विपत्ति से तेरी रक्षा करेगा, वह तेरे प्राण की रक्षा करेगा।", en: "The LORD will keep you from all evil; he will keep your life." },
    { ref: { hi: "यशायाह 41:10", en: "Isaiah 41:10" }, hi: "मत डर, क्योंकि मैं तेरे साथ हूँ; मैं तुझे दृढ़ करूँगा और तेरी सहायता करूँगा।", en: "Fear not, for I am with you; I will strengthen you, I will help you." },
    { ref: { hi: "भजन संहिता 46:1", en: "Psalm 46:1" }, hi: "परमेश्वर हमारा शरणस्थान और बल है, संकट में अति सहज से मिलने वाला सहायक।", en: "God is our refuge and strength, a very present help in trouble." },
    { ref: { hi: "नीतिवचन 18:10", en: "Proverbs 18:10" }, hi: "यहोवा का नाम दृढ़ गढ़ है; धर्मी उसमें भागकर सुरक्षित रहता है।", en: "The name of the LORD is a strong tower; the righteous man runs into it and is safe." },
    { ref: { hi: "भजन संहिता 34:7", en: "Psalm 34:7" }, hi: "यहोवा का दूत उसके डरवैयों के चारों ओर छावनी किए रहता है और उन्हें बचाता है।", en: "The angel of the LORD encamps around those who fear him, and delivers them." },
    { ref: { hi: "2 थिस्सलुनीकियों 3:3", en: "2 Thessalonians 3:3" }, hi: "पर प्रभु विश्वासयोग्य है; वह तुम्हें दृढ़ करेगा और उस दुष्ट से सुरक्षित रखेगा।", en: "But the Lord is faithful. He will establish you and guard you against the evil one." },
  ],
  victory: [
    { ref: { hi: "1 कुरिन्थियों 15:57", en: "1 Corinthians 15:57" }, hi: "पर परमेश्वर का धन्यवाद हो, जो हमारे प्रभु यीशु मसीह के द्वारा हमें जय दिलाता है।", en: "But thanks be to God, who gives us the victory through our Lord Jesus Christ." },
    { ref: { hi: "रोमियों 8:37", en: "Romans 8:37" }, hi: "इन सब बातों में हम उसके द्वारा, जिसने हम से प्रेम किया, जयवन्त से भी बढ़कर हैं।", en: "In all these things we are more than conquerors through him who loved us." },
    { ref: { hi: "व्यवस्थाविवरण 20:4", en: "Deuteronomy 20:4" }, hi: "क्योंकि तुम्हारा परमेश्वर यहोवा तुम्हारे संग चलता है, कि तुम्हें जय दिलाए।", en: "For the LORD your God goes with you to fight for you against your enemies, to give you the victory." },
    { ref: { hi: "1 यूहन्ना 5:4", en: "1 John 5:4" }, hi: "जो कुछ परमेश्वर से जन्मा है, वह संसार पर जय पाता है; और वह जय हमारा विश्वास है।", en: "For everyone who has been born of God overcomes the world. And this is the victory: our faith." },
    { ref: { hi: "फिलिप्पियों 4:13", en: "Philippians 4:13" }, hi: "जो मुझे सामर्थ्य देता है उसमें मैं सब कुछ कर सकता हूँ।", en: "I can do all things through him who strengthens me." },
    { ref: { hi: "यहोशू 1:9", en: "Joshua 1:9" }, hi: "हियाव बाँध और दृढ़ हो जा; मत डर, क्योंकि जहाँ कहीं तू जाए वहाँ तेरा परमेश्वर यहोवा तेरे संग रहेगा।", en: "Be strong and courageous. Do not be afraid, for the LORD your God is with you wherever you go." },
    { ref: { hi: "2 कुरिन्थियों 2:14", en: "2 Corinthians 2:14" }, hi: "परमेश्वर का धन्यवाद हो, जो मसीह में सदा हमें जय के उत्सव में लिए फिरता है।", en: "Thanks be to God, who in Christ always leads us in triumphal procession." },
  ],
  grace: [
    { ref: { hi: "2 कुरिन्थियों 12:9", en: "2 Corinthians 12:9" }, hi: "मेरा अनुग्रह तेरे लिये बहुत है, क्योंकि मेरी सामर्थ्य निर्बलता में सिद्ध होती है।", en: "My grace is sufficient for you, for my power is made perfect in weakness." },
    { ref: { hi: "इफिसियों 2:8", en: "Ephesians 2:8" }, hi: "क्योंकि विश्वास के द्वारा अनुग्रह ही से तुम्हारा उद्धार हुआ है; यह परमेश्वर का दान है।", en: "For by grace you have been saved through faith. It is the gift of God." },
    { ref: { hi: "यूहन्ना 1:16", en: "John 1:16" }, hi: "उसकी परिपूर्णता में से हम सब ने अनुग्रह पर अनुग्रह पाया।", en: "From his fullness we have all received, grace upon grace." },
    { ref: { hi: "इब्रानियों 4:16", en: "Hebrews 4:16" }, hi: "आओ, हम अनुग्रह के सिंहासन के निकट हियाव बाँधकर चलें।", en: "Let us then with confidence draw near to the throne of grace." },
    { ref: { hi: "तीतुस 2:11", en: "Titus 2:11" }, hi: "क्योंकि परमेश्वर का अनुग्रह प्रगट हुआ है, जो सब मनुष्यों के उद्धार का कारण है।", en: "For the grace of God has appeared, bringing salvation for all people." },
    { ref: { hi: "रोमियों 5:20", en: "Romans 5:20" }, hi: "परन्तु जहाँ पाप बहुत हुआ, वहाँ अनुग्रह उससे भी कहीं अधिक बढ़ा।", en: "But where sin increased, grace abounded all the more." },
    { ref: { hi: "2 कुरिन्थियों 9:8", en: "2 Corinthians 9:8" }, hi: "परमेश्वर सब प्रकार का अनुग्रह तुम्हें बहुतायत से दे सकता है।", en: "And God is able to make all grace abound to you." },
  ],
  love: [
    { ref: { hi: "यूहन्ना 3:16", en: "John 3:16" }, hi: "क्योंकि परमेश्वर ने जगत से ऐसा प्रेम रखा कि उसने अपना एकलौता पुत्र दे दिया।", en: "For God so loved the world, that he gave his only Son." },
    { ref: { hi: "रोमियों 8:39", en: "Romans 8:39" }, hi: "कोई भी वस्तु हमें परमेश्वर के उस प्रेम से, जो मसीह यीशु में है, अलग न कर सकेगी।", en: "Nothing will be able to separate us from the love of God in Christ Jesus our Lord." },
    { ref: { hi: "1 यूहन्ना 4:9", en: "1 John 4:9" }, hi: "परमेश्वर ने अपना प्रेम हम पर इस से प्रगट किया कि उसने अपने एकलौते पुत्र को जगत में भेजा।", en: "God showed his love among us by sending his one and only Son into the world." },
    { ref: { hi: "यिर्मयाह 31:3", en: "Jeremiah 31:3" }, hi: "मैंने तुझ से सदा के प्रेम से प्रेम रखा है; इसलिये मैंने तुझ पर अपनी करुणा बनाए रखी है।", en: "I have loved you with an everlasting love; therefore I have continued my faithfulness to you." },
    { ref: { hi: "सपन्याह 3:17", en: "Zephaniah 3:17" }, hi: "तेरा परमेश्वर यहोवा तेरे बीच में है; वह तेरे कारण आनन्द से मगन होगा।", en: "The LORD your God is in your midst; he will rejoice over you with gladness." },
    { ref: { hi: "रोमियों 5:8", en: "Romans 5:8" }, hi: "जब हम पापी ही थे तब मसीह हमारे लिये मरा; इसी से परमेश्वर हम पर अपने प्रेम को प्रगट करता है।", en: "But God shows his love for us in that while we were still sinners, Christ died for us." },
    { ref: { hi: "भजन संहिता 136:1", en: "Psalm 136:1" }, hi: "यहोवा का धन्यवाद करो, क्योंकि वह भला है, और उसकी करुणा सदा की है।", en: "Give thanks to the LORD, for he is good, for his steadfast love endures forever." },
  ],
};

const CONFESSIONS: Bilingual[] = [
  { hi: "मैं विश्वास करता हूँ कि परमेश्वर का वचन मेरे जीवन में जीवित और सामर्थी है।", en: "I believe God's Word is alive and powerful in my life." },
  { hi: "मैं मसीह यीशु में एक नई सृष्टि हूँ; पुरानी बातें बीत गईं।", en: "I am a new creation in Christ Jesus; the old has passed away." },
  { hi: "प्रभु मेरा चरवाहा है; मुझे किसी वस्तु की घटी न होगी।", en: "The Lord is my shepherd; I shall not be in want." },
  { hi: "मैं जय पाने वाला हूँ, क्योंकि जो मुझ में है वह संसार से बड़ा है।", en: "I am an overcomer, for greater is He who is in me than he who is in the world." },
  { hi: "परमेश्वर के अनुग्रह से मैं जो कुछ हूँ, वह हूँ; उसका अनुग्रह मुझ पर व्यर्थ नहीं हुआ।", en: "By the grace of God I am what I am, and His grace toward me was not in vain." },
  { hi: "मैं भय नहीं करता, क्योंकि परमेश्वर मेरे साथ है और मुझे दृढ़ करता है।", en: "I will not fear, for God is with me and He strengthens me." },
  { hi: "मेरे परमेश्वर ने मेरी हर घटी को मसीह यीशु में अपने धन के अनुसार पूरा किया है।", en: "My God supplies all my needs according to His riches in Christ Jesus." },
  { hi: "मैं चंगा किया गया हूँ; उसके कोड़े खाने से मैं भला चंगा हूँ।", en: "I am healed; by His stripes I am made whole." },
  { hi: "मैं परमेश्वर का प्रिय हूँ, और उसका प्रेम मुझ पर सदा बना रहता है।", en: "I am God's beloved, and His love remains upon me forever." },
  { hi: "मैं भीतर आते समय आशीषित हूँ और बाहर जाते समय भी आशीषित हूँ।", en: "I am blessed coming in and blessed going out." },
  { hi: "मैं परमेश्वर की सामर्थ्य से सुरक्षित हूँ; कोई हथियार जो मेरे विरुद्ध बने सफल न होगा।", en: "I am protected by God's power; no weapon formed against me shall prosper." },
  { hi: "मैं सब कुछ मसीह में कर सकता हूँ, जो मुझे सामर्थ्य देता है।", en: "I can do all things through Christ who strengthens me." },
];

const PRAYERS: Bilingual[] = [
  { hi: "हे पिता, तेरे वचन के लिये धन्यवाद। आज इन प्रतिज्ञाओं को मेरे हृदय में स्थिर कर, और मुझे विश्वास में चलने की सामर्थ्य दे। यीशु के नाम में, आमीन।", en: "Father, thank You for Your Word. Establish these promises in my heart today and help me walk by faith. In Jesus' name, Amen." },
  { hi: "प्रभु यीशु, मैं तेरे अनुग्रह और प्रेम के लिये धन्यवाद देता हूँ। मेरे विश्वास को दृढ़ कर और आज मेरे हर कदम में मेरी अगुवाई कर। आमीन।", en: "Lord Jesus, thank You for Your grace and love. Strengthen my faith and lead every step I take today. Amen." },
  { hi: "हे परमेश्वर, तू मेरा शरणस्थान और बल है। आज मुझे अपनी छाया में सुरक्षित रख और मेरे मन को शांति से भर दे। आमीन।", en: "O God, You are my refuge and strength. Keep me safe under Your shadow today and fill my heart with peace. Amen." },
  { hi: "पिता, मैं तेरी चंगाई और भलाई के लिये धन्यवाद देता हूँ। मेरे तन और मन को नया कर, और मुझ में आशा जगा। यीशु के नाम में, आमीन।", en: "Father, thank You for Your healing and goodness. Renew my body and mind, and stir up hope within me. In Jesus' name, Amen." },
  { hi: "प्रभु, तेरे प्रेम के लिये धन्यवाद जो कभी नहीं छोड़ता। आज मुझे तेरी उपस्थिति का एहसास दे और मुझे तेरे लिये जीने में सहायता कर। आमीन।", en: "Lord, thank You for Your love that never fails. Let me sense Your presence today and help me live for You. Amen." },
  { hi: "हे पिता, तूने मुझे जय दिलाई है। आज हर चुनौती में मुझे साहस और विश्वास दे। तेरे नाम की महिमा हो। आमीन।", en: "Father, You have given me victory. Grant me courage and faith in every challenge today. May Your name be glorified. Amen." },
  { hi: "परमेश्वर, तेरी आशीषों के लिये धन्यवाद। मुझे कृतज्ञ हृदय दे और दूसरों के लिये आशीष बनने में मेरी सहायता कर। यीशु में, आमीन।", en: "God, thank You for Your blessings. Give me a grateful heart and help me be a blessing to others. In Jesus, Amen." },
];

const ENCOURAGEMENTS: Bilingual[] = [
  { hi: "परमेश्वर आज तेरे साथ चल रहा है — डर मत, वह तुझे कभी न छोड़ेगा।", en: "God walks with you today—do not fear, He will never leave you." },
  { hi: "तेरा हर छोटा कदम विश्वास में मायने रखता है। बने रहो, परमेश्वर तेरा भला कर रहा है।", en: "Every small step of faith matters. Keep going—God is working good in you." },
  { hi: "आज का दिन नई करुणा से भरा है; परमेश्वर की भलाई तेरे पीछे-पीछे आती है।", en: "This day is full of new mercies; God's goodness follows after you." },
  { hi: "तू अकेला नहीं है। स्वर्ग का परमेश्वर तेरी हर चिन्ता की परवाह करता है।", en: "You are not alone. The God of heaven cares about every worry you carry." },
  { hi: "तेरे भीतर की ज्योति चमकने दे — तू परमेश्वर के हाथ की सुन्दर रचना है।", en: "Let the light within you shine—you are God's beautiful handiwork." },
  { hi: "जो प्रभु में आशा रखते हैं वे नया बल पाते हैं। आज तू भी उकाब के समान उड़ेगा।", en: "Those who hope in the Lord renew their strength. Today you will soar like an eagle." },
  { hi: "परमेश्वर की प्रतिज्ञाएँ हाँ और आमीन हैं। थामे रह, तेरा आशीर्वाद आ रहा है।", en: "God's promises are yes and amen. Hold on—your blessing is on the way." },
];

// Deepen each theme pool with hand-picked extra verses for year-long variety.
for (const theme of THEME_ORDER) {
  VERSES[theme] = [...VERSES[theme], ...EXTRA_VERSES[theme]];
}

function pick<T>(arr: T[], index: number): T {
  return arr[((index % arr.length) + arr.length) % arr.length];
}

function mmdd(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${m}-${d}`;
}

export function getDayContent(date: Date): DayContent {
  // Curated special day (holidays) overrides the generated plan.
  const special = SPECIAL_DAYS[mmdd(date)];
  if (special) {
    return {
      verses: special.verses,
      confession: special.confession,
      prayer: special.prayer,
      encouragement: special.encouragement,
      special: special.title,
    };
  }

  const doy = dayOfYear(date);
  const verses: DayVerse[] = THEME_ORDER.map((theme, i) => {
    const pool = VERSES[theme];
    const v = pick(pool, doy + i * 3);
    return { ...v, theme };
  });
  return {
    verses,
    confession: pick(CONFESSIONS, doy),
    prayer: pick(PRAYERS, doy),
    encouragement: pick(ENCOURAGEMENTS, doy),
  };
}
