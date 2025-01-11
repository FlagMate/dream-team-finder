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
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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