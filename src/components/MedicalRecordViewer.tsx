import { useState } from 'react';
import { Download, ChevronRight, Activity, FileText, Stethoscope, Search, Filter } from 'lucide-react';

export default function MedicalRecordViewer() {
  const [activeTab, setActiveTab] = useState<'all' | 'lab' | 'clinical'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const records = [
    {
      id: '1',
      date: '2026-10-01',
      title: 'Comprehensive Blood Panel',
      type: 'lab',
      source: 'Altrix Health Labs',
      status: 'new',
      priority: 'high'
    },
    {
      id: '2',
      date: '2026-09-15',
      title: 'Annual Physical Examination',
      type: 'clinical',
      source: 'Dr. Jane Smith',
      status: 'reviewed',
      priority: 'normal'
    },
    {
      id: '3',
      date: '2026-08-22',
      title: 'Cardiology Consultation',
      type: 'clinical',
      source: 'Heart & Rhythm Center',
      status: 'reviewed',
      priority: 'normal'
    },
    {
      id: '4',
      date: '2026-08-10',
      title: 'Complete Metabolic Panel',
      type: 'lab',
      source: 'Altrix Health Labs',
      status: 'reviewed',
      priority: 'normal'
    }
  ];

  const filteredRecords = records.filter(r => 
    (activeTab === 'all' || r.type === activeTab) &&
    (searchQuery === '' || r.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getRecordIcon = (type: string) => {
    return type === 'lab' ? Activity : Stethoscope;
  };

  const getRecordColor = (type: string) => {
    return type === 'lab' 
      ? 'from-purple-500 to-pink-600' 
      : 'from-blue-500 to-cyan-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <FileText className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Medical Records</h2>
              <p className="text-xs text-gray-500">{filteredRecords.length} records available</p>
            </div>
          </div>
          <button className="p-2 hover:bg-white rounded-xl transition-colors">
            <Filter size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-2">
          {[
            { id: 'all', label: 'All Records', count: records.length },
            { id: 'lab', label: 'Lab Results', count: records.filter(r => r.type === 'lab').length },
            { id: 'clinical', label: 'Clinical Notes', count: records.filter(r => r.type === 'clinical').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Records List */}
      <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No records found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredRecords.map((record, index) => {
            const Icon = getRecordIcon(record.type);
            return (
              <div 
                key={record.id} 
                className="p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 group transition-all cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getRecordColor(record.type)} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon size={20} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                          {record.title}
                        </h4>
                        {record.status === 'new' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-pink-600 text-white">
                            NEW
                          </span>
                        )}
                        {record.priority === 'high' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-orange-500 to-red-600 text-white">
                            Priority
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <span className="font-medium">{record.date}</span>
                        <span className="text-gray-300">•</span>
                        <span className="truncate">{record.source}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-2.5 text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 rounded-xl transition-all shadow-lg hover:shadow-xl">
                      <Download size={18} />
                    </button>
                    <button className="p-2.5 text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 rounded-xl transition-all shadow-lg hover:shadow-xl">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600"></div>
            <span className="text-gray-600">Lab Results: <span className="font-semibold">{records.filter(r => r.type === 'lab').length}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600"></div>
            <span className="text-gray-600">Clinical: <span className="font-semibold">{records.filter(r => r.type === 'clinical').length}</span></span>
          </div>
        </div>
        <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
          View All →
        </button>
      </div>
    </div>
  );
}
