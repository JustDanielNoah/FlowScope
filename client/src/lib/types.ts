export interface ECGDataPoint {
  timestamp: number;
  value: number;
}

export interface VitalSign {
  value: number | string;
  status: HealthStatus;
  unit: string;
}

export enum HealthStatus {
  HEALTHY = "healthy",
  CONCERNING = "concerning",
  CRITICAL = "critical"
}

export interface HealthAnalysis {
  status: HealthStatus;
  recommendation: string;
  timestamp: string;
}

export interface Report {
  id: number;
  title: string;
  summary: string;
  healthStatus: HealthStatus;
  date: string;
  data?: {
    ecgData?: ECGDataPoint[];
    vitalStats?: {
      heartRate?: number;
      bloodOxygen?: number;
      bloodPressureSystolic?: number;
      bloodPressureDiastolic?: number;
      respiratoryRate?: number;
      recoveryRate?: number;
    };
    analysis?: {
      insights: string;
      recommendations: string[];
      riskAreas?: AnalysisItem[];
    }
  };
}

export interface VitalStats {
  bloodOxygen: VitalSign;
  bloodPressure: VitalSign;
  respiratoryRate: VitalSign;
  recoveryRate: VitalSign;
}

export interface UserHealthData {
  userId: number;
  ecgData: ECGDataPoint[];
  heartRate: number;
  bloodOxygen: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  respiratoryRate: number;
  recoveryRate: number;
  healthStatus: HealthStatus;
  timestamp: string;
}

export interface AnalysisItem {
  title: string;
  icon: string;
  risk: number;
  description: string;
  status: HealthStatus;
}
