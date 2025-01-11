import { useState } from "react";
import ProfileDropdown from "@/components/ProfileDropdown";
import { DiscoverSection } from "@/components/discover/DiscoverSection";
import { RequestsSection } from "@/components/requests/RequestsSection";
import { ConnectionsSection } from "@/components/connections/ConnectionsSection";
import { HomeSection } from "@/components/home/HomeSection";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'discover' | 'requests' | 'connections'>('home');

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex flex-col">
        <Navbar />
        <div className="flex flex-1 w-full">
          <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="flex-1">
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-between items-center mb-8">
                <SidebarTrigger />
                <ProfileDropdown />
              </div>

              {activeTab === 'home' && <HomeSection />}
              {activeTab === 'discover' && <DiscoverSection />}
              {activeTab === 'requests' && <RequestsSection />}
              {activeTab === 'connections' && <ConnectionsSection />}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Index;