import { useState, useEffect } from 'react';
import { VitalSign, Patient } from '../types';
import { Activity, Thermometer, Wind, Heart, TrendingUp, Calendar } from 'lucide-react';

/**
 * HealthDashboard component to display patient health summary and vital metrics
 */
export default function HealthDashboard() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [metrics, setMetrics] = useState<VitalSign[]>([]);
  // Use lastUpdated setter to update time automatically if needed, or simply don't use the state if it doesn't change

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setPatient({
        id: '1',
        name: 'Sarah Johnson',
        age: 34,
        gender: 'Female',
      });

      setMetrics([
        {
          id: 'v1',
          type: 'Blood Pressure',
          value: '120/80',
          unit: 'mmHg',
          status: 'normal',
          timestamp: new Date(),
        },
        {
          id: 'v2',
          type: 'Heart Rate',
          value: '72',
          unit: 'bpm',
          status: 'normal',
          timestamp: new Date(),
        },
        {
          id: 'v3',
          type: 'Temperature',
          value: '99.1',
          unit: '°F',
          status: 'warning',
          timestamp: new Date(),
        },
        {
          id: 'v4',
          type: 'O2 Saturation',
          value: '98',
          unit: '%',
          status: 'normal',
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const lastUpdated = new Date();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64" role="status" aria-label="Loading health summary data">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="text-primary-600 animate-pulse" size={24} />
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: 'optimal' | 'normal' | 'warning' | 'critical') => {
    switch (status) {
      case 'optimal':
        return 'from-emerald-400 to-teal-500';
      case 'normal':
        return 'from-green-400 to-emerald-500';
      case 'warning':
        return 'from-yellow-400 to-orange-500';
      case 'critical':
        return 'from-red-400 to-rose-600';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getMetricGradient = (type: string) => {
    switch (type) {
      case 'Blood Pressure': return 'from-purple-500 to-indigo-600';
      case 'Heart Rate': return 'from-rose-500 to-pink-600';
      case 'Temperature': return 'from-orange-500 to-red-600';
      case 'O2 Saturation': return 'from-cyan-500 to-blue-600';
      default: return 'from-blue-500 to-indigo-600';
    }
  };

  const getMetricIcon = (type: string) => {
    switch (type) {
      case 'Blood Pressure': return <Activity className="h-6 w-6" />;
      case 'Heart Rate': return <Heart className="h-6 w-6" />;
      case 'Temperature': return <Thermometer className="h-6 w-6" />;
      case 'O2 Saturation': return <Wind className="h-6 w-6" />;
      default: return <Activity className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Patient Overview Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Patient Profile</p>
              <h2 className="text-2xl font-bold">{patient?.name}</h2>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <Calendar className="text-white" size={28} />
            </div>
          </div>
        </div>
        
        {patient && (
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Age</p>
              <p className="text-2xl font-bold text-gray-900">{patient.age}</p>
              <p className="text-gray-500 text-xs mt-1">years</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Gender</p>
              <p className="text-2xl font-bold text-gray-900">{patient.gender}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Status</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-semibold text-green-600">Active</p>
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Records</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-gray-500 text-xs mt-1">files</p>
            </div>
          </div>
        )}
      </div>

      {/* Vital Signs Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Vital Signs</h3>
              <p className="text-xs text-gray-500">Real-time health monitoring</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Last updated</p>
            <p className="text-sm font-medium text-gray-700">{lastUpdated.toLocaleTimeString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.id}
              className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${getMetricGradient(metric.type)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="absolute top-3 right-3">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${getStatusColor(metric.status)} shadow-lg`}></div>
              </div>

              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${getMetricGradient(metric.type)} text-white shadow-lg mb-4`}>
                {getMetricIcon(metric.type)}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">{metric.type}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm font-medium text-gray-500">{metric.unit}</p>
                </div>
                
                <div className="mt-3 flex items-center gap-2">
                  <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full bg-gradient-to-br ${getStatusColor(metric.status)} text-white`}>
                    {metric.status}
                  </span>
                </div>
              </div>

              <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${getMetricGradient(metric.type)} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
