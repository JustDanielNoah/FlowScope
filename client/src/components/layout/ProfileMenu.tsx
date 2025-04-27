import { useEffect, useRef } from "react";
import { User } from "@shared/schema";
import { Link } from "wouter";

interface ProfileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const ProfileMenu = ({ isOpen, onToggle, onClose }: ProfileMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Mock user - in a real app, would come from authentication
  const user = {
    firstName: "John",
    lastName: "Doe"
  };
  
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <div className="relative" ref={menuRef}>
      <button 
        className="flex items-center focus:outline-none" 
        onClick={onToggle}
      >
        <span className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
          {initials}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <Link href="/profile" onClick={onClose}>
            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
          </Link>
          <Link href="/settings" onClick={onClose}>
            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
          </Link>
          <Link href="/about" onClick={onClose}>
            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About Us</a>
          </Link>
          <Link href="/help" onClick={onClose}>
            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help</a>
          </Link>
          <Link href="/legal" onClick={onClose}>
            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Legal</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
