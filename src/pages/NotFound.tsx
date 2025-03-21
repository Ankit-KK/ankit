
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <p className="text-sm font-medium text-primary mb-2">404 Error</p>
        <h1 className="text-4xl font-bold font-display mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
