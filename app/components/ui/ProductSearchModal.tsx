import React, { useState } from "react";
import { Search } from "lucide-react";

interface ProductInfo {
  code: string;
  name: string;
  price: string;
  stock: number;
}

const fetchProduct = async (code: string): Promise<ProductInfo | null> => {
  try {
    const response = await fetch(`/api/products/${code}`);
    if (!response.ok) return null;
    const result = await response.json();
    if (result.success && result.data) {
      let price = "";
      if (result.data.unitPrice)
        price = `R$ ${Number(result.data.unitPrice).toFixed(2)}`;
      else if (result.data.salePrice)
        price = `R$ ${Number(result.data.salePrice).toFixed(2)}`;
      else if (result.data.sellingPrice)
        price = `R$ ${Number(result.data.sellingPrice).toFixed(2)}`;
      return {
        code: result.data.sku || result.data.code || code,
        name: result.data.productName || result.data.name || "",
        price,
        stock: result.data.quantity || result.data.stock || 0,
      };
    }
    return null;
  } catch {
    return null;
  }
};

export default function ProductSearchModal() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    const result = await fetchProduct(code);
    setLoading(false);
    if (result) {
      setProduct(result);
    } else {
      setProduct(null);
      setError("Produto não encontrado.");
    }
  };

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setCode("");
        setProduct(null);
        setError("");
      }
      if (e.key === "Enter" && code && !loading) {
        handleSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, code, loading]);

  return (
    <>
      <button
        className="fixed top-22 sm:right-16 right-2 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center cursor-pointer"
        onClick={() => setOpen(true)}
        title="Pesquisar Produto"
      >
        <Search className="w-6 h-6" />
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false);
              setCode("");
              setProduct(null);
              setError("");
            }
          }}
        >
          <div
            className="bg-white rounded-2xl p-8 shadow-2xl w-96 relative border border-blue-200"
            style={{ minHeight: 320 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold z-10 cursor-pointer"
              style={{ position: "absolute", top: 12, right: 12 }}
              onClick={() => {
                setOpen(false);
                setCode("");
                setProduct(null);
                setError("");
              }}
              title="Fechar"
            >
              ×
            </button>
            <h3 className="text-2xl font-extrabold mb-6 text-blue-700 text-center tracking-tight">
              Pesquisar Produto
            </h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Digite o código do produto"
                className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (e.target.value && !loading) {
                    fetchProduct(e.target.value).then((result) => {
                      if (result) {
                        setProduct(result);
                        setError("");
                      } else {
                        setProduct(null);
                        setError("Produto não encontrado.");
                      }
                    });
                  } else {
                    setProduct(null);
                    setError("");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && code && !loading) handleSearch();
                }}
              />
            </div>
            <button
              className="w-full bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-lg py-3 font-bold text-lg hover:from-blue-700 hover:to-cyan-600 mb-4 shadow-md transition cursor-pointer"
              onClick={handleSearch}
              disabled={loading || !code}
            >
              {loading ? "Buscando..." : "Pesquisar"}
            </button>
            {error && (
              <p className="text-red-500 text-base mb-2 text-center font-semibold">
                {error}
              </p>
            )}
            {product && (
              <div
                className="border-t pt-4 mt-4 text-lg text-gray-800 space-y-2 animate-fade-in"
                style={{ minHeight: 120 }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-700">Código:</span>
                  <span>{product.code}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-700">Nome:</span>
                  <span>{product.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-700">Preço:</span>
                  <span className="text-green-600 font-bold">
                    {product.price || "-"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-700">Estoque:</span>
                  <span>{product.stock}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
