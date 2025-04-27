import { Card, CardContent } from "@/components/ui/card";
import { HealthStatus } from "@/lib/types";
import { getHealthStatusColor } from "@/lib/health-status";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart
} from 'recharts';

interface ECGTrendProps {
  data: { date: string; value: number }[];
  trendStatus: HealthStatus;
}

const ECGTrend = ({ data, trendStatus }: ECGTrendProps) => {
  const statusColors = getHealthStatusColor(trendStatus);
  
  let statusLabel: string;
  switch (trendStatus) {
    case HealthStatus.HEALTHY:
      statusLabel = "Healthy Trend";
      break;
    case HealthStatus.CONCERNING:
      statusLabel = "Concerning Trend";
      break;
    case HealthStatus.CRITICAL:
      statusLabel = "Critical Trend";
      break;
    default:
      statusLabel = "Unknown Trend";
  }
  
  const strokeColor = 
    trendStatus === HealthStatus.HEALTHY ? "#10b981" : 
    trendStatus === HealthStatus.CONCERNING ? "#f59e0b" : "#ef4444";
  
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-700">ECG Trend - Last 4 Weeks</h3>
          <div className={`text-xs ${statusColors.text} ${statusColors.bgLight} px-2 py-1 rounded-full`}>
            {statusLabel}
          </div>
        </div>
        
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorECG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `Week ${value}`}
              />
              <YAxis hide />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={strokeColor} 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorECG)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ECGTrend;
