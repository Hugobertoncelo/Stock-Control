"use client";
import React, { useState, useEffect } from "react";

interface Product {
  productId: number;
  productName: string;
  sku: string;
}

interface ProductPhoto {
  photoId: number;
  productId: number;
  url: string;
  fileName: string;
  uploadedAt: string;
  product: Product;
}

const ProductPhotos: React.FC = () => {
  const [search, setSearch] = useState("");
  const [photos, setPhotos] = useState<ProductPhoto[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<ProductPhoto | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []));
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const res = await fetch("/api/products/photos");
    const data = await res.json();
    setPhotos(data.data || []);
  };

  const filteredPhotos = photos.filter((p) => {
    if (selectedProduct) {
      return p.product.productId.toString() === selectedProduct;
    }
    if (search.trim().length > 0) {
      return (
        p.product.productName.toLowerCase().includes(search.toLowerCase()) ||
        p.product.sku.toLowerCase().includes(search.toLowerCase())
      );
    }
    return false;
  });

  const getImageUrl = (photoId: number) =>
    `/api/products/photos/image?id=${photoId}`;

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (url: string, name: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          url: window.location.origin + url,
        });
      } catch (err) {
        setMessage("Não foi possível compartilhar.");
        setMessageType("error");
      }
    } else {
      setMessage("Compartilhamento não suportado neste navegador.");
      setMessageType("error");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !selectedProduct) return;
    setLoading(true);
    setMessage("");
    setMessageType("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productId", selectedProduct);
    const res = await fetch("/api/products/photos", {
      method: "POST",
      body: formData,
    });
    setLoading(false);
    setFile(null);
    if (res.ok) {
      fetchPhotos();
      setMessage("Imagem enviada com sucesso!");
      setMessageType("success");
    } else {
      setMessage("Erro ao enviar imagem");
      setMessageType("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">Galeria</h2>
      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded text-sm font-medium ${
            messageType === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {message}
        </div>
      )}
      <form
        onSubmit={handleUpload}
        className="flex flex-col md:flex-row gap-3 mb-6 items-end"
      >
        <div className="w-full md:w-60">
          <select
            className="border rounded-lg px-3 py-2 w-full"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">Selecione o produto</option>
            {products
              .filter(
                (p) =>
                  p.productName.toLowerCase().includes(search.toLowerCase()) ||
                  p.sku.toLowerCase().includes(search.toLowerCase())
              )
              .map((p) => (
                <option key={p.productId} value={p.productId}>
                  {p.productName} ({p.sku})
                </option>
              ))}
          </select>
        </div>
        <label
          htmlFor="product-photo-upload"
          className="border rounded-lg px-3 py-2 w-full md:w-60 flex items-center justify-center bg-white shadow-sm cursor-pointer transition hover:bg-gray-100 hover:shadow-md hover:border-gray-400 group"
          style={{ cursor: "pointer" }}
        >
          <svg
            className="w-5 h-5 mr-2 text-gray-500 group-hover:text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
            />
          </svg>
          <span className="text-gray-700 group-hover:text-gray-900">
            {file ? file.name : "Escolher imagem"}
          </span>
          <input
            id="product-photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-all"
        >
          {loading ? "Enviando..." : "Enviar Foto"}
        </button>
      </form>
      <div className="w-full md:w-60 mb-6">
        <input
          type="text"
          placeholder="Pesquisar produto por nome ou código..."
          className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const match = products.find(
                (p) =>
                  p.productName.toLowerCase().includes(search.toLowerCase()) ||
                  p.sku.toLowerCase().includes(search.toLowerCase())
              );
              if (match) {
                setSelectedProduct(match.productId.toString());
              }
            }
          }}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPhotos.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            Nenhuma foto encontrada.
          </p>
        )}
        {filteredPhotos.map((photo) => (
          <div
            key={photo.photoId}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
          >
            <img
              src={getImageUrl(photo.photoId)}
              alt={photo.fileName}
              className="w-32 h-32 object-cover rounded mb-2 border"
            />
            <div className="text-center mb-2">
              <div className="font-semibold">{photo.product.productName}</div>
              <div className="text-xs text-gray-500">
                Código: {photo.product.sku}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleDownload(getImageUrl(photo.photoId), photo.fileName)
                }
                className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700 text-xs"
              >
                Download
              </button>
              <button
                onClick={() =>
                  handleShare(getImageUrl(photo.photoId), photo.fileName)
                }
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs"
              >
                Compartilhar
              </button>
              <button
                onClick={() => {
                  setPhotoToDelete(photo);
                  setShowDeleteModal(true);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-xs"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
      {showDeleteModal && photoToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl border w-full max-w-xs">
            <h3 className="text-lg font-bold mb-4 text-gray-900">
              Tem certeza que deseja excluir esta imagem?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={async () => {
                  const res = await fetch(
                    `/api/products/photos?id=${photoToDelete.photoId}`,
                    { method: "DELETE" }
                  );
                  setShowDeleteModal(false);
                  setPhotoToDelete(null);
                  if (res.ok) {
                    fetchPhotos();
                    setMessage("Imagem excluída com sucesso!");
                    setMessageType("success");
                  } else {
                    setMessage("Erro ao excluir imagem");
                    setMessageType("error");
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
              >
                Sim
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPhotoToDelete(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-medium"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPhotos;
