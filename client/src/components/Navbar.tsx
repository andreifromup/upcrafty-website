import React from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  return (
    <div className="px-[54px] py-[54px] flex justify-between items-center w-full">
      {/* Logo with dropdown arrow - 81x81px container */}
      <div className="flex items-center">
        <Logo size="header" includeDropdown={true} />
      </div>
      
      {/* Contact Button - Pixel perfect specs */}
      <Button 
        className="bg-[#FF6600] hover:bg-[#FF6600]/90 text-white rounded-full uppercase font-normal
        tracking-[2px] text-[14px] leading-[20px] h-[34px] w-[107px] px-[13px] py-[7px]"
        onClick={() => console.log("Contact button clicked")}
      >
        Contact
      </Button>
    </div>
  );
};

export default Navbar;
