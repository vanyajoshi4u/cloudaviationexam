import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Subjects", href: "#subjects" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/30"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative">
              <Plane className="w-7 h-7 sm:w-8 sm:h-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
              <div className="absolute inset-0 blur-lg bg-primary/30 rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-lg font-bold tracking-wider text-foreground">
                Cloud<span className="text-gradient-sky">Aviation</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-muted-foreground uppercase -mt-1">
                Exam's
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button size="sm" className="glow-blue font-display text-xs tracking-wider">
              Get Started
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-border/30"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-border/30">
                <Button variant="ghost" size="sm" className="justify-start text-muted-foreground">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button size="sm" className="glow-blue font-display text-xs tracking-wider">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
