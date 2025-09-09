
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Acordo from "./pages/Acordo/Acordo";
import Clientes from "./pages/Clientes/Clientes";
import Agenda from "./pages/Agenda/Agenda";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Processo from "./pages/Processo/Processo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/acordo" element={<Acordo />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/configuracoes" element={<Settings />} />
            <Route path="/processo" element={<Processo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
