import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SubjectCards from "@/components/SubjectCards";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import ReferralPanel from "@/components/ReferralPanel";
import Footer from "@/components/Footer";
import ReviewPopup from "@/components/ReviewPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-aviation">
      <Navbar />
      <Hero />
      <SubjectCards />
      <div className="container mx-auto px-4 max-w-lg py-6">
        <ReferralPanel />
      </div>
      <Features />
      <Testimonials />
      
      <Footer />
    </div>
  );
};

export default Index;
