
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mr-auto"
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
        
        <div className="space-y-6 bg-card p-6 rounded-xl shadow-sm border">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
          
          <div className="clerk-sign-in-container">
            <ClerkSignIn 
              signUpUrl="/sign-up"
              afterSignInUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none p-0 border-0",
                  header: "hidden",
                  footer: "hidden",
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
