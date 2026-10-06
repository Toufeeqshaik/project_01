export interface VitalSign {
  id: string;
  type: string;
  value: string;
  unit: string;
  status: 'optimal' | 'normal' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  timestamp: Date;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar?: string;
  status?: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  title: string;
  type: 'lab' | 'clinical' | 'medication' | 'appointment';
  source: string;
  status: 'new' | 'reviewed' | 'pending' | 'completed';
  priority: 'normal' | 'high';
  category?: string;
  downloadUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export interface CopilotSuggestion {
  id: string;
  text: string;
  icon: string;
}

export interface DashboardMetrics {
  bloodPressure: {
    value: string;
    status: VitalSign['status'];
    trend: VitalSign['trend'];
    baseline: string;
  };
  heartRate: {
    value: string;
    status: VitalSign['status'];
    trend: VitalSign['trend'];
    avg7d: string;
  };
  glucose: {
    value: string;
    status: VitalSign['status'];
    trend: VitalSign['trend'];
    note: string;
  };
  oxygen: {
    value: string;
    status: VitalSign['status'];
    trend: VitalSign['trend'];
  };
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  timestamp: Date;
  read: boolean;
}
