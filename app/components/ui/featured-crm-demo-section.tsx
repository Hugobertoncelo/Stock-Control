"use client";

import {
  TrendingUp,
  TrendingDown,
  Package,
  Archive,
  AlertTriangle,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrazilianRealSign } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ProductSearch from "./product-search";
import { useEffect, useState } from "react";

interface DashboardStats {
  totalProducts: number;
  totalInventoryValue: string;
  totalStockQuantity: number;
  lowStockCount: number;
  totalRevenue?: string;
  totalProfit?: string;
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  trendDirection?: "up" | "down";
  color: "blue" | "green" | "purple" | "red";
}

interface ProductSearchItem {
  id: string;
  name: string;
  code: string;
  price: number;
  imageUrl?: string;
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendDirection,
  color,
}: StatCardProps) {
  const colorConfig = {
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      bg: "from-blue-50/80 to-cyan-50/60",
      iconBg: "from-blue-500 to-cyan-600",
      text: "text-blue-600",
      glow: "shadow-blue-500/20",
    },
    green: {
      gradient: "from-green-500 to-emerald-500",
      bg: "from-green-50/80 to-emerald-50/60",
      iconBg: "from-green-500 to-emerald-600",
      text: "text-green-600",
      glow: "shadow-green-500/20",
    },
    purple: {
      gradient: "from-purple-500 to-pink-500",
      bg: "from-purple-50/80 to-pink-50/60",
      iconBg: "from-purple-500 to-pink-600",
      text: "text-purple-600",
      glow: "shadow-purple-500/20",
    },
    red: {
      gradient: "from-red-500 to-orange-500",
      bg: "from-red-50/80 to-orange-50/60",
      iconBg: "from-red-500 to-orange-600",
      text: "text-red-600",
      glow: "shadow-red-500/20",
    },
  };

  const config = colorConfig[color];

  return (
    <div
      className={`group relative bg-linear-to-br ${config.bg} backdrop-blur-md border border-white/60 rounded-2xl p-4 sm:p-6 hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl ${config.glow} overflow-hidden`}
    >
      <div
        className={`absolute inset-0 bg-linear-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      ></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-linear-to-br from-white/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

      <div className="relative">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600">
            {title}
          </h3>
          {trend && trendDirection && (
            <div
              className={`flex items-center gap-1 text-xs sm:text-sm font-semibold ${
                trendDirection === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trendDirection === "up" ? (
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
              {trend}
            </div>
          )}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {value}
            </p>
            {subtitle && (
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <div
            className={`p-2 sm:p-3 rounded-xl bg-linear-to-br ${config.iconBg} shadow-lg ${config.glow} text-white transform group-hover:rotate-12 transition-transform duration-300`}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedCrmDemoSection({
  stats,
}: {
  stats: DashboardStats;
}) {
  const [products, setProducts] = useState<ProductSearchItem[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const productsWithImages = data.data.map((p: any) => ({
          id: p.productId.toString(),
          name: p.productName,
          code: p.sku,
          price: Number(p.unitPrice),
          imageUrl: `/api/products/photo?productId=${p.productId}`,
        }));
        setProducts(productsWithImages);
      }
    }
    fetchProducts();
  }, []);

  const statCards: StatCardProps[] = [
    {
      title: "Total de Produtos",
      value: stats.totalProducts.toString(),
      icon: <Package className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "blue",
    },
    {
      title: "Valor do Estoque",
      value: `R$${stats.totalInventoryValue}`,
      icon: (
        <FontAwesomeIcon
          icon={faBrazilianRealSign}
          className="text-xl w-5 h-5 sm:w-6 sm:h-6"
        />
      ),
      color: "green",
    },
    {
      title: "Estoque Total",
      value: stats.totalStockQuantity.toString(),
      icon: <Archive className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "purple",
    },
    {
      title: "Itens com Baixo Estoque",
      value: stats.lowStockCount.toString(),
      icon: <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "red",
    },
  ];

  return (
    <>
      <div className="mb-6">
        <ProductSearch products={products} />
      </div>
      <div className="w-full relative bg-white/40 backdrop-blur-md border border-gray-200/50 rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="absolute inset-0 bg-linear-to-br from-white/50 to-transparent"></div>
        <div className="relative">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-1 sm:mb-2">
              Visão Geral do Estoque
            </h2>

            <p className="text-xs sm:text-sm text-gray-600">
              Informações em tempo real sobre a gestão do seu estoque.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {statCards.map((stat, index) =>
              index === 0 ? (
                <Link href="/products" key={index} className="cursor-pointer">
                  <StatCard {...stat} />
                </Link>
              ) : (
                <StatCard key={index} {...stat} />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
