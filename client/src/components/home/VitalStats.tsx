import { Card, CardContent } from "@/components/ui/card";
import { HealthStatus, VitalStats } from "@/lib/types";
import { getHealthStatusColor, getStatusLabel } from "@/lib/health-status";
import { DropletIcon, HeartIcon, Stethoscope, ActivityIcon } from "lucide-react";

interface VitalStatsCardsProps {
  vitalStats: VitalStats;
}

const VitalStatsCards = ({ vitalStats }: VitalStatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {/* Blood Oxygen Saturation */}
      <VitalStatCard 
        title="Blood Oxygen"
        value={vitalStats.bloodOxygen.value}
        unit={vitalStats.bloodOxygen.unit}
        status={vitalStats.bloodOxygen.status}
        icon={<DropletIcon className="text-blue-500" />}
      />
      
      {/* Blood Pressure */}
      <VitalStatCard 
        title="Blood Pressure"
        value={vitalStats.bloodPressure.value}
        unit={vitalStats.bloodPressure.unit}
        status={vitalStats.bloodPressure.status}
        icon={<HeartIcon className="text-primary-500" />}
      />
      
      {/* Respiratory Rate */}
      <VitalStatCard 
        title="Respiratory Rate"
        value={vitalStats.respiratoryRate.value}
        unit={vitalStats.respiratoryRate.unit}
        status={vitalStats.respiratoryRate.status}
        icon={<Stethoscope className="text-green-600" />}
      />
      
      {/* Recovery Rate */}
      <VitalStatCard 
        title="Recovery Rate"
        value={vitalStats.recoveryRate.value}
        unit={vitalStats.recoveryRate.unit}
        status={vitalStats.recoveryRate.status}
        icon={<ActivityIcon className="text-amber-500" />}
      />
    </div>
  );
};

interface VitalStatCardProps {
  title: string;
  value: number | string;
  unit: string;
  status: HealthStatus;
  icon: React.ReactNode;
}

const VitalStatCard = ({ title, value, unit, status, icon }: VitalStatCardProps) => {
  const statusColors = getHealthStatusColor(status);
  const statusLabel = getStatusLabel(status);
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <div className="mr-2">
            {icon}
          </div>
          <h4 className="text-sm font-medium text-gray-700">{title}</h4>
        </div>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-800">{value}</span>
          <span className="text-gray-500 ml-1">{unit}</span>
        </div>
        <div className="mt-1">
          <span className={`text-xs ${statusColors.text} ${statusColors.bgLight} px-2 py-1 rounded-full`}>{statusLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalStatsCards;
