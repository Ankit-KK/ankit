
import { useState, useEffect } from "react";
import { Menu, X, LogIn, UserPlus, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });

      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-4 bg-background/80 backdrop-blur-xl border-b" : "py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between">
        <a 
          href="#home" 
          className="text-2xl font-bold font-display tracking-tight"
        >
          Ankit<span className="text-primary">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <ul className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={cn(
                    "nav-link",
                    activeSection === link.href.substring(1) && "active"
                  )}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="pl-4 flex items-center gap-2">
            <ThemeToggle />
            
            {user ? (
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="flex items-center gap-1">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Controls */}
        <div className="flex items-center md:hidden space-x-4">
          <ThemeToggle />
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="flex items-center gap-1">
              <LogOut className="h-4 w-4" />
            </Button>
          ) : (
            <Link to="/signin">
              <Button variant="ghost" size="icon">
                <LogIn className="h-4 w-4" />
              </Button>
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden transition-transform duration-300",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full p-8">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1">
              <ul className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-medium hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                
                {!user ? (
                  <>
                    <li>
                      <Link to="/signin" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-2xl font-medium flex gap-2 h-auto p-0">
                          <LogIn className="h-5 w-5" /> Sign In
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-2xl font-medium flex gap-2 h-auto p-0">
                          <UserPlus className="h-5 w-5" /> Sign Up
                        </Button>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Button variant="ghost" className="w-full justify-start text-2xl font-medium flex gap-2 h-auto p-0" onClick={handleSignOut}>
                      <LogOut className="h-5 w-5" /> Sign Out
                    </Button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
