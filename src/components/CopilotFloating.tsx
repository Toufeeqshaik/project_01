import { useState } from 'react';
import { Send, Paperclip, Loader2, Sparkles } from 'lucide-react';

export default function CopilotFloating() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userM = { role: 'user', content: input };
    setMessages(p => [...p, userM]);
    setInput('');
    setLoading(true);
    setIsOpen(true);

    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(p => [...p, { role: 'assistant', content: data.message }]);
    } catch (e) {
      setMessages(p => [...p, { role: 'assistant', content: "Error connecting to AI." }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl z-50">
      
      {isOpen && messages.length > 0 && (
         <div className="bg-[#141414] border border-white/10 rounded-[32px] p-6 mb-4 max-h-96 overflow-y-auto shadow-2xl backdrop-blur-xl">
            {messages.map((m, i) => (
              <div key={i} className={`flex mb-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm ${m.role === 'user' ? 'bg-white text-black' : 'bg-white/5 border border-white/10'}`}>
                  {m.role === 'assistant' && <Sparkles size={14} className="inline mr-2 text-emerald-500" />}
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                 <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl flex items-center gap-2">
                   <Loader2 size={16} className="animate-spin text-emerald-500" />
                   <span className="text-sm text-gray-400">Thinking...</span>
                 </div>
              </div>
            )}
         </div>
      )}

      <div className="bg-[#141414] border border-white/10 p-2 pl-6 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-4 transition-all focus-within:border-emerald-500/50 focus-within:shadow-[0_0_20px_rgba(0,210,106,0.15)]">
        
        <div className="text-emerald-500 flex-shrink-0 animate-pulse">
           <Sparkles size={20} />
        </div>

        <form onSubmit={sendMessage} className="flex-1 flex items-center">
          <input 
            type="text" 
            placeholder="Ask Copilot about your health or upload a PDF..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full bg-transparent text-white focus:outline-none placeholder-gray-500 text-sm"
          />
          <button type="submit" disabled={!input} className="hidden"></button>
        </form>

        <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 pr-2">
           <label className="p-2 cursor-pointer hover:bg-white/10 rounded-full transition-colors text-gray-400">
             <input type="file" className="hidden" />
             <Paperclip size={18} />
           </label>
           <button 
             onClick={sendMessage}
             className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
             disabled={!input || loading}
           >
             <Send size={14} className="ml-0.5" />
           </button>
        </div>
      </div>
      
      {!isOpen && (
        <div className="mt-4 flex justify-center gap-3">
          <span onClick={() => {setInput("Any anomalies in my last labs?"); setIsOpen(true)}} className="cursor-pointer text-xs font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            🧪 Any anomalies in my labs?
          </span>
          <span onClick={() => {setInput("Show medication interactions"); setIsOpen(true)}} className="cursor-pointer text-xs font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            💊 Show medication interactions
          </span>
        </div>
      )}
    </div>
  );
}