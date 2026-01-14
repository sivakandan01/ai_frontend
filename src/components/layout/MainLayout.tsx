import { Outlet, useLocation } from "react-router-dom";
import GlobalSidebar from "./GlobalSidebar";

const MainLayout = () => {
    const location = useLocation();

    // Hide sidebar on specific AI feature routes and their children
    const hiddenRoutes = ["/selection/upload", "/selection/chat", "/selection/image", "/selection/mermaid"];
    const shouldHideSidebar = hiddenRoutes.some(path => location.pathname.startsWith(path));

    return (
        <div className="flex h-screen w-full bg-[rgb(var(--main-surface))] overflow-hidden transition-colors duration-300">
            {!shouldHideSidebar && <GlobalSidebar />}

            <main className="flex-1 overflow-auto relative">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
