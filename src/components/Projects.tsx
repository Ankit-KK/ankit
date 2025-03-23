
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Project {
  title: string;
  description: string;
  image: string;
  techs: string[];
  demoUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: "MLAutoGen",
    description: "AI-driven machine learning script generator that creates custom ML code based on user requirements.",
    image: "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?auto=format&fit=crop&q=80",
    techs: ["Python", "LLaMA 3.1", "Streamlit"],
    demoUrl: "https://mlautogen.streamlit.app/",
  },
  {
    title: "ExploraGen",
    description: "Automated exploratory data analysis tool that generates comprehensive insights and visualizations.",
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&q=80",
    techs: ["Python", "LLaMA 3.1", "Streamlit"],
    demoUrl: "https://exploragen.streamlit.app/",
  },
  {
    title: "BrewMetrics",
    description: "Coffee order trend analysis dashboard providing actionable insights for inventory management.",
    image: "https://images.unsplash.com/photo-1509042239860-f0ca3bf6d889?auto=format&fit=crop&q=80",
    techs: ["Excel", "Visualizations"],
  },
  {
    title: "Sentiment Analysis: Amazon Alexa",
    description: "NLP-based sentiment analysis of Amazon Alexa reviews using Naive Bayes and Logistic Regression.",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&q=80",
    techs: ["NLP", "Naive Bayes", "Logistic Regression"],
    githubUrl: "https://github.com/Ankit-KK/Amazon-Alexa-Analysis",
  },
  {
    title: "Retail Sales Optimization",
    description: "Predictive analytics for retail sales performance optimization using time series forecasting.",
    image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?auto=format&fit=crop&q=80",
    techs: ["Python", "Prophet", "Plotly"],
    githubUrl: "https://github.com/Ankit-KK/Retail-Sales-Performance-Optimization",
  },
  {
    title: "Employee Attrition Prediction",
    description: "Machine learning model to predict employee attrition using Random Forest and Neural Networks.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
    techs: ["Random Forest", "Neural Networks"],
    githubUrl: "https://github.com/Ankit-KK/Employee-Attrition",
  },
  {
    title: "Customer Segmentation Analysis",
    description: "Clustering analysis for customer segmentation to improve marketing effectiveness.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    techs: ["K-Means", "Pandas", "NumPy"],
    githubUrl: "https://github.com/Ankit-KK/Marketing-Analysis",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleProjects, setVisibleProjects] = useState<Project[]>(projects);
  
  // Extract all unique technologies from projects
  const allTechs = [...new Set(projects.flatMap(project => project.techs.map(tech => tech.toLowerCase())))];
  const categories = ["all", ...allTechs.sort()];
  
  useEffect(() => {
    // Filter projects based on both activeTab and searchTerm
    const filtered = projects.filter(project => {
      const matchesTab = activeTab === "all" || 
        project.techs.some(tech => tech.toLowerCase() === activeTab.toLowerCase());
      
      const matchesSearch = searchTerm === "" || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techs.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesTab && matchesSearch;
    });
    
    setVisibleProjects(filtered);
  }, [activeTab, searchTerm]);
  
  // For debugging - add console logs to troubleshoot
  useEffect(() => {
    console.log("Total projects:", projects.length);
    console.log("Visible projects:", visibleProjects.length);
    console.log("Active tab:", activeTab);
    console.log("Search term:", searchTerm);
  }, [visibleProjects, activeTab, searchTerm]);
  
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
    
    return () => {
      if (elements) {
        elements.forEach(el => observer.unobserve(el));
      }
    };
  }, [visibleProjects]); // Add visibleProjects as dependency to re-observe new elements

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="section-container">
        <div className="appear inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          Projects
        </div>
        <h2 className="appear section-title">My Recent Work</h2>
        
        <div className="appear max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects by name, description, or technology..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="appear mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={activeTab === category ? "default" : "outline"}
              className={cn(
                "cursor-pointer text-sm px-3 py-1 capitalize transition-all duration-300",
                activeTab === category 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-secondary"
              )}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        
        {visibleProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {visibleProjects.map((project, index) => (
              <div 
                key={index}
                className="appear glass-card overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.techs.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" /> Live Demo
                      </a>
                    )}
                    
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline transition-colors"
                      >
                        <Github className="h-4 w-4 mr-1" /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No matching projects found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </section>
  );
}
