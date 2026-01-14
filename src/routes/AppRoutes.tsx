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
import { MainLayout } from '@/components/layout';

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
            <Route element={<ProtectedRoute children={<MainLayout />} />}>
                {/* Selection & AI Features */}
                <Route path="/selection">
                    <Route index element={<SelectionPage />} />
                    <Route path="chat" element={<ChatPage />} />
                    <Route path="upload" element={<UploadPage />} />
                    <Route path="image" element={<ImagePage />} />
                    <Route path="mermaid" element={<MermaidPage />} />
                </Route>

                <Route path="/message" element={<MessagePage />} />
            </Route>
        </Routes>
    );
}