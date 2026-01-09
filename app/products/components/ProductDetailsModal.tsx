"use client";

import { useRef, useEffect, useState } from "react";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import { useAuth } from "../../context/AuthContext";

interface Product {
  productId: number;
  productName: string;
  sku: string;
  category: string | null;
  unitPrice: number;
  quantity: number;
  minimumQuantity: number;
  maximumQuantity: number;
  warehouse: {
    warehouseId: number;
    warehouseName: string;
  } | null;
  supplier: {
    supplierId: number;
    supplierName: string;
  } | null;
  creator: {
    userId: number;
    fullName: string;
  } | null;
  createdAt: string;
}

interface StockBatch {
  batchId: number;
  productId: number;
  purchaseId: number;
  quantityIn: number;
  quantityRemaining: number;
  purchasePrice: number;
  batchDate: string;
  purchase: {
    supplier: {
      supplierName: string;
    };
  };
}

interface ProductDetailsModalProps {
  product: Product;
  stockBatches: StockBatch[];
  onClose: () => void;
  onDelete: (product: Product) => void;
  onOpenPurchase: () => void;
  onOpenSale: () => void;
  onEdit: (product: Product) => void;
  isLowStock: (product: Product) => boolean;
}

export default function ProductDetailsModal({
  product,
  stockBatches,
  onClose,
  onDelete,
  onOpenPurchase,
  onOpenSale,
  onEdit,
  isLowStock,
}: ProductDetailsModalProps) {
  const qrCodeRef = useRef<HTMLCanvasElement>(null);
  const etiquetaRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    if (product && qrCodeRef.current) {
      QRCode.toCanvas(qrCodeRef.current, product.sku, {
        width: 60,
        margin: 2,
      });
    }
  }, [product]);

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      const url = qrCodeRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${product.sku}-qrcode.png`;
      link.href = url;
      link.click();
    }
  };

  const downloadEtiqueta = async () => {
    if (etiquetaRef.current) {
      etiquetaRef.current.className = "";
      const styleTag = document.createElement("style");
      styleTag.innerHTML = `
        * { background: #fff !important; color: #1e40af !important; box-shadow: none !important; border-color: #60a5fa !important; }
        span, div, canvas { background: #fff !important; color: #1e40af !important; }
      `;
      etiquetaRef.current.prepend(styleTag);
      const canvas = await html2canvas(etiquetaRef.current, {
        backgroundColor: "#fff",
        scale: 2,
        useCORS: true,
        removeContainer: true,
      });
      etiquetaRef.current.removeChild(styleTag);
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${product.productName}-${product.sku}.png`;
      link.href = url;
      link.click();
    }
  };

  const shareQRCode = async () => {
    if (qrCodeRef.current) {
      try {
        const blob = await new Promise<Blob>((resolve) => {
          qrCodeRef.current!.toBlob((blob) => resolve(blob!));
        });

        const file = new File([blob], `${product.sku}-qrcode.png`, {
          type: "image/png",
        });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Código QR para ${product.productName}`,
            text: `Códigos: ${product.sku}`,
            files: [file],
          });
        } else {
          downloadQRCode();
          setMessage(
            "O compartilhamento não é compatível. Em vez disso, foi baixado um código QR."
          );
          setTimeout(() => setMessage(""), 3500);
        }
      } catch (error) {
        console.error("Erro ao compartilhar o código QR:", error);
        setMessage("Falha ao compartilhar o código QR");
        setTimeout(() => setMessage(""), 3500);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border-2 border-blue-200/50">
        <div className="bg-blue-600 p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-white">
              {product.productName}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300"
              title="Close"
              aria-label="Close popup"
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

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm">
              <p className="text-sm text-blue-700 font-medium mb-1">Código</p>
              <p className="text-lg font-bold text-blue-900">{product.sku}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-200 shadow-sm">
              <p className="text-sm text-green-700 font-medium mb-1">Tamanho</p>
              <p className="text-lg font-bold text-green-900">
                {product.category || "N/A"}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 shadow-sm">
              <p className="text-sm text-purple-700 font-medium mb-1">
                Preço Unitário
              </p>
              <p className="text-lg font-bold text-purple-900">
                R${Number(product.unitPrice).toFixed(2)}
              </p>
            </div>
            <div
              className={`p-4 rounded-xl border shadow-sm ${
                isLowStock(product)
                  ? "bg-red-50 border-red-200"
                  : "bg-cyan-50 border-cyan-200"
              }`}
            >
              <p
                className={`text-sm font-medium mb-1 ${
                  isLowStock(product) ? "text-red-700" : "text-cyan-700"
                }`}
              >
                Estoque Atual
              </p>
              <p
                className={`text-lg font-bold ${
                  isLowStock(product) ? "text-red-900" : "text-cyan-900"
                }`}
              >
                {product.quantity} unidades
                {isLowStock(product) && (
                  <span className="text-sm ml-2 text-red-600">
                    (Estoque Baixo!)
                  </span>
                )}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 shadow-sm">
              <p className="text-sm text-yellow-700 font-medium mb-1">
                Quantidade Mínima
              </p>
              <p className="text-lg font-bold text-yellow-900">
                {product.minimumQuantity}
              </p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 shadow-sm">
              <p className="text-sm text-indigo-700 font-medium mb-1">
                Quantidade Máxima
              </p>
              <p className="text-lg font-bold text-indigo-900">
                {product.maximumQuantity}
              </p>
            </div>
            <div className="bg-pink-50 p-4 rounded-xl border border-pink-200 shadow-sm">
              <p className="text-sm text-pink-700 font-medium mb-1">Cor</p>
              <p className="text-lg font-bold text-gray-900">
                {product.warehouse?.warehouseName || "N/A"}
              </p>
            </div>
            <div className="bg-teal-50 p-4 rounded-xl border border-teal-200 shadow-sm">
              <p className="text-sm text-teal-700 font-medium mb-1">
                Fornecedor
              </p>
              <p className="text-lg font-bold text-teal-900">
                {product.supplier?.supplierName || "N/A"}
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Etiqueta do Produto
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "1.5rem",
                background: "#eff6ff",
              }}
            >
              <div
                ref={etiquetaRef}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "2px solid #60a5fa",
                  boxShadow: "0 4px 16px #cbd5e1",
                  padding: "0.5rem",
                  minWidth: "260px",
                  maxWidth: "320px",
                  background: "#fff",
                  color: "#1e40af",
                  alignItems: "stretch",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontSize: "1.55rem",
                    fontWeight: 900,
                    marginBottom: "0.75rem",
                    letterSpacing: "0.18em",
                    textAlign: "center",
                    width: "100%",
                    color: "#1e40af",
                    textTransform: "uppercase",
                    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
                    textShadow: "0 3px 6px rgba(30,64,175,0.35)",
                    display: "block",
                  }}
                >
                  {user?.fullName ? user.fullName : "Minha Cor"}
                </span>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: 1,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        marginBottom: "0.35rem",
                        color: "#1e40af",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        maxWidth: "205px",
                        display: "block",
                      }}
                    >
                      {product.productName}
                    </span>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        marginBottom: "0.25rem",
                        color: "#334155",
                      }}
                    >
                      Código: {product.sku}
                    </span>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        marginBottom: "0.25rem",
                        color: "#059669",
                      }}
                    >
                      Preço: R${Number(product.unitPrice).toFixed(2)}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontFamily: "monospace",
                        color: "#64748b",
                      }}
                    >
                      Ref: {getProductReference(product.productId)}
                    </span>
                  </div>
                  <canvas
                    ref={qrCodeRef}
                    width={72}
                    height={72}
                    style={{
                      width: 72,
                      height: 72,
                      border: "2px solid #60a5fa",
                      borderRadius: 8,
                      boxShadow: "0 2px 8px #cbd5e1",
                      marginLeft: "-3.5rem",
                      alignSelf: "center",
                      marginTop: "2rem",
                    }}
                  ></canvas>
                </div>
              </div>
              <div
                style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}
              >
                <button
                  onClick={downloadEtiqueta}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.75rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: "0 2px 8px #cbd5e1",
                    background: "#059669",
                    color: "#fff",
                    border: "1px solid #059669",
                    transition: "all 0.3s",
                  }}
                >
                  <svg
                    style={{ width: 20, height: 20 }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </button>
                <button
                  onClick={shareQRCode}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.75rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: "0 2px 8px #cbd5e1",
                    background: "#2563eb",
                    color: "#fff",
                    border: "1px solid #2563eb",
                    transition: "all 0.3s",
                  }}
                >
                  <svg
                    style={{ width: 20, height: 20 }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Compartilhar
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-4 border-t pt-4">
              Lotes de Estoque
            </h3>
            <div className="mb-6">
              {stockBatches.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Data do Lote
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Fornecedor
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Preço de Compra
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Quantidade Entrada
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Restante
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stockBatches.map((batch) => (
                        <tr key={batch.batchId}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {new Date(batch.batchDate).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {batch.purchase.supplier.supplierName}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            R$
                            {parseFloat(batch.purchasePrice.toString()).toFixed(
                              2
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {batch.quantityIn}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {batch.quantityRemaining}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {batch.quantityRemaining === 0 ? (
                              <span className="px-2 py-1 bg-gray-300 text-gray-800 rounded-full text-xs font-bold">
                                Esgotado
                              </span>
                            ) : batch.quantityRemaining <
                              batch.quantityIn * 0.1 ? (
                              <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                                Crítico
                              </span>
                            ) : batch.quantityRemaining <
                              batch.quantityIn * 0.2 ? (
                              <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-xs font-bold">
                                Baixo Estoque
                              </span>
                            ) : batch.quantityRemaining < batch.quantityIn ? (
                              <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">
                                Parcial
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs font-bold">
                                Disponível
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-blue-600 text-center py-4 bg-blue-50 rounded border border-blue-200">
                  Não foram encontrados lotes em estoque.
                </p>
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-4 border-t pt-4">
              Ações
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  onEdit(product);
                  onClose();
                }}
                className="px-6 py-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-700/90 active:bg-blue-800 font-semibold shadow-lg hover:shadow-xl active:shadow-2xl transition-all duration-300 border border-blue-500/30 active:border-blue-600"
              >
                Editar Produto
              </button>
              <button
                onClick={onOpenPurchase}
                className="px-6 py-3 bg-green-600/80 backdrop-blur-sm text-white rounded-xl hover:bg-green-700/90 active:bg-green-800 font-semibold shadow-lg hover:shadow-xl active:shadow-2xl transition-all duration-300 border border-green-500/30 active:border-green-600"
              >
                Registrar Compra
              </button>
              <button
                onClick={onOpenSale}
                className="px-6 py-3 bg-orange-600/80 backdrop-blur-sm text-white rounded-xl hover:bg-orange-700/90 active:bg-orange-800 font-semibold shadow-lg hover:shadow-xl active:shadow-2xl transition-all duration-300 border border-orange-500/30 active:border-orange-600"
              >
                Registrar Venda
              </button>
              <button
                onClick={() => {
                  onDelete(product);
                  onClose();
                }}
                className="px-6 py-3 bg-red-600/80 backdrop-blur-sm text-white rounded-xl hover:bg-red-700/90 active:bg-red-800 font-semibold shadow-lg hover:shadow-xl active:shadow-2xl transition-all duration-300 border border-red-500/30 active:border-red-600"
              >
                Deletar Produto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getProductReference(productId: number) {
  const str = productId.toString();
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString().padStart(6, "0");
}
