import { useState, useEffect } from "react";
import { HealthStatus, AnalysisItem } from "@/lib/types";
import HealthRiskSummary from "@/components/risk/HealthRiskSummary";
import DetailedAnalysis from "@/components/risk/DetailedAnalysis";
import EmergencyAction from "@/components/risk/EmergencyAction";
import { useToast } from "@/hooks/use-toast";

// Mock analysis data - in a real app, this would come from the API
const mockAnalysisItems: AnalysisItem[] = [
  {
    title: "ECG Analysis",
    icon: "heart-pulse",
    risk: 15,
    description: "Your ECG shows normal sinus rhythm with no significant abnormalities. Heart rate variability is within healthy parameters.",
    status: HealthStatus.HEALTHY
  },
  {
    title: "Blood Pressure",
    icon: "heart",
    risk: 40,
    description: "Your blood pressure occasionally rises above ideal levels. Consider monitoring salt intake and stress management techniques.",
    status: HealthStatus.CONCERNING
  },
  {
    title: "Blood Oxygen",
    icon: "droplet",
    risk: 10,
    description: "Your SpO2 levels consistently stay above 95%, indicating excellent oxygen saturation in your blood.",
    status: HealthStatus.HEALTHY
  },
  {
    title: "Respiratory Rate",
    icon: "lungs",
    risk: 20,
    description: "Your breathing rate is within normal range at 12-20 breaths per minute, indicating healthy lung function.",
    status: HealthStatus.HEALTHY
  }
];

const HealthRisk = () => {
  const [overallStatus, setOverallStatus] = useState<HealthStatus>(HealthStatus.HEALTHY);
  const [recommendation, setRecommendation] = useState<string>("");
  const [analysisItems, setAnalysisItems] = useState<AnalysisItem[]>([]);
  const [isEmergency, setIsEmergency] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would fetch real data from the API
    const loadAnalysisData = async () => {
      try {
        // For now, use mock data
        setAnalysisItems(mockAnalysisItems);
        
        // Determine overall status based on individual items
        const hasCritical = mockAnalysisItems.some(item => item.status === HealthStatus.CRITICAL);
        const hasConcerning = mockAnalysisItems.some(item => item.status === HealthStatus.CONCERNING);
        
        if (hasCritical) {
          setOverallStatus(HealthStatus.CRITICAL);
          setRecommendation("Your heart parameters show critical values. Please seek immediate medical attention.");
          setIsEmergency(true);
        } else if (hasConcerning) {
          setOverallStatus(HealthStatus.CONCERNING);
          setRecommendation("Some of your heart parameters need attention. Consider consulting with your healthcare provider and monitor these values closely.");
          setIsEmergency(false);
        } else {
          setOverallStatus(HealthStatus.HEALTHY);
          setRecommendation("Your heart is functioning well. To maintain optimal health, consider regular exercise and balanced nutrition. No immediate actions needed.");
          setIsEmergency(false);
        }
      } catch (error) {
        toast({
          title: "Error Loading Analysis",
          description: "Unable to load health risk analysis. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAnalysisData();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* Emergency Action */}
      <EmergencyAction 
        isVisible={isEmergency}
        message="Our AI has detected a potentially serious health issue that requires immediate attention. Please contact emergency services or your healthcare provider immediately."
      />
      
      {/* Health Risk Summary */}
      <HealthRiskSummary 
        status={overallStatus}
        recommendation={recommendation}
      />
      
      {/* Detailed Analysis */}
      <DetailedAnalysis items={analysisItems} />
    </div>
  );
};

export default HealthRisk;
