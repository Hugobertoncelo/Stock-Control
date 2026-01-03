"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { cn } from "@/lib/utils";
import LoadingDots from "../../components/LoadingDots";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user);
        router.push("/");
      } else {
        setError(data.error || "Falha no Login");
      }
    } catch (err) {
      setError("Ocorreu um erro. Por favor, tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white overflow-hidden relative">
      {/* Vídeo de fundo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 blur-sm"
        src="/background-login.mp4"
      />
      {/* Conteúdo principal */}
      <div className="relative z-10 h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="hidden lg:flex flex-col justify-center items-center text-center p-8">
            <div className="relative">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-black/5 backdrop-blur-sm border border-black/10 text-gray-700 text-sm font-medium mb-8">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                </span>
                Plataforma Segura
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Bem-vindo de volta ao
                <span className="block bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  PrimeGestor
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
                Continue gerenciando seu Estoque com ferramentas confiáveis e
                eficientes
              </p>

              <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                <div className="flex items-center p-4 bg-black/5 backdrop-blur-sm rounded-xl border border-black/10">
                  <div className="p-2 bg-black/10 rounded-lg mr-4">
                    <svg
                      className="h-5 w-5 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-900 font-medium">
                      Seguro & Confiável
                    </p>
                    <p className="text-gray-600 text-sm">
                      Segurança de nível empresarial
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-black/5 backdrop-blur-sm rounded-xl border border-black/10">
                  <div className="p-2 bg-black/10 rounded-lg mr-4">
                    <svg
                      className="h-5 w-5 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-900 font-medium">
                      Sistema de Qualidade
                    </p>
                    <p className="text-gray-600 text-sm">
                      Confiado por profissionais
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-black/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/5 pointer-events-none" />

                <div className="relative z-10 text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Entrar
                  </h2>
                  <p className="text-gray-600">
                    Bem-vindo de volta! Por favor, insira seus dados
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Endereço de Email
                    </label>
                    <div className="relative">
                      <svg
                        className="absolute left-4 top-4 h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 shadow-sm ${
                          error
                            ? "border-red-500/50 focus:ring-red-500"
                            : "border-black/20 hover:border-black/30"
                        }`}
                        placeholder="Digite seu email"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Senha
                    </label>
                    <div className="relative">
                      <svg
                        className="absolute left-4 top-4 h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-sm border rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 shadow-sm ${
                          error
                            ? "border-red-500/50 focus:ring-red-500"
                            : "border-black/20 hover:border-black/30"
                        }`}
                        placeholder="Digite sua senha"
                        autoComplete="current-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-4 h-5 w-5 text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        {showPassword ? (
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-end text-sm">
                      <Link
                        href="/forgot-password"
                        className="text-gray-900 font-medium hover:underline transition-colors"
                      >
                        Esqueceu a senha?
                      </Link>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl">
                      <p className="text-red-600 text-sm text-center">
                        {error}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full overflow-hidden"
                  >
                    <div className="w-full flex items-center justify-center px-6 py-4 bg-gray-900 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/25 disabled:opacity-50 disabled:cursor-not-allowed group-hover:scale-[1.02]">
                      {loading ? (
                        <>
                          <LoadingDots />
                        </>
                      ) : (
                        <>
                          Entrar
                          <svg
                            className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </>
                      )}
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gray-900 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                  </button>

                  <div className="text-center">
                    <p className="text-gray-600 text-sm">
                      Este não é um site público. Somente pessoas autorizadas
                      podem acessá-lo.
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    Entre em contato com seu administrador para obter acesso à
                    criação de novas contas.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
