import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import LandingPage from "@/pages/landing";
import ChatPage from "@/pages/chat";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import SelectionPage from "@/pages/selection";
import UploadPage from "@/pages/upload";
import ImagePage from "@/pages/image";
import MermaidPage from "@/pages/mermaid";
import MessagePage from "@/pages/messages"

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes - Accessible without authentication */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth Routes - Redirect to /selection if already authenticated */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      {/* Protected Routes - Require authentication */}
      <Route
        path="/selection"
        element={
          <ProtectedRoute>
            <SelectionPage />
          </ProtectedRoute>
        }
      />

        <Route
        path="/message"
        element={
          <ProtectedRoute>
            <MessagePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/image"
        element={
          <ProtectedRoute>
            <ImagePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mermaid"
        element={
          <ProtectedRoute>
            <MermaidPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}