import { useState } from "react";
import ProfileDropdown from "@/components/ProfileDropdown";
import { DiscoverSection } from "@/components/discover/DiscoverSection";
import { RequestsSection } from "@/components/requests/RequestsSection";
import { ConnectionsSection } from "@/components/connections/ConnectionsSection";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'discover' | 'requests' | 'connections'>('discover');

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex w-full">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <SidebarTrigger />
              <ProfileDropdown />
            </div>

            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
                Find Your Perfect Co-Founder
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connect with talented founders across India's thriving tech ecosystem
              </p>
            </div>

            {activeTab === 'discover' && <DiscoverSection />}
            {activeTab === 'requests' && <RequestsSection />}
            {activeTab === 'connections' && <ConnectionsSection />}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;