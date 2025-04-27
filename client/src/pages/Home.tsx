import { useState, useEffect } from "react";
import { HealthStatus, VitalStats, UserHealthData } from "@/lib/types";
import { 
  getHealthStatusColor,
  getBloodOxygenStatus,
  getBloodPressureStatus,
  getRespiratoryRateStatus,
  getRecoveryRateStatus,
  getHeartRateStatus
} from "@/lib/health-status";
import ECGMonitor from "@/components/home/ECGMonitor";
import VitalStatsCards from "@/components/home/VitalStats";
import ECGTrend from "@/components/home/ECGTrend";
import ChatBot from "@/components/home/ChatBot";
import { useToast } from "@/hooks/use-toast";

// Mock user data - in a real app, this would come from the API
const mockUser = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
};

// Mock ECG data points - in a real app, this would come from the API
const mockECGTrendData = [
  { date: "1", value: 72 },
  { date: "2", value: 74 },
  { date: "3", value: 69 },
  { date: "4", value: 75 },
];

// Mock user health data - in a real app, this would come from the API
const mockHealthData: UserHealthData = {
  userId: 1,
  ecgData: [],
  heartRate: 72,
  bloodOxygen: 98,
  bloodPressureSystolic: 120,
  bloodPressureDiastolic: 80,
  respiratoryRate: 16,
  recoveryRate: 85,
  healthStatus: HealthStatus.HEALTHY,
  timestamp: new Date().toISOString(),
};

const Home = () => {
  const [user, setUser] = useState(mockUser);
  const [healthData, setHealthData] = useState<UserHealthData>(mockHealthData);
  const [ecgTrendData, setEcgTrendData] = useState(mockECGTrendData);
  const [ecgTrendStatus, setEcgTrendStatus] = useState<HealthStatus>(HealthStatus.HEALTHY);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would fetch real data from the API
    // For now, we'll use our mock data
    
    // Simulate data loading
    const loadUserData = async () => {
      try {
        // Set our mock data
        setUser(mockUser);
        setHealthData(mockHealthData);
        setEcgTrendData(mockECGTrendData);
        setEcgTrendStatus(HealthStatus.HEALTHY);
      } catch (error) {
        toast({
          title: "Error Loading Data",
          description: "Unable to load health data. Please try again later.",
          variant: "destructive",
        });
      }
    };
    
    loadUserData();
  }, [toast]);

  // Prepare vital stats data
  const vitalStats: VitalStats = {
    bloodOxygen: {
      value: healthData.bloodOxygen,
      status: getBloodOxygenStatus(healthData.bloodOxygen),
      unit: "%"
    },
    bloodPressure: {
      value: `${healthData.bloodPressureSystolic}/${healthData.bloodPressureDiastolic}`,
      status: getBloodPressureStatus(healthData.bloodPressureSystolic, healthData.bloodPressureDiastolic),
      unit: "mmHg"
    },
    respiratoryRate: {
      value: healthData.respiratoryRate,
      status: getRespiratoryRateStatus(healthData.respiratoryRate),
      unit: "breaths/min"
    },
    recoveryRate: {
      value: healthData.recoveryRate,
      status: getRecoveryRateStatus(healthData.recoveryRate),
      unit: "%"
    }
  };

  return (
    <div className="px-4 py-6">
      {/* Welcome Message */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Hi {user.firstName},</h2>
        <p className="text-gray-600">Here's your heart health overview</p>
      </div>

      {/* ECG Monitor */}
      <ECGMonitor 
        heartRate={healthData.heartRate} 
        status={getHeartRateStatus(healthData.heartRate)} 
      />
      
      {/* Vital Stats */}
      <VitalStatsCards vitalStats={vitalStats} />
      
      {/* ECG Trend */}
      <ECGTrend data={ecgTrendData} trendStatus={ecgTrendStatus} />
      
      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
};

export default Home;
