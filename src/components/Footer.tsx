import { Plane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-6 h-6 text-primary" />
              <span className="font-display text-sm font-bold tracking-wider">
                Cloud<span className="text-gradient-sky">Aviation</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              India's premier DGCA exam preparation platform for aspiring commercial pilots.
            </p>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-display text-xs font-semibold tracking-wider mb-4 text-foreground">
              Subjects
            </h4>
            <div className="flex flex-col gap-2">
              {["Air Navigation", "Air Meteorology", "Air Regulations", "Technical General", "Technical Specific", "RTR"].map((s) => (
                <a key={s} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-xs font-semibold tracking-wider mb-4 text-foreground">
              Resources
            </h4>
            <div className="flex flex-col gap-2">
              {["Mock Tests", "Study Guides", "Performance Analytics", "Blog", "FAQ"].map((s) => (
                <a key={s} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-xs font-semibold tracking-wider mb-4 text-foreground">
              Company
            </h4>
            <div className="flex flex-col gap-2">
              {["About Us", "Contact", "Privacy Policy", "Terms of Service"].map((s) => (
                <a key={s} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 CloudAviationExam's. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ✈️ for Indian Aviation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
