import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bell, Moon, Sun, Lock, Globe, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    alerts: true,
    weeklyReports: true,
    newFeatures: false,
  });
  
  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "en",
    dataRetention: 4, // weeks
  });
  
  const { toast } = useToast();
  
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleResetSettings = () => {
    setNotifications({
      alerts: true,
      weeklyReports: true,
      newFeatures: false,
    });
    
    setPreferences({
      theme: "light",
      language: "en",
      dataRetention: 4,
    });
    
    toast({
      title: "Settings Reset",
      description: "Your settings have been reset to default values.",
    });
  };
  
  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
      
      {/* Notifications */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="alerts" className="text-base">Health Alerts</Label>
              <p className="text-sm text-gray-500">Receive alerts for critical health readings</p>
            </div>
            <Switch 
              id="alerts" 
              checked={notifications.alerts}
              onCheckedChange={() => handleNotificationChange('alerts')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weeklyReports" className="text-base">Weekly Reports</Label>
              <p className="text-sm text-gray-500">Get a summary of your health data every week</p>
            </div>
            <Switch 
              id="weeklyReports" 
              checked={notifications.weeklyReports}
              onCheckedChange={() => handleNotificationChange('weeklyReports')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="newFeatures" className="text-base">New Features</Label>
              <p className="text-sm text-gray-500">Learn about new FlowScope features and updates</p>
            </div>
            <Switch 
              id="newFeatures" 
              checked={notifications.newFeatures}
              onCheckedChange={() => handleNotificationChange('newFeatures')}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Preferences */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base">Theme</Label>
            <div className="flex gap-2">
              <Button 
                variant={preferences.theme === "light" ? "default" : "outline"}
                className="w-1/2 justify-start"
                onClick={() => setPreferences({...preferences, theme: "light"})}
              >
                <Sun className="h-4 w-4 mr-2" /> Light
              </Button>
              
              <Button 
                variant={preferences.theme === "dark" ? "default" : "outline"}
                className="w-1/2 justify-start"
                onClick={() => setPreferences({...preferences, theme: "dark"})}
              >
                <Moon className="h-4 w-4 mr-2" /> Dark
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="language" className="text-base">Language</Label>
            <Select 
              value={preferences.language}
              onValueChange={(value) => setPreferences({...preferences, language: value})}
            >
              <SelectTrigger id="language" className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (US)</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-base">Data Retention</Label>
              <span className="text-sm font-medium">{preferences.dataRetention} weeks</span>
            </div>
            <Slider 
              value={[preferences.dataRetention]}
              min={1}
              max={8}
              step={1}
              onValueChange={(value) => setPreferences({...preferences, dataRetention: value[0]})}
            />
            <p className="text-sm text-gray-500">
              We'll keep your health data for {preferences.dataRetention} weeks. Data older than that will be automatically deleted.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Privacy & Security */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="h-5 w-5 mr-2" />
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Your health data is encrypted end-to-end and stored securely. We never share your data with third parties without your explicit consent.
          </p>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="justify-start">
              Export My Data
            </Button>
            <Button variant="outline" className="justify-start text-red-600 hover:bg-red-50 hover:text-red-700">
              Delete My Account
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Reset Settings */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleResetSettings}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
