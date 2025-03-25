
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface ProjectFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ProjectFilters({ 
  searchTerm, 
  setSearchTerm, 
  categories, 
  activeTab, 
  setActiveTab 
}: ProjectFiltersProps) {
  return (
    <>
      <div className="appear max-w-xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search projects by name, description, or technology..."
            className="pl-10 pr-4 py-2 w-full transition-shadow focus:shadow-md"
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
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "hover:bg-secondary"
            )}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </>
  );
}
