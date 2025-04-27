import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, Share } from "lucide-react";
import { Report, HealthStatus } from "@/lib/types";
import { getHealthStatusColor } from "@/lib/health-status";
import { useToast } from "@/hooks/use-toast";

interface ReportHistoryProps {
  reports: Report[];
  onViewReport: (report: Report) => void;
}

const ReportHistory = ({ reports, onViewReport }: ReportHistoryProps) => {
  const { toast } = useToast();

  const handleDownload = (report: Report) => {
    toast({
      title: "Download Started",
      description: `Downloading report "${report.title}"`,
    });
    
    // In a real app, this would initiate an actual download
    // For now, we'll just simulate it
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `Report "${report.title}" has been downloaded.`,
        variant: "default",
      });
    }, 1500);
  };

  const handleShare = (report: Report) => {
    toast({
      title: "Share Feature",
      description: "This feature would allow sharing the report with healthcare providers.",
    });
  };

  if (reports.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reports available. Generate your first report above.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-medium text-gray-800 mb-3">Recent Reports</h3>
      
      {reports.map((report) => (
        <ReportCard 
          key={report.id}
          report={report}
          onView={() => onViewReport(report)}
          onDownload={() => handleDownload(report)}
          onShare={() => handleShare(report)}
        />
      ))}
    </div>
  );
};

interface ReportCardProps {
  report: Report;
  onView: () => void;
  onDownload: () => void;
  onShare: () => void;
}

const ReportCard = ({ report, onView, onDownload, onShare }: ReportCardProps) => {
  const statusColors = getHealthStatusColor(report.healthStatus);
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-gray-800">{report.title}</h4>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {new Date(report.date).toLocaleDateString()}
          </span>
        </div>
        <div className={`border-l-4 ${statusColors.border} pl-3 mb-3`}>
          <p className="text-sm text-gray-600">{report.summary}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onView} 
            className="text-xs bg-primary-50 text-primary-600"
          >
            <Eye className="h-3.5 w-3.5 mr-1" /> View
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onDownload}
            className="text-xs bg-gray-50 text-gray-600"
          >
            <Download className="h-3.5 w-3.5 mr-1" /> Download
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onShare}
            className="text-xs bg-gray-50 text-gray-600"
          >
            <Share className="h-3.5 w-3.5 mr-1" /> Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportHistory;
