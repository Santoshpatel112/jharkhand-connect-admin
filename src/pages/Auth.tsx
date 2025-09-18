import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const { isSignedIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-jharkhand-primary/10 via-background to-jharkhand-secondary/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-jharkhand-primary rounded-full flex items-center justify-center">
              <img 
                src="/src/assets/jharkhand-logo.png" 
                alt="Jharkhand Government" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Government of Jharkhand
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Civic Issues Management Dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex rounded-lg bg-muted p-1">
              <Button
                variant={!isSignUp ? "default" : "ghost"}
                className="flex-1 rounded-md"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </Button>
              <Button
                variant={isSignUp ? "default" : "ghost"}
                className="flex-1 rounded-md"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </Button>
            </div>
            
            <motion.div
              key={isSignUp ? "signup" : "signin"}
              initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="clerk-container"
            >
              {isSignUp ? (
                <SignUp 
                  redirectUrl="/"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none border-0 bg-transparent",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      formButtonPrimary: "bg-jharkhand-primary hover:bg-jharkhand-primary/90",
                    }
                  }}
                />
              ) : (
                <SignIn 
                  redirectUrl="/"
                  appearance={{
                    elements: {
                      rootBox: "w-full", 
                      card: "shadow-none border-0 bg-transparent",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      formButtonPrimary: "bg-jharkhand-primary hover:bg-jharkhand-primary/90",
                    }
                  }}
                />
              )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;