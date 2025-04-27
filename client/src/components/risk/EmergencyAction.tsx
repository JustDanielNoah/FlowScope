import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlarmClock, Phone } from "lucide-react";

interface EmergencyActionProps {
  isVisible: boolean;
  message: string;
}

const EmergencyAction = ({ isVisible, message }: EmergencyActionProps) => {
  if (!isVisible) return null;
  
  return (
    <div className="mb-6">
      <Card className="bg-red-50 border border-red-200 rounded-xl">
        <CardContent className="p-4">
          <div className="flex items-center mb-3">
            <AlarmClock className="h-6 w-6 text-red-600 mr-2" />
            <h3 className="font-semibold text-red-700">Critical Health Alert</h3>
          </div>
          <p className="text-red-700 mb-4">
            {message}
          </p>
          <Button 
            variant="destructive"
            className="w-full py-3"
            onClick={() => window.location.href = "tel:911"}
          >
            <Phone className="mr-2 h-5 w-5" />
            Call Emergency Services (911)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyAction;
