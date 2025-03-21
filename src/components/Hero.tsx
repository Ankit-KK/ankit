
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 pb-16"
    >
      <div className="section-container flex flex-col items-center justify-center text-center">
        <div 
          className="mb-8 inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary animate-fade-in" 
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          Available for new opportunities
        </div>
        
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-tight md:leading-tight lg:leading-tight mb-6 animate-fade-in"
          style={{ animationDelay: "0.3s", animationFillMode: "both" }}
        >
          Hi, I'm <span className="text-primary">Ankit Kumar</span>, <br />a Data Analyst.
        </h1>
        
        <p 
          className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          I specialize in data-driven insights, automation, and predictive modeling with expertise in Python, SQL, Power BI, Machine Learning, and Generative AI.
        </p>
        
        <div 
          className="flex flex-wrap gap-4 justify-center animate-fade-in"
          style={{ animationDelay: "0.5s", animationFillMode: "both" }}
        >
          <a
            href="#contact"
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "rounded-full px-5 py-2.5 text-base font-medium",
              "bg-primary text-primary-foreground shadow-md",
              "hover:bg-primary/90 hover:scale-105 transition-all duration-300"
            )}
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </a>
          
          <a
            href="https://github.com/Ankit-KK"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "rounded-full px-5 py-2.5 text-base font-medium",
              "bg-secondary text-secondary-foreground shadow-sm",
              "hover:bg-secondary/70 hover:scale-105 transition-all duration-300"
            )}
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          
          <a
            href="https://linkedin.com/in/ankitka"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "rounded-full px-5 py-2.5 text-base font-medium",
              "bg-secondary text-secondary-foreground shadow-sm",
              "hover:bg-secondary/70 hover:scale-105 transition-all duration-300"
            )}
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
        </div>
        
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block animate-bounce opacity-0"
          style={{ 
            animationDelay: "1s", 
            animationDuration: "2s", 
            animationIterationCount: "infinite",
            animationFillMode: "both" 
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-muted-foreground rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
