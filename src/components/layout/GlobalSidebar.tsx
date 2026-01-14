import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/slices/userSlice";
import {
    LayoutGrid,
    MessageSquare,
    Settings,
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const GlobalSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        dispatch(clearUser());
        navigate("/login");
    };

    const navItems = [
        {
            id: "ai_selection",
            icon: <LayoutGrid className="w-6 h-6" />,
            label: "AI Hub",
            path: "/selection"
        },
        {
            id: "user_message",
            icon: <MessageSquare className="w-6 h-6" />,
            label: "Messages",
            path: "/message"
        },
    ];

    const bottomItems = [
        {
            id: "settings",
            icon: <Settings className="w-6 h-6" />,
            label: "Settings",
            path: "/settings"
        },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="w-20 h-screen bg-[rgb(var(--sidebar-bg))] border-r border-[rgb(var(--border-color))] flex flex-col items-center py-6 gap-8 transition-colors duration-300">
            {/* Logo / Brand */}
            <div className="w-12 h-12 bg-[rgb(var(--button-primary))] rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-[rgb(var(--button-primary))/20]">
                AI
            </div>

            {/* Main Nav */}
            <div className="flex-1 flex flex-col gap-4">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => navigate(item.path)}
                        className={cn(
                            "group relative p-3 rounded-xl transition-all duration-200",
                            isActive(item.path)
                                ? "bg-[rgb(var(--hover-bg))] text-[rgb(var(--button-primary))] shadow-sm"
                                : "text-[rgb(var(--secondary-text))] hover:bg-[rgb(var(--hover-bg))] hover:text-[rgb(var(--primary-text))]"
                        )}
                        title={item.label}
                    >
                        {item.icon}
                        {isActive(item.path) && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[rgb(var(--button-primary))] rounded-l-full" />
                        )}
                        {/* Tooltip on hover */}
                        <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                            {item.label}
                        </div>
                    </button>
                ))}
            </div>

            {/* Bottom Nav */}
            <div className="flex flex-col gap-4 border-t border-[rgb(var(--border-color))] pt-6">
                {bottomItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => navigate(item.path)}
                        className={cn(
                            "group relative p-3 rounded-xl transition-all duration-200",
                            isActive(item.path)
                                ? "bg-[rgb(var(--hover-bg))] text-[rgb(var(--button-primary))]"
                                : "text-[rgb(var(--secondary-text))] hover:bg-[rgb(var(--hover-bg))] hover:text-[rgb(var(--primary-text))]"
                        )}
                        title={item.label}
                    >
                        {item.icon}
                        <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                            {item.label}
                        </div>
                    </button>
                ))}

                <button
                    onClick={handleLogout}
                    className="group relative p-3 rounded-xl text-[rgb(var(--secondary-text))] hover:bg-[rgb(var(--error-color))/10] hover:text-[rgb(var(--error-color))] transition-all duration-200"
                    title="Logout"
                >
                    <LogOut className="w-6 h-6" />
                    <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                        Logout
                    </div>
                </button>
            </div>
        </div>
    );
};

export default GlobalSidebar;
