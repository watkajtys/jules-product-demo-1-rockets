import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center h-[50vh]">
      <div className="bg-surface-container-low p-6 rounded-full block mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
         <span className="material-symbols-outlined text-[48px] text-primary">construction</span>
      </div>
      <h2 className="text-2xl font-bold mb-4 uppercase text-on-surface tracking-widest">Account Profile</h2>
      <p className="text-on-surface-variant font-mono tracking-widest">
        MODULE UNDER CONSTRUCTION.
      </p>
      <button 
        onClick={() => navigate("/")}
        className="mt-8 text-xs font-bold text-primary hover:text-primary-fixed uppercase tracking-widest underline underline-offset-4 cursor-pointer"
      >
         RETURN TO CATALOG
      </button>
    </div>
  );
}
