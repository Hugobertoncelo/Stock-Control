"use client";
import { useEffect, useState } from "react";

interface Warehouse {
  warehouseId: number;
  warehouseName: string;
}

interface Supplier {
  supplierId: number;
  supplierName: string;
}

interface NewProductForm {
  productName: string;
  sku: string;
  category: string;
  unitPrice: string;
  warehouseId: string;
  supplierId: string;
  minimumQuantity: string;
  maximumQuantity: string;
  currentQuantity: string;
}

interface AddProductModalProps {
  show: boolean;
  form: NewProductForm;
  warehouses: Warehouse[];
  suppliers: Supplier[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onFormChange: (form: NewProductForm) => void;
  onAddSupplier: () => void;
  onAddWarehouse: () => void;
}

export default function AddProductModal({
  show,
  form,
  warehouses,
  suppliers,
  onClose,
  onSubmit,
  onFormChange,
  onAddSupplier,
  onAddWarehouse,
}: AddProductModalProps) {
  const [manualSku, setManualSku] = useState(false);

  useEffect(() => {
    if (show) {
      if (!manualSku && !form.sku) {
        const generatedSku = Date.now().toString().slice(-8);
        onFormChange({ ...form, sku: generatedSku });
      }
    }
  }, [show, manualSku]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-3xl my-8 border-2 border-blue-200/50">
        <div className="bg-blue-600 p-6 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Adicionar Novo Produto
              </h2>
              <p className="text-blue-100 mt-1">
                Crie um novo produto em seu inventário
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300"
              title="Fechar modal"
              aria-label="Fechar modal de adicionar produto"
            >
              <svg
                className="w-6 h-6"
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
        </div>

        <form onSubmit={onSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-2">
            <div className="md:col-span-2">
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Digite o nome do produto"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Código *
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={manualSku}
                  onChange={(e) => {
                    setManualSku(e.target.checked);
                    if (!e.target.checked) {
                      const generatedSku = Date.now().toString().slice(-8);
                      onFormChange({ ...form, sku: generatedSku });
                    } else {
                      onFormChange({ ...form, sku: "" });
                    }
                  }}
                  id="manualSkuCheckbox"
                  className="mr-2"
                />
                <label
                  htmlFor="manualSkuCheckbox"
                  className="text-sm text-gray-600 select-none cursor-pointer"
                >
                  Definir código manualmente
                </label>
              </div>
              <input
                type="text"
                value={form.sku}
                onChange={
                  manualSku
                    ? (e) => onFormChange({ ...form, sku: e.target.value })
                    : undefined
                }
                readOnly={!manualSku}
                required
                className={`w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  manualSku
                    ? "bg-white cursor-text"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
                placeholder={
                  manualSku
                    ? "Digite o código do produto"
                    : "Será gerado automaticamente"
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categoria
              </label>
              <div className="flex gap-2">
                <select
                  value={form.category}
                  onChange={(e) =>
                    onFormChange({ ...form, category: e.target.value })
                  }
                  title="Selecione uma categoria"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Selecionar Categoria</option>
                  <option value="roupa">Roupa</option>
                  <option value="acessorios">Acessórios</option>
                  <option value="eletronicos">Eletrônicos</option>
                  <option value="calçados">Calçados</option>
                  <option value="alimentos">Alimentos</option>
                  <option value="papelaria">Papelaria</option>
                  <option value="cosmeticos">Cosméticos</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preço Unitário (R$) *
              </label>
              <input
                type="number"
                value={form.unitPrice}
                onChange={(e) =>
                  onFormChange({ ...form, unitPrice: e.target.value })
                }
                required
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Armazém *
              </label>
              <div className="flex gap-2">
                <select
                  value={form.warehouseId}
                  onChange={(e) =>
                    onFormChange({ ...form, warehouseId: e.target.value })
                  }
                  required
                  title="Selecione um armazém"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Selecionar Armazém</option>
                  {warehouses.map((w) => (
                    <option key={w.warehouseId} value={w.warehouseId}>
                      {w.warehouseName}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={onAddWarehouse}
                  className="px-4 py-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-700/90 active:bg-blue-800 font-semibold whitespace-nowrap shadow-lg hover:shadow-xl active:shadow-2xl transition-all duration-300 border border-blue-500/30 active:border-blue-600"
                  title="Adicionar novo armazém"
                >
                  + Adicionar
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fornecedor *
              </label>
              <div className="flex gap-2">
                <select
                  value={form.supplierId}
                  onChange={(e) =>
                    onFormChange({ ...form, supplierId: e.target.value })
                  }
                  required
                  title="Selecione um fornecedor"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Selecionar Fornecedor</option>
                  {suppliers.map((s) => (
                    <option key={s.supplierId} value={s.supplierId}>
                      {s.supplierName}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={onAddSupplier}
                  className="px-4 py-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-700/90 active:bg-blue-800 font-semibold whitespace-nowrap shadow-lg hover:shadow-xl active:shadow-2xl transition-all duration-300 border border-blue-500/30 active:border-blue-600"
                  title="Adicionar Novo Fornecedor"
                >
                  + Adicionar
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantidade Atual
              </label>
              <input
                type="number"
                value={form.currentQuantity || "0"}
                onChange={(e) =>
                  onFormChange({ ...form, currentQuantity: e.target.value })
                }
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
                title="A quantidade é gerenciada por meio de compras e vendas, mas também pode ser definida manualmente aqui"
              />
              <p className="text-xs text-gray-500 mt-1">
                Atualizado via compras ou manual
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-700/90 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-blue-500/30"
            >
              Criar Produto
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white/60 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/80 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200/50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
