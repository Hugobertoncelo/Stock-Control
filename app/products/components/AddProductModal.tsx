"use client";
import { useEffect, useState, useRef } from "react";

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
  onProductChanged?: () => void;
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
  onProductChanged,
}: AddProductModalProps) {
  const [manualSku, setManualSku] = useState(false);
  const [existingProduct, setExistingProduct] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const lastCheckedSku = useRef("");

  useEffect(() => {
    if (show) {
      if (!manualSku && !form.sku) {
        const generatedSku = Date.now().toString().slice(-13);
        onFormChange({ ...form, sku: generatedSku });
      }
    }
  }, [show, manualSku]);

  useEffect(() => {
    if (manualSku && form.sku && form.sku !== lastCheckedSku.current) {
      lastCheckedSku.current = form.sku;
      fetch(`/api/products?search=${encodeURIComponent(form.sku)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.data)) {
            const found = data.data.find((p: any) => p.sku === form.sku);
            setExistingProduct(found || null);
            if (found && found.sku === form.sku) {
              if (
                form.productName !== found.productName ||
                form.category !== (found.category || "") ||
                form.supplierId !==
                  (found.supplierId ? found.supplierId.toString() : "") ||
                form.warehouseId !==
                  (found.warehouseId ? found.warehouseId.toString() : "") ||
                form.unitPrice !== String(found.unitPrice)
              ) {
                onFormChange({
                  ...form,
                  productName: found.productName,
                  category: found.category || "",
                  supplierId: found.supplierId
                    ? found.supplierId.toString()
                    : "",
                  warehouseId: found.warehouseId
                    ? found.warehouseId.toString()
                    : "",
                  unitPrice: String(found.unitPrice),
                });
              }
            }
          }
        });
    } else if (!form.sku) {
      setExistingProduct(null);
    }
  }, [form.sku, manualSku]);

  useEffect(() => {
    if (manualSku && form.sku === "") {
      setExistingProduct(null);
      onFormChange({
        productName: "",
        sku: "",
        category: "",
        unitPrice: "",
        warehouseId: "",
        supplierId: "",
        minimumQuantity: "0",
        maximumQuantity: "0",
        currentQuantity: "0",
      });
    }
  }, [form.sku, manualSku]);

  useEffect(() => {
    if (!show) {
      setManualSku(false);
      setExistingProduct(null);
      onFormChange({
        productName: "",
        sku: "",
        category: "",
        unitPrice: "",
        warehouseId: "",
        supplierId: "",
        minimumQuantity: "0",
        maximumQuantity: "0",
        currentQuantity: "0",
      });
    }
  }, [show]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let newProductId = null;
    if (existingProduct) {
      const novaQuantidade =
        parseInt(existingProduct.quantity) +
        parseInt(form.currentQuantity || "0");
      await fetch(`/api/products/${existingProduct.productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: form.productName,
          sku: form.sku,
          category: form.category,
          unitPrice: parseFloat(form.unitPrice),
          quantity: novaQuantidade,
          minimumQuantity: parseInt(form.minimumQuantity),
          maximumQuantity: parseInt(form.maximumQuantity),
          warehouseId: parseInt(form.warehouseId),
          supplierId: parseInt(form.supplierId),
        }),
      });
      newProductId = existingProduct.productId;
      setSuccessMessage("Produto atualizado com sucesso!");
      setTimeout(() => setSuccessMessage(""), 2000);
      if (onProductChanged) onProductChanged();
      setTimeout(() => onClose(), 2000);
    } else {
      // Cria o produto e obtém o productId
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: form.productName,
          sku: form.sku,
          category: form.category,
          unitPrice: parseFloat(form.unitPrice),
          quantity: parseInt(form.currentQuantity || "0"),
          minimumQuantity: parseInt(form.minimumQuantity),
          maximumQuantity: parseInt(form.maximumQuantity),
          warehouseId: parseInt(form.warehouseId),
          supplierId: parseInt(form.supplierId),
        }),
      });
      const data = await res.json();
      newProductId = data?.data?.productId;
      setSuccessMessage("Produto cadastrado com sucesso!");
      setTimeout(() => setSuccessMessage(""), 2000);
      if (onProductChanged) onProductChanged();
      setTimeout(() => onClose(), 2000);
    }
    // Se houver foto selecionada, faz upload após obter productId
    if (selectedPhoto && newProductId) {
      const formData = new FormData();
      formData.append("file", selectedPhoto);
      formData.append("productId", newProductId);
      await fetch("/api/products/photos", {
        method: "POST",
        body: formData,
      });
      setSelectedPhoto(null);
    }
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-3xl my-8 border-2 border-blue-200/50">
        {successMessage ? (
          <div className="bg-green-100 text-green-800 border border-green-300 rounded-xl px-4 py-3 text-center font-semibold mb-4">
            {successMessage}
          </div>
        ) : null}
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

        <form onSubmit={handleSubmit} className="p-6">
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
                      const generatedSku = Date.now().toString().slice(-13);
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
                    ? (e) => {
                        onFormChange({ ...form, sku: e.target.value });
                        setExistingProduct(null);
                      }
                    : undefined
                }
                onBlur={
                  manualSku
                    ? (e) => {
                        if (e.target.value) {
                          lastCheckedSku.current = e.target.value;
                          fetch(
                            `/api/products?search=${encodeURIComponent(
                              e.target.value
                            )}`
                          )
                            .then((res) => res.json())
                            .then((data) => {
                              if (data.success && Array.isArray(data.data)) {
                                const found = data.data.find(
                                  (p: any) => p.sku === e.target.value
                                );
                                setExistingProduct(found || null);
                                if (found && found.sku === e.target.value) {
                                  if (
                                    form.productName !== found.productName ||
                                    form.category !== (found.category || "") ||
                                    form.supplierId !==
                                      (found.supplierId
                                        ? found.supplierId.toString()
                                        : "") ||
                                    form.warehouseId !==
                                      (found.warehouseId
                                        ? found.warehouseId.toString()
                                        : "") ||
                                    form.unitPrice !== String(found.unitPrice)
                                  ) {
                                    onFormChange({
                                      ...form,
                                      productName: found.productName,
                                      category: found.category || "",
                                      supplierId: found.supplierId
                                        ? found.supplierId.toString()
                                        : "",
                                      warehouseId: found.warehouseId
                                        ? found.warehouseId.toString()
                                        : "",
                                      unitPrice: String(found.unitPrice),
                                    });
                                  }
                                }
                              }
                            });
                        }
                      }
                    : undefined
                }
                onFocus={
                  manualSku
                    ? (e) => {
                        if (e.target.value) {
                          lastCheckedSku.current = e.target.value;
                          fetch(
                            `/api/products?search=${encodeURIComponent(
                              e.target.value
                            )}`
                          )
                            .then((res) => res.json())
                            .then((data) => {
                              if (data.success && Array.isArray(data.data)) {
                                const found = data.data.find(
                                  (p: any) => p.sku === e.target.value
                                );
                                setExistingProduct(found || null);
                                if (found && found.sku === e.target.value) {
                                  if (
                                    form.productName !== found.productName ||
                                    form.category !== (found.category || "") ||
                                    form.supplierId !==
                                      (found.supplierId
                                        ? found.supplierId.toString()
                                        : "") ||
                                    form.warehouseId !==
                                      (found.warehouseId
                                        ? found.warehouseId.toString()
                                        : "") ||
                                    form.unitPrice !== String(found.unitPrice)
                                  ) {
                                    onFormChange({
                                      ...form,
                                      productName: found.productName,
                                      category: found.category || "",
                                      supplierId: found.supplierId
                                        ? found.supplierId.toString()
                                        : "",
                                      warehouseId: found.warehouseId
                                        ? found.warehouseId.toString()
                                        : "",
                                      unitPrice: String(found.unitPrice),
                                    });
                                  }
                                }
                              }
                            });
                        }
                      }
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
              {manualSku && existingProduct && (
                <div className="text-xs text-blue-700 mt-1">
                  Produto já existe: <b>{existingProduct.productName}</b>{" "}
                  (Estoque atual: {existingProduct.quantity})
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cor
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) =>
                  onFormChange({ ...form, category: e.target.value })
                }
                title="Digite a cor do produto"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Digite a cor"
              />
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
                Tamanho *
              </label>
              <div className="flex gap-2">
                <select
                  value={form.warehouseId}
                  onChange={(e) =>
                    onFormChange({ ...form, warehouseId: e.target.value })
                  }
                  required
                  title="Selecione um tamanho"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Selecionar Tamanho</option>
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
                  title="Adicionar novo tamanho"
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

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Foto do Produto (opcional)
              </label>
              <label
                htmlFor="product-photo-upload"
                className={
                  "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-400 rounded-xl cursor-pointer hover:bg-blue-50 group"
                }
                style={{ cursor: "pointer" }}
              >
                <svg
                  className="w-10 h-10 text-blue-500 mb-2 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                <span className="text-blue-700 font-medium">
                  {selectedPhoto
                    ? selectedPhoto.name
                    : "Clique para selecionar uma foto"}
                </span>
                <input
                  id="product-photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (!e.target.files || e.target.files.length === 0) return;
                    setSelectedPhoto(e.target.files[0]);
                  }}
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">
                A foto será exibida apenas na galeria do produto após o
                cadastro.
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-700/90 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-blue-500/30 cursor-pointer"
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
