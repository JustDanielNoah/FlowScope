import { Card, CardContent } from "@/components/ui/card";
import { HealthStatus } from "@/lib/types";
import { getHealthStatusColor } from "@/lib/health-status";
import { HeartPulse } from "lucide-react";

interface HealthRiskSummaryProps {
  status: HealthStatus;
  recommendation: string;
}

const HealthRiskSummary = ({ status, recommendation }: HealthRiskSummaryProps) => {
  const statusColors = getHealthStatusColor(status);
  
  let riskLevel: string;
  switch (status) {
    case HealthStatus.HEALTHY:
      riskLevel = "Low Risk";
      break;
    case HealthStatus.CONCERNING:
      riskLevel = "Moderate Risk";
      break;
    case HealthStatus.CRITICAL:
      riskLevel = "High Risk";
      break;
    default:
      riskLevel = "Unknown Risk";
  }
  
  return (
    <Card className="mb-6 shadow-md">
      <CardContent className="p-5">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-full ${statusColors.bgLight} flex items-center justify-center mr-4`}>
            <HeartPulse className={`h-8 w-8 ${statusColors.text}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Current Risk Level</h3>
            <div className="flex items-center">
              <span className={`${statusColors.text} font-medium`}>{riskLevel}</span>
              <span className={`inline-block w-2 h-2 ${statusColors.bg} rounded-full ml-2`}></span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">
          Based on your recent health data, our AI analysis indicates you have a {riskLevel.toLowerCase()} of cardiovascular events. 
          {status === HealthStatus.HEALTHY 
            ? " Continue maintaining your healthy habits."
            : status === HealthStatus.CONCERNING
              ? " Please monitor your health parameters closely."
              : " Please contact your healthcare provider as soon as possible."}
        </p>
        
        <div className={`${statusColors.bgLight} rounded-lg p-4 border ${statusColors.border}`}>
          <h4 className="font-medium text-gray-800 mb-2">AI Recommendation</h4>
          <p className="text-sm text-gray-700">
            {recommendation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthRiskSummary;
