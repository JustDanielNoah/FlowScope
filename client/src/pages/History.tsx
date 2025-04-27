import { useState, useEffect } from "react";
import { Report, HealthStatus } from "@/lib/types";
import ReportGenerator from "@/components/history/ReportGenerator";
import ReportHistory from "@/components/history/ReportHistory";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

// Mock user ID - in a real app, this would come from authentication
const mockUserId = 1;

// Mock reports - in a real app, this would come from the API
const mockReports: Report[] = [
  {
    id: 1,
    title: "Monthly Health Summary",
    summary: "Your heart health indicators remain in the healthy range. ECG patterns show normal sinus rhythm.",
    healthStatus: HealthStatus.HEALTHY,
    date: "2023-05-15T12:00:00Z"
  },
  {
    id: 2,
    title: "Weekly ECG Analysis",
    summary: "Minor irregularities detected in heart rhythm. Recommended to monitor closely and maintain hydration.",
    healthStatus: HealthStatus.CONCERNING,
    date: "2023-05-07T12:00:00Z"
  },
  {
    id: 3,
    title: "Monthly Health Summary",
    summary: "All vitals within normal range. Blood pressure has improved from previous month.",
    healthStatus: HealthStatus.HEALTHY,
    date: "2023-04-15T12:00:00Z"
  }
];

const History = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would fetch real data from the API
    const fetchReports = async () => {
      try {
        // For now, use mock data
        setReports(mockReports);
      } catch (error) {
        toast({
          title: "Error Loading Reports",
          description: "Unable to load your health reports. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReports();
  }, [toast]);

  const handleReportGenerated = async () => {
    setIsLoading(true);
    // In a real app, this would refresh the reports from the API
    // For now, we'll just simulate adding a new report
    
    const newReport: Report = {
      id: Date.now(),
      title: "Monthly Health Summary",
      summary: "Your latest health data analysis shows normal patterns with good recovery trends.",
      healthStatus: HealthStatus.HEALTHY,
      date: new Date().toISOString()
    };
    
    setReports([newReport, ...reports]);
    setIsLoading(false);
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
  };

  return (
    <div className="px-4 py-6">
      {/* Report Generator */}
      <ReportGenerator 
        userId={mockUserId}
        onReportGenerated={handleReportGenerated}
      />
      
      {/* Report History */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <ReportHistory 
          reports={reports}
          onViewReport={handleViewReport}
        />
      )}
      
      {/* Report Detail Dialog */}
      <Dialog open={selectedReport !== null} onOpenChange={(open) => !open && setSelectedReport(null)}>
        {selectedReport && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedReport.title}</DialogTitle>
              <DialogDescription className="text-right text-sm text-gray-500">
                {new Date(selectedReport.date).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <h4 className="font-medium mb-2">Summary</h4>
              <p className="text-gray-700 mb-4">{selectedReport.summary}</p>
              
              <h4 className="font-medium mb-2">Health Status</h4>
              <div className={`text-sm ${
                selectedReport.healthStatus === HealthStatus.HEALTHY 
                  ? "text-green-600 bg-green-50" 
                  : selectedReport.healthStatus === HealthStatus.CONCERNING
                    ? "text-amber-600 bg-amber-50"
                    : "text-red-600 bg-red-50"
              } px-3 py-1 rounded-full inline-block`}>
                {selectedReport.healthStatus === HealthStatus.HEALTHY 
                  ? "Healthy" 
                  : selectedReport.healthStatus === HealthStatus.CONCERNING
                    ? "Concerning"
                    : "Critical"}
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <p>This report is based on health data collected over the last 4 weeks.</p>
                <p className="mt-2">Consult with your healthcare provider for professional medical advice.</p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default History;
