import { MultiSelect } from "@/components/MultiSelect";

interface FilterGroupProps {
  cities: string[];
  industries: string[];
  technologies: string[];
  selectedCities: string[];
  selectedIndustries: string[];
  selectedTechnologies: string[];
  onCitiesChange: (cities: string[]) => void;
  onIndustriesChange: (industries: string[]) => void;
  onTechnologiesChange: (technologies: string[]) => void;
}

export const FilterGroup = ({
  cities,
  industries,
  technologies,
  selectedCities,
  selectedIndustries,
  selectedTechnologies,
  onCitiesChange,
  onIndustriesChange,
  onTechnologiesChange,
}: FilterGroupProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MultiSelect
        options={cities}
        selected={selectedCities}
        onChange={onCitiesChange}
        placeholder="Select Cities"
      />

      <MultiSelect
        options={industries}
        selected={selectedIndustries}
        onChange={onIndustriesChange}
        placeholder="Select Industries"
      />

      <MultiSelect
        options={technologies}
        selected={selectedTechnologies}
        onChange={onTechnologiesChange}
        placeholder="Select Technologies"
      />
    </div>
  );
};