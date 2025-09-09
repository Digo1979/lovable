
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar,
  Home,
  User,
  Settings,
  LogOut,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "Clientes",
      path: "/clientes",
      icon: User,
    },    
    {
      name: "Acordo",
      path: "/acordo",
      icon: FileText,
    },
    // {
    //   name: "Agenda",
    //   path: "/agenda",
    //   icon: Calendar,
    // },
    {
      name: "Perfil",
      path: "/perfil",
      icon: User,
    },
    {
      name: "Configurações",
      path: "/configuracoes",
      icon: Settings,
    },
  ];

  return (
    <aside 
      className={cn(
        "bg-sidebar border-r border-sidebar-border h-screen transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
      <img src="logo_64x64.png" width="20" height="20"/>
        {!collapsed && (          
          <Link to="/dashboard" className="font-bold text-acordo-500 text-xl">
            Acordo Ideal  
          </Link>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm",
                  location.pathname === item.path 
                    ? "bg-acordo-500 text-white" 
                    : "text-foreground hover:bg-sidebar-accent",
                  collapsed ? "justify-center" : ""
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <button 
          onClick={() => signOut()}
          className={cn(
            "flex items-center text-sm text-foreground hover:text-acordo-500", 
            collapsed ? "justify-center" : "w-full"
          )}
        >
          <LogOut className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
