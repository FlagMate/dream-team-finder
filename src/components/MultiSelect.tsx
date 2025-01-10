import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsUpDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
}

export const MultiSelect = ({
  options = [],
  selected = [],
  onChange,
  placeholder,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ensure we always have arrays
  const safeOptions = Array.isArray(options) ? options : [];
  const safeSelected = Array.isArray(selected) ? selected : [];

  // Filter options based on search term
  const filteredOptions = safeOptions.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    const updatedSelection = safeSelected.includes(option)
      ? safeSelected.filter((item) => item !== option)
      : [...safeSelected, option];
    onChange(updatedSelection);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        className="w-full justify-between bg-white/80 backdrop-blur-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {safeSelected.length === 0
          ? placeholder
          : `${safeSelected.length} selected`}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="p-2">
            <div className="flex items-center border rounded-md px-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder={`Search ${placeholder.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 focus-visible:ring-0"
              />
            </div>
          </div>

          <ScrollArea className="max-h-60">
            {filteredOptions.length > 0 ? (
              <div className="p-2">
                {filteredOptions.map((option) => (
                  <div
                    key={option}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => toggleOption(option)}
                  >
                    <Checkbox
                      checked={safeSelected.includes(option)}
                      className="h-4 w-4"
                    />
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No options found
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};