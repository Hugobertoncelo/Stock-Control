"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-black text-black mb-4">404</h1>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">
            Página Não Encontrada
          </h2>
          <p className="text-gray-700 text-lg">
            Oops! A página que você está procurando não existe.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold shadow-md transition-all duration-300"
          >
            Voltar para a Página Inicial
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 bg-gray-200 text-black rounded-lg hover:bg-gray-300 font-semibold shadow-md transition-all duration-300"
          >
            Conecte-se
          </Link>
        </div>
      </div>
    </div>
  );
}
