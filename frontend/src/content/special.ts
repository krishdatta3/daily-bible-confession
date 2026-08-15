// Hand-picked extra verses (deepen every theme pool for year-long variety)
// and curated SPECIAL DAYS with their own verses, confession, prayer and theme.
import { Bilingual, DayContent, DayVerse, ThemeKey, Verse } from "./types";

export const EXTRA_VERSES: Record<ThemeKey, Verse[]> = {
  faith: [
    { ref: { hi: "मत्ती 21:22", en: "Matthew 21:22" }, hi: "और जो कुछ तुम प्रार्थना में विश्वास से माँगोगे वह सब तुम को मिलेगा।", en: "And whatever you ask in prayer, you will receive, if you have faith." },
    { ref: { hi: "2 कुरिन्थियों 1:20", en: "2 Corinthians 1:20" }, hi: "क्योंकि परमेश्वर की जितनी प्रतिज्ञाएँ हैं, वे सब मसीह में 'हाँ' के साथ 'आमीन' भी होती हैं।", en: "For all the promises of God find their Yes in him. That is why it is through him that we utter our Amen." },
    { ref: { hi: "इब्रानियों 10:23", en: "Hebrews 10:23" }, hi: "हम अपनी आशा के अंगीकार को दृढ़ता से थामे रहें, क्योंकि जिसने प्रतिज्ञा की है वह विश्वासयोग्य है।", en: "Let us hold fast the confession of our hope without wavering, for he who promised is faithful." },
    { ref: { hi: "याकूब 1:6", en: "James 1:6" }, hi: "पर विश्वास से माँगे, और कुछ सन्देह न करे।", en: "But let him ask in faith, with no doubting." },
    { ref: { hi: "रोमियों 4:20", en: "Romans 4:20" }, hi: "उसने विश्वास में दृढ़ होकर परमेश्वर की महिमा की।", en: "He grew strong in his faith as he gave glory to God." },
  ],
  blessing: [
    { ref: { hi: "मलाकी 3:10", en: "Malachi 3:10" }, hi: "मैं तुम्हारे लिये आकाश के झरोखे खोलकर आशीष की वर्षा करूँगा।", en: "I will open the windows of heaven for you and pour down for you a blessing." },
    { ref: { hi: "भजन संहिता 84:11", en: "Psalm 84:11" }, hi: "यहोवा सूर्य और ढाल है; वह जो सीधाई से चलते हैं उनसे कोई अच्छी वस्तु रोक न रखेगा।", en: "The LORD is a sun and shield; no good thing does he withhold from those who walk uprightly." },
    { ref: { hi: "इफिसियों 3:20", en: "Ephesians 3:20" }, hi: "वह हमारी विनती और समझ से कहीं अधिक बढ़कर करने में समर्थ है।", en: "Now to him who is able to do far more abundantly than all that we ask or think." },
    { ref: { hi: "फिलिप्पियों 4:19", en: "Philippians 4:19" }, hi: "मेरा परमेश्वर अपने उस धन के अनुसार जो महिमा सहित मसीह यीशु में है, तुम्हारी हर एक घटी को पूरी करेगा।", en: "And my God will supply every need of yours according to his riches in glory in Christ Jesus." },
    { ref: { hi: "भजन संहिता 5:12", en: "Psalm 5:12" }, hi: "क्योंकि हे यहोवा, तू धर्मी को आशीष देगा, तू उसे अपनी कृपा की ढाल से ढाँप लेगा।", en: "For you bless the righteous, O LORD; you cover him with favor as with a shield." },
  ],
  healing: [
    { ref: { hi: "मत्ती 11:28", en: "Matthew 11:28" }, hi: "हे सब थके और बोझ से दबे हुए लोगो, मेरे पास आओ; मैं तुम्हें विश्राम दूँगा।", en: "Come to me, all who labor and are heavy laden, and I will give you rest." },
    { ref: { hi: "भजन संहिता 30:2", en: "Psalm 30:2" }, hi: "हे मेरे परमेश्वर यहोवा, मैंने तेरी दोहाई दी और तूने मुझे चंगा किया।", en: "O LORD my God, I cried to you for help, and you have healed me." },
    { ref: { hi: "3 यूहन्ना 1:2", en: "3 John 1:2" }, hi: "हे प्रिय, मेरी प्रार्थना है कि जैसे तेरी आत्मा उन्नति करती है, वैसे ही तू सब बातों में उन्नति करे और भला चंगा रहे।", en: "Beloved, I pray that all may go well with you and that you may be in good health." },
    { ref: { hi: "यशायाह 40:31", en: "Isaiah 40:31" }, hi: "जो यहोवा की बाट जोहते हैं वे नया बल पाते हैं, वे उकाब के समान उड़ते हैं।", en: "But they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles." },
    { ref: { hi: "भजन संहिता 34:18", en: "Psalm 34:18" }, hi: "यहोवा टूटे मन वालों के समीप रहता है, और पिसे हुए लोगों का उद्धार करता है।", en: "The LORD is near to the brokenhearted and saves the crushed in spirit." },
  ],
  protection: [
    { ref: { hi: "भजन संहिता 91:11", en: "Psalm 91:11" }, hi: "वह अपने दूतों को तेरे विषय में आज्ञा देगा, कि जहाँ कहीं तू जाए वहाँ वे तेरी रक्षा करें।", en: "For he will command his angels concerning you to guard you in all your ways." },
    { ref: { hi: "यशायाह 54:17", en: "Isaiah 54:17" }, hi: "जो हथियार तेरे विरुद्ध बनाया जाए वह सफल न होगा।", en: "No weapon that is fashioned against you shall succeed." },
    { ref: { hi: "भजन संहिता 3:3", en: "Psalm 3:3" }, hi: "परन्तु हे यहोवा, तू मेरे चारों ओर मेरी ढाल है, तू मेरी महिमा और मेरे सिर का ऊँचा करने वाला है।", en: "But you, O LORD, are a shield about me, my glory, and the lifter of my head." },
    { ref: { hi: "व्यवस्थाविवरण 31:6", en: "Deuteronomy 31:6" }, hi: "हियाव बाँधो और दृढ़ हो जाओ, क्योंकि तुम्हारा परमेश्वर यहोवा तुम्हारे संग चलता है; वह तुम्हें कभी न छोड़ेगा।", en: "Be strong and courageous. He will not leave you or forsake you." },
    { ref: { hi: "भजन संहिता 4:8", en: "Psalm 4:8" }, hi: "मैं शान्ति से लेट जाऊँगा और सो जाऊँगा; क्योंकि हे यहोवा, केवल तू ही मुझे निडर रखता है।", en: "In peace I will both lie down and sleep; for you alone, O LORD, make me dwell in safety." },
  ],
  victory: [
    { ref: { hi: "रोमियों 8:31", en: "Romans 8:31" }, hi: "यदि परमेश्वर हमारी ओर है, तो हमारे विरुद्ध कौन हो सकता है?", en: "If God is for us, who can be against us?" },
    { ref: { hi: "निर्गमन 14:14", en: "Exodus 14:14" }, hi: "यहोवा आप ही तुम्हारे लिये लड़ेगा; तुम केवल शान्त रहो।", en: "The LORD will fight for you, and you have only to be silent." },
    { ref: { hi: "1 यूहन्ना 4:4", en: "1 John 4:4" }, hi: "जो तुम में है वह उससे बड़ा है जो संसार में है।", en: "He who is in you is greater than he who is in the world." },
    { ref: { hi: "भजन संहिता 118:6", en: "Psalm 118:6" }, hi: "यहोवा मेरी ओर है, मैं नहीं डरूँगा। मनुष्य मेरा क्या कर सकता है?", en: "The LORD is on my side; I will not fear. What can man do to me?" },
    { ref: { hi: "यशायाह 40:29", en: "Isaiah 40:29" }, hi: "वह थके हुए को बल देता है और शक्तिहीन को बहुत सामर्थ्य देता है।", en: "He gives power to the faint, and to him who has no might he increases strength." },
  ],
  grace: [
    { ref: { hi: "लूका 1:37", en: "Luke 1:37" }, hi: "क्योंकि जो वचन परमेश्वर की ओर से होता है वह प्रभावरहित नहीं होता।", en: "For nothing will be impossible with God." },
    { ref: { hi: "इफिसियों 1:7", en: "Ephesians 1:7" }, hi: "हमको उसमें उसके लहू के द्वारा छुटकारा, अर्थात् पापों की क्षमा, उसके अनुग्रह के धन के अनुसार मिली है।", en: "In him we have redemption through his blood, the forgiveness of our trespasses, according to the riches of his grace." },
    { ref: { hi: "याकूब 4:6", en: "James 4:6" }, hi: "परन्तु वह और भी अनुग्रह देता है; वह नम्र लोगों पर अनुग्रह करता है।", en: "But he gives more grace. God gives grace to the humble." },
    { ref: { hi: "1 कुरिन्थियों 15:10", en: "1 Corinthians 15:10" }, hi: "परन्तु मैं परमेश्वर के अनुग्रह से जो कुछ हूँ, वही हूँ।", en: "But by the grace of God I am what I am." },
    { ref: { hi: "विलापगीत 3:22-23", en: "Lamentations 3:22-23" }, hi: "यहोवा की करुणा के कारण हम मिट नहीं गए; उसकी दया प्रति भोर नई होती है।", en: "The steadfast love of the LORD never ceases; his mercies are new every morning." },
  ],
  love: [
    { ref: { hi: "1 यूहन्ना 4:16", en: "1 John 4:16" }, hi: "परमेश्वर प्रेम है, और जो प्रेम में बना रहता है वह परमेश्वर में बना रहता है।", en: "God is love, and whoever abides in love abides in God." },
    { ref: { hi: "यूहन्ना 15:9", en: "John 15:9" }, hi: "जैसा पिता ने मुझसे प्रेम रखा, वैसे ही मैंने तुम से प्रेम रखा; मेरे प्रेम में बने रहो।", en: "As the Father has loved me, so have I loved you. Abide in my love." },
    { ref: { hi: "भजन संहिता 103:11", en: "Psalm 103:11" }, hi: "जैसे आकाश पृथ्वी से ऊँचा है, वैसे ही उसकी करुणा उसके डरवैयों पर बड़ी है।", en: "For as high as the heavens are above the earth, so great is his steadfast love toward those who fear him." },
    { ref: { hi: "1 यूहन्ना 3:1", en: "1 John 3:1" }, hi: "देखो, पिता ने हम से कैसा प्रेम किया है कि हम परमेश्वर की सन्तान कहलाएँ।", en: "See what kind of love the Father has given to us, that we should be called children of God." },
    { ref: { hi: "यशायाह 43:4", en: "Isaiah 43:4" }, hi: "तू मेरी दृष्टि में अनमोल और आदरणीय ठहरा है, और मैं तुझ से प्रेम रखता हूँ।", en: "Because you are precious in my eyes, and honored, and I love you." },
  ],
};

