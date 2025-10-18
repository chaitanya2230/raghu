import { Crop } from '../types';

export const cropDatabase: Crop[] = [
  {
    Crop_ID: 1,
    Crop_Name: "Rice",
    Season: "Kharif",
    Soil_Type: "Clay",
    Water_Requirement: "High",
    NPK_Recommendation: "100-50-50",
    Yield: 2500,
    icon: "🌾",
    benefits: {
      en: ["High yield potential", "Good market demand", "Staple food crop"],
      hi: ["उच्च उत्पादन क्षमता", "अच्छी बाजार मांग", "मुख्य खाद्य फसल"],
      te: ["అధిక దిగుబడి సామర్థ్యం", "మంచి మార్కెట్ డిమాండ్", "ప్రధాన ఆహార పంట"]
    }
  },
  {
    Crop_ID: 2,
    Crop_Name: "Wheat",
    Season: "Rabi",
    Soil_Type: "Loam",
    Water_Requirement: "Medium",
    NPK_Recommendation: "120-60-40",
    Yield: 2200,
    icon: "🌾",
    benefits: {
      en: ["High nutritional value", "Good storage life", "High market price"],
      hi: ["उच्च पोषण मूल्य", "अच्छा भंडारण जीवन", "उच्च बाजार मूल्य"],
      te: ["అధిక పోషక విలువ", "మంచి నిల్వ జీవితం", "అధిక మార్కెట్ ధర"]
    }
  },
  {
    Crop_ID: 3,
    Crop_Name: "Maize",
    Season: "Both",
    Soil_Type: "Sandy Loam",
    Water_Requirement: "Medium",
    NPK_Recommendation: "90-40-30",
    Yield: 2000,
    icon: "🌽",
    benefits: {
      en: ["Fast growing", "Multiple uses", "Good for animal feed"],
      hi: ["तेजी से बढ़ने वाला", "कई उपयोग", "पशु चारे के लिए अच्छा"],
      te: ["వేగంగా పెరిగే", "బహుళ ఉపయోగాలు", "పశువుల మేతకు మంచిది"]
    }
  },
  {
    Crop_ID: 4,
    Crop_Name: "Cotton",
    Season: "Kharif",
    Soil_Type: "Black Soil",
    Water_Requirement: "Medium",
    NPK_Recommendation: "150-75-75",
    Yield: 1800,
    icon: "🌿",
    benefits: {
      en: ["High fiber quality", "Good export potential", "Industrial use"],
      hi: ["उच्च फाइबर गुणवत्ता", "अच्छी निर्यात क्षमता", "औद्योगिक उपयोग"],
      te: ["అధిక ఫైబర్ నాణ్యత", "మంచి ఎగుమతి సామర్థ్యం", "పారిశ్రామిక ఉపయోగం"]
    }
  },
  {
    Crop_ID: 5,
    Crop_Name: "Sugarcane",
    Season: "Annual",
    Soil_Type: "Loam",
    Water_Requirement: "High",
    NPK_Recommendation: "250-100-100",
    Yield: 4000,
    icon: "🎋",
    benefits: {
      en: ["High sugar content", "Good for ethanol", "Long-term crop"],
      hi: ["उच्च चीनी सामग्री", "इथेनॉल के लिए अच्छा", "दीर्घकालिक फसल"],
      te: ["అధిక చక్కెర కంటెంట్", "ఇథనాల్ కోసం మంచిది", "దీర్ఘకాలిక పంట"]
    }
  },
  {
    Crop_ID: 6,
    Crop_Name: "Bajra",
    Season: "Kharif",
    Soil_Type: "Sandy",
    Water_Requirement: "Low",
    NPK_Recommendation: "60-30-20",
    Yield: 1500,
    icon: "🌾",
    benefits: {
      en: ["Drought resistant", "Low water requirement", "Nutritious grain"],
      hi: ["सूखा प्रतिरोधी", "कम पानी की आवश्यकता", "पौष्टिक अनाज"],
      te: ["కరువు నిరోధక", "తక్కువ నీటి అవసరం", "పోషకాలు గల ధాన్యం"]
    }
  },
  {
    Crop_ID: 7,
    Crop_Name: "Mustard",
    Season: "Rabi",
    Soil_Type: "Loam",
    Water_Requirement: "Low",
    NPK_Recommendation: "80-40-40",
    Yield: 1300,
    icon: "🌼",
    benefits: {
      en: ["Oil crop", "Short duration", "Good rotation crop"],
      hi: ["तेल फसल", "कम अवधि", "अच्छी फसल चक्र"],
      te: ["నూనె పంట", "తక్కువ కాలం", "మంచి పంట మార్పు"]
    }
  },
  {
    Crop_ID: 8,
    Crop_Name: "Groundnut",
    Season: "Kharif",
    Soil_Type: "Sandy Loam",
    Water_Requirement: "Medium",
    NPK_Recommendation: "30-60-40",
    Yield: 1600,
    icon: "🥜",
    benefits: {
      en: ["Oil crop", "Nitrogen fixation", "Good for soil health"],
      hi: ["तेल फसल", "नाइट्रोजन स्थिरीकरण", "मिट्टी के स्वास्थ्य के लिए अच्छा"],
      te: ["నూనె పంట", "నైట్రోజన్ ఫిక్సేషన్", "నేల ఆరోగ్యానికి మంచిది"]
    }
  },
  {
    Crop_ID: 9,
    Crop_Name: "Soybean",
    Season: "Kharif",
    Soil_Type: "Black Soil",
    Water_Requirement: "Medium",
    NPK_Recommendation: "20-60-40",
    Yield: 1700,
    icon: "🫘",
    benefits: {
      en: ["High protein", "Nitrogen fixation", "Oil production"],
      hi: ["उच्च प्रोटीन", "नाइट्रोजन स्थिरीकरण", "तेल उत्पादन"],
      te: ["అధిక ప్రోటీన్", "నైట్రోజన్ ఫిక్సేషన్", "నూనె ఉత్పత్తి"]
    }
  },
  {
    Crop_ID: 10,
    Crop_Name: "Tomato",
    Season: "Both",
    Soil_Type: "Loam",
    Water_Requirement: "Medium",
    NPK_Recommendation: "120-60-60",
    Yield: 2000,
    icon: "🍅",
    benefits: {
      en: ["High value", "Multiple harvests", "Processing potential"],
      hi: ["उच्च मूल्य", "कई कटाई", "प्रसंस्करण क्षमता"],
      te: ["అధిక విలువ", "బహుళ పంటలు", "ప్రాసెసింగ్ సామర్థ్యం"]
    }
  }
];
