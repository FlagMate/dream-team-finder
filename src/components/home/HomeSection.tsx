import { useSessionContext } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const HomeSection = () => {
  const { session } = useSessionContext();
  
  const { data: stats } = useQuery({
    queryKey: ['connection-metrics', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data } = await supabase
        .rpc('get_connection_metrics', { user_id: session.user.id });
      return data;
    },
    enabled: !!session?.user?.id,
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-[300px] rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-90"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to CoFounder</h1>
          <p className="text-xl text-center max-w-2xl">
            Connect with talented founders and build something amazing together
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat: { metric_name: string; metric_value: number }) => (
          <Card key={stat.metric_name} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                {stat.metric_name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.metric_value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};