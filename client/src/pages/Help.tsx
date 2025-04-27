import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Search } from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqs = [
    {
      question: "How does FlowScope analyze my heart health?",
      answer: "FlowScope uses AI to analyze ECG data, blood oxygen levels, heart rate, blood pressure, and respiratory rate from your connected health devices. Our algorithms can detect patterns and anomalies that might indicate early signs of heart conditions."
    },
    {
      question: "Which devices are compatible with FlowScope?",
      answer: "FlowScope is compatible with Apple Watch, Samsung Galaxy Watch, Fitbit, and other major smartwatches and health monitoring devices that can export health data to your phone's health app."
    },
    {
      question: "How accurate is FlowScope's analysis?",
      answer: "While FlowScope uses advanced AI technology to provide insights, it is not a medical device and should not replace professional medical advice. Our analysis has shown high correlation with clinical assessments, but always consult with healthcare providers for diagnosis and treatment."
    },
    {
      question: "How is my health data protected?",
      answer: "Your health data is encrypted end-to-end and stored securely. We only keep your data for 4 weeks (customizable in settings), and we never share your information with third parties without explicit consent. We comply with healthcare data protection regulations."
    },
    {
      question: "What should I do if FlowScope shows a critical alert?",
      answer: "If you receive a critical alert, take it seriously but don't panic. The app will guide you on next steps, which may include calling emergency services. If you're experiencing symptoms like chest pain, shortness of breath, or dizziness, seek medical attention immediately."
    },
    {
      question: "Can I share my health reports with my doctor?",
      answer: "Yes, FlowScope allows you to generate detailed reports that you can download, print, or share directly with your healthcare provider. These reports include your health data trends and AI-powered analysis in a format that's easy for medical professionals to review."
    }
  ];
  
  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;
  
  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Help Center</h2>
      
      {/* Search */}
      <div className="mb-6 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search for help..."
            className="pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* FAQs */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-gray-500">No results found for "{searchQuery}"</p>
              <p className="text-sm text-gray-400">Try searching with different keywords</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Still Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            If you couldn't find the answer to your question, our support team is here to help.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto py-6 flex flex-col">
              <span className="text-lg font-medium mb-1">Email Support</span>
              <span className="text-sm text-gray-500">support@flowscope.com</span>
              <span className="text-xs text-gray-400 mt-1">Response within 24 hours</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 flex flex-col">
              <span className="text-lg font-medium mb-1">Live Chat</span>
              <span className="text-sm text-gray-500">Available 9AM-5PM EST</span>
              <span className="text-xs text-gray-400 mt-1">Mon-Fri</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
