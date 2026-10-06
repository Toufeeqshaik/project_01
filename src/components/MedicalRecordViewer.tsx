import { useState } from 'react';
import { Download, ChevronRight, Activity, Thermometer } from 'lucide-react';

export default function MedicalRecordViewer() {
  const [activeTab, setActiveTab] = useState<'all' | 'lab' | 'clinical'>('all');

  const records = [
    {
      id: '1',
      date: '2026-10-01',
      title: 'Comprehensive Blood Panel',
      type: 'lab',
      source: 'Altrix Health Labs',
      status: 'new'
    },
    {
      id: '2',
      date: '2026-09-15',
      title: 'Annual Physical Examination',
      type: 'clinical',
      source: 'Dr. Jane Smith',
      status: 'reviewed'
    },
    {
      id: '3',
      date: '2026-08-22',
      title: 'Cardiology Consultation',
      type: 'clinical',
      source: 'Heart & Rhythm Center',
      status: 'reviewed'
    }
  ];

  const filteredRecords = records.filter(r => activeTab === 'all' || r.type === activeTab);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Medical Records</h2>
        
        <div className="flex space-x-2 mt-4">
          {['all', 'lab', 'clinical'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {filteredRecords.map((record) => (
          <div key={record.id} className="p-4 hover:bg-gray-50 flex items-center justify-between group transition-colors cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${record.type === 'lab' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                {record.type === 'lab' ? <Activity size={20} /> : <Thermometer size={20} />}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors">{record.title}</h4>
                <div className="flex items-center text-sm text-gray-500 space-x-2 mt-1">
                  <span>{record.date}</span>
                  <span>&bull;</span>
                  <span>{record.source}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors">
                <Download size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
