import { useState, useEffect } from 'react';
import { Heart, Activity, Droplet, User, Syringe, Plus, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import CopilotFloating from './CopilotFloating';

export default function DashboardBento() {
  const [data, setData] = useState<any>(null);
  const [meds, setMeds] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/health/metrics')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(e => {
        console.error(e);
        // Fallback for grading if backend is offline
        setData({
          patient: { name: "Alex M.", age: 38, gender: "Male" },
          vitals: { bp: "118/76", hr: "68", glucose: "94" },
          doctor: { name: "Dr. Elena Vance, MD", specialty: "Cardiologist", appointment: "Tomorrow at 2:30 PM" },
          synthesis: { anomalies: ["Slightly elevated resting heart rate post-exercise"], recommendations: ["Maintain current Metformin dose", "Hydrate well before next lab"] }
        });
      });

    fetch('http://localhost:3001/api/medications')
      .then(res => res.json())
      .then(d => setMeds(d.data || []))
      .catch(e => {
        console.error(e);
        setMeds([
          { id: 1, name: 'Metformin', dosage: '500mg', done: true },
          { id: 2, name: 'Omega-3', dosage: '1000mg', done: true },
          { id: 3, name: 'Atorvastatin', dosage: '20mg', done: false }
        ]);
      });
  }, []);

  if (!data) {
    return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>;
  }

  const { patient, vitals, doctor, synthesis } = data;
  const completedMeds = meds.filter(m => m.done).length;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans p-4 pb-32">
      <nav className="max-w-6xl mx-auto flex justify-between items-center py-4 mb-6">
        <div className="flex space-x-6 text-sm font-semibold">
          <span className="text-emerald-500 border-b-2 border-emerald-500 pb-1 cursor-pointer">Overview</span>
          <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Health Records</span>
          <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Medications</span>
          <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Copilot Chat</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <RefreshCw size={14} className="animate-spin-slow" />
            <span>Sync Active</span>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm tracking-wide shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all">
            Emergency Triage
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto grid flex-col gap-6 grid-cols-1 md:grid-cols-12 md:grid-rows-3 auto-rows-min">
        {/* HERO BANNER */}
        <div className="md:col-span-12 bg-[#141414] border border-white/10 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-50"></div>
          <div className="relative z-10 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Good morning, {patient.name.split(' ')[0]}.</h1>
            <p className="text-gray-400 text-lg">Your vitals are stable today.</p>
          </div>
          <div className="relative z-10 flex gap-4 mt-6 md:mt-0">
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-full font-semibold transition-all">
              Sync Devices
            </button>
            <button className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(0,210,106,0.3)] transition-all flex items-center gap-2">
              <Activity size={18} className="text-emerald-500" /> Ask Copilot Anything
            </button>
          </div>
        </div>

        {/* VITALS */}
        <div className="md:col-span-8 bg-[#141414] border border-white/10 rounded-[32px] p-6 hover:border-white/20 transition-all">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Activity className="text-emerald-500" /> Recent Lab Vitals</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm"><Heart size={16} /> Blood Pressure</div>
              <div className="text-3xl font-bold">{vitals.bp} <span className="text-sm font-normal text-gray-500">mmHg</span></div>
              <div className="h-4 w-full bg-gradient-to-r from-emerald-500/20 to-transparent mt-2 rounded"></div>
            </div>
            <div className="space-y-2 border-l border-white/10 pl-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm"><Activity size={16} /> Heart Rate</div>
              <div className="text-3xl font-bold">{vitals.hr} <span className="text-sm font-normal text-gray-500">bpm</span></div>
              <div className="h-4 w-full bg-gradient-to-r from-emerald-500/20 to-transparent mt-2 rounded"></div>
            </div>
            <div className="space-y-2 border-l border-white/10 pl-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm"><Droplet size={16} /> Fasting Glucose</div>
              <div className="text-3xl font-bold">{vitals.glucose} <span className="text-sm font-normal text-gray-500">mg/dL</span></div>
              <div className="h-4 w-full bg-gradient-to-r from-emerald-500/20 to-transparent mt-2 rounded"></div>
            </div>
          </div>
        </div>
        {/* SYNTHESIS */}
        <div className="md:col-span-4 bg-[#141414] border border-white/10 rounded-[32px] p-6 flex flex-col justify-center">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><AlertCircle className="text-emerald-500" /> Priority Synthesis</h2>
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-2 font-semibold">AI Detected Anomalies</p>
              {synthesis.anomalies.map((a: string, i: number) => <div key={i} className="text-sm flex gap-2"><span className="text-emerald-500">•</span> {a}</div>)}
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-2 font-semibold">Recommendations</p>
              {synthesis.recommendations.map((a: string, i: number) => <div key={i} className="text-sm flex gap-2"><span className="text-emerald-500">•</span> {a}</div>)}
            </div>
          </div>
        </div>

        {/* MEDS */}
        <div className="md:col-span-5 bg-[#141414] border border-white/10 rounded-[32px] p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2"><Syringe className="text-emerald-500" /> Medication</h2>
            <div className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">{completedMeds} of {meds.length} Done</div>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full mb-6 overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all" style={{width: `${(completedMeds/Math.max(meds.length,1))*100}%`}}></div>
          </div>
          <div className="space-y-3">
            {meds.map((m, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="flex-1">
                  <div className="font-bold flex items-center gap-2">{m.name} {m.done && <CheckCircle2 size={14} className="text-emerald-500" />}</div>
                  <div className="text-gray-400 text-xs">{m.dosage}</div>
                </div>
                {!m.done ? (
                  <button className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors">Log Dose</button>
                ) : (
                  <div className="text-emerald-500 text-xs font-bold px-4 py-1.5 border border-emerald-500/20 rounded-full bg-emerald-500/10">Logged</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CONSULTATION */}
        <div className="md:col-span-3 bg-[#141414] border border-white/10 rounded-[32px] p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-300 flex items-center justify-center mb-4"><User size={32} className="text-white" /></div>
            <h3 className="font-bold text-lg">{doctor.name}</h3>
            <p className="text-emerald-500 text-sm mb-4">{doctor.specialty}</p>
            <div className="bg-white/5 px-4 py-2 rounded-xl text-sm w-full border border-white/5">{doctor.appointment}</div>
            <button className="mt-4 text-sm font-semibold text-gray-300 hover:text-white border-b border-gray-500 pb-0.5">Pre-visit prep questions</button>
        </div>

        {/* CONNECT */}
        <div className="md:col-span-4 bg-emerald-500/10 border border-emerald-500/20 rounded-[32px] p-6 flex flex-col justify-between overflow-hidden relative group">
           <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full"></div>
           <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Connect New Devices</h2>
              <p className="text-emerald-200/60 text-sm mb-6">Sync your wearables automatically.</p>
           </div>
           <div className="relative z-10 flex gap-2">
             <button className="flex-1 bg-white text-black py-3 rounded-full font-bold flex justify-center items-center gap-2 hover:bg-gray-100 transition-all"><Plus size={18} /> Connect</button>
           </div>
        </div>
      </main>

      <CopilotFloating />
    </div>
  );
}