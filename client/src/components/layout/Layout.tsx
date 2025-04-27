import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import ProfileMenu from "./ProfileMenu";
import { useLocation } from "wouter";

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* App Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 text-primary mr-2" strokeWidth="2">
              <path d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
            <h1 className="text-xl font-semibold text-gray-800">FlowScope</h1>
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
