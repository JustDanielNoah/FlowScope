import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileBarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateHealthReport } from "@/lib/ai-service";

interface ReportGeneratorProps {
  userId: number;
  onReportGenerated: () => void;
}

const ReportGenerator = ({ userId, onReportGenerated }: ReportGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      await generateHealthReport(userId, "Monthly Health Summary");
      toast({
        title: "Report Generated",
        description: "Your health report has been successfully generated.",
        variant: "default",
      });
      onReportGenerated();
    } catch (error) {
      toast({
        title: "Failed to Generate Report",
        description: "An error occurred while generating your health report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h3 className="font-medium text-gray-800 mb-3">Generate Health Report</h3>
        <p className="text-sm text-gray-600 mb-4">
          Create a comprehensive analysis based on your last 4 weeks of health data.
        </p>
        <Button 
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="w-full"
        >
          <FileBarChart className="mr-2 h-5 w-5" />
          {isGenerating ? "Generating Report..." : "Generate New Report"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReportGenerator;
