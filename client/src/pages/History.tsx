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
    date: "2023-05-15T12:00:00Z",
    data: {
      ecgData: Array.from({ length: 100 }, (_, i) => ({
        timestamp: Date.now() - (i * 10),
        value: Math.sin(i * 0.2) * 0.5 + Math.sin(i * 0.5) * 0.2 + Math.random() * 0.1
      })),
      vitalStats: {
        heartRate: 68,
        bloodOxygen: 98,
        bloodPressureSystolic: 120,
        bloodPressureDiastolic: 78,
        respiratoryRate: 14,
        recoveryRate: 2.2
      },
      analysis: {
        insights: "Your heart health indicators are stable and within normal parameters. ECG analysis shows regular patterns consistent with a healthy heart rhythm.",
        recommendations: [
          "Continue with regular cardiovascular exercise, aiming for 150 minutes weekly",
          "Maintain your current sleep hygiene practices which appear to be effective",
          "Regular monitoring is recommended to ensure continued heart health"
        ]
      }
    }
  },
  {
    id: 2,
    title: "Weekly ECG Analysis",
    summary: "Minor irregularities detected in heart rhythm. Recommended to monitor closely and maintain hydration.",
    healthStatus: HealthStatus.CONCERNING,
    date: "2023-05-07T12:00:00Z",
    data: {
      ecgData: Array.from({ length: 100 }, (_, i) => ({
        timestamp: Date.now() - (i * 10),
        value: Math.sin(i * 0.2) * 0.5 + Math.sin(i * 0.4) * 0.3 + (i % 20 === 0 ? 0.8 : 0) + Math.random() * 0.1
      })),
      vitalStats: {
        heartRate: 88,
        bloodOxygen: 96,
        bloodPressureSystolic: 135,
        bloodPressureDiastolic: 85,
        respiratoryRate: 18,
        recoveryRate: 3.5
      },
      analysis: {
        insights: "Some minor irregularities have been identified in your heart rhythm. While not immediately concerning, these patterns warrant continued monitoring. Slight elevation in blood pressure readings observed.",
        recommendations: [
          "Increase daily water intake to ensure proper hydration",
          "Consider reducing sodium intake to help manage blood pressure",
          "Schedule a follow-up analysis in 2 weeks to monitor any changes",
          "If experiencing any symptoms like palpitations or dizziness, consult a healthcare provider"
        ],
        riskAreas: [
          {
            title: "Hydration",
            icon: "droplet",
            risk: 4,
            description: "Mild dehydration may be contributing to cardiovascular strain",
            status: HealthStatus.CONCERNING
          },
          {
            title: "Heart Rate Variability",
            icon: "activity",
            risk: 5,
            description: "Moderate irregularities in heart rhythm patterns during rest periods",
            status: HealthStatus.CONCERNING
          }
        ]
      }
    }
  },
  {
    id: 3,
    title: "Monthly Health Summary",
    summary: "All vitals within normal range. Blood pressure has improved from previous month.",
    healthStatus: HealthStatus.HEALTHY,
    date: "2023-04-15T12:00:00Z",
    data: {
      ecgData: Array.from({ length: 100 }, (_, i) => ({
        timestamp: Date.now() - (i * 10),
        value: Math.sin(i * 0.2) * 0.5 + Math.sin(i * 0.5) * 0.2 + Math.random() * 0.1
      })),
      vitalStats: {
        heartRate: 72,
        bloodOxygen: 99,
        bloodPressureSystolic: 118,
        bloodPressureDiastolic: 75,
        respiratoryRate: 15,
        recoveryRate: 2.0
      },
      analysis: {
        insights: "Excellent overall cardiac health indicators. Your blood pressure has improved significantly from last month, likely due to lifestyle modifications. ECG patterns show normal sinus rhythm with good recovery trends.",
        recommendations: [
          "Continue with current exercise routine which is showing positive results",
          "Maintain the dietary changes that are helping with blood pressure control",
          "Consider incorporating more stress management techniques to further improve heart health"
        ]
      }
    }
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
      date: new Date().toISOString(),
      data: {
        ecgData: Array.from({ length: 100 }, (_, i) => ({
          timestamp: Date.now() - (i * 10),
          value: Math.sin(i * 0.2) * 0.5 + Math.sin(i * 0.5) * 0.2 + Math.random() * 0.1
        })),
        vitalStats: {
          heartRate: 70,
          bloodOxygen: 97,
          bloodPressureSystolic: 122,
          bloodPressureDiastolic: 80,
          respiratoryRate: 16,
          recoveryRate: 2.5
        },
        analysis: {
          insights: "Your heart health indicators remain stable and within normal parameters. ECG analysis confirms regular patterns consistent with a healthy heart rhythm.",
          recommendations: [
            "Maintain your current exercise routine of moderate intensity activities",
            "Continue with balanced nutrition emphasizing heart-healthy foods",
            "Regular monitoring recommended to ensure continued heart health"
          ]
        }
      }
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
