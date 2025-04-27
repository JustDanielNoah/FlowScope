import { Card, CardContent } from "@/components/ui/card";
import { HeartPulse, Zap, Shield, Brain } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">About FlowScope</h2>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-gray-600 mb-4">
            FlowScope is dedicated to making heart health monitoring accessible, understandable, and actionable. 
            Our mission is to empower individuals to take control of their cardiovascular health through 
            continuous monitoring, early detection, and personalized insights.
          </p>
          <p className="text-gray-600">
            By leveraging data from wearable devices and applying advanced AI analysis, we help people 
            understand their heart health in real-time and take proactive steps to prevent serious conditions.
          </p>
        </CardContent>
      </Card>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-4">How FlowScope Helps</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <HeartPulse className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Health</h4>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Early heart disease detection</li>
              <li>• Real-time monitoring of vital signs</li>
              <li>• Clear explanation of health metrics</li>
              <li>• Personalized health insights</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Economy</h4>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Reduced hospital costs</li>
              <li>• Better worker productivity</li>
              <li>• Prevention over treatment</li>
              <li>• Fewer emergency visits</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Brain className="h-5 w-5 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Mental Health</h4>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Lower anxiety with continuous monitoring</li>
              <li>• Peace of mind from early detection</li>
              <li>• Preventative mindset and healthy habits</li>
              <li>• Empowerment through knowledge</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <Shield className="h-5 w-5 text-amber-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Security</h4>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• End-to-end encrypted health data</li>
              <li>• Minimal access requirements</li>
              <li>• No third-party data sharing</li>
              <li>• Data deletion after 4 weeks</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Technology</h3>
          <p className="text-gray-600 mb-4">
            FlowScope uses advanced artificial intelligence to analyze ECG data, Blood-Oxygen Saturation (SpO2), 
            Heart Rate, Blood Pressure, and Respiratory Rate from your connected health devices. 
          </p>
          <p className="text-gray-600">
            Our proprietary algorithms can detect patterns and anomalies that might indicate early 
            signs of heart conditions like Atrial Fibrillation and other cardiac abnormalities. 
            All analysis is done in real-time, giving you immediate feedback on your heart health.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;
