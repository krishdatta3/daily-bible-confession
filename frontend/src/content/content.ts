// Offline Bible confession content — FIRST-PERSON declarations (Hindi default +
// English). Each verse is phrased as a personal confession ("मैं...") and its
// scripture source is kept in `ref`. One verse per theme composes each day.

import { dayOfYear } from "@/src/utils/date";
import { Bilingual, DayContent, DayVerse, ThemeKey, Verse } from "./types";
import { EXTRA_VERSES, FIXED_SPECIAL_DAYS, getMovableSpecial } from "./special";

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
    { ref: { hi: "इब्रानियों 11:1", en: "Hebrews 11:1" }, hi: "मैं विश्वास से जीता हूँ — जो मैंने आशा की है उसका मुझे निश्चय है।", en: "I live by faith—I am assured of what I hope for." },
    { ref: { hi: "मरकुस 11:24", en: "Mark 11:24" }, hi: "मैं प्रार्थना में जो माँगता हूँ, विश्वास करता हूँ कि वह मुझे मिल गया है।", en: "Whatever I ask in prayer, I believe I have received it." },
    { ref: { hi: "2 कुरिन्थियों 5:7", en: "2 Corinthians 5:7" }, hi: "मैं रूप देखकर नहीं, पर विश्वास से चलता हूँ।", en: "I walk by faith, not by sight." },
    { ref: { hi: "रोमियों 10:17", en: "Romans 10:17" }, hi: "मैं परमेश्वर का वचन सुनता हूँ, और मेरा विश्वास दिन-प्रतिदिन बढ़ता है।", en: "I hear God's word, and my faith grows day by day." },
    { ref: { hi: "मरकुस 9:23", en: "Mark 9:23" }, hi: "मैं विश्वास करता हूँ, इसलिए मेरे लिए सब कुछ सम्भव है।", en: "I believe, therefore all things are possible for me." },
    { ref: { hi: "इब्रानियों 11:6", en: "Hebrews 11:6" }, hi: "मैं विश्वास से परमेश्वर को प्रसन्न करता हूँ और उसकी खोज करता हूँ।", en: "By faith I please God and I seek Him." },
    { ref: { hi: "नीतिवचन 3:5", en: "Proverbs 3:5" }, hi: "मैं अपने पूरे मन से यहोवा पर भरोसा रखता हूँ, अपनी समझ का सहारा नहीं लेता।", en: "I trust in the LORD with all my heart and do not lean on my own understanding." },
  ],
  blessing: [
    { ref: { hi: "गिनती 6:24", en: "Numbers 6:24" }, hi: "मैं यहोवा की आशीष और सुरक्षा में हूँ।", en: "I am blessed and kept by the LORD." },
    { ref: { hi: "यिर्मयाह 17:7", en: "Jeremiah 17:7" }, hi: "मैं यहोवा पर भरोसा रखता हूँ, इसलिए मैं धन्य हूँ।", en: "I trust in the LORD, therefore I am blessed." },
    { ref: { hi: "इफिसियों 1:3", en: "Ephesians 1:3" }, hi: "मैं मसीह में हर आत्मिक आशीष से आशीषित हूँ।", en: "I am blessed with every spiritual blessing in Christ." },
    { ref: { hi: "नीतिवचन 10:22", en: "Proverbs 10:22" }, hi: "यहोवा की आशीष मुझे समृद्ध करती है, और उसमें कोई दुःख नहीं।", en: "The LORD's blessing makes me rich, and adds no sorrow." },
    { ref: { hi: "भजन संहिता 23:1", en: "Psalm 23:1" }, hi: "यहोवा मेरा चरवाहा है; मुझे किसी वस्तु की घटी नहीं होगी।", en: "The LORD is my shepherd; I shall not want." },
    { ref: { hi: "भजन संहिता 1:3", en: "Psalm 1:3" }, hi: "मैं जल के सोतों के किनारे लगे वृक्ष के समान हूँ, जो अपने समय पर फलता है।", en: "I am like a tree planted by streams of water, yielding fruit in season." },
    { ref: { hi: "व्यवस्थाविवरण 28:2", en: "Deuteronomy 28:2" }, hi: "मैं यहोवा की सुनता हूँ, इसलिए उसकी आशीषें मुझ पर आती हैं।", en: "I obey the LORD, so His blessings come upon me." },
  ],
  healing: [
    { ref: { hi: "यिर्मयाह 30:17", en: "Jeremiah 30:17" }, hi: "परमेश्वर मुझे भला-चंगा करता है और मेरे घावों को अच्छा करता है।", en: "God restores my health and heals my wounds." },
    { ref: { hi: "यशायाह 53:5", en: "Isaiah 53:5" }, hi: "उसके कोड़े खाने से मैं चंगा हुआ हूँ।", en: "By His wounds I am healed." },
    { ref: { hi: "भजन संहिता 103:3", en: "Psalm 103:3" }, hi: "वह मेरे सब अधर्म क्षमा करता और मेरे सब रोग चंगा करता है।", en: "He forgives all my sins and heals all my diseases." },
    { ref: { hi: "1 पतरस 2:24", en: "1 Peter 2:24" }, hi: "उसके मार खाने से मैं चंगा किया गया हूँ।", en: "By His stripes I have been healed." },
    { ref: { hi: "निर्गमन 15:26", en: "Exodus 15:26" }, hi: "यहोवा मेरा चंगा करने वाला है।", en: "The LORD is my healer." },
    { ref: { hi: "भजन संहिता 147:3", en: "Psalm 147:3" }, hi: "वह मेरे टूटे मन को चंगा करता और मेरे घावों पर पट्टी बाँधता है।", en: "He heals my broken heart and binds up my wounds." },
    { ref: { hi: "याकूब 5:15", en: "James 5:15" }, hi: "मैं विश्वास से प्रार्थना करता हूँ, और परमेश्वर मुझे स्वस्थ करता है।", en: "I pray in faith, and God makes me well." },
  ],
  protection: [
    { ref: { hi: "भजन संहिता 91:1", en: "Psalm 91:1" }, hi: "मैं परमप्रधान के छाए हुए स्थान में, सर्वशक्तिमान की छाया में रहता हूँ।", en: "I dwell in the shelter of the Most High, under the Almighty's shadow." },
    { ref: { hi: "भजन संहिता 121:7", en: "Psalm 121:7" }, hi: "यहोवा सब विपत्ति से मेरी रक्षा करता है और मेरे प्राण की रखवाली करता है।", en: "The LORD keeps me from all harm and guards my life." },
    { ref: { hi: "यशायाह 41:10", en: "Isaiah 41:10" }, hi: "मैं नहीं डरता, क्योंकि परमेश्वर मेरे साथ है; वह मुझे दृढ़ करता है।", en: "I will not fear, for God is with me; He strengthens me." },
    { ref: { hi: "भजन संहिता 46:1", en: "Psalm 46:1" }, hi: "परमेश्वर मेरा शरणस्थान और बल है, संकट में मेरा सहायक।", en: "God is my refuge and strength, my help in trouble." },
    { ref: { hi: "नीतिवचन 18:10", en: "Proverbs 18:10" }, hi: "मैं यहोवा के नाम रूपी दृढ़ गढ़ में भागकर सुरक्षित रहता हूँ।", en: "I run into the LORD's name, a strong tower, and I am safe." },
    { ref: { hi: "भजन संहिता 34:7", en: "Psalm 34:7" }, hi: "यहोवा का दूत मेरे चारों ओर छावनी किए रहता और मुझे बचाता है।", en: "The angel of the LORD surrounds me and delivers me." },
    { ref: { hi: "2 थिस्सलुनीकियों 3:3", en: "2 Thessalonians 3:3" }, hi: "प्रभु विश्वासयोग्य है; वह मुझे दृढ़ करता और दुष्ट से सुरक्षित रखता है।", en: "The Lord is faithful; He strengthens me and guards me from the evil one." },
  ],
  victory: [
    { ref: { hi: "1 कुरिन्थियों 15:57", en: "1 Corinthians 15:57" }, hi: "परमेश्वर मुझे प्रभु यीशु मसीह के द्वारा जय दिलाता है।", en: "God gives me the victory through my Lord Jesus Christ." },
    { ref: { hi: "रोमियों 8:37", en: "Romans 8:37" }, hi: "मसीह के प्रेम में मैं जयवन्त से भी बढ़कर हूँ।", en: "In Christ's love I am more than a conqueror." },
    { ref: { hi: "व्यवस्थाविवरण 20:4", en: "Deuteronomy 20:4" }, hi: "मेरा परमेश्वर मेरे संग चलता और मेरे लिए लड़कर मुझे जय दिलाता है।", en: "My God goes with me and fights for me to give me victory." },
    { ref: { hi: "1 यूहन्ना 5:4", en: "1 John 5:4" }, hi: "मैं परमेश्वर से जन्मा हूँ, और अपने विश्वास से संसार पर जय पाता हूँ।", en: "I am born of God, and by my faith I overcome the world." },
    { ref: { hi: "फिलिप्पियों 4:13", en: "Philippians 4:13" }, hi: "जो मुझे सामर्थ्य देता है, उस मसीह में मैं सब कुछ कर सकता हूँ।", en: "I can do all things through Christ who strengthens me." },
    { ref: { hi: "यहोशू 1:9", en: "Joshua 1:9" }, hi: "मैं दृढ़ और साहसी हूँ; मैं नहीं डरता, क्योंकि यहोवा मेरे संग है।", en: "I am strong and courageous; I do not fear, for the LORD is with me." },
    { ref: { hi: "2 कुरिन्थियों 2:14", en: "2 Corinthians 2:14" }, hi: "परमेश्वर मसीह में सदा मुझे जय के उत्सव में लिए चलता है।", en: "God always leads me in triumph in Christ." },
  ],
  grace: [
    { ref: { hi: "2 कुरिन्थियों 12:9", en: "2 Corinthians 12:9" }, hi: "परमेश्वर का अनुग्रह मेरे लिए बहुत है; उसकी सामर्थ्य मेरी निर्बलता में सिद्ध होती है।", en: "God's grace is sufficient for me; His power is perfected in my weakness." },
    { ref: { hi: "इफिसियों 2:8", en: "Ephesians 2:8" }, hi: "मैं विश्वास के द्वारा अनुग्रह से बचाया गया हूँ; यह परमेश्वर का दान है।", en: "By grace through faith I am saved; it is God's gift." },
    { ref: { hi: "यूहन्ना 1:16", en: "John 1:16" }, hi: "मैंने उसकी परिपूर्णता में से अनुग्रह पर अनुग्रह पाया है।", en: "From His fullness I have received grace upon grace." },
    { ref: { hi: "इब्रानियों 4:16", en: "Hebrews 4:16" }, hi: "मैं अनुग्रह के सिंहासन के निकट हियाव बाँधकर आता हूँ।", en: "I come with confidence to the throne of grace." },
    { ref: { hi: "तीतुस 2:11", en: "Titus 2:11" }, hi: "परमेश्वर का उद्धार देने वाला अनुग्रह मुझ पर प्रगट हुआ है।", en: "God's grace that brings salvation has appeared to me." },
    { ref: { hi: "रोमियों 5:20", en: "Romans 5:20" }, hi: "जहाँ पाप बढ़ा, वहाँ परमेश्वर का अनुग्रह मुझ पर और भी अधिक बढ़ा।", en: "Where sin increased, God's grace toward me abounded all the more." },
    { ref: { hi: "2 कुरिन्थियों 9:8", en: "2 Corinthians 9:8" }, hi: "परमेश्वर मुझे सब प्रकार का अनुग्रह बहुतायत से देता है।", en: "God makes all grace abound to me." },
  ],
  love: [
    { ref: { hi: "यूहन्ना 3:16", en: "John 3:16" }, hi: "परमेश्वर ने मुझ से ऐसा प्रेम किया कि अपना एकलौता पुत्र दे दिया।", en: "God so loved me that He gave His only Son." },
    { ref: { hi: "रोमियों 8:39", en: "Romans 8:39" }, hi: "कोई वस्तु मुझे परमेश्वर के प्रेम से, जो मसीह में है, अलग नहीं कर सकती।", en: "Nothing can separate me from God's love in Christ." },
    { ref: { hi: "1 यूहन्ना 4:9", en: "1 John 4:9" }, hi: "परमेश्वर ने अपने पुत्र को भेजकर मुझ पर अपना प्रेम प्रगट किया।", en: "God showed His love for me by sending His Son." },
    { ref: { hi: "यिर्मयाह 31:3", en: "Jeremiah 31:3" }, hi: "परमेश्वर ने मुझ से सदा के प्रेम से प्रेम रखा है।", en: "God has loved me with an everlasting love." },
    { ref: { hi: "सपन्याह 3:17", en: "Zephaniah 3:17" }, hi: "मेरा परमेश्वर मेरे बीच में है; वह मेरे कारण आनन्द से मगन होता है।", en: "My God is with me; He rejoices over me with gladness." },
    { ref: { hi: "रोमियों 5:8", en: "Romans 5:8" }, hi: "जब मैं पापी ही था, तब मसीह मेरे लिए मरा — यही उसका प्रेम है।", en: "While I was still a sinner, Christ died for me—this is His love." },
    { ref: { hi: "भजन संहिता 136:1", en: "Psalm 136:1" }, hi: "मैं यहोवा का धन्यवाद करता हूँ, क्योंकि वह भला है; उसकी करुणा सदा की है।", en: "I give thanks to the LORD, for He is good; His love endures forever." },
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

// Deepen each theme pool with hand-picked extra first-person declarations.
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
  // Curated special day (fixed holidays) overrides the generated plan.
  const fixed = FIXED_SPECIAL_DAYS[mmdd(date)];
  const special = fixed || getMovableSpecial(date);
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
