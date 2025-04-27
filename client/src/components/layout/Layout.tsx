import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import ProfileMenu from "./ProfileMenu";
import { useLocation } from "wouter";
import flowscopeLogo from "../../assets/flowscope.png";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [location, setLocation] = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleTabChange = (path: string) => {
    setLocation(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* App Header */}
      <header className="bg-card shadow-sm">
        <div className="mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={flowscopeLogo} 
              alt="FlowScope Logo" 
              className="h-10 mr-2" 
            />
            <h1 className="text-xl font-semibold">FlowScope</h1>
          </div>
          
          <ProfileMenu 
            isOpen={isProfileMenuOpen} 
            onToggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)} 
            onClose={() => setIsProfileMenuOpen(false)}
          />
        </div>
      </header>

      {/* App Content Container */}
      <main className="flex-1 overflow-y-auto">
        <div className="pb-16">
          {children}
        </div>
      </main>

      {/* App Navigation */}
      <Navbar currentPath={location} onTabChange={handleTabChange} />
    </div>
  );
};

export default Layout;
