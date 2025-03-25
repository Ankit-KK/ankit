import { useEffect, useRef, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectFilters } from './ProjectFilters';
import { Button } from '@/components/ui/button';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

export interface Project {
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
    image: "public/lovable-uploads/f8c631ec-42e8-4b65-9bda-61f02648203b.png",
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
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;
  
  const allTechs = [...new Set(projects.flatMap(project => project.techs.map(tech => tech.toLowerCase())))];
  const categories = ["all", ...allTechs.sort()];
  
  useEffect(() => {
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
    setCurrentPage(1);
  }, [activeTab, searchTerm]);
  
  useEffect(() => {
    console.log("Total projects:", projects.length);
    console.log("Visible projects:", visibleProjects.length);
    console.log("Active tab:", activeTab);
    console.log("Search term:", searchTerm);
  }, [visibleProjects, activeTab, searchTerm]);
  
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = visibleProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(visibleProjects.length / projectsPerPage);
  
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
    if (elements) {
      elements.forEach(el => observer.observe(el));
    }
    
    return () => {
      if (elements) {
        elements.forEach(el => observer.unobserve(el));
      }
    };
  }, [currentPage, visibleProjects]);
  
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: sectionRef.current?.offsetTop || 0, behavior: 'smooth' });
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="section-container">
        <div className="appear inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          Projects
        </div>
        <h2 className="appear section-title">My Recent Work</h2>
        
        <ProjectFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={categories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        {currentProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {currentProjects.map((project, index) => (
              <ProjectCard 
                key={`${project.title}-${index}`}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No matching projects found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => { setSearchTerm(''); setActiveTab('all'); }}
            >
              Reset filters
            </Button>
          </div>
        )}
        
        {visibleProjects.length > projectsPerPage && (
          <div className="appear mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
}
