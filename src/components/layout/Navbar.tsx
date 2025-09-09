
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

export function Navbar() {
  const { profile, signOut } = useAuth();
  
  const getInitials = () => {
    if (!profile?.nome) return "U";
    return profile.nome
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-acordo-500">Acordo Ideal</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url || ""} alt="Avatar" />
                <AvatarFallback className="bg-acordo-500 text-white">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link to="/perfil" className="w-full">Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/configuracoes" className="w-full">Configurações</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={() => signOut()} className="w-full text-left text-red-500">Sair</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
