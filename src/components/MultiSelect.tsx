import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [open, setOpen] = useState(false);

  // Ensure we always have arrays, even if undefined is passed
  const safeOptions = Array.isArray(options) ? options : [];
  const safeSelected = Array.isArray(selected) ? selected : [];

  const handleSelect = (currentValue: string) => {
    const updatedSelection = safeSelected.includes(currentValue)
      ? safeSelected.filter((item) => item !== currentValue)
      : [...safeSelected, currentValue];
    onChange(updatedSelection);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white/80 backdrop-blur-sm"
        >
          {safeSelected.length === 0
            ? placeholder
            : `${safeSelected.length} selected`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandEmpty>No option found.</CommandEmpty>
          {safeOptions.length > 0 ? (
            <CommandGroup className="max-h-64 overflow-auto">
              {safeOptions.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => handleSelect(option)}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    checked={safeSelected.includes(option)}
                    className="h-4 w-4"
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          ) : (
            <CommandGroup>
              <CommandItem value="no-options" disabled>
                No options available
              </CommandItem>
            </CommandGroup>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};