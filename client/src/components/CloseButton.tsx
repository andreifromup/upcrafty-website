import React from 'react';
import { X } from 'lucide-react';

interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <div 
      className="absolute top-6 right-6 z-[100] cursor-pointer flex items-center justify-center w-10 h-10 bg-[#EDEAE7]/50 rounded-full hover:bg-[#EDEAE7]/80"
      onClick={(e) => {
        e.stopPropagation();
        console.log("Close button clicked");
        onClose();
      }}
    >
      <X 
        size={20} 
        strokeWidth={2} 
        className="text-black" 
      />
    </div>
  );
};

export default CloseButton;