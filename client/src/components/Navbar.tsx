import React from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  return (
    <div className="px-5 py-6 flex justify-between items-center">
      {/* Logo with company name */}
      <div className="flex items-center">
        <Logo />
        <span className="ml-2 text-xs uppercase tracking-wider hidden md:inline-block">Upcrafty</span>
        <svg className="ml-1 w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Contact Button */}
      <Button 
        className="bg-[#FF6600] hover:bg-[#FF6600]/90 text-white rounded-full uppercase text-xs md:text-sm font-normal tracking-wider px-5"
        onClick={() => console.log("Contact button clicked")}
      >
        Contact
      </Button>
    </div>
  );
};

export default Navbar;
