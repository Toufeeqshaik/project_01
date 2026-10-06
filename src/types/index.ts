export interface VitalSign {
  id: string;
  type: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  timestamp: Date;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
}
