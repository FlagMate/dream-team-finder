import { FounderCard } from "@/components/FounderCard";
import { FilterSection } from "@/components/FilterSection";
import { useConnectionMutations } from "@/hooks/useConnectionMutations";
import { useCallback, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { toast } from "sonner";

interface Filters {
  search: string;
  cities: string[];
  industries: string[];
  technologies: string[];
}

export const DiscoverSection = () => {
  const { session } = useSessionContext();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<Filters>({
    search: "",
    cities: [],
    industries: [],
    technologies: [],
  });

  // Subscribe to real-time connection updates
  useEffect(() => {
    if (!session?.user?.id) return;

    const channel = supabase
      .channel('connection_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'connections',
        filter: `sender_id=eq.${session.user.id}`,
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['founders'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id, queryClient]);

  const { data: founders = [], isLoading, error } = useQuery({
    queryKey: ["founders", filters],
    queryFn: async () => {
      if (!session?.user?.id) {
        return [];
      }

      try {
        let query = supabase
          .from("profiles")
          .select(`
            *,
            connections!connections_receiver_id_fkey(
              id,
              status,
              sender_id,
              receiver_id
            )
          `);

        // Build filter conditions
        const filterConditions = [];

        // Apply search filter
        if (filters.search) {
          filterConditions.push(`full_name.ilike.%${filters.search}%`);
          filterConditions.push(`role.ilike.%${filters.search}%`);
        }

        // Apply city filter (single city per profile)
        if (filters.cities.length > 0) {
          filterConditions.push(`city.in.(${filters.cities.map(city => `'${city}'`).join(',')})`);
        }

        // Apply industry filter (multiple industries possible)
        if (filters.industries.length > 0) {
          filterConditions.push(`space.in.(${filters.industries.map(industry => `'${industry}'`).join(',')})`);
        }

        // Apply technology filter (multiple technologies possible)
        if (filters.technologies.length > 0) {
          const techConditions = filters.technologies.map(tech => 
            `tech_stack.cs.{${tech}}`
          );
          filterConditions.push(`(${techConditions.join(' or ')})`);
        }

        // Combine all conditions with OR
        if (filterConditions.length > 0) {
          query = query.or(filterConditions.join(','));
        }

        // Don't show the current user in the list
        query = query.neq('id', session.user.id);

        console.log('Query filters:', filterConditions); // Debug log

        const { data: foundersData, error } = await query;

        if (error) {
          console.error("Error fetching founders:", error);
          throw error;
        }

        console.log('Fetched founders:', foundersData); // Debug log

        return (foundersData || []).map(founder => ({
          ...founder,
          isConnected: founder.connections?.some(
            conn => conn.status === 'accepted'
          ),
          isPendingConnection: founder.connections?.some(
            conn => conn.status === 'pending'
          ),
        }));
      } catch (error) {
        console.error("Error in queryFn:", error);
        throw error;
      }
    },
    enabled: !!session?.user?.id,
    retry: 1,
  });

  const { createConnection, cancelConnection } = useConnectionMutations();

  const handleFiltersChange = useCallback((newFilters: Filters) => {
    console.log('Applying filters:', newFilters); // Debug log
    setFilters(newFilters);
  }, []);

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading founders. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <FilterSection onFiltersChange={handleFiltersChange} />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {founders.map((founder) => (
          <FounderCard
            key={founder.id}
            id={founder.id}
            name={founder.full_name}
            role={founder.role}
            city={founder.city}
            techStack={founder.tech_stack || []}
            industry={founder.space}
            imageUrl={founder.image_url || "https://via.placeholder.com/150"}
            isConnected={founder.isConnected}
            isPendingConnection={founder.isPendingConnection}
            onConnect={async () => {
              await toast.promise(createConnection(founder.id), {
                loading: 'Sending connection request...',
                success: 'Connection request sent!',
                error: 'Failed to send connection request'
              });
            }}
            onCancelRequest={async () => {
              await toast.promise(cancelConnection(founder.id), {
                loading: 'Canceling request...',
                success: 'Connection request canceled',
                error: 'Failed to cancel request'
              });
            }}
            bio={founder.bio}
          />
        ))}
      </div>
    </>
  );
};