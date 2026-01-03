"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Home, MessageSquare } from "lucide-react";
import LoadingDots from "../../components/LoadingDots";

export default function SupportPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError("Falha ao enviar mensagem: " + result.error);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem de suporte:", error);
      setError("Ocorreu um erro ao enviar sua mensagem");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 sm:pt-20">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Suporte
            </h1>
            <p className="text-gray-600 mt-1">
              Obtenha ajuda de nossa equipe de suporte
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Informações de Contato
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50/50 hover:bg-blue-50/70 transition-colors">
                  <Mail className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-sm text-gray-600">
                      hugobertoncelo@gmail.com
                    </p>
                    <p className="text-xs text-blue-500 mt-1">
                      Resposta em até 24 horas
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/50 hover:bg-green-50/70 transition-colors">
                  <Phone className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Telefone</h3>
                    <p className="text-sm text-gray-600">(28) 99945-3033</p>
                    <p className="text-xs text-green-500 mt-1">
                      Seg-Sex, 9h-17h
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50/50 hover:bg-purple-50/70 transition-colors">
                  <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Escritório</h3>
                    <p className="text-sm text-gray-600">
                      Vitória, Espírito Santo
                    </p>
                    <p className="text-xs text-purple-500 mt-1">Brasil</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Home className="w-5 h-5 text-indigo-600" />
                Ajuda Rápida
              </h2>
              <div className="space-y-3">
                <Link
                  href="/documentation"
                  className="block p-4 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 hover:from-indigo-100/70 hover:to-blue-100/70 rounded-lg transition-all duration-300 border border-indigo-200/30 hover:border-indigo-300/50 hover:shadow-md group"
                >
                  <h3 className="font-medium text-gray-900 text-sm group-hover:text-indigo-700 transition-colors">
                    Documentação
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 group-hover:text-indigo-600 transition-colors">
                    Navegue por nossos guias completos
                  </p>
                </Link>
                <Link
                  href="/faq"
                  className="block p-4 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 hover:from-emerald-100/70 hover:to-teal-100/70 rounded-lg transition-all duration-300 border border-emerald-200/30 hover:border-emerald-300/50 hover:shadow-md group"
                >
                  <h3 className="font-medium text-gray-900 text-sm group-hover:text-emerald-700 transition-colors">
                    FAQ
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 group-hover:text-emerald-600 transition-colors">
                    Perguntas frequentes
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400/80 to-emerald-500/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <MessageSquare className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-2">
                    Mensagem Enviada!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Recebemos sua mensagem e entraremos em contato em breve.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                  >
                    Enviar Outra Mensagem
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                    Envie-nos uma mensagem
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Preencha o formulário abaixo e responderemos o mais breve
                    possível.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-center">
                        {error}
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-900 mb-2"
                        >
                          Seu Nome *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/90 transition-all duration-300 placeholder-gray-400"
                          placeholder="Digite seu nome"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-900 mb-2"
                        >
                          Endereço de Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/90 transition-all duration-300 placeholder-gray-400"
                          placeholder="Digite seu email"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        Assunto *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/90 transition-all duration-300 placeholder-gray-400"
                        placeholder="Como podemos ajudar?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        Mensagem *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white/90 transition-all duration-300 resize-none placeholder-gray-400"
                        placeholder="Descreva sua pergunta ou problema em detalhes..."
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {loading ? (
                          <LoadingDots />
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Enviar Mensagem
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
