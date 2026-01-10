"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  imageUrl?: string;
  category?: string;
}

interface ProductSearchProps {
  products: Product[];
}

function generateRefNumber(product: Product) {
  const str = product.id.toString();
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString().padStart(6, "0");
}

export default function ProductSearch({ products }: ProductSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    setQuery(value);
    if (value.length === 0) {
      setResults([]);
      return;
    }
    const lowerValue = value.toLowerCase();
    const filtered = products.filter(
      (p) =>
        (p.name && p.name.toLowerCase().includes(lowerValue)) ||
        (p.code && p.code.toLowerCase().includes(lowerValue))
    );
    setResults(filtered);
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          className="flex-1 outline-none bg-transparent text-sm"
          placeholder="Pesquisar produto por nome ou código..."
          value={query}
          onChange={handleSearch}
        />
      </div>
      {results.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-72 overflow-y-auto">
          {results.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer"
              onClick={() => setSelected(product)}
            >
              {product.imageUrl ? (
                <img
                  src={
                    product.imageUrl.startsWith("/api/")
                      ? product.imageUrl
                      : `/api/products/photos/image?id=${product.imageUrl}`
                  }
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md border bg-gray-100"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-lg font-bold border">
                  ?
                </div>
              )}
              <div className="flex-1">
                <div className="font-semibold text-gray-800 text-sm">
                  {product.name}
                </div>
                <div className="text-xs text-gray-500">
                  Código: {product.code}
                </div>
                <div className="text-xs text-gray-500">
                  Preço: R${product.price.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  Cor:{" "}
                  {product.category
                    ? product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)
                    : "N/A"}
                </div>
                <div className="text-xs text-gray-400">
                  Ref: {generateRefNumber(product)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 max-w-full relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={() => setSelected(null)}
              aria-label="Fechar"
            >
              ×
            </button>
            <div className="flex flex-col items-center gap-3">
              {selected.imageUrl ? (
                <img
                  src={
                    selected.imageUrl.startsWith("/api/")
                      ? selected.imageUrl
                      : `/api/products/photos/image?id=${selected.imageUrl}`
                  }
                  alt={selected.name}
                  className="w-24 h-24 object-cover rounded-md border bg-gray-100"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-3xl font-bold border">
                  ?
                </div>
              )}
              <div className="text-center">
                <div className="font-semibold text-gray-800 text-lg mb-1">
                  {selected.name}
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  Código: {selected.code}
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  Preço:{" "}
                  <span className="font-semibold text-green-700">
                    R${selected.price.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  Cor:{" "}
                  {selected.category
                    ? selected.category.charAt(0).toUpperCase() +
                      selected.category.slice(1)
                    : "N/A"}
                </div>
                <div className="text-xs text-gray-400">
                  Ref: {generateRefNumber(selected)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
