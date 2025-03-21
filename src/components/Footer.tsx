
import { Github, Heart, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <a 
              href="#home" 
              className="text-2xl font-bold font-display tracking-tight"
            >
              Ankit<span className="text-primary">.</span>
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Data Analyst | Machine Learning Enthusiast
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="mailto:ankitashuk20@gmail.com"
              className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/70 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/Ankit-KK"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/70 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/ankitka"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/70 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 text-primary" /> by Ankit Kumar © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
