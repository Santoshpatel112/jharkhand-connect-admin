import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
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
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout><Index /></DashboardLayout>} />
          <Route path="/reports" element={<DashboardLayout><AllReports /></DashboardLayout>} />
          <Route path="/reports/pending" element={<DashboardLayout><PendingIssues /></DashboardLayout>} />
          <Route path="/reports/progress" element={<DashboardLayout><InProgress /></DashboardLayout>} />
          <Route path="/reports/resolved" element={<DashboardLayout><Resolved /></DashboardLayout>} />
          <Route path="/citizens" element={<DashboardLayout><Citizens /></DashboardLayout>} />
          <Route path="/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
          <Route path="/map" element={<DashboardLayout><MapView /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
