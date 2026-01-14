import { useState } from "react";
import { ThemeToggle } from "@/components/common";
import { Sparkles, Code, Globe, Github, Send, Layers } from "lucide-react";

export default function ProjectGeneratorContainer() {
    const [isStarted, setIsStarted] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [activeTab, setActiveTab] = useState<"preview" | "code" | "git">("preview");

    const handleGenerate = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (prompt.trim()) {
            setIsStarted(true);
        }
    };

    if (!isStarted) {
        return (
            <div className="h-full w-full bg-[rgb(var(--main-surface))] flex flex-col items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-6 right-6 z-50">
                    <ThemeToggle />
                </div>

                {/* Background Decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[rgba(var(--accent-blue),0.1)] blur-[120px] rounded-full" />
                    <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[rgba(var(--accent-purple),0.1)] blur-[120px] rounded-full" />
                </div>

                <div className="w-full max-w-3xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(var(--accent-blue),0.1)] text-[rgb(var(--accent-blue))] border border-[rgba(var(--accent-blue),0.2)] mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">New: AI Project Generator</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[rgb(var(--primary-text))]">
                        Deploy your idea <br />
                        <span className="bg-gradient-to-r from-[rgb(var(--accent-blue))] via-[rgb(var(--accent-purple))] to-[rgb(var(--accent-pink))] bg-clip-text text-transparent italic animate-pulse">
                            in seconds.
                        </span>
                    </h1>

                    <p className="text-lg text-[rgb(var(--secondary-text))] max-w-2xl mx-auto">
                        Describe your app, and we'll handle the frontend, backend, and deployment.
                        Get a live link and a GitHub repo instantly.
                    </p>

                    <div className="pt-4">
                        <form onSubmit={handleGenerate} className="relative group max-w-4xl mx-auto">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[rgb(var(--accent-blue))] to-[rgb(var(--accent-purple))] rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
                            <div className="relative flex items-center bg-[rgb(var(--sidebar-bg))] border border-[rgb(var(--border-color))] rounded-2xl p-1.5 shadow-2xl transition-colors duration-300">
                                <div className="pl-4 text-[rgb(var(--secondary-text))]">
                                    <Send className="w-5 h-5 rotate-90 opacity-50" />
                                </div>
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="e.g. A real estate dashboard with map view and dark mode..."
                                    className="flex-1 bg-transparent border-none focus:outline-none px-4 py-3 text-base md:text-lg text-[rgb(var(--primary-text))] placeholder-[rgb(var(--secondary-text))]"
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-[rgb(var(--accent-blue))] to-[rgb(var(--accent-purple))] text-white px-6 md:px-10 py-3 rounded-xl font-bold hover:shadow-lg hover:brightness-110 active:scale-[0.95] transition-all flex items-center gap-3 whitespace-nowrap"
                                >
                                    <span>Build Project</span>
                                    <Sparkles className="w-6 h-6 animate-pulse" />
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 pt-12 text-[rgb(var(--secondary-text))]">
                        <div className="flex items-center gap-2">
                            <Code className="w-5 h-5" />
                            <span>Clean Code</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Layers className="w-5 h-5" />
                            <span>Full Stack</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            <span>Auto-deploy</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full w-full bg-[rgb(var(--main-surface))] overflow-hidden transition-colors duration-300">
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-[60px] border-b border-[rgb(var(--border-color))] bg-[rgb(var(--sidebar-bg))] flex items-center justify-between px-6 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <h2 className="font-semibold text-[rgb(var(--primary-text))] truncate max-w-[300px]">
                            {prompt}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex bg-[rgb(var(--hover-bg))] p-1 rounded-xl border border-[rgb(var(--border-color))]">
                            <button
                                onClick={() => setActiveTab("preview")}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === "preview"
                                    ? "bg-[rgb(var(--sidebar-bg))] text-[rgb(var(--accent-blue))] shadow-sm"
                                    : "text-[rgb(var(--secondary-text))] hover:text-[rgb(var(--primary-text))]"
                                    } flex items-center gap-2`}
                            >
                                <Globe className="w-4 h-4" />
                                Preview
                            </button>
                            <button
                                onClick={() => setActiveTab("code")}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === "code"
                                    ? "bg-[rgb(var(--sidebar-bg))] text-[rgb(var(--accent-blue))] shadow-sm"
                                    : "text-[rgb(var(--secondary-text))] hover:text-[rgb(var(--primary-text))]"
                                    } flex items-center gap-2`}
                            >
                                <Code className="w-4 h-4" />
                                Code
                            </button>
                            <button
                                onClick={() => setActiveTab("git")}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === "git"
                                    ? "bg-[rgb(var(--sidebar-bg))] text-[rgb(var(--accent-blue))] shadow-sm"
                                    : "text-[rgb(var(--secondary-text))] hover:text-[rgb(var(--primary-text))]"
                                    } flex items-center gap-2`}
                            >
                                <Github className="w-4 h-4" />
                                Repository
                            </button>
                        </div>
                        <ThemeToggle />
                    </div>
                </header>

                {/* Main Content Areas */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Input Area (Left) */}
                    <div className="w-[450px] flex-none border-r border-[rgb(var(--border-color))] flex flex-col bg-[rgb(var(--sidebar-bg))] transition-colors duration-300">
                        <div className="flex-1 p-6 overflow-y-auto space-y-6">
                            <div className="bg-[rgb(var(--main-surface))] border border-[rgb(var(--border-color))] rounded-2xl p-4 shadow-sm animate-in fade-in slide-in-from-left-4 duration-500 transition-colors duration-300">
                                <p className="text-[rgb(var(--primary-text))] leading-relaxed text-sm">
                                    I'm building your project based on your request: <br />
                                    <strong>"{prompt}"</strong>
                                    <br /><br />
                                    I'll start by scaffolding the frontend with React and Tailwind CSS, and then I'll setup a FastAPI backend.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-[rgb(var(--accent-blue))] font-medium animate-pulse">
                                <div className="w-2 h-2 rounded-full bg-[rgb(var(--accent-blue))]"></div>
                                Generating system architecture...
                            </div>
                        </div>

                        {/* Chat Context Input */}
                        <div className="p-4 border-t border-[rgb(var(--border-color))] bg-[rgb(var(--sidebar-bg))]">
                            <div className="relative group/chat">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[rgb(var(--accent-blue))] to-[rgb(var(--accent-purple))] rounded-[20px] blur opacity-0 group-focus-within/chat:opacity-10 transition duration-500"></div>
                                <textarea
                                    className="relative w-full bg-[rgb(var(--input-bg))] border border-[rgb(var(--border-color))] rounded-2xl px-4 py-4 pb-14 text-sm text-[rgb(var(--primary-text))] placeholder-[rgb(var(--secondary-text))] focus:outline-none focus:ring-2 focus:ring-[rgba(var(--accent-blue),0.4)] resize-none min-h-[80px] max-h-[200px] transition-all duration-300 shadow-sm"
                                    placeholder="Ask for changes or refine the project..."
                                />
                                <button className="absolute bottom-2.5 right-2.5 p-2.5 bg-[rgb(var(--accent-blue))] text-white rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Output Area (Right) */}
                    <div className="flex-1 bg-[rgb(var(--main-surface))] overflow-hidden relative transition-colors duration-300">
                        {activeTab === "preview" && (
                            <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                                <div className="w-16 h-16 border-4 border-[rgba(var(--accent-blue),0.2)] border-t-[rgb(var(--accent-blue))] rounded-full animate-spin"></div>
                                <div>
                                    <p className="text-lg font-semibold text-[rgb(var(--primary-text))]">Building your preview...</p>
                                    <p className="text-sm text-[rgb(var(--secondary-text))]">Initial build usually takes 60-90 seconds.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === "code" && (
                            <div className="h-full w-full bg-[rgb(var(--sidebar-bg))] flex transition-colors duration-300">
                                <div className="w-64 border-r border-[rgb(var(--border-color))] p-4">
                                    <p className="text-xs font-bold text-[rgb(var(--secondary-text))] uppercase mb-4 tracking-widest">Files</p>
                                    <div className="space-y-2">
                                        {['src/App.tsx', 'src/main.tsx', 'package.json', 'api/main.py'].map(file => (
                                            <div key={file} className="flex items-center gap-2 text-sm text-[rgb(var(--secondary-text))] hover:text-[rgb(var(--primary-text))] cursor-pointer py-1 px-2 rounded hover:bg-[rgb(var(--hover-bg))] transition-all">
                                                <Code className="w-4 h-4" />
                                                {file.split('/').pop()}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-1 p-6">
                                    <pre className="text-sm text-[rgb(var(--accent-blue))] opacity-80 font-mono italic">
                                        // Code will appear here as it is generated...
                                    </pre>
                                </div>
                            </div>
                        )}

                        {activeTab === "git" && (
                            <div className="h-full w-full flex items-center justify-center p-6 overflow-y-auto">
                                <div className="max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-500">
                                    {/* Frontend Repo */}
                                    <div className="bg-[rgb(var(--sidebar-bg))] border border-[rgb(var(--border-color))] rounded-3xl p-6 shadow-xl space-y-4 transition-colors duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[rgba(var(--accent-blue),0.1)] text-[rgb(var(--accent-blue))] rounded-xl flex items-center justify-center">
                                                <Layers className="w-5 h-5" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-bold text-[rgb(var(--primary-text))]">Frontend</h3>
                                                <p className="text-xs text-[rgb(var(--secondary-text))]">React & Tailwind CSS</p>
                                            </div>
                                        </div>
                                        <div className="bg-[rgb(var(--main-surface))] border border-[rgb(var(--border-color))] rounded-xl p-3 flex flex-col gap-2">
                                            <code className="text-[10px] text-[rgb(var(--accent-blue))] truncate font-mono">
                                                github.com/user/project-frontend
                                            </code>
                                            <button className="w-full py-2 bg-[rgb(var(--accent-blue))] text-white text-xs font-bold rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                                                <Github className="w-4 h-4" />
                                                Copy Repo
                                            </button>
                                        </div>
                                    </div>

                                    {/* Backend Repo */}
                                    <div className="bg-[rgb(var(--sidebar-bg))] border border-[rgb(var(--border-color))] rounded-3xl p-6 shadow-xl space-y-4 transition-colors duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[rgba(var(--accent-purple),0.1)] text-[rgb(var(--accent-purple))] rounded-xl flex items-center justify-center">
                                                <Code className="w-5 h-5" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-bold text-[rgb(var(--primary-text))]">Backend</h3>
                                                <p className="text-xs text-[rgb(var(--secondary-text))]">FastAPI & Python</p>
                                            </div>
                                        </div>
                                        <div className="bg-[rgb(var(--main-surface))] border border-[rgb(var(--border-color))] rounded-xl p-3 flex flex-col gap-2">
                                            <code className="text-[10px] text-[rgb(var(--accent-purple))] truncate font-mono">
                                                github.com/user/project-backend
                                            </code>
                                            <button className="w-full py-2 bg-[rgb(var(--accent-purple))] text-white text-xs font-bold rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                                                <Github className="w-4 h-4" />
                                                Copy Repo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
