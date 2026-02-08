// import { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import { TopNav } from "./TopNav";
// import { Sidebar } from "./Sidebar";

// export const AppLayout = () => {
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   useEffect(() => {
//     // Set dark mode by default
//     if (isDarkMode) {
//       document.documentElement.classList.remove("light");
//     } else {
//       document.documentElement.classList.add("light");
//     }
//   }, [isDarkMode]);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Background gradient */}
//       <div className="fixed inset-0 gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      
//       <TopNav isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      
//       <div className="flex w-full">
//         <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        
//         <main className="flex-1 overflow-auto">
//           <div className="container max-w-7xl py-6 px-4 lg:px-8">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };



import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";
import AuthModal from "../AuthModal";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "@/lib/supabase";

export const AppLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const { user, loading } = useAuth();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

      <TopNav
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        user={user}
        openAuth={() => setShowAuth(true)}
        onLogout={signOut}
      />

      <div className="flex w-full">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          user={user}
          openAuth={() => setShowAuth(true)}
        />

        <main className="flex-1 overflow-auto">
          <div className="container max-w-7xl py-6 px-4 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Login Modal */}
      {showAuth && !user && (
        <AuthModal onClose={() => setShowAuth(false)} />
      )}
    </div>
  );
};
