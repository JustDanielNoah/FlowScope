import { HealthAnalysis, HealthStatus, UserHealthData } from "./types";
import { apiRequest } from "./queryClient";

interface AnalyzeRequestBody {
  userId: number;
  dataPoints: Partial<UserHealthData>[];
}

export const analyzeHealthData = async (
  userId: number,
  dataPoints: Partial<UserHealthData>[]
): Promise<HealthAnalysis> => {
  try {
    const response = await apiRequest("POST", "/api/analyze", {
      userId,
      dataPoints,
    });
    
    const data = await response.json();
    return {
      status: data.status as HealthStatus,
      recommendation: data.recommendation,
      timestamp: data.timestamp,
    };
  } catch (error) {
    console.error("Failed to analyze health data:", error);
    throw new Error("Failed to analyze health data. Please try again later.");
  }
};

export const generateHealthReport = async (
  userId: number,
  title: string
): Promise<any> => {
  try {
    // First, get the health data
    const dataResponse = await fetch(`/api/health-data/${userId}?limit=28`);
    if (!dataResponse.ok) {
      throw new Error("Failed to fetch health data");
    }
    
    const healthData = await dataResponse.json();
    
    // Then analyze the data
    const analysis = await analyzeHealthData(userId, healthData);
    
    // Create a report
    const reportResponse = await apiRequest("POST", "/api/reports", {
      userId,
      title,
      summary: analysis.recommendation,
      healthStatus: analysis.status,
      createdAt: new Date().toISOString(),
      reportData: {
        healthData,
        analysis,
      },
    });
    
    return await reportResponse.json();
  } catch (error) {
    console.error("Failed to generate report:", error);
    throw new Error("Failed to generate the health report. Please try again later.");
  }
};

export const simulateAIChatResponse = async (
  message: string
): Promise<string> => {
  // This simulates AI responses for demo purposes
  // In a real app, this would connect to an actual AI service
  
  const responses = [
    "I've analyzed your latest ECG data. Your heart rhythm appears normal with consistent intervals between beats.",
    "Your blood oxygen levels are excellent. Maintaining levels above 95% indicates healthy lung function.",
    "Based on your recent health data, I recommend maintaining your current exercise routine and continuing to monitor your blood pressure.",
    "Your heart rate variability is within healthy parameters, suggesting good autonomic nervous system balance.",
    "I notice your respiratory rate occasionally increases during the night. This could be related to sleep quality.",
    "Your recovery rate has improved by 15% over the last month, indicating better cardiovascular fitness.",
  ];
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return responses[Math.floor(Math.random() * responses.length)];
};
