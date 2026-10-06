import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Mic } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function CopilotChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello Sarah! 👋 I\'m your AI Health Copilot. I can help you understand your health records, track your vitals, schedule appointments, and answer health-related questions. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const apiMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          messages: apiMessages,
          model: "moonshotai/kimi-k3",
          max_tokens: 16384,
          temperature: 1,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0]?.message?.content || "I'm sorry, I couldn't process that response.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Failed to fetch response:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I encountered an error connecting to my servers. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-[700px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="bg-white p-2.5 rounded-xl shadow-lg">
              <Bot size={24} className="text-blue-600" />
            </div>
            <div className="absolute -top-1 -right-1">
              <div className="bg-green-500 w-3 h-3 rounded-full border-2 border-white animate-pulse"></div>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-white flex items-center gap-2">
              Health Copilot AI
              <Sparkles size={16} className="text-yellow-300" />
            </h2>
            <p className="text-xs text-blue-100">Powered by Altrix Labs</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/20 rounded-xl transition-colors">
          <Mic size={20} className="text-white" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((msg, index) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-center gap-2 mb-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                <span className="text-xs font-semibold text-gray-600">
                  {msg.role === 'user' ? 'You' : 'Copilot AI'}
                </span>
                <span className="text-xs text-gray-400">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                )}
              </div>
              <div className={`rounded-2xl p-4 shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-tr-sm' 
                  : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'
              }`}>
                <p className="leading-relaxed text-sm">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="max-w-[85%]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot size={14} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-gray-600">Copilot AI</span>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin text-blue-600" size={18} />
                  <span className="text-sm text-gray-600">Analyzing your health data...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (Quick Actions) */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['View my latest labs', 'Check vital trends', 'Schedule appointment'].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInput(suggestion)}
              className="px-3 py-1.5 bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white text-gray-700 text-xs font-medium rounded-full border border-gray-200 whitespace-nowrap transition-all shadow-sm hover:shadow-lg"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSend} className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Ask about your health data..."
              rows={1}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
            <button
              type="button"
              className="absolute right-2 bottom-2 p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Mic size={18} />
            </button>
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-2 text-center">
          AI responses are for informational purposes. Always consult with healthcare professionals.
        </p>
      </div>
    </div>
  );
}
