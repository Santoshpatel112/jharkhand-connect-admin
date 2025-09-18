import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { CLERK_PUBLISHABLE_KEY } from "./lib/clerk";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AuthGuard from "./components/auth/AuthGuard";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import AllReports from "./pages/AllReports";
import PendingIssues from "./pages/PendingIssues";
import InProgress from "./pages/InProgress";
import Resolved from "./pages/Resolved";
import Citizens from "./pages/Citizens";
import Analytics from "./pages/Analytics";
import MapView from "./pages/MapView";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <AuthGuard>
                <DashboardLayout><Index /></DashboardLayout>
              </AuthGuard>
            } />
            <Route path="/reports" element={
              <AuthGuard>
                <DashboardLayout><AllReports /></DashboardLayout>
              </AuthGuard>
            } />
            <Route path="/reports/pending" element={
              <AuthGuard>
                <DashboardLayout><PendingIssues /></DashboardLayout>
              </AuthGuard>
            } />
            <Route path="/reports/progress" element={
              <AuthGuard>
                <DashboardLayout><InProgress /></DashboardLayout>
              </AuthGuard>
            } />
            <Route path="/reports/resolved" element={
              <AuthGuard>
                <DashboardLayout><Resolved /></DashboardLayout>
              </AuthGuard>
            } />
            <Route path="/citizens" element={
              <AuthGuard>
                <DashboardLayout><Citizens /></DashboardLayout>
              </AuthGuard>
            } />
            <Route path="/analytics" element={
              <AuthGuard>
                <DashboardLayout><Analytics /></DashboardLayout>
              </AuthGuard>
            } />
            <Route path="/map" element={
              <AuthGuard>
                <DashboardLayout><MapView /></DashboardLayout>
              </AuthGuard>
            } />
            <Route path="/settings" element={
              <AuthGuard>
                <DashboardLayout><Settings /></DashboardLayout>
              </AuthGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
