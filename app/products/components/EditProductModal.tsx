"use client";

import LoadingDots from "../../components/LoadingDots";
import { useEffect } from "react";

interface Warehouse {
  warehouseId: number;
  warehouseName: string;
}

interface Supplier {
  supplierId: number;
  supplierName: string;
}

interface EditProductForm {
  productId: number;
  productName: string;
  sku: string;
  category: string;
  unitPrice: string;
  quantity: string;
  minimumQuantity: string;
  maximumQuantity: string;
  warehouseId: string;
  supplierId: string;
}

interface EditProductModalProps {
  show: boolean;
  form: EditProductForm;
  warehouses: Warehouse[];
  suppliers: Supplier[];
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onFormChange: (form: EditProductForm) => void;
}

export default function EditProductModal({
  show,
  form,
  warehouses,
  suppliers,
  isLoading,
  onClose,
  onSubmit,
  onFormChange,
}: EditProductModalProps) {
  useEffect(() => {
    if (show && !form.sku) {
      const generatedSku = Date.now().toString().slice(-8);
      onFormChange({ ...form, sku: generatedSku });
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden border-2 border-blue-200/50 max-h-[calc(90vh-88px)]">
        <div className="sticky top-0 bg-blue-600 text-white p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">Editar Produto</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Fechar modal de edição do produto"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-176px)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome do Produto *
              </label>
              <input
                type="text"
                value={form.productName}
                onChange={(e) =>
                  onFormChange({ ...form, productName: e.target.value })
                }
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-gray-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Código *
              </label>
              <input
                type="text"
                value={form.sku}
                readOnly
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-gray-500 transition-all bg-gray-100 cursor-not-allowed"
                placeholder="Será gerado automaticamente"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cor *
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) =>
                  onFormChange({ ...form, category: e.target.value })
                }
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-gray-500 transition-all"
                title="Digite a cor do produto"
                placeholder="Digite a cor"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preço Unitário *
              </label>
              <input
                type="number"
                step="0.01"
                value={form.unitPrice}
                onChange={(e) =>
                  onFormChange({ ...form, unitPrice: e.target.value })
                }
                required
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-gray-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tamanho *
              </label>
              <select
                value={form.warehouseId}
                onChange={(e) =>
                  onFormChange({ ...form, warehouseId: e.target.value })
                }
                required
                title="Selecione um tamanho"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-gray-500 transition-all"
              >
                <option value="">Selecionar Tamanho</option>
                {warehouses.map((w) => (
                  <option key={w.warehouseId} value={w.warehouseId}>
                    {w.warehouseName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fornecedor *
              </label>
              <select
                value={form.supplierId}
                onChange={(e) =>
                  onFormChange({ ...form, supplierId: e.target.value })
                }
                required
                title="Selecione um fornecedor"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-gray-500 transition-all"
              >
                <option value="">Selecionar Fornecedor</option>
                {suppliers.map((s) => (
                  <option key={s.supplierId} value={s.supplierId}>
                    {s.supplierName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantidade Atual
              </label>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) =>
                  onFormChange({ ...form, quantity: e.target.value })
                }
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
                title="A quantidade é gerenciada através de compras, vendas ou manualmente"
              />
              <p className="text-xs text-gray-500 mt-1">
                Atualizado via compras/vendas ou manual
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantidade Mínima
              </label>
              <input
                type="number"
                value={form.minimumQuantity}
                onChange={(e) =>
                  onFormChange({ ...form, minimumQuantity: e.target.value })
                }
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-gray-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantidade Máxima
              </label>
              <input
                type="number"
                value={form.maximumQuantity}
                onChange={(e) =>
                  onFormChange({ ...form, maximumQuantity: e.target.value })
                }
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-gray-500 transition-all"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-700/90 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500/30"
            >
              {isLoading ? <LoadingDots /> : "Atualizar Produto"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-3 bg-white/60 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/80 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200/50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
