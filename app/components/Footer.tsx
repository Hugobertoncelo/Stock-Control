"use client";

import Link from "next/link";
import Image from "next/image";
import { Package, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faWhatsapp,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const { isAdmin } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white mt-16 border-t border-gray-200">
      <div className="absolute inset-0 bg-linear-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="relative container mx-auto px-6 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link
              href="/"
              className="flex items-center gap-3 mb-4 group cursor-pointer"
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/PrimeGestor.svg"
                  alt="PrimeGestor Logo"
                  width={48}
                  height={48}
                  className="relative z-10"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-300">
                  PrimeGestor
                </h3>
                <p className="text-xs text-gray-500">
                  Controle total para decisões inteligentes.
                </p>
              </div>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sistema profissional de gestão de inventário para empresas
              modernas. Acompanhe, gerencie e otimize seu estoque de forma
              eficiente com análises em tempo real.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  href="/sales"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Vendas
                </Link>
              </li>
              <li>
                <Link
                  href="/purchases"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Compras
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link
                    href="/reports"
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    Relatórios
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Recursos
            </h4>
            <ul className="space-y-2">
              {isAdmin && (
                <li>
                  <Link
                    href="/logs"
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    Logs de Atividade
                  </Link>
                </li>
              )}
              {isAdmin && (
                <li>
                  <Link
                    href="/documentation"
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    Documentação
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/support"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Suporte
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Entre em Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Mail className="w-4 h-4" />
                <span>hugobertoncelo@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>(28) 99945-3033</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Vitória, ES</span>
              </li>
            </ul>

            <div className="flex gap-3 mt-4">
              <a
                href="https://www.linkedin.com/in/hugobertoncelo/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 hover:bg-blue-700 hover:text-white text-gray-700 rounded-lg transition-colors flex items-center justify-center"
                title="LinkedIn"
              >
                <Linkedin
                  className="w-4 h-4"
                  style={{ verticalAlign: "middle" }}
                />
              </a>
              <a
                href="https://github.com/hugobertoncelo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 hover:bg-gray-700 hover:text-white text-gray-700 rounded-lg transition-colors flex items-center justify-center"
                title="GitHub"
              >
                <Github
                  className="w-4 h-4"
                  style={{ verticalAlign: "middle" }}
                />
              </a>
              <a
                href="https://www.instagram.com/bertoncelo.hugo/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 hover:bg-pink-600 hover:text-white text-gray-700 rounded-lg transition-colors flex items-center justify-center"
                title="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5528999453033"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 hover:bg-green-600 hover:text-white text-gray-700 rounded-lg transition-colors flex items-center justify-center"
                title="WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4" />
              </a>
              <a
                href="mailto:hugobertoncelo@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 hover:bg-red-600 hover:text-white text-gray-700 rounded-lg transition-colors flex items-center justify-center"
                title="Gmail"
              >
                <FontAwesomeIcon icon={faGoogle} className="w-4 h-4" />
              </a>
              <a
                href="https://portfolio-react-sooty-eta.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 hover:bg-purple-700 hover:text-white text-gray-700 rounded-lg transition-colors flex items-center justify-center"
                title="Portfólio"
              >
                <FontAwesomeIcon icon={faIdBadge} className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {currentYear} PrimeGestor. Todos os Direitos Reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Termos de Serviço
              </Link>
              <Link
                href="/cookie-policy"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
