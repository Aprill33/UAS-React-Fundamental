/**
 * FILE: /src/Components/CustomDropdown.jsx
 * TUJUAN: Komponen UI yang dapat digunakan berulang (Reusable Component).
 * KETERHUBUNGAN: Terintegrasi dengan komponen induk dan menggunakan Context API atau Hooks untuk mengelola datanya.
 */

// [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
// [DI LUAR MODUL] useRef: Menyimpan referensi elemen DOM atau nilai mutabel yang tidak memicu re-render.
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const CustomDropdown = ({ 
  value, 
  onChange, 
  options, // Array of objects { value: "", label: "" } OR Array of strings
  placeholder = "Pilih...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // [DI LUAR MODUL] useRef: Menyimpan referensi elemen DOM atau nilai mutabel yang tidak memicu re-render.
  const dropdownRef = useRef(null);

  // [DI LUAR MODUL] useEffect: Digunakan untuk menjalankan side-effect (seperti fetch data, update DOM) setelah komponen di-render.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = (() => {
    if (!value) return placeholder;
    if (typeof options[0] === "string") return value;
    const selectedObj = options.find(opt => opt.value === value);
    return selectedObj ? selectedObj.label : value;
  })();

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div 
        className="w-full px-3 py-2 text-[11px] sm:text-sm font-medium text-pink-700 border border-pink-200 rounded-xl sm:rounded-full bg-pink-50/50 hover:bg-pink-100/50 flex items-center justify-between cursor-pointer transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown size={14} className={`text-pink-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-pink-100 rounded-xl shadow-lg max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="py-1">
            {options.map((opt, idx) => {
              const optValue = typeof opt === "string" ? opt : opt.value;
              const optLabel = typeof opt === "string" ? opt : opt.label;
              const isSelected = value === optValue;
              
              return (
                <li 
                  key={idx}
                  className={`px-4 py-2 text-[11px] sm:text-sm cursor-pointer transition-colors ${
                    isSelected 
                      ? "bg-pink-100 text-pink-700 font-bold" 
                      : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                  onClick={() => {
                    onChange(optValue);
                    setIsOpen(false);
                  }}
                >
                  {optLabel}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
