import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { SearchInput } from "./filters/SearchInput";
import { FilterGroup } from "./filters/FilterGroup";
import { LoadingState } from "./filters/LoadingState";
import { ErrorState } from "./filters/ErrorState";

interface FilterSectionProps {
  onFiltersChange: (filters: {
    search: string;
    cities: string[];
    industries: string[];
    technologies: string[];
  }) => void;
}

interface FilterOption {
  id: string;
  type: string;
  value: string;
}

export const FilterSection = ({ onFiltersChange }: FilterSectionProps) => {
  const [search, setSearch] = useState("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  const { data: filterOptions = [], isLoading, error } = useQuery({
    queryKey: ["filterOptions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("filter_options")
        .select("*")
        .order("value");

      if (error) {
        console.error("Error fetching filter options:", error);
        toast.error("Failed to load filter options");
        return [];
      }

      return (data || []) as FilterOption[];
    },
  });

  const cities = filterOptions
    ?.filter((option) => option.type === "city")
    .map((option) => option.value) || [];
  const industries = filterOptions
    ?.filter((option) => option.type === "industry")
    .map((option) => option.value) || [];
  const technologies = filterOptions
    ?.filter((option) => option.type === "technology")
    .map((option) => option.value) || [];

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onFiltersChange({
        search,
        cities: selectedCities || [],
        industries: selectedIndustries || [],
        technologies: selectedTechnologies || [],
      });
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [search, selectedCities, selectedIndustries, selectedTechnologies, onFiltersChange]);

  if (error) {
    return <ErrorState />;
  }

  if (isLoading) {
    return (
      <div className="w-full p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-lg">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-lg">
      <div className="flex flex-col gap-4">
        <SearchInput value={search} onChange={setSearch} />
        <FilterGroup
          cities={cities}
          industries={industries}
          technologies={technologies}
          selectedCities={selectedCities}
          selectedIndustries={selectedIndustries}
          selectedTechnologies={selectedTechnologies}
          onCitiesChange={setSelectedCities}
          onIndustriesChange={setSelectedIndustries}
          onTechnologiesChange={setSelectedTechnologies}
        />
      </div>
    </div>
  );
};