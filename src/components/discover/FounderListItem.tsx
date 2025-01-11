import { Badge } from "@/components/ui/badge";
import { MapPin, Code2, Briefcase } from "lucide-react";
import { ConnectionButton } from "@/components/ConnectionButton";
import { useState } from "react";
import { FounderDetailView } from "@/components/FounderDetailView";

interface FounderListItemProps {
  id: string;
  name: string;
  role: string;
  city: string;
  techStack: string[];
  industry: string;
  imageUrl: string;
  isConnected: boolean;
  isPendingConnection: boolean;
  onConnect: () => Promise<void>;
  onCancelRequest: () => Promise<void>;
  bio?: string;
}

export const FounderListItem = ({
  id,
  name,
  role,
  city,
  techStack,
  industry,
  imageUrl,
  isConnected,
  isPendingConnection,
  onConnect,
  onCancelRequest,
  bio,
}: FounderListItemProps) => {
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div className="group relative overflow-hidden p-4 transition-all hover:shadow-md bg-gradient-to-br from-white to-purple-50 border-2 border-primary/20 rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-4 flex-1 cursor-pointer"
            onClick={() => setIsDetailViewOpen(true)}
          >
            <img
              src={imageError ? "https://via.placeholder.com/150" : imageUrl}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary"
              onError={handleImageError}
            />
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{name}</h3>
                  <p className="text-md text-gray-600">{role}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{city}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-secondary" />
                  <div className="flex flex-wrap gap-1">
                    {techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-accent" />
                  <span>{industry}</span>
                </div>
              </div>
            </div>
          </div>
          
          <ConnectionButton
            founderId={id}
            isConnected={isConnected}
            isPending={isPendingConnection}
            onConnect={onConnect}
            onCancelRequest={onCancelRequest}
          />
        </div>
      </div>

      <FounderDetailView
        isOpen={isDetailViewOpen}
        onClose={() => setIsDetailViewOpen(false)}
        founder={{
          id,
          name,
          role,
          city,
          techStack,
          industry,
          imageUrl: imageError ? "https://via.placeholder.com/150" : imageUrl,
          bio,
        }}
      />
    </>
  );
};