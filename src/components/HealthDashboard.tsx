import { useState, useEffect } from 'react';
import { VitalSign, Patient } from '../types';
import { Activity, Thermometer, Wind, Heart } from 'lucide-react';

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
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const lastUpdated = new Date();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getStatusColor = (status: 'normal' | 'warning' | 'critical') => {
    switch (status) {
      case 'normal':
        return 'text-success bg-green-50 border-green-200';
      case 'warning':
        return 'text-warning bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'text-danger bg-red-50 border-red-200';
      default:
        return 'text-gray-500 bg-gray-50 border-gray-200';
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
    <div className="p-4 sm:p-6 space-y-6">
      {/* Patient Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Patient Overview</h2>
        {patient && (
          <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-12">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-lg text-gray-900">{patient.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium text-lg text-gray-900">{patient.age} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium text-lg text-gray-900">{patient.gender}</p>
            </div>
          </div>
        )}
      </div>

      {/* Health Metrics Grid */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Vital Signs</h3>
          <p className="text-xs text-gray-500">Last updated: {lastUpdated.toLocaleTimeString()}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className={`rounded-xl p-5 border ${getStatusColor(metric.status)} flex flex-col justify-between transition-transform hover:scale-[1.02]`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-white/60">
                  {getMetricIcon(metric.type)}
                </div>
                <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded-full bg-white/60">
                  {metric.status}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium opacity-80">{metric.type}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <p className="text-3xl font-bold">{metric.value}</p>
                  <p className="text-sm font-medium opacity-80">{metric.unit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
