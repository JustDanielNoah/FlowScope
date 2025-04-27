import { Card, CardContent } from "@/components/ui/card";
import { AnalysisItem, HealthStatus } from "@/lib/types";
import { getHealthStatusColor } from "@/lib/health-status";
import { 
  HeartPulse, 
  Heart, 
  Droplet, 
  Stethoscope 
} from "lucide-react";

interface DetailedAnalysisProps {
  items: AnalysisItem[];
}

const DetailedAnalysis = ({ items }: DetailedAnalysisProps) => {
  return (
    <div>
      <h3 className="font-medium text-gray-800 mb-3">Detailed Analysis</h3>
      
      <div className="space-y-4 mb-6">
        {items.map((item, index) => (
          <AnalysisCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

interface AnalysisCardProps {
  item: AnalysisItem;
}

const AnalysisCard = ({ item }: AnalysisCardProps) => {
  const statusColors = getHealthStatusColor(item.status);
  
  const getIcon = () => {
    switch (item.icon) {
      case "heart-pulse": 
        return <HeartPulse className="text-blue-600" />;
      case "heart": 
        return <Heart className="text-green-600" />;
      case "droplet": 
        return <Droplet className="text-indigo-600" />;
      case "lungs": 
        return <Stethoscope className="text-purple-600" />;
      default:
        return <HeartPulse className="text-blue-600" />;
    }
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
            <div className="flex mb-3">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${statusColors.bg} rounded-full`} 
                  style={{ width: `${item.risk}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700 ml-2">{item.risk}%</span>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedAnalysis;
