
import { useEffect, useRef } from 'react';
import { Calendar, Users, Zap } from 'lucide-react';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add the appear-active class to trigger animations
            entry.target.classList.add('appear-active');
            // Once animated, no need to observe anymore
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );
    
    // Target all elements with the 'appear' class within the section
    const elements = sectionRef.current?.querySelectorAll('.appear');
    if (elements) {
      elements.forEach(el => observer.observe(el));
    }
    
    // Cleanup
    return () => {
      if (elements) {
        elements.forEach(el => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-secondary/50">
      <div className="section-container">
        <div className="appear inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-all duration-500 transform translate-y-4 opacity-0">
          Work Experience
        </div>
        <h2 className="appear section-title transition-all duration-500 delay-100 transform translate-y-4 opacity-0">My Professional Journey</h2>
        
        <div className="appear mt-12 relative transition-all duration-500 delay-200 transform translate-y-4 opacity-0">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2 md:-ml-px"></div>
          
          <div className="relative pb-12 md:pb-16">
            <div className="md:flex items-center md:space-x-4">
              <div className="flex md:w-1/2 md:justify-end md:pr-4 md:text-right">
                <div className="bg-card rounded-xl shadow-lg p-6 md:ml-auto glass-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <h3 className="text-xl font-bold">Data Intern</h3>
                  <p className="text-muted-foreground mb-2">NYXify Technologies</p>
                  <div className="flex items-center space-x-2 mb-6">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm">March 2024 – June 2024</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 transition-all duration-300 hover:translate-x-1">
                      <div className="flex-shrink-0 mt-1">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <p>Led a team of six for a high-priority web scraping project, managing tasks and ensuring quality deliverables.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3 transition-all duration-300 hover:translate-x-1">
                      <div className="flex-shrink-0 mt-1">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <p>Automated data collection processes, reducing manual labor requirements by an impressive 86%.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3 transition-all duration-300 hover:translate-x-1">
                      <div className="flex-shrink-0 mt-1">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <p>Managed real-time scraping for 10+ sites simultaneously, processing over 1 million images and videos.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute left-0 md:left-1/2 top-8 flex items-center justify-center -translate-x-1/2 md:-translate-y-1/2 md:top-0">
                <div className="h-16 w-16 rounded-full border-4 border-background bg-primary flex items-center justify-center animate-pulse-slow">
                  <span className="text-primary-foreground font-bold">NY</span>
                </div>
              </div>
              
              <div className="hidden md:block md:w-1/2">
                {/* Placeholder for timeline balance */}
              </div>
            </div>
          </div>
        </div>
        
        <div className="appear text-center mt-8 transition-all duration-500 delay-300 transform translate-y-4 opacity-0">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            While my professional journey is just beginning, I bring fresh perspectives, cutting-edge skills in data analysis and AI, and a strong foundation in project management demonstrated during my internship.
          </p>
        </div>
      </div>
    </section>
  );
}
