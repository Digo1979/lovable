
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();
  const { signUp, user } = useAuth();

  // Redirect if already logged in
  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (form.password !== form.confirmPassword) {
      setTimeout(() => {
        alert("As senhas não coincidem!");
        setIsLoading(false);
      }, 0);
      return;
    }
    
    try {
      await signUp(form.email, form.password, form.name);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Crie sua conta"
      description="Preencha os campos abaixo para criar sua conta."
      footer="Já tem uma conta?"
      footerLink="/login"
      footerLinkText="Faça login"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome completo
          </label>
          <div className="mt-1">
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={form.name}
              onChange={handleChange}
              className="block w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <div className="mt-1">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              className="block w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <div className="mt-1">
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={form.password}
              onChange={handleChange}
              className="block w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirmar senha
          </label>
          <div className="mt-1">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="block w-full"
            />
          </div>
        </div>

        <div className="flex items-center">
          <Checkbox id="terms" required />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            Eu concordo com os{" "}
            <a href="#" className="font-medium text-acordo-500 hover:text-acordo-600">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a href="#" className="font-medium text-acordo-500 hover:text-acordo-600">
              Política de Privacidade
            </a>
          </label>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full bg-acordo-500 hover:bg-acordo-600"
            disabled={isLoading}
          >
            {isLoading ? "Cadastrando..." : "Criar conta"}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