// Special curated days keyed by "MM-DD".
export interface SpecialDay extends DayContent {
  title: Bilingual;
}

function v(theme: ThemeKey, refHi: string, refEn: string, hi: string, en: string): DayVerse {
  return { theme, ref: { hi: refHi, en: refEn }, hi, en };
}

export const SPECIAL_DAYS: Record<string, SpecialDay> = {
  "01-01": {
    title: { hi: "नववर्ष की आशीष", en: "New Year Blessing" },
    verses: [
      v("grace", "विलापगीत 3:22-23", "Lamentations 3:22-23", "उसकी दया प्रति भोर नई होती है; तेरी सच्चाई महान है।", "His mercies are new every morning; great is your faithfulness."),
      v("faith", "यशायाह 43:19", "Isaiah 43:19", "देख, मैं एक नई बात करने पर हूँ; अभी वह प्रगट होगी।", "Behold, I am doing a new thing; now it springs forth."),
      v("blessing", "यिर्मयाह 29:11", "Jeremiah 29:11", "मेरी जो योजनाएँ तुम्हारे लिये हैं, वे कुशल की हैं, हानि की नहीं, ताकि तुम्हें आशा और भविष्य दें।", "For I know the plans I have for you, plans for welfare and a future and a hope."),
      v("protection", "भजन संहिता 90:1", "Psalm 90:1", "हे प्रभु, तू पीढ़ी से पीढ़ी तक हमारा धाम बना है।", "Lord, you have been our dwelling place in all generations."),
      v("victory", "फिलिप्पियों 3:13-14", "Philippians 3:13-14", "जो बातें पीछे रह गई हैं उन्हें भूलकर मैं आगे की बातों की ओर बढ़ता जाता हूँ।", "Forgetting what lies behind and straining forward to what lies ahead, I press on toward the goal."),
      v("healing", "यशायाह 40:31", "Isaiah 40:31", "जो यहोवा की बाट जोहते हैं वे नया बल पाते हैं।", "They who wait for the LORD shall renew their strength."),
      v("love", "भजन संहिता 65:11", "Psalm 65:11", "तू वर्ष को अपनी भलाई का मुकुट पहनाता है।", "You crown the year with your bounty."),
    ],
    confession: { hi: "इस नए वर्ष में मैं परमेश्वर की नई दया और योजनाओं में विश्वास से आगे बढ़ता हूँ।", en: "In this new year I step forward in faith into God's new mercies and plans." },
    prayer: { hi: "हे पिता, इस नए वर्ष को तेरे हाथ में सौंपता हूँ। मेरे हर दिन को अपनी आशीष और अगुवाई से भर दे। यीशु के नाम में, आमीन।", en: "Father, I place this new year in Your hands. Fill every day with Your blessing and guidance. In Jesus' name, Amen." },
    encouragement: { hi: "नया वर्ष, नई दया — परमेश्वर तेरे आगे भला ही भला रखे हुए है।", en: "A new year, new mercies—God has only good ahead for you." },
  },
  "12-24": {
    title: { hi: "क्रिसमस संध्या", en: "Christmas Eve" },
    verses: [
      v("love", "यूहन्ना 3:16", "John 3:16", "परमेश्वर ने जगत से ऐसा प्रेम रखा कि उसने अपना एकलौता पुत्र दे दिया।", "For God so loved the world, that he gave his only Son."),
      v("blessing", "यशायाह 9:6", "Isaiah 9:6", "हमारे लिये एक बालक उत्पन्न हुआ, हमें एक पुत्र दिया गया है।", "For to us a child is born, to us a son is given."),
      v("faith", "लूका 2:11", "Luke 2:11", "आज दाऊद के नगर में तुम्हारे लिये एक उद्धारकर्ता जन्मा है, जो मसीह प्रभु है।", "For unto you is born this day in the city of David a Savior, who is Christ the Lord."),
      v("grace", "तीतुस 2:11", "Titus 2:11", "परमेश्वर का अनुग्रह प्रगट हुआ है, जो सब मनुष्यों के उद्धार का कारण है।", "For the grace of God has appeared, bringing salvation for all people."),
      v("victory", "मत्ती 1:23", "Matthew 1:23", "उसका नाम इम्मानुएल रखा जाएगा जिसका अर्थ है 'परमेश्वर हमारे साथ'।", "They shall call his name Immanuel, which means, God with us."),
      v("protection", "लूका 2:14", "Luke 2:14", "आकाश में परमेश्वर की महिमा और पृथ्वी पर उसके प्रिय मनुष्यों में शान्ति हो।", "Glory to God in the highest, and on earth peace among those with whom he is pleased."),
      v("healing", "यशायाह 9:2", "Isaiah 9:2", "जो लोग अन्धकार में चल रहे थे उन्होंने बड़ी ज्योति देखी।", "The people who walked in darkness have seen a great light."),
    ],
    confession: { hi: "मैं आनन्द से अंगीकार करता हूँ कि यीशु मेरा उद्धारकर्ता है — परमेश्वर मेरे साथ है।", en: "I joyfully confess that Jesus is my Savior—God is with me." },
    prayer: { hi: "हे पिता, यीशु के इस अनमोल वरदान के लिये धन्यवाद। मेरे हृदय में उसकी ज्योति और शान्ति भर दे। आमीन।", en: "Father, thank You for the precious gift of Jesus. Fill my heart with His light and peace. Amen." },
    encouragement: { hi: "परमेश्वर तेरे साथ है — इम्मानुएल! उसका आनन्द तेरी शक्ति है।", en: "God is with you—Immanuel! His joy is your strength." },
  },
  "12-25": {
    title: { hi: "मेरी क्रिसमस!", en: "Merry Christmas!" },
    verses: [
      v("love", "1 यूहन्ना 4:9", "1 John 4:9", "परमेश्वर ने अपने एकलौते पुत्र को जगत में भेजा, कि हम उसके द्वारा जीवन पाएँ।", "God sent his only Son into the world, so that we might live through him."),
      v("blessing", "लूका 2:10", "Luke 2:10", "मत डरो; मैं तुम्हें बड़े आनन्द का सुसमाचार सुनाता हूँ जो सब लोगों के लिये होगा।", "Fear not, for behold, I bring you good news of great joy that will be for all the people."),
      v("grace", "यूहन्ना 1:14", "John 1:14", "वचन देहधारी हुआ, और अनुग्रह और सच्चाई से परिपूर्ण होकर हमारे बीच में डेरा किया।", "And the Word became flesh and dwelt among us, full of grace and truth."),
      v("faith", "यशायाह 7:14", "Isaiah 7:14", "एक कुँवारी गर्भवती होगी और पुत्र जनेगी और उसका नाम इम्मानुएल रखेगी।", "Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel."),
      v("victory", "इब्रानियों 1:3", "Hebrews 1:3", "वह परमेश्वर की महिमा का प्रकाश और उसके तत्व की छाप है।", "He is the radiance of the glory of God and the exact imprint of his nature."),
      v("protection", "भजन संहिता 98:1", "Psalm 98:1", "यहोवा के लिये एक नया गीत गाओ, क्योंकि उसने आश्चर्यकर्म किए हैं।", "Oh sing to the LORD a new song, for he has done marvelous things."),
      v("healing", "गलातियों 4:4-5", "Galatians 4:4-5", "समय पूरा होने पर परमेश्वर ने अपने पुत्र को भेजा, कि हमें छुड़ा ले।", "When the fullness of time had come, God sent forth his Son, to redeem."),
    ],
    confession: { hi: "आज मैं आनन्द मनाता हूँ — उद्धारकर्ता का जन्म हुआ है, और उसकी ज्योति मुझ में चमकती है।", en: "Today I rejoice—the Savior is born, and His light shines in me." },
    prayer: { hi: "हे प्रभु यीशु, तेरे जन्म के लिये धन्यवाद। तेरा प्रेम और आनन्द आज मेरे घर और हृदय में भर दे। आमीन।", en: "Lord Jesus, thank You for Your birth. Fill my home and heart with Your love and joy today. Amen." },
    encouragement: { hi: "आनन्दित हो! स्वर्ग का सबसे बड़ा वरदान तेरे लिये आया है।", en: "Rejoice! Heaven's greatest gift has come for you." },
  },
  "12-31": {
    title: { hi: "वर्ष का अंतिम दिन", en: "Year's End" },
    verses: [
      v("grace", "भजन संहिता 103:2", "Psalm 103:2", "हे मेरे मन, यहोवा को धन्य कह, और उसके किसी उपकार को न भूल।", "Bless the LORD, O my soul, and forget not all his benefits."),
      v("faith", "इब्रानियों 13:8", "Hebrews 13:8", "यीशु मसीह कल, आज और युगानुयुग एक सा है।", "Jesus Christ is the same yesterday and today and forever."),
      v("blessing", "भजन संहिता 31:15", "Psalm 31:15", "मेरे समय तेरे हाथ में हैं।", "My times are in your hand."),
      v("victory", "2 कुरिन्थियों 5:17", "2 Corinthians 5:17", "यदि कोई मसीह में है तो वह नई सृष्टि है; पुरानी बातें बीत गईं।", "If anyone is in Christ, he is a new creation. The old has passed away."),
      v("protection", "भजन संहिता 121:8", "Psalm 121:8", "यहोवा तेरे आने-जाने में अब से लेकर सर्वदा तेरी रक्षा करेगा।", "The LORD will keep your going out and your coming in from this time forth and forevermore."),
      v("healing", "भजन संहिता 147:3", "Psalm 147:3", "वह टूटे मन वालों को चंगा करता है और उनके घावों पर पट्टी बाँधता है।", "He heals the brokenhearted and binds up their wounds."),
      v("love", "भजन संहिता 136:1", "Psalm 136:1", "यहोवा का धन्यवाद करो, क्योंकि वह भला है, और उसकी करुणा सदा की है।", "Give thanks to the LORD, for he is good, for his steadfast love endures forever."),
    ],
    confession: { hi: "मैं इस बीते वर्ष की हर आशीष के लिये परमेश्वर का धन्यवाद करता हूँ, और आगे विश्वास से चलता हूँ।", en: "I thank God for every blessing of this past year, and I move forward in faith." },
    prayer: { hi: "हे पिता, बीते वर्ष की तेरी विश्वासयोग्यता के लिये धन्यवाद। मेरे समय तेरे हाथ में हैं — मेरा भविष्य तुझे सौंपता हूँ। आमीन।", en: "Father, thank You for Your faithfulness this past year. My times are in Your hands—I commit my future to You. Amen." },
    encouragement: { hi: "पीछे मुड़कर धन्यवाद कर, आगे बढ़कर विश्वास कर — परमेश्वर विश्वासयोग्य है।", en: "Look back with thanks, step forward in faith—God is faithful." },
  },
};
