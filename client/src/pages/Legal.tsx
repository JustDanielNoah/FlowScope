import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const Legal = () => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Legal Information</h2>
      
      <Tabs defaultValue="privacy">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="terms">Terms of Use</TabsTrigger>
          <TabsTrigger value="disclaimer">Medical Disclaimer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="privacy" className="pt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Privacy Policy</h3>
              <div className="prose max-w-none text-gray-600 text-sm">
                <p className="mb-4">
                  <strong>Last Updated: June 1, 2023</strong>
                </p>
                
                <h4 className="text-lg font-medium mt-6 mb-2">1. Data Collection</h4>
                <p className="mb-4">
                  FlowScope collects health data from your connected devices through your phone's health app. 
                  This includes ECG readings, heart rate, blood oxygen levels, blood pressure, and respiratory rate. 
                  We also collect basic profile information you provide during setup.
                </p>
                
                <h4 className="text-lg font-medium mt-6 mb-2">2. Data Usage</h4>
                <p className="mb-4">
                  Your health data is used to provide you with analysis, insights, and alerts about your heart health. 
                  We never use your personal data for advertising purposes or sell it to third parties.
                </p>
                
                <h4 className="text-lg font-medium mt-6 mb-2">3. Data Storage</h4>
                <p className="mb-4">
                  By default, your health data is stored for 4 weeks and then automatically deleted. 
                  You can adjust this retention period in Settings. All data is encrypted end-to-end 
                  and stored securely on our servers.
                </p>
                
                <h4 className="text-lg font-medium mt-6 mb-2">4. Data Sharing</h4>
                <p className="mb-4">
                  We don't share your data with third parties except when:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>You explicitly request to share your health reports</li>
                  <li>Required by law or legal process</li>
                  <li>Necessary to protect our rights or the safety of users</li>
                </ul>
                
                <h4 className="text-lg font-medium mt-6 mb-2">5. Your Rights</h4>
                <p className="mb-4">
                  You have the right to access, correct, or delete your data at any time. 
                  You can export your data from Settings or request account deletion.
                </p>
                
                <h4 className="text-lg font-medium mt-6 mb-2">6. Contact Us</h4>
                <p>
                  If you have questions about our privacy practices, please contact us at privacy@flowscope.com.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="terms" className="pt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Terms of Use</h3>
              <div className="prose max-w-none text-gray-600 text-sm">
                <p className="mb-4">
                  <strong>Last Updated: June 1, 2023</strong>
                </p>
                
                <h4 className="text-lg font-medium mt-6 mb-2">1. Acceptance of Terms</h4>
                <p className="mb-4">
                  By using FlowScope, you agree to these Terms of Use. If you do not agree, please do not use the app.
                </p>
                
                <h4 className="text-lg font-medium mt-6 mb-2">2. App License</h4>
                <p className="mb-4">
                  FlowScope grants you a limited, non-exclusive, non-transferable license to use the app 
                  for your personal, non-commercial purposes.
                </p>
                
                <h4 className="text-lg font-medium mt-6 mb-2">3. Prohibited Uses</h4>
                <p className="mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Use the app for any illegal purpose</li>
                  <li>Attempt to reverse engineer or modify the app</li>
                  <li>Upload false or misleading data</li>
                  <li>Interfere with the operation of the app</li>
                </ul>
                
                <h4 className="text-lg font-medium mt-6 mb-2">4. Intellectual Property</h4>
                <p className="mb-4">
                  All content and code in FlowScope is owned by us and is protected by copyright, 
                  trademark, and other intellectual property laws.
                </p>
                
                <h4 className="text-lg font-medium mt-6 mb-2">5. Termination</h4>
                <p className="mb-4">
                  We reserve the right to terminate or suspend your access to FlowScope at any time, 
                  without notice, for conduct that we believe violates these Terms.
                </p>
                
                <h4 className="text-lg font-medium mt-6 mb-2">6. Changes to Terms</h4>
                <p>
                  We may update these Terms from time to time. Continued use of FlowScope after changes 
                  constitutes acceptance of the new Terms.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="disclaimer" className="pt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Medical Disclaimer</h3>
              <div className="prose max-w-none text-gray-600 text-sm">
                <p className="mb-4">
                  <strong>Last Updated: June 1, 2023</strong>
                </p>
                
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                  <p className="font-medium text-red-700">
                    FlowScope is not a medical device and is not intended to diagnose, treat, cure, or prevent any disease.
                  </p>
                </div>
                
                <h4 className="text-lg font-medium mt-6 mb-2">1. Not a Substitute for Medical Care</h4>
                <p className="mb-4">
                  FlowScope is designed to help you monitor your heart health and provide insights, 
                  but it is not a substitute for professional medical advice, diagnosis, or treatment. 
                  Always seek the advice of your physician or other qualified health provider with any 
                  questions you may have regarding a medical condition.
                </p>
                
                <h4 className="text-lg font-medium mt-6 mb-2">2. No Guarantee of Accuracy</h4>
                <p className="mb-4">
                  While we strive to provide accurate information and analysis, we cannot guarantee 
                  the accuracy of all readings or interpretations. The accuracy of the data depends on 
                  your wearable device, proper usage, and individual physiological factors.
                </p>
                
                <h4 className="text-lg font-medium mt-6 mb-2">3. Emergency Situations</h4>
                <p className="mb-4">
                  If you believe you are experiencing a medical emergency, call your doctor or 911 immediately. 
                  Do not rely solely on FlowScope's alerts or recommendations in emergency situations.
                </p>
                
                <h4 className="text-lg font-medium mt-6 mb-2">4. Individual Results May Vary</h4>
                <p className="mb-4">
                  Health outcomes and interpretations provided by FlowScope may vary from person to person 
                  and are not guaranteed. Each individual's health status is unique and should be evaluated 
                  by healthcare professionals.
                </p>
                
                <h4 className="text-lg font-medium mt-6 mb-2">5. Consultation with Healthcare Providers</h4>
                <p>
                  Always discuss the information and insights provided by FlowScope with your healthcare 
                  provider before making any medical decisions or changes to your health routine.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Legal;
