import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useConnectionMutations = () => {
  const queryClient = useQueryClient();

  const acceptMutation = useMutation({
    mutationFn: async (connectionId: string) => {
      const { error } = await supabase
        .from('connections')
        .update({ status: 'accepted' })
        .eq('id', connectionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectionRequests'] });
      queryClient.invalidateQueries({ queryKey: ['connections'] });
      queryClient.invalidateQueries({ queryKey: ['founders'] });
    },
    onError: (error) => {
      console.error('Accept connection error:', error);
      toast.error("Failed to accept connection request");
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async (connectionId: string) => {
      const { error } = await supabase
        .from('connections')
        .update({ status: 'rejected' })
        .eq('id', connectionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectionRequests'] });
      queryClient.invalidateQueries({ queryKey: ['founders'] });
    },
    onError: (error) => {
      console.error('Reject connection error:', error);
      toast.error("Failed to reject connection request");
    }
  });

  const createConnection = useMutation({
    mutationFn: async (founderId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: existingConnection } = await supabase
        .from('connections')
        .select()
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .or(`sender_id.eq.${founderId},receiver_id.eq.${founderId}`)
        .single();

      if (existingConnection) {
        throw new Error('Connection already exists');
      }

      const { error } = await supabase
        .from('connections')
        .insert({
          sender_id: user.id,
          receiver_id: founderId,
          status: 'pending'
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['founders'] });
    },
    onError: (error) => {
      console.error('Create connection error:', error);
      if (error instanceof Error && error.message === 'Connection already exists') {
        toast.error("A connection with this user already exists");
      } else {
        toast.error("Failed to send connection request");
      }
    }
  });

  const cancelConnection = useMutation({
    mutationFn: async (founderId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('connections')
        .delete()
        .eq('sender_id', user.id)
        .eq('receiver_id', founderId)
        .eq('status', 'pending');

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['founders'] });
    },
    onError: (error) => {
      console.error('Cancel connection error:', error);
      toast.error("Failed to cancel connection request");
    }
  });

  return {
    acceptConnection: (id: string) => acceptMutation.mutateAsync(id),
    rejectConnection: (id: string) => rejectMutation.mutateAsync(id),
    createConnection: (founderId: string) => createConnection.mutateAsync(founderId),
    cancelConnection: (founderId: string) => cancelConnection.mutateAsync(founderId)
  };
};