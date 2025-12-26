import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { store, persistor } from './store';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from "./pages/landing";
import ChatPage from "./pages/chat";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import SelectionPage from "./pages/selection";
import UploadPage from "./pages/upload";
import ImagePage from "./pages/image";
import MermaidPage from "./pages/mermaid";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/selection" element={<SelectionPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/image" element={<ImagePage />} />
            <Route path="/mermaid" element={<MermaidPage />} />
          </Routes>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
