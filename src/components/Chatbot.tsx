import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, Minimize2 } from 'lucide-react';
import { Language } from '../types';

interface ChatbotProps {
  language: Language;
}

interface Message {
  text: string;
  isBot: boolean;
  time: string;
}

const OPENAI_API_KEY = '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';

export function Chatbot({ language }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: '🌾 Namaste! I\'m your Agricultural Expert AI Assistant.\n\nI can help you with ANY agriculture-related questions:\n\n🌱 Crop recommendations & selection\n🌍 Soil types & analysis\n☀️ Weather & seasonal planning\n💧 Irrigation & water management\n🐛 Pest & disease control\n🌾 Fertilizers & NPK ratios\n📊 Market prices & trends\n\nAsk me anything about farming!',
      isBot: true,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToOpenAI = async (userMessage: string): Promise<string> => {
    try {
      console.log('Sending message to OpenAI:', userMessage);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are an expert agricultural assistant specializing in Indian farming practices. You help farmers and agricultural professionals with comprehensive farming advice.

Your expertise includes:
- Crop Selection: Recommend crops based on soil type, climate, season, rainfall, temperature, and region
- Soil Management: Clay, sandy, loam, black soil, red soil, alluvial soil characteristics and treatments
- Seasons: Kharif (June-October), Rabi (October-March), Zaid (March-June) crops and planning
- Water Management: Irrigation methods, water requirements, drip/sprinkler systems
- Pest & Disease Control: Identification, prevention, organic and chemical treatments
- Fertilizers: NPK ratios, organic fertilizers, micronutrients, application timing
- Market Intelligence: Crop prices, market trends, profitable crops
- Weather Considerations: Rainfall patterns, temperature ranges, climate change adaptation
- Modern Techniques: Precision farming, greenhouse, hydroponics, organic farming
- Government Schemes: PM-KISAN, crop insurance, subsidies

IMPORTANT: Answer ANY agriculture-related question comprehensively. Be practical, scientific, and farmer-friendly. Use Indian farming context. Include emojis occasionally for engagement.

If asked non-agriculture questions, politely redirect to farming topics.`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', errorData);
        throw new Error(`API Error: ${response.status} - ${errorData?.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('OpenAI Response received');
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);

      // Return a helpful fallback response
      const lower = userMessage.toLowerCase();

      // Provide intelligent fallback based on keywords
      if (lower.includes('soil') || lower.includes('clay') || lower.includes('sandy')) {
        return '🌍 **Soil Types in India:**\n\n• **Clay Soil**: Best for rice, wheat, cotton. Retains water well but drains slowly.\n• **Sandy Soil**: Good for bajra, groundnut, watermelon. Drains quickly, needs frequent irrigation.\n• **Loam Soil**: Ideal for most vegetables and crops. Perfect balance of drainage and retention.\n• **Black Soil**: Excellent for cotton, soybean, sugarcane. Rich in nutrients.\n• **Red Soil**: Suitable for groundnut, potato, millets.\n\nWhich soil type do you have? I can provide specific recommendations!';
      }

      if (lower.includes('kharif') || lower.includes('rabi') || lower.includes('season')) {
        return '📅 **Indian Farming Seasons:**\n\n🌧️ **Kharif (June-October)**\nRice, Cotton, Soybean, Maize, Bajra, Groundnut\n\n☀️ **Rabi (October-March)**\nWheat, Mustard, Chickpea, Barley, Peas\n\n🌻 **Zaid (March-June)**\nWatermelon, Cucumber, Vegetables, Fodder crops\n\nPlan according to your region\'s rainfall and temperature patterns!';
      }

      if (lower.includes('pest') || lower.includes('disease') || lower.includes('insect')) {
        return '🐛 **Pest & Disease Management:**\n\n**Prevention:**\n• Crop rotation\n• Use disease-resistant varieties\n• Maintain field hygiene\n• Monitor regularly\n\n**Control Methods:**\n• Neem-based organic pesticides\n• Biological control (beneficial insects)\n• Chemical pesticides (when necessary)\n• Integrated Pest Management (IPM)\n\nTell me which crop and pest you\'re dealing with for specific advice!';
      }

      if (lower.includes('fertilizer') || lower.includes('npk') || lower.includes('nutrient')) {
        return '🌱 **Fertilizer Guide:**\n\n**NPK Ratio:**\n• N (Nitrogen): Leaf growth\n• P (Phosphorus): Root & flower development\n• K (Potassium): Overall plant health\n\n**Common Ratios:**\n• Vegetables: 19-19-19 or 20-20-20\n• Cereals: 23-23-0 or urea (46-0-0)\n• Fruits: 15-15-15 or 12-32-16\n\n**Organic Options:**\nCompost, vermicompost, cow dung, green manure\n\nWhat crop are you growing? I\'ll suggest the perfect fertilizer!';
      }

      if (lower.includes('water') || lower.includes('irrigation')) {
        return '💧 **Irrigation Methods:**\n\n**Drip Irrigation**: 90% efficiency, best for vegetables & orchards\n**Sprinkler**: Good for large fields, wheat, vegetables\n**Flood Irrigation**: Traditional, for rice, sugarcane\n**Furrow**: For row crops\n\n**Water Requirements:**\n• High: Rice, Sugarcane (150-250cm)\n• Medium: Cotton, Maize (75-150cm)\n• Low: Bajra, Jowar (40-75cm)\n\nTell me your crop and region for specific water management tips!';
      }

      return '❌ **Connection Issue**\n\nI\'m having trouble connecting to my knowledge base right now. However, I can still help with:\n\n• Crop selection guidance\n• Soil type recommendations\n• Seasonal planning\n• Pest control methods\n• Fertilizer advice\n• Irrigation tips\n\nPlease ask your agriculture question again, and I\'ll do my best to help! 🌾';
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      text: input,
      isBot: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    const questionText = input;
    setInput('');
    setIsTyping(true);

    const botResponse = await sendMessageToOpenAI(questionText);

    setIsTyping(false);
    const botMessage: Message = {
      text: botResponse,
      isBot: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const quickQuestions = [
    '🌾 Best crops for clay soil?',
    '☀️ What to grow in Kharif season?',
    '💧 Low water requirement crops?',
    '🌱 Organic pest control methods?',
  ];

  const handleQuickQuestion = (question: string) => {
    const cleanQuestion = question.replace(/[🌾☀️💧🌱💡🍕🚀]/g, '').trim();
    setInput(cleanQuestion);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen ? (
        <div
          className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isMinimized ? 'w-80 h-16' : 'w-[420px] h-[650px]'
          } flex flex-col`}
          style={{
            boxShadow: '0 20px 60px rgba(46, 139, 87, 0.3)',
            border: '1px solid rgba(46, 139, 87, 0.1)',
          }}
        >
          <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white p-5 flex justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <Sparkles size={24} className="text-yellow-300" />
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  Agriculture AI Expert
                </h3>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse shadow-lg shadow-green-300"></div>
                  <span className="text-xs">Powered by GPT-3.5</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 relative z-10">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white/20 p-2 rounded-xl transition-all hover:scale-110"
                title={isMinimized ? 'Maximize' : 'Minimize'}
              >
                <Minimize2 size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-xl transition-all hover:scale-110 hover:rotate-90"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-gray-50 to-white space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl transition-all hover:scale-[1.02] ${
                        msg.isBot
                          ? 'bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100'
                          : 'bg-gradient-to-r from-green-600 to-green-500 text-white rounded-br-none shadow-lg'
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-2 ${msg.isBot ? 'text-gray-400' : 'text-green-100'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-md border border-gray-100 flex items-center gap-2">
                      <Loader2 className="animate-spin text-green-600" size={18} />
                      <span className="text-sm text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {messages.length === 1 && (
                <div className="px-5 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Quick questions to get started:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickQuestion(q)}
                        className="text-xs bg-white hover:bg-green-50 text-gray-700 px-3 py-2 rounded-full border border-green-200 hover:border-green-400 transition-all hover:scale-105 shadow-sm"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask about farming, crops, soil, pests..."
                    disabled={isTyping}
                    className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-full focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isTyping}
                    className="bg-gradient-to-r from-green-600 to-green-500 text-white p-3 rounded-full hover:shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                    <Send size={20} className="relative z-10" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-green-600 to-green-500 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-green-500/50 hover:scale-110 transition-all flex items-center justify-center relative overflow-hidden group"
          style={{ animation: 'bounce 2s infinite' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          <MessageCircle size={28} className="relative z-10 group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
        </button>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
