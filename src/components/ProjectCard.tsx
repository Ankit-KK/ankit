
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Project } from './Projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div 
      className="appear glass-card overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
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
  );
}
