"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import LoadingDots from "@/app/components/LoadingDots";

interface Warehouse {
  warehouseId: number;
  warehouseName: string;
}

interface Supplier {
  supplierId: number;
  supplierName: string;
}

interface Product {
  productId: number;
  productName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  minimumQuantity: number;
  maximumQuantity: number;
  warehouseId: number | null;
  supplierId: number | null;
}

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [productId, setProductId] = useState<string | null>(null);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    category: "",
    unitPrice: "",
    quantity: "",
    minimumQuantity: "",
    maximumQuantity: "",
    warehouseId: "",
    supplierId: "",
  });

  useEffect(() => {
    params.then((resolvedParams) => {
      setProductId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
      fetchWarehouses();
      fetchSuppliers();
    }
  }, [productId]);

  const fetchProduct = async () => {
    if (!productId) return;

    try {
      const response = await fetch(`/api/products/${productId}`);
      const result = await response.json();

      if (response.status === 404) {
        notFound();
        return;
      }

      if (result.success) {
        const product = result.data;
        setFormData({
          productName: product.productName,
          sku: product.sku,
          category: product.category || "",
          unitPrice: product.unitPrice.toString(),
          quantity: product.quantity.toString(),
          minimumQuantity: product.minimumQuantity.toString(),
          maximumQuantity: product.maximumQuantity.toString(),
          warehouseId: product.warehouseId?.toString() || "",
          supplierId: product.supplierId?.toString() || "",
        });
      } else {
        setMessage({ type: "error", text: "Falha ao carregar o produto" });
        setTimeout(() => router.push("/products"), 2000);
      }
    } catch (error) {
      console.error("Erro ao buscar o produto:", error);
      setTimeout(() => router.push("/products"), 2000);
    } finally {
      setFetching(false);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await fetch("/api/warehouses");
      const result = await response.json();
      if (result.success) {
        setWarehouses(result.data);
      }
    } catch (error) {
      console.error("Erro ao buscar armazéns:", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("/api/suppliers");
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({
          type: "success",
          text: "Produto atualizado com sucesso!",
        });
        setTimeout(() => router.push("/products"), 1500);
      } else {
        setMessage({
          type: "error",
          text: "Falha ao atualizar o produto: " + result.error,
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
      setMessage({
        type: "error",
        text: "Ocorreu um erro ao atualizar o produto",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <LoadingDots />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Editar Produto
              </h1>
              <p className="text-gray-600 mt-1">
                Atualizar informações do produto
              </p>
            </div>
            <Link
              href="/products"
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              ← Voltar para Produtos
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8">
          {message && (
            <div
              className={`mb-6 p-3 rounded-lg text-center font-semibold border transition-all duration-300 ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 border-green-300"
                  : "bg-red-100 text-red-800 border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Informações do Produto
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="productName"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Nome do Produto *
                    </label>
                    <input
                      type="text"
                      id="productName"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder="Digite o nome do produto"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sku"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Código *
                    </label>
                    <input
                      type="text"
                      id="sku"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder="Exemplo: PROD001"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Categoria
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder="Exemplo: Eletrônicos"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Preços & Estoque
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label
                      htmlFor="unitPrice"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Preço Unitário (R$) *
                    </label>
                    <input
                      type="number"
                      id="unitPrice"
                      name="unitPrice"
                      value={formData.unitPrice}
                      onChange={handleChange}
                      required
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Quantidade Atual
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      readOnly
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="minimumQuantity"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Quantidade Mínima
                    </label>
                    <input
                      type="number"
                      id="minimumQuantity"
                      name="minimumQuantity"
                      value={formData.minimumQuantity}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="maximumQuantity"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Quantidade Máxima
                    </label>
                    <input
                      type="number"
                      id="maximumQuantity"
                      name="maximumQuantity"
                      value={formData.maximumQuantity}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Armazém & Fornecedor
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="warehouseId"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Armazém
                    </label>
                    <select
                      id="warehouseId"
                      name="warehouseId"
                      value={formData.warehouseId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Selecionar Armazém (Opcional)</option>
                      {warehouses.map((warehouse) => (
                        <option
                          key={warehouse.warehouseId}
                          value={warehouse.warehouseId}
                        >
                          {warehouse.warehouseName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="supplierId"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Fornecedor
                    </label>
                    <select
                      id="supplierId"
                      name="supplierId"
                      value={formData.supplierId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Selecionar Fornecedor (Opcional)</option>
                      {suppliers.map((supplier) => (
                        <option
                          key={supplier.supplierId}
                          value={supplier.supplierId}
                        >
                          {supplier.supplierName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {loading ? <LoadingDots /> : "Atualizar Produto"}
                </button>
                <Link
                  href="/products"
                  className="px-6 py-3 bg-white text-gray-900 border border-gray-900 rounded-lg hover:bg-gray-100 font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Cancelar
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
