import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SubjectCards from "@/components/SubjectCards";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import ReferralPanel from "@/components/ReferralPanel";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ReviewPopup from "@/components/ReviewPopup";
import DemoVideoSection from "@/components/DemoVideoSection";
import { Bookmark, BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-aviation">
      <Navbar />
      <Hero />

      {/* Quick Access Buttons */}
      <div className="container mx-auto px-4 max-w-lg py-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/bookmarks")}
            className="glass-card p-4 flex items-center gap-3 hover:border-primary/40 transition-colors text-left"
          >
            <Bookmark className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <div className="text-sm font-medium">Bookmarks</div>
              <div className="text-[10px] text-muted-foreground">Review saved questions</div>
            </div>
          </button>
          <button
            onClick={() => navigate("/analytics")}
            className="glass-card p-4 flex items-center gap-3 hover:border-primary/40 transition-colors text-left"
          >
            <BarChart3 className="w-5 h-5 text-accent flex-shrink-0" />
            <div>
              <div className="text-sm font-medium">Analytics</div>
              <div className="text-[10px] text-muted-foreground">Subject-wise accuracy</div>
            </div>
          </button>
        </div>
      </div>

      <SubjectCards />
      <DemoVideoSection />
      <div className="container mx-auto px-4 max-w-lg py-6">
        <ReferralPanel />
      </div>
      <Features />
      <AboutSection />
      <Testimonials />
      <ReviewPopup />
      <Footer />
    </div>
  );
};

export default Index;
