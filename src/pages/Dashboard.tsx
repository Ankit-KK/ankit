
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-24 max-w-7xl">
        <div className="animate-slide-in-bottom" style={{ animationDuration: '0.7s' }}>
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Welcome, {user.firstName || user.username}!</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-medium mb-2">Your Profile</h3>
                <p className="text-muted-foreground mb-4">
                  Manage your personal information and preferences
                </p>
                <Button onClick={() => window.open(user.profileImageUrl, '_blank')} variant="outline" className="w-full">
                  View Profile
                </Button>
              </div>
              
              <div className="bg-card p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-medium mb-2">My Projects</h3>
                <p className="text-muted-foreground mb-4">
                  Access and manage your current projects
                </p>
                <Button onClick={() => navigate("/#projects")} variant="outline" className="w-full">
                  View Projects
                </Button>
              </div>
              
              <div className="bg-card p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-medium mb-2">Contact</h3>
                <p className="text-muted-foreground mb-4">
                  Get in touch for collaborations or inquiries
                </p>
                <Button onClick={() => navigate("/#contact")} variant="outline" className="w-full">
                  Contact Me
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
