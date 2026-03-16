import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useInactivityLogout } from "@/hooks/useInactivityLogout";
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
import ResetPassword from "./pages/ResetPassword";
import RtrPart2Exam from "./pages/RtrPart2Exam";
import LiveAtcExam from "./pages/LiveAtcExam";
import AtcAnswerViewer from "./pages/AtcAnswerViewer";
import Bookmarks from "./pages/Bookmarks";
import PerformanceAnalytics from "./pages/PerformanceAnalytics";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

// Wraps all routes for session keepalive and auto-logout on inactivity
const InactivityGuard = ({ children }: { children: React.ReactNode }) => {
  useInactivityLogout();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <InactivityGuard>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/verify-login" element={<VerifyLogin />} />
              <Route path="/email-confirmed" element={<EmailConfirmed />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/subscribe" element={
                <ProtectedRoute requireAuth>
                  <Subscribe />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute requireAuth requireAdmin>
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
              <Route path="/rtr2-exam/:paperId" element={
                <ProtectedRoute requireAuth requireSubscription>
                  <RtrPart2Exam />
                </ProtectedRoute>
              } />
              <Route path="/live-atc-exam/:paperId" element={
                <ProtectedRoute requireAuth requireSubscription>
                  <LiveAtcExam />
                </ProtectedRoute>
              } />
              <Route path="/atc-answer/:paperId" element={<AtcAnswerViewer />} />
              <Route path="/bookmarks" element={
                <ProtectedRoute requireAuth requireSubscription>
                  <Bookmarks />
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute requireAuth requireSubscription>
                  <PerformanceAnalytics />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </InactivityGuard>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
