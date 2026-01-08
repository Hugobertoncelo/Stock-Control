"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import * as XLSX from "xlsx";

export default function ReportsPage() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (user && !isAdmin) {
      router.push("/");
      return;
    }
  }, [user, isAdmin, router]);

  const downloadReport = async (reportType: string, fileName: string) => {
    try {
      const response = await fetch(`/api/reports/${reportType}`);
      if (!response.ok) {
        throw new Error("Falha ao obter os dados do relatório");
      }

      const data = await response.json();

      if (data.length === 0) {
        toast.warning(
          `Nenhum dado de ${reportType} disponível para exportação`
        );
        return;
      }

      const ws = XLSX.utils.json_to_sheet(data);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        wb,
        ws,
        reportType.charAt(0).toUpperCase() + reportType.slice(1)
      );

      XLSX.writeFile(
        wb,
        `${fileName}_${new Date().toISOString().split("T")[0]}.xlsx`
      );
    } catch (error) {
      console.error("Erro ao baixar o relatório:", error);
      toast.error("Falha ao baixar o relatório");
    }
  };

  if (!user || !isAdmin) {
    return null;
  }

  const reports = [
    {
      title: "Relatório de produtos",
      description:
        "Exportar todos os produtos com detalhes, incluindo códigos, preços, quantidades e cores",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      color: "blue",
      reportType: "products",
      fileName: "products_report",
    },
    {
      title: "Relatório de compras",
      description:
        "Exportar todos os registros de compras com detalhes do fornecedor, quantidades e custos",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "green",
      reportType: "purchases",
      fileName: "purchases_report",
    },
    {
      title: "Relatório de vendas",
      description:
        "Exportar todos os registros de vendas com detalhes do cliente, receita e lucro/prejuízo",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "orange",
      reportType: "sales",
      fileName: "sales_report",
    },
    {
      title: "Relatório de usuários",
      description:
        "Exportar todas as contas de usuário com funções e datas de criação de conta",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      color: "yellow",
      reportType: "users",
      fileName: "users_report",
    },
    {
      title: "Relatório de clientes",
      description:
        "Exportar todas as informações de clientes, incluindo detalhes de contato",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "teal",
      reportType: "customers",
      fileName: "customers_report",
    },
    {
      title: "Relatório de fornecedores",
      description:
        "Exportar todas as informações de fornecedores, incluindo detalhes de contato",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      color: "purple",
      reportType: "suppliers",
      fileName: "suppliers_report",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: {
      [key: string]: {
        bg: string;
        iconBg: string;
        iconText: string;
        buttonBg: string;
        buttonHover: string;
        cardBg: string;
        cardBorder: string;
        title: string;
      };
    } = {
      blue: {
        bg: "bg-gradient-to-br from-blue-50/80 to-cyan-50/60",
        iconBg: "bg-blue-600/80",
        iconText: "text-white",
        buttonBg: "bg-gradient-to-r from-blue-600 to-cyan-600",
        buttonHover: "hover:from-blue-500 hover:to-cyan-500",
        cardBg: "bg-gradient-to-br from-blue-50/60 to-cyan-50/40",
        cardBorder: "border-blue-200/50",
        title: "text-blue-900",
      },
      green: {
        bg: "bg-gradient-to-br from-green-50/80 to-emerald-50/60",
        iconBg: "bg-green-600/80",
        iconText: "text-white",
        buttonBg: "bg-gradient-to-r from-green-600 to-emerald-600",
        buttonHover: "hover:from-green-500 hover:to-emerald-500",
        cardBg: "bg-gradient-to-br from-green-50/60 to-emerald-50/40",
        cardBorder: "border-green-200/50",
        title: "text-green-900",
      },
      orange: {
        bg: "bg-gradient-to-br from-orange-50/80 to-red-50/60",
        iconBg: "bg-orange-600/80",
        iconText: "text-white",
        buttonBg: "bg-gradient-to-r from-orange-600 to-red-600",
        buttonHover: "hover:from-orange-500 hover:to-red-500",
        cardBg: "bg-gradient-to-br from-orange-50/60 to-red-50/40",
        cardBorder: "border-orange-200/50",
        title: "text-orange-900",
      },
      yellow: {
        bg: "bg-gradient-to-br from-yellow-50/80 to-amber-50/60",
        iconBg: "bg-yellow-600/80",
        iconText: "text-white",
        buttonBg: "bg-gradient-to-r from-yellow-600 to-amber-600",
        buttonHover: "hover:from-yellow-500 hover:to-amber-500",
        cardBg: "bg-gradient-to-br from-yellow-50/60 to-amber-50/40",
        cardBorder: "border-yellow-200/50",
        title: "text-yellow-900",
      },
      teal: {
        bg: "bg-gradient-to-br from-teal-50/80 to-cyan-50/60",
        iconBg: "bg-teal-600/80",
        iconText: "text-white",
        buttonBg: "bg-gradient-to-r from-teal-600 to-cyan-600",
        buttonHover: "hover:from-teal-500 hover:to-cyan-500",
        cardBg: "bg-gradient-to-br from-teal-50/60 to-cyan-50/40",
        cardBorder: "border-teal-200/50",
        title: "text-teal-900",
      },
      purple: {
        bg: "bg-gradient-to-br from-purple-50/80 to-indigo-50/60",
        iconBg: "bg-purple-600/80",
        iconText: "text-white",
        buttonBg: "bg-gradient-to-r from-purple-600 to-indigo-600",
        buttonHover: "hover:from-purple-500 hover:to-indigo-500",
        cardBg: "bg-gradient-to-br from-purple-50/60 to-indigo-50/40",
        cardBorder: "border-purple-200/50",
        title: "text-purple-900",
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 pt-24">
        <div className="mb-8">
          <div className="mb-4">
            <div className="flex justify-center items-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Relatórios
                </h1>
                <p className="text-gray-600 mt-1">
                  Baixar relatórios em Excel para todos os dados do sistema
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => {
            const colorClasses = getColorClasses(report.color);
            return (
              <div
                key={report.reportType}
                className={`group relative ${colorClasses.cardBg} backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl border ${colorClasses.cardBorder} p-6 transform hover:scale-105 transition-all duration-300 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative flex items-center mb-4">
                  <div
                    className={`rounded-xl p-3 mr-4 ${colorClasses.iconBg} backdrop-blur-sm shadow-lg shadow-current/20 ${colorClasses.iconText} transform group-hover:rotate-12 transition-transform duration-300 border border-current/30`}
                  >
                    {report.icon}
                  </div>
                  <h2 className={`text-xl font-bold ${colorClasses.title}`}>
                    {report.title}
                  </h2>
                </div>
                <p className="text-gray-600 mb-6 text-sm">
                  Exportar todos os dados de {report.reportType} com informações
                  detalhadas
                </p>
                <button
                  onClick={() =>
                    downloadReport(report.reportType, report.fileName)
                  }
                  className={`w-full ${colorClasses.buttonBg} text-white ${colorClasses.buttonHover} font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center backdrop-blur-sm border border-current/30`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Baixar Excel
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-blue-50/60 backdrop-blur-md border border-blue-200/50 rounded-2xl shadow-xl p-6">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-blue-600 mr-3 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-blue-900 font-semibold mb-2">
                Sobre os Relatórios
              </h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Os relatórios são gerados no formato Excel (.xlsx)</li>
                <li>
                  • Os nomes dos arquivos incluem a data atual para fácil
                  identificação
                </li>
                <li>
                  • Todos os dados são exportados com detalhes e formatação
                  completos
                </li>
                <li>
                  • Os relatórios estão disponíveis apenas para usuários
                  administradores
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
