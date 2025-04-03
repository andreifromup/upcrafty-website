import React from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  return (
    <div className="px-[54px] pt-[40px] pb-0 flex justify-between items-center w-full">
      {/* Logo with dropdown arrow - 81x81px container */}
      <div className="flex items-center">
        <Logo size="header" includeDropdown={true} />
      </div>
      
      {/* Contact Button - Pixel perfect specs with hover effect */}
      <Button 
        className="bg-[#FF6600] hover:bg-white text-white hover:text-[#FF6600] rounded-full uppercase font-normal
        tracking-[2px] text-[14px] leading-[20px] h-[34px] w-[107px] p-0 transition-colors duration-300"
        style={{ width: "107px", height: "34px" }}
        onClick={() => console.log("Contact button clicked")}
      >
        Contact
      </Button>
    </div>
  );
};

export default Navbar;
