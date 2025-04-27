import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HealthStatus } from "@/lib/types";
import { getHealthStatusColor, getHeartRateStatus, getStatusLabel } from "@/lib/health-status";

interface ECGMonitorProps {
  heartRate: number;
  status: HealthStatus;
}

const ECGMonitor = ({ heartRate, status }: ECGMonitorProps) => {
  const [points, setPoints] = useState<string>("M0,60 L30,60 L45,20 L60,100 L75,60 L100,60 L115,60 L130,60 L135,40 L140,80 L145,60 L160,60 L175,60 L190,60 L205,20 L220,100 L235,60 L260,60 L275,60 L290,60 L295,40 L300,80 L305,60 L320,60 L335,60 L350,60 L365,20 L380,100 L395,60 L400,60");
  
  const statusColors = getHealthStatusColor(status);
  const statusLabel = getStatusLabel(status);
  
  useEffect(() => {
    // In a real app, this would listen to real ECG data
    const interval = setInterval(() => {
      // Generate a new random ECG pattern
      let newPoints = "M0,60 ";
      const segmentLength = 30;
      let x = 0;
      
      while (x < 400) {
        if (Math.random() > 0.85) {
          // Create a heart beat spike
          newPoints += `L${x},60 L${x + 5},20 L${x + 10},100 L${x + 15},60 `;
          x += 20;
        } else {
          // Normal line
          newPoints += `L${x},60 `;
          x += segmentLength;
        }
      }
      
      setPoints(newPoints);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-700">Live ECG Monitor</h3>
          <div className="flex items-center">
            <span className={`inline-block w-3 h-3 ${statusColors.bg} rounded-full mr-2 animate-pulse`}></span>
            <span className={`text-sm font-medium ${statusColors.text}`}>{statusLabel}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 h-44 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none">
              <path 
                className="ecg-line" 
                d={points}
                fill="none" 
                stroke={status === HealthStatus.HEALTHY ? "#10b981" : 
                       status === HealthStatus.CONCERNING ? "#f59e0b" : "#ef4444"} 
                strokeWidth="2" 
              />
            </svg>
          </div>
          
          <div className="absolute bottom-3 right-3 bg-white rounded-lg shadow px-3 py-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                 className={`w-5 h-5 mr-2 ${statusColors.text}`} strokeWidth="2">
              <path d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
            <span className="text-2xl font-semibold text-gray-800">{heartRate}</span>
            <span className="text-gray-500 ml-1">BPM</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ECGMonitor;
