
import { useEffect, useRef } from 'react';
import { Award, BookOpen, Calendar, GraduationCap } from 'lucide-react';

interface Education {
  degree: string;
  institution: string;
  duration: string;
  gpa?: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
}

const educationDetails: Education[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Amrita Vishwa Vidyapeetham",
    duration: "2021-2024",
    gpa: "7.0 CGPA"
  },
  {
    degree: "PGP in Data Science & Machine Learning",
    institution: "Intellipaat",
    duration: "2023-2024"
  },
];

const certifications: Certification[] = [
  {
    name: "Google Data Analytics",
    issuer: "Google",
    year: "2023"
  },
  {
    name: "MS SQL Developer",
    issuer: "Microsoft",
    year: "2023"
  },
  {
    name: "Machine Learning Specialization",
    issuer: "Deeplearning.AI",
    year: "2024"
  },
];

export default function Education() {
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
    <section id="education" ref={sectionRef} className="py-20 bg-secondary/50">
      <div className="section-container">
        <div className="appear inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          Education & Certifications
        </div>
        <h2 className="appear section-title">My Academic Journey</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="appear space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Education
            </h3>
            
            <div className="space-y-8">
              {educationDetails.map((edu, index) => (
                <div key={index} className="glass-card p-6">
                  <h4 className="text-xl font-semibold">{edu.degree}</h4>
                  <p className="text-muted-foreground mb-2">{edu.institution}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm">{edu.duration}</span>
                  </div>
                  {edu.gpa && (
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm">{edu.gpa}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="appear space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Certifications
            </h3>
            
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="glass-card p-6 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{cert.name}</h4>
                    <p className="text-muted-foreground mb-1">{cert.issuer}</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm">{cert.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 rounded-xl border border-border bg-card/50">
              <p className="text-lg">
                I'm committed to continuous learning and regularly update my skills through online courses and certifications in emerging data science technologies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
