
import { useEffect, useRef } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Skill {
  category: string;
  items: string[];
}

const skills: Skill[] = [
  {
    category: "Languages & Tools",
    items: ["Python", "SQL", "Power BI", "Excel", "Web Scraping"]
  },
  {
    category: "AI & ML",
    items: ["Machine Learning", "Generative AI", "Prompt Engineering", "Natural Language Processing"]
  },
  {
    category: "Data Analysis",
    items: ["Cluster Analysis", "Regression Modeling", "Decision Trees", "Time Series Analysis"]
  }
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear-active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.appear');
    elements?.forEach(el => observer.observe(el));
    
    return () => elements?.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div className="appear inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                About Me
              </div>
              <h2 className="appear section-title">
                Data-driven insights & value creation
              </h2>
              <p className="appear text-lg text-muted-foreground">
                As a Data Analyst, I harness the power of data to extract valuable insights, automate processes, and build predictive models. 
                My passion lies in turning complex data into actionable intelligence that drives business decisions.
              </p>
              
              <div className="appear space-y-4 mt-6">
                <h3 className="text-xl font-semibold">My approach includes:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Automating data collection and processing workflows</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Developing ML models for prediction and optimization</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Creating interactive visualizations for stakeholder communication</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Leveraging AI to enhance analytical capabilities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="appear">
            <div className="glass-card p-8 backdrop-blur-lg">
              <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
              <div className="space-y-8">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="space-y-4">
                    <h4 className="text-lg font-medium text-primary">{skillGroup.category}</h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <div 
                          key={skillIndex} 
                          className="flex items-center gap-2"
                        >
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm sm:text-base">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
