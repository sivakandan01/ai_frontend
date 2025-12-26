import { useNavigate } from "react-router-dom";
import ModeCard from "./components/ModeCard";
import { ThemeToggle } from "@/components/common";

const modes = [
  {
    id: "ai",
    title: "AI Chat",
    description: "Chat directly with AI without document context",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    gradient: "from-sky-400 via-blue-500 to-cyan-400",
    bgGradient: "from-sky-400/30 via-blue-500/30 to-cyan-400/30",
    hoverGradient: "hover:from-sky-400/45 hover:via-blue-500/45 hover:to-cyan-400/45",
  },
  {
    id: "rag",
    title: "RAG Mode",
    description: "Upload a PDF document and chat with AI based on its content",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    gradient: "from-rose-400 via-pink-500 to-fuchsia-500",
    bgGradient: "from-rose-400/30 via-pink-500/30 to-fuchsia-500/30",
    hoverGradient: "hover:from-rose-400/45 hover:via-pink-500/45 hover:to-fuchsia-500/45",
  },
  {
    id: "image",
    title: "Image Generation",
    description: "Generate images from text prompts using AI",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-emerald-400 via-green-500 to-teal-500",
    bgGradient: "from-emerald-400/30 via-green-500/30 to-teal-500/30",
    hoverGradient: "hover:from-emerald-400/45 hover:via-green-500/45 hover:to-teal-500/45",
  },
  {
    id: "mermaid",
    title: "Mermaid Diagrams",
    description: "Create flowcharts, diagrams, and visualizations with AI",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    gradient: "from-orange-400 via-red-500 to-rose-500",
    bgGradient: "from-orange-400/30 via-red-500/30 to-rose-500/30",
    hoverGradient: "hover:from-orange-400/45 hover:via-red-500/45 hover:to-rose-500/45",
  },
];

export default function SelectionContainer() {
  const navigate = useNavigate();

  const handleSelection = (option: string) => {
    if (option === "rag") {
      navigate("/upload", { state: { mode: "rag" } });
    } else if (option === "ai") {
      navigate("/chat", { state: { mode: "ai" } });
    } else if (option === "image") {
      navigate("/image");
    } else if (option === "mermaid") {
      navigate("/mermaid");
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--sidebar-bg))] flex items-center justify-center p-8 relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            Choose Your Experience
          </h1>
          <p className="text-[rgb(var(--secondary-text))] text-lg">
            Select a mode to get started with AI-powered features
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modes.map((mode, index) => (
            <ModeCard
              key={mode.id}
              mode={mode}
              index={index}
              onClick={handleSelection}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-[rgb(var(--secondary-text))] text-sm">
            Powered by AI • Built with love
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shine {
          from {
            transform: translateX(-100%) skewX(-12deg);
          }
          to {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
