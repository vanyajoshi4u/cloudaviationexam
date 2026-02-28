import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import TopicSelect from "./pages/TopicSelect";
import Quiz from "./pages/Quiz";
import RtrChapter from "./pages/RtrChapter";
import Subscribe from "./pages/Subscribe";
import AdminDashboard from "./pages/AdminDashboard";
import VerifyLogin from "./pages/VerifyLogin";
import EmailConfirmed from "./pages/EmailConfirmed";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/verify-login" element={<VerifyLogin />} />
            <Route path="/email-confirmed" element={<EmailConfirmed />} />
            <Route path="/subscribe" element={
              <ProtectedRoute requireAuth>
                <Subscribe />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requireAuth>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/" element={
              <ProtectedRoute requireAuth requireSubscription>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/topics/:topicId" element={
              <ProtectedRoute requireAuth requireSubscription>
                <TopicSelect />
              </ProtectedRoute>
            } />
            <Route path="/rtr-chapter/:chapterId" element={
              <ProtectedRoute requireAuth requireSubscription>
                <RtrChapter />
              </ProtectedRoute>
            } />
            <Route path="/quiz/:topicId" element={
              <ProtectedRoute requireAuth requireSubscription>
                <Quiz />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
