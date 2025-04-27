import { Home, History, HeartPulse } from "lucide-react";

interface NavbarProps {
  currentPath: string;
  onTabChange: (path: string) => void;
}

const Navbar = ({ currentPath, onTabChange }: NavbarProps) => {
  return (
    <nav className="bg-white shadow-md fixed bottom-0 inset-x-0 z-10">
      <div className="flex justify-around">
        <button 
          onClick={() => onTabChange("/")}
          className={`flex flex-col items-center py-2 px-5 border-t-2 ${
            currentPath === "/" 
              ? "border-primary text-primary" 
              : "border-transparent text-gray-500"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button
          onClick={() => onTabChange("/history")}
          className={`flex flex-col items-center py-2 px-5 border-t-2 ${
            currentPath === "/history" 
              ? "border-primary text-primary" 
              : "border-transparent text-gray-500"
          }`}
        >
          <History className="h-5 w-5" />
          <span className="text-xs mt-1">History</span>
        </button>
        
        <button
          onClick={() => onTabChange("/health-risk")}
          className={`flex flex-col items-center py-2 px-5 border-t-2 ${
            currentPath === "/health-risk" 
              ? "border-primary text-primary" 
              : "border-transparent text-gray-500"
          }`}
        >
          <HeartPulse className="h-5 w-5" />
          <span className="text-xs mt-1">Health Risk</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
