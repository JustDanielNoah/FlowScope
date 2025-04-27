import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { simulateAIChatResponse } from "@/lib/ai-service";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: "ai", 
      text: "Hello! I'm your FlowScope assistant. How can I help you understand your heart health data today?" 
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;
    
    // Add user message
    const userMessage = { sender: "user", text: inputValue };
    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    try {
      // Get AI response
      const response = await simulateAIChatResponse(inputValue);
      setMessages(prev => [...prev, { sender: "ai", text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        sender: "ai", 
        text: "I'm sorry, I couldn't process your request. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <div className="fixed bottom-20 right-4">
        <Button 
          onClick={() => setIsOpen(true)} 
          className="w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center text-white"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Ask AI Assistant</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-start mb-3">
                    <div className={`w-8 h-8 rounded-full ${
                      message.sender === "ai" ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-600"
                    } flex items-center justify-center mr-2`}>
                      {message.sender === "ai" ? <Bot className="h-5 w-5" /> : "JD"}
                    </div>
                    <div className={`${
                      message.sender === "ai" ? "bg-gray-100" : "bg-primary-100"
                    } rounded-lg p-3 max-w-[80%]`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mb-4">
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-2">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t">
              <div className="flex">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about your heart health..."
                  className="flex-1 rounded-r-none"
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="rounded-l-none"
                  disabled={isLoading || inputValue.trim() === ""}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
