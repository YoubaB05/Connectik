import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Nos Solutions" },
    { href: "/boutique", label: "Boutique" },
    { href: "/about", label: "Notre Approche" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-xl font-sans font-bold text-primary cursor-pointer" data-testid="logo">
                 <Logo className="h-10 w-auto" />
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation - hidden on smaller screens */}
          <div className="hidden lg:block flex-1">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`font-sans font-medium transition-colors duration-200 cursor-pointer ${
                      location === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Medium Screen Navigation - compressed layout */}
          <div className="hidden md:flex lg:hidden flex-1 items-center justify-center">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`font-sans font-medium text-sm transition-colors duration-200 cursor-pointer ${
                      location === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Desktop Consultation Button */}
          <div className="hidden lg:block flex-shrink-0">
            <Link href="/contact">
              <Button 
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-sans font-medium hover:bg-primary/90 transition-colors duration-200"
                data-testid="button-consultation"
              >
                Consultation Gratuite
              </Button>
            </Link>
          </div>

          {/* Medium Screen Consultation Button - smaller */}
          <div className="hidden md:block lg:hidden flex-shrink-0">
            <Link href="/contact">
              <Button 
                className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-sans font-medium hover:bg-primary/90 transition-colors duration-200 text-sm"
                data-testid="button-consultation"
              >
                Consultation
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-muted-foreground hover:text-primary p-2"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border" data-testid="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer ${
                    location === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button 
                className="w-full mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-sans font-medium hover:bg-primary/90 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-button-consultation"
              >
                Consultation Gratuite
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
