"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Book,
  FileText,
  Code,
  Settings,
  Home,
  Layers,
  Database,
  Play,
  Wrench,
  Zap,
  Shield,
  BarChart3,
  Users,
  Package,
  Star,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

interface Section {
  icon: any;
  title: string;
  href: string;
  category:
    | "overview"
    | "features"
    | "technical"
    | "setup"
    | "usage"
    | "development";
  priority: number;
}

interface DataCard {
  title: string;
  items: string[];
  icon: any;
  color: string;
  bgColor: string;
}

interface TechStackItem {
  name: string;
  version: string;
  description: string;
  category: "frontend" | "backend" | "devops";
}

interface QuickAccessCard {
  title: string;
  description: string;
  icon: any;
  href: string;
  color: string;
  bgColor: string;
}

interface InstallationStep {
  step: number;
  title: string;
  description: string;
  command?: string;
  code?: string;
  language?: string;
}

interface APIEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  request?: string;
  response?: string;
}

interface Prerequisite {
  name: string;
  version: string;
  description: string;
  required: boolean;
}

export default function DocumentationPage() {
  const [readmeContent, setReadmeContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/documentation")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReadmeContent(data.content);
          console.log("README loaded, length:", data.content.length);
          console.log("First 200 chars:", data.content.substring(0, 200));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading README:", err);
        setLoading(false);
      });
  }, []);

  const coreFeatures: DataCard = {
    title: "Recursos principais",
    items: [
      "Gerenciamento de Produtos com geração e categorização de SKU",
      "Gerenciamento de Compras com criação automática de lotes de estoque",
      "Gerenciamento de Vendas com cálculo de custo FIFO",
      "Suporte a Múltiplos Armazéns com níveis de estoque em tempo real",
      "Rastreamento de Movimentação de Estoque com trilhas de auditoria completas",
      "Gerenciamento de Clientes e Fornecedores com histórico de transações",
      "Gerenciamento de Usuários com controle de acesso baseado em funções",
      "Registro de Atividades para conformidade e solução de problemas",
    ],
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
  };

  const technicalFeatures: DataCard = {
    title: "Recursos Técnicos",
    items: [
      "Avaliação de Inventário FIFO para cálculo de custo preciso",
      "Atualizações de Estoque em Tempo Real em todos os armazéns",
      "Validação de Dados para integridade dos dados",
      "Design Responsivo para acessibilidade móvel",
      "Arquitetura API-First para integrações externas",
      "Transações de Banco de Dados com conformidade ACID",
      "Notificações por E-mail para redefinições de senha",
      "Alertas de Baixo Estoque com notificações automáticas",
    ],
    icon: Shield,
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200",
  };

  const reportingFeatures: DataCard = {
    title: "Recursos de Relatório",
    items: [
      "Relatórios de Vendas com filtragem por data e cliente",
      "Relatórios de Compras com análises de fornecedores",
      "Relatórios de Lucros e Perdas com análise financeira",
      "Relatórios de Produtos com avaliação de inventário",
      "Relatórios de Fornecedores com métricas de desempenho",
      "Relatórios de Clientes com análise de receita",
      "Relatórios de Atividades de Usuários para rastreamento de uso do sistema",
      "Gráficos Diários de Lucros/Perdas com tendências visuais",
    ],
    icon: BarChart3,
    color: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-200",
  };

  const techStackItems: TechStackItem[] = [
    {
      name: "Next.js",
      version: "16.0.7",
      description: "Framework React com App Router",
      category: "frontend",
    },
    {
      name: "React",
      version: "19.2.0",
      description: "Biblioteca de UI moderna com hooks",
      category: "frontend",
    },
    {
      name: "TypeScript",
      version: "5.x",
      description: "Verificação de tipo estático",
      category: "frontend",
    },
    {
      name: "Tailwind CSS",
      version: "3.4.1",
      description: "Framework CSS utilitário",
      category: "frontend",
    },
    {
      name: "Prisma",
      version: "6.19.0",
      description: "ORM de próxima geração",
      category: "backend",
    },
    {
      name: "PostgreSQL",
      version: "16",
      description: "Banco de dados relacional avançado",
      category: "backend",
    },
    {
      name: "Docker",
      version: "latest",
      description: "Plataforma de containerização",
      category: "devops",
    },
    {
      name: "Docker Compose",
      version: "latest",
      description: "Orquestração de múltiplos containers",
      category: "devops",
    },
  ];

  const prerequisites: Prerequisite[] = [
    {
      name: "Node.js",
      version: "18.x or higher",
      description: "Ambiente de execução JavaScript",
      required: true,
    },
    {
      name: "npm",
      version: "9.x or higher",
      description: "Gerenciador de pacotes para Node.js",
      required: true,
    },
    {
      name: "Docker",
      version: "20.x or higher",
      description: "Plataforma de containerização",
      required: true,
    },
    {
      name: "Docker Compose",
      version: "2.x or higher",
      description: "Orquestração de múltiplos containers",
      required: true,
    },
    {
      name: "Git",
      version: "2.x or higher",
      description: "Sistema de controle de versão",
      required: true,
    },
  ];

  const installationSteps: InstallationStep[] = [
    {
      step: 1,
      title: "Clonar o repositório",
      description: "Baixar o código-fonte do projeto do GitHub",
      command: "",
    },
    {
      step: 2,
      title: "Instalar Dependências",
      description: "Instalar todos os pacotes Node.js necessários",
      command: "npm install",
    },
    {
      step: 3,
      title: "Iniciar o banco de dados PostgreSQL",
      description: "Inicie o banco de dados usando o Docker Compose",
      command: "docker-compose up -d",
    },
    {
      step: 4,
      title: "Verificar Conexão com o Banco de Dados",
      description:
        "Certifique-se de que o container PostgreSQL está em execução",
      command: "docker ps",
    },
    {
      step: 5,
      title: "Executar Migrações do Banco de Dados",
      description: "Inicializar o esquema do banco de dados",
      command: "npx prisma migrate deploy",
    },
    {
      step: 6,
      title: "Banco de dados de sementes (opcional)",
      description: "Popular com dados de exemplo",
      command: "npx prisma db seed",
    },
    {
      step: 7,
      title: "Iniciar o Servidor de Desenvolvimento",
      description: "Iniciar o servidor de desenvolvimento",
      command: "npm run dev",
    },
  ];

  const apiEndpoints: APIEndpoint[] = [
    {
      method: "POST",
      path: "/api/auth/login",
      description: "Autenticar um usuário",
      request: `{
  "email": "admin@example.com",
  "password": "admin123"
}`,
      response: `{
  "success": true,
  "data": {
    "userId": 1,
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "ADMIN"
  }
}`,
    },
    {
      method: "GET",
      path: "/api/products",
      description: "Recuperar todos os produtos com filtragem",
      response: `{
  "success": true,
  "data": [...]
}`,
    },
    {
      method: "POST",
      path: "/api/products",
      description: "Criar um novo produto",
      request: `{
  "name": "Novo produto",
  "codigo": "11111111",
  "buyingPrice": 80.00,
  "sellingPrice": 120.00,
  "quantity": 30
}`,
      response: `{
  "success": true,
  "data": { "id": 2, ... }
}`,
    },
    {
      method: "GET",
      path: "/api/purchases",
      description: "Recuperar todas as compras",
      response: `{
  "success": true,
  "data": [...]
}`,
    },
    {
      method: "POST",
      path: "/api/purchases",
      description: "Registrar uma nova compra",
      request: `{
  "productId": 1,
  "supplierId": 1,
  "quantity": 20,
  "buyingPrice": 75.00
}`,
      response: `{
  "success": true,
  "data": { "id": 1, ... }
}`,
    },
  ];

  const getCategoryColor = (category: Section["category"]) => {
    switch (category) {
      case "overview":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "features":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "technical":
        return "text-gray-600 bg-gray-50 border-gray-200";
      case "setup":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "usage":
        return "text-green-600 bg-green-50 border-green-200";
      case "development":
        return "text-indigo-600 bg-indigo-50 border-indigo-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-16 sm:pt-20">
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-14 sm:top-16 z-10">
        <div className="container mx-auto px-4 py-5">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg">
                <Book className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                Documentação
              </h1>
            </div>
            <p className="text-gray-600 text-sm">
              Guia completo para o Sistema de Inventário PrimeGestor
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[coreFeatures, technicalFeatures, reportingFeatures].map(
                  (card, index) => (
                    <div
                      key={card.title}
                      className={`border-2 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 ${card.bgColor}`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`p-2.5 rounded-xl bg-white shadow-md ${card.color}`}
                        >
                          <card.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {card.title}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {card.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Tecnologias
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {techStackItems.map((tech, index) => (
                    <div
                      key={tech.name}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {tech.name}
                        </h4>
                        <span className="text-xs font-mono bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
                          {tech.version}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {tech.description}
                      </p>
                      <span
                        className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                          tech.category === "frontend"
                            ? "bg-blue-100 text-blue-700"
                            : tech.category === "backend"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {tech.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-md">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Arquitetura do Sistema
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Layers className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Camada do Cliente
                    </h4>
                    <p className="text-sm text-gray-600">
                      Frontend Next.js com componentes de interface de usuário
                      responsivos
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Settings className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Camada de Aplicação
                    </h4>
                    <p className="text-sm text-gray-600">
                      Rotas de API com lógica de negócios e validação
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Database className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Camada de Dados
                    </h4>
                    <p className="text-sm text-gray-600">
                      Banco de dados PostgreSQL com Prisma ORM
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl shadow-md">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Pré-requisitos
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prerequisites.map((prereq, index) => (
                    <div
                      key={prereq.name}
                      className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl"
                    >
                      <div
                        className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                          prereq.required ? "bg-red-500" : "bg-yellow-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">
                            {prereq.name}
                          </h4>
                          <span className="text-xs font-mono bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                            {prereq.version}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {prereq.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-md">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Guia de Instalação
                  </h3>
                </div>

                <div className="space-y-4">
                  {installationSteps.map((step, index) => (
                    <div
                      key={step.step}
                      className="flex gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {step.description}
                        </p>
                        {step.command && (
                          <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                            <code>{step.command}</code>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-md">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Gerenciamento de Banco de Dados
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">
                      Gerenciamento de Containers
                    </h4>
                    <div className="space-y-2">
                      <div className="bg-gray-900 text-gray-100 p-2 rounded text-xs font-mono">
                        docker-compose parar
                      </div>
                      <div className="bg-gray-900 text-gray-100 p-2 rounded text-xs font-mono">
                        docker-compose iniciar
                      </div>
                      <div className="bg-gray-900 text-gray-100 p-2 rounded text-xs font-mono">
                        docker-compose derrubar
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">
                      Acesso ao Banco de Dados
                    </h4>
                    <div className="space-y-2">
                      <div className="bg-gray-900 text-gray-100 p-2 rounded text-xs font-mono">
                        docker exec -it inventory_postgres psql -U
                        inventory_user -d inventory_db
                      </div>
                      <div className="bg-gray-900 text-gray-100 p-2 rounded text-xs font-mono">
                        npx prisma studio
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-md">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Referência da API
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    Autenticação
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-mono rounded">
                          POST
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/auth/login
                        </code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Autentica um usuário com email e senha
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <strong>Request:</strong>
                          <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-1 overflow-x-auto">{`{
  "email": "admin@example.com",
  "password": "admin123"
}`}</pre>
                        </div>
                        <div>
                          <strong>Response:</strong>
                          <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-1 overflow-x-auto">{`{
  "success": true,
  "data": {
    "userId": 1,
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "ADMIN"
  }
}`}</pre>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          POST
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/auth/forgot-password
                        </code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Solicitar link de redefinição de senha
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <strong>Request:</strong>
                          <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-1 overflow-x-auto">{`{
  "email": "user@example.com"
}`}</pre>
                        </div>
                        <div>
                          <strong>Response:</strong>
                          <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-1 overflow-x-auto">{`{
  "success": true,
  "message": "Reset link sent"
}`}</pre>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          POST
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/auth/reset-password
                        </code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Redefinir senha usando token
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <strong>Request:</strong>
                          <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-1 overflow-x-auto">{`{
  "token": "reset-token",
  "password": "newpassword123"
}`}</pre>
                        </div>
                        <div>
                          <strong>Response:</strong>
                          <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-1 overflow-x-auto">{`{
  "success": true,
  "message": "Password updated"
}`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Produtos
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/products
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha todos os produtos com filtragem opcional.
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-mono rounded">
                          POST
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/products
                        </code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Crie um novo produto
                      </p>
                      <div className="text-xs">
                        <strong>Request:</strong>
                        <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-1 overflow-x-auto">{`{
  "name": "New Product",
  "sku": "PROD-001",
  "buyingPrice": 100.00,
  "sellingPrice": 150.00,
  "quantity": 50,
  "minQuantity": 10,
  "warehouseId": 1,
  "supplierId": 1,
  "category": "Electronics"
}`}</pre>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-mono rounded">
                          PUT
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/products/[id]
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Atualize um produto existente
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-mono rounded">
                          DELETE
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/products/[id]
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Excluir um produto
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                    Vendas
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/sales
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha todas as transações de vendas
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-mono rounded">
                          POST
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/sales
                        </code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Criar uma nova venda
                      </p>
                      <div className="text-xs">
                        <strong>Request:</strong>
                        <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-1 overflow-x-auto">{`{
  "customerId": 1,
  "productId": 1,
  "quantity": 5,
  "sellingPrice": 150.00
}`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-green-600" />
                    Compras
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/purchases
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha todas as transações de compras
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-mono rounded">
                          POST
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/purchases
                        </code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Crie uma nova compra
                      </p>
                      <div className="text-xs">
                        <strong>Request:</strong>
                        <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-1 overflow-x-auto">{`{
  "supplierId": 1,
  "productId": 1,
  "quantity": 20,
  "buyingPrice": 100.00
}`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-600" />
                    Usuários
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/users
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha todos os usuários (somente para administradores)
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-mono rounded">
                          POST
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/users
                        </code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Crie um novo usuário (somente para administradores)
                      </p>
                      <div className="text-xs">
                        <strong>Request:</strong>
                        <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-1 overflow-x-auto">{`{
  "fullName": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "USER"
}`}</pre>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-mono rounded">
                          PUT
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/users/[id]
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Atualizar informações do usuário
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-mono rounded">
                          DELETE
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/users/[id]
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Excluir um usuário (somente administrador)
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          POST
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/users/change-password
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Alterar senha do usuário
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Home className="w-5 h-5 text-yellow-600" />
                    Armazéns
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/warehouses
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha todos os armazéns
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-mono rounded">
                          POST
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/warehouses
                        </code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Crie um novo armazém
                      </p>
                      <div className="text-xs">
                        <strong>Request:</strong>
                        <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-1 overflow-x-auto">{`{
  "name": "Main Warehouse",
  "location": "123 Main St, City, State"
}`}</pre>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-mono rounded">
                          PUT
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/warehouses/[id]
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Atualizar informações do armazém
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-mono rounded">
                          DELETE
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/warehouses/[id]
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Excluir um armazém
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-teal-600" />
                    Fornecedores
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/suppliers
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha todos os fornecedores
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-mono rounded">
                          POST
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/suppliers
                        </code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Crie um novo fornecedor
                      </p>
                      <div className="text-xs">
                        <strong>Request:</strong>
                        <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-1 overflow-x-auto">{`{
  "name": "ABC Supplies Ltd",
  "email": "contact@abc.com",
  "phone": "+1234567890",
  "address": "456 Supplier St, City, State"
}`}</pre>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-mono rounded">
                          PUT
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/suppliers/[id]
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Atualizar informações do fornecedor
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-mono rounded">
                          DELETE
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/suppliers/[id]
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Excluir um fornecedor
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-pink-600" />
                    Relatórios
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/reports/profit-loss
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha o relatório de lucros e perdas.
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/reports/sales
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha o relatório de vendas.
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/reports/purchases
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha o relatório de compras.
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/reports/customers
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha o relatório de clientes.
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/reports/products
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha o relatório de produtos.
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/reports/suppliers
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha o relatório de fornecedores.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-600" />
                    Outras APIs
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/dashboard
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha estatísticas do painel
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/logs
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha logs de atividade
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/stock-batches
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha informações sobre lotes de estoque
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/customers
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha todos os clientes
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-mono rounded">
                          POST
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/support
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Enviar solicitação de suporte
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">
                          GET
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          /api/documentation
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Obtenha o conteúdo da documentação
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/faq"
                className="flex items-center justify-center gap-3 px-6 py-4 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-900 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Perguntas Frequentes</span>
              </Link>
              <Link
                href="/support"
                className="flex items-center justify-center gap-3 px-6 py-4 text-sm font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-800 border-2 border-gray-900 rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <span>Obter Suporte</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #1f2937, #374151);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #111827, #1f2937);
          }
        `,
        }}
      />
    </div>
  );
}
