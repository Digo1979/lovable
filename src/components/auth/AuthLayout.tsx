
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  footer: string;
  footerLink: string;
  footerLinkText: string;
}

export function AuthLayout({
  children,
  title,
  description,
  footer,
  footerLink,
  footerLinkText,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Link to="/" className="flex justify-center mb-6">
              <h1 className="text-3xl font-bold text-acordo-500">Acordo Ideal</h1>
            </Link>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          </div>

          {children}

          <p className="mt-6 text-center text-sm text-gray-600">
            {footer}{" "}
            <Link to={footerLink} className="font-medium text-acordo-500 hover:text-acordo-600">
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-acordo-500 flex items-center justify-center">
          <div className="text-white p-12 max-w-xl">
            <h2 className="text-3xl font-bold mb-6">Resolução de disputas online simplificada</h2>
            <p className="text-lg mb-8">
              Nossa plataforma facilita o processo de acordos e mediação, tornando a resolução 
              de conflitos mais acessível e eficiente para todos os envolvidos.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2">Processo Simplificado</h3>
                <p className="text-sm">Resolva disputas com apenas alguns cliques, sem burocracia.</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Comunicação Segura</h3>
                <p className="text-sm">Troque mensagens e documentos com segurança e privacidade.</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Acordos Personalizados</h3>
                <p className="text-sm">Crie e gerencie acordos adaptados às suas necessidades.</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Suporte Especializado</h3>
                <p className="text-sm">Conte com nossa equipe para auxiliar em todo o processo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
