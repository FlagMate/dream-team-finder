import { Compass, UserPlus, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  activeTab: 'discover' | 'requests' | 'connections';
  onTabChange: (tab: 'discover' | 'requests' | 'connections') => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const items = [
    {
      title: "Discover",
      value: "discover" as const,
      icon: Compass,
    },
    {
      title: "Requests",
      value: "requests" as const,
      icon: UserPlus,
    },
    {
      title: "My Connections",
      value: "connections" as const,
      icon: Users,
    },
  ];

  return (
    <Sidebar>
      {/* Branding Area */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">CF</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              CoFounder
            </h1>
            <p className="text-xs text-muted-foreground">Find Your Match</p>
          </div>
        </div>
      </div>

      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.value)}
                    data-active={activeTab === item.value}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}