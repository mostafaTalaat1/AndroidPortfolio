import React from "react";
import { motion } from "framer-motion";

interface LanguageFilterProps {
  languages: { id: number; name: string; slug: string; count?: number }[];
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
}

export default function LanguageFilter({ 
  languages, 
  selectedLanguage, 
  onSelectLanguage 
}: LanguageFilterProps) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="flex flex-wrap justify-center gap-3 mb-8 rtl:direction-rtl"
    >
      <button
        onClick={() => onSelectLanguage("all")}
        className={`px-5 py-2 rounded-full transition-all duration-300 ${
          selectedLanguage === "all" 
            ? "bg-[#00FF66]/20 text-[#00FF66]" 
            : "bg-white/5 text-gray-400 hover:bg-white/10"
        }`}
      >
        الكل
      </button>
      
      {languages.map((language) => (
        <button
          key={language.slug}
          onClick={() => onSelectLanguage(language.slug)}
          className={`px-5 py-2 rounded-full transition-all duration-300 ${
            selectedLanguage === language.slug 
              ? "bg-[#00FF66]/20 text-[#00FF66]" 
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
        >
          {language.name}
          {language.count && language.count > 0 && (
            <span className="ml-2 text-xs bg-white/10 px-2 py-0.5 rounded-full">
              {language.count}
            </span>
          )}
        </button>
      ))}
    </motion.div>
  );
}
