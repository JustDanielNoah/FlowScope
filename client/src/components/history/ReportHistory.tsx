import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, Share } from "lucide-react";
import { Report, HealthStatus, ECGDataPoint } from "@/lib/types";
import { getHealthStatusColor, getStatusLabel } from "@/lib/health-status";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

interface ReportHistoryProps {
  reports: Report[];
  onViewReport: (report: Report) => void;
}

const ReportHistory = ({ reports, onViewReport }: ReportHistoryProps) => {
  const { toast } = useToast();

  const generatePDFReport = (report: Report) => {
    try {
      const doc = new jsPDF();
      
      // Add header with logo
      doc.setFontSize(22);
      doc.setTextColor(13, 37, 88); // Navy blue (matches FlowScope logo)
      doc.text('FlowScope Health Report', 105, 20, { align: 'center' });
      
      // Add report title and date
      doc.setFontSize(16);
      doc.text(`${report.title}`, 105, 30, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date(report.date).toLocaleDateString()} at ${new Date(report.date).toLocaleTimeString()}`, 105, 35, { align: 'center' });
      
      // Add health status
      const statusColor = report.healthStatus === HealthStatus.HEALTHY 
        ? [46, 204, 113] 
        : report.healthStatus === HealthStatus.CONCERNING 
          ? [241, 196, 15]
          : [231, 76, 60];
      
      doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
      doc.roundedRect(20, 40, 170, 10, 1, 1, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text(`Health Status: ${getStatusLabel(report.healthStatus)}`, 105, 46, { align: 'center' });
      
      // Add summary
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.text('Summary:', 20, 60);
      doc.setFontSize(10);
      doc.text(report.summary, 20, 70, { maxWidth: 170 });
      
      let yPos = 90;
      
      // Add vital stats if available
      if (report.data?.vitalStats) {
        doc.setFontSize(14);
        doc.setTextColor(13, 37, 88);
        doc.text('Vital Statistics', 20, yPos);
        yPos += 10;
        
        const vitals = report.data.vitalStats;
        
        // Create vital stats table
        const vitalData = [
          ['Metric', 'Value', 'Normal Range'],
          ['Heart Rate', `${vitals.heartRate || 'N/A'} bpm`, '60-100 bpm'],
          ['Blood Oxygen', `${vitals.bloodOxygen || 'N/A'} %`, '95-100 %'],
          ['Blood Pressure', `${vitals.bloodPressureSystolic || 'N/A'}/${vitals.bloodPressureDiastolic || 'N/A'} mmHg`, '120/80 mmHg'],
          ['Respiratory Rate', `${vitals.respiratoryRate || 'N/A'} bpm`, '12-20 bpm'],
          ['Recovery Rate', `${vitals.recoveryRate || 'N/A'} min`, '2-3 min']
        ];
        
        // @ts-ignore
        doc.autoTable({
          startY: yPos,
          head: [vitalData[0]],
          body: vitalData.slice(1),
          theme: 'grid',
          headStyles: { fillColor: [13, 37, 88], textColor: [255, 255, 255] },
        });
        
        yPos = (doc as any).lastAutoTable.finalY + 15;
      }
      
      // Add ECG visualization if data is available
      if (report.data?.ecgData && report.data.ecgData.length > 0) {
        const ecgData = report.data.ecgData;
        
        doc.setFontSize(14);
        doc.setTextColor(13, 37, 88);
        doc.text('ECG Data Visualization', 20, yPos);
        yPos += 10;
        
        // Draw ECG line
        doc.setDrawColor(231, 76, 60); // Red color for ECG line
        doc.setLineWidth(0.5);
        
        const startX = 20;
        const endX = 190;
        const baseline = yPos + 15;
        const scale = 15; // Vertical scale factor
        const pointSpacing = (endX - startX) / Math.min(50, ecgData.length);
        
        doc.line(startX, baseline, endX, baseline); // Draw baseline
        
        let x = startX;
        doc.setDrawColor(231, 76, 60);
        doc.setLineWidth(0.8);
        
        // Draw a simplified ECG line
        const sampleRate = Math.max(1, Math.floor(ecgData.length / 50));
        const sampledData = [];
        
        for (let i = 0; i < ecgData.length; i += sampleRate) {
          sampledData.push(ecgData[i]);
        }
        
        for (let i = 0; i < sampledData.length - 1; i++) {
          const point1 = sampledData[i];
          const point2 = sampledData[i + 1];
          
          doc.line(
            x,
            baseline - (point1.value * scale),
            x + pointSpacing,
            baseline - (point2.value * scale)
          );
          
          x += pointSpacing;
        }
        
        yPos += 40; // Space for the ECG graph
      }
      
      // Add AI analysis if available
      if (report.data?.analysis) {
        const analysis = report.data.analysis;
        
        doc.setFontSize(14);
        doc.setTextColor(13, 37, 88);
        doc.text('AI Health Analysis', 20, yPos);
        yPos += 10;
        
        // Insights
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text('Insights:', 20, yPos);
        yPos += 5;
        
        doc.setFontSize(10);
        doc.text(analysis.insights, 25, yPos, { maxWidth: 165 });
        yPos += 20; // Adjust based on text height
        
        // Recommendations
        if (analysis.recommendations && analysis.recommendations.length > 0) {
          doc.setFontSize(11);
          doc.text('Recommendations:', 20, yPos);
          yPos += 7;
          
          doc.setFontSize(10);
          analysis.recommendations.forEach((rec, index) => {
            doc.text(`${index + 1}. ${rec}`, 25, yPos, { maxWidth: 165 });
            yPos += 7;
          });
          
          yPos += 5;
        }
        
        // Risk areas
        if (analysis.riskAreas && analysis.riskAreas.length > 0) {
          doc.setFontSize(11);
          doc.text('Risk Assessment:', 20, yPos);
          yPos += 7;
          
          // Create risk areas table
          const riskData = [
            ['Area', 'Risk Level', 'Description'],
            ...analysis.riskAreas.map(area => [
              area.title,
              `${area.risk}/10`,
              area.description
            ])
          ];
          
          // @ts-ignore
          doc.autoTable({
            startY: yPos,
            head: [riskData[0]],
            body: riskData.slice(1),
            theme: 'grid',
            headStyles: { fillColor: [13, 37, 88], textColor: [255, 255, 255] },
            columnStyles: {
              0: { cellWidth: 40 },
              1: { cellWidth: 30 },
              2: { cellWidth: 100 }
            }
          });
          
          yPos = (doc as any).lastAutoTable.finalY + 10;
        }
      }
      
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('This report is generated by FlowScope for informational purposes only and is not a substitute for professional medical advice.', 105, 285, { align: 'center' });
      doc.text('Please consult with a healthcare professional for any medical concerns.', 105, 290, { align: 'center' });
      
      // Save the PDF
      doc.save(`FlowScope_Report_${report.id}.pdf`);
      return true;
    } catch (error) {
      console.error("Failed to generate report:", error);
      return false;
    }
  };

  const handleDownload = (report: Report) => {
    toast({
      title: "Generating PDF Report",
      description: `Preparing report "${report.title}" for download...`,
    });
    
    // Simulating data processing delay
    setTimeout(() => {
      const success = generatePDFReport(report);
      
      if (success) {
        toast({
          title: "Report Downloaded",
          description: `Report "${report.title}" has been successfully downloaded.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Download Failed",
          description: "There was an error generating the PDF report.",
          variant: "destructive",
        });
      }
    }, 800);
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
        <p className="text-muted-foreground">No reports available. Generate your first report above.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-medium mb-3">Recent Reports</h3>
      
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
          <h4 className="font-medium">{report.title}</h4>
          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
            {new Date(report.date).toLocaleDateString()}
          </span>
        </div>
        <div className={`border-l-4 ${statusColors.border} pl-3 mb-3`}>
          <p className="text-sm text-muted-foreground">{report.summary}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onView} 
            className="text-xs"
          >
            <Eye className="h-3.5 w-3.5 mr-1" /> View
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onDownload}
            className="text-xs"
          >
            <Download className="h-3.5 w-3.5 mr-1" /> Download PDF
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onShare}
            className="text-xs"
          >
            <Share className="h-3.5 w-3.5 mr-1" /> Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportHistory;
