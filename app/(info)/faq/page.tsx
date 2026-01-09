"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Home, Search, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs: FAQItem[] = [
    {
      category: "Começando",
      question: "Como adiciono um novo produto ao inventário?",
      answer:
        'Navegue até a página de Produtos e clique no botão "Adicionar Produto". Preencha os campos obrigatórios, incluindo nome do produto, SKU, preços e níveis de quantidade. Selecione um tamanho e um fornecedor, e clique em Salvar. O produto estará imediatamente disponível em seu inventário.',
    },
    {
      category: "Começando",
      question: "Como faço minha primeira venda?",
      answer:
        'Vá para a página de Vendas e clique em "Adicionar Venda". Selecione o cliente e o produto nos menus suspensos, insira a quantidade e o preço de venda e clique em Salvar. O sistema calculará automaticamente o COGS usando a metodologia FIFO e atualizará os níveis de inventário.',
    },
    {
      category: "Gerenciamento de Inventário",
      question: "Como funciona a avaliação de inventário FIFO?",
      answer:
        "FIFO (First-In-First-Out) significa que quando você vende um produto, o sistema usa automaticamente o custo do lote de estoque mais antigo primeiro. Isso garante cálculos de lucro precisos, combinando a receita de vendas com o custo real das mercadorias vendidas da compra mais antiga.",
    },
    {
      category: "Gerenciamento de Inventário",
      question: "Como faço para rastrear o estoque em vários tamanhos?",
      answer:
        "Cada produto pode ser atribuído a um tamanho específico. Ao visualizar a página de Produtos, você pode filtrar por tamanho para ver os níveis de estoque de cada local. O sistema rastreia o inventário separadamente para cada tamanho e fornece contagens de estoque em tempo real.",
    },
    {
      category: "Gerenciamento de Inventário",
      question:
        "O que acontece quando o estoque cai abaixo da quantidade mínima?",
      answer:
        'Quando a quantidade de um produto cai abaixo do limite mínimo que você definiu, ele aparecerá no filtro "Baixo Estoque" na página de Produtos e nos alertas do painel. Isso ajuda você a identificar itens que precisam ser reordenados.',
    },
    {
      category: "Relatórios",
      question: "Como gero um relatório de lucros e perdas?",
      answer:
        'Navegue até a página de Relatórios e selecione "Relatório de Lucros e Perdas". Escolha o intervalo de datas desejado (7, 30 ou 90 dias) e clique em Gerar Relatório. O relatório mostrará a receita total, COGS, lucro bruto e cálculos de margem de lucro.',
    },
    {
      category: "Relatórios",
      question: "Posso exportar relatórios para Excel?",
      answer:
        'Sim! Todos os relatórios têm um botão "Exportar para Excel" no canto superior direito. Clique nele para baixar um arquivo Excel formatado com todos os dados do relatório, que você pode usar para análises ou apresentações adicionais.',
    },
    {
      category: "Relatórios",
      question: "Como são calculadas as tendências de vendas?",
      answer:
        "As tendências de vendas analisam seu histórico de transações ao longo do tempo. O sistema agrega dados de vendas diárias, semanais ou mensais e os exibe em gráficos que mostram padrões de receita, produtos mais vendidos e comportamento de compra dos clientes.",
    },
    {
      category: "Gerenciamento de Usuários",
      question: "Como adiciono um novo usuário ao sistema?",
      answer:
        'Apenas administradores podem adicionar usuários. Vá para a página de Usuários, clique em "Adicionar Usuário", insira o nome, e-mail e senha, e selecione a função (USUÁRIO ou ADMIN). Os usuários receberão credenciais de login e poderão acessar o sistema com base nas permissões de sua função.',
    },
    {
      category: "Gerenciamento de Usuários",
      question: "Qual é a diferença entre as funções USUÁRIO e ADMIN?",
      answer:
        "Usuários ADMIN têm acesso total a todos os recursos, incluindo gerenciamento de usuários, configurações do sistema e dados sensíveis. A função USUÁRIO tem acesso às operações diárias, como produtos, vendas, compras e relatórios, mas não pode gerenciar usuários ou alterar configurações do sistema.",
    },
    {
      category: "Gerenciamento de Usuários",
      question: "Como redefino uma senha esquecida?",
      answer:
        'Na página de login, clique em "Esqueceu a Senha" e insira seu endereço de e-mail. Você receberá um link de redefinição de senha por e-mail. Clique no link, insira sua nova senha e você poderá fazer login com as novas credenciais.',
    },
    {
      category: "Compras e Fornecedores",
      question: "Como registro uma compra de um fornecedor?",
      answer:
        'Navegue até a página de Compras, clique em "Adicionar Compra", selecione o fornecedor e o produto, insira a quantidade e o preço unitário. O sistema criará um lote de estoque para rastreamento FIFO e aumentará automaticamente seus níveis de inventário.',
    },
    {
      category: "Compras e Fornecedores",
      question: "Posso rastrear vários fornecedores para o mesmo produto?",
      answer:
        "Sim! Cada produto pode ser associado a vários fornecedores. Ao registrar uma compra, você seleciona de qual fornecedor está comprando. Isso permite que você acompanhe o desempenho dos fornecedores e compare preços entre os vendedores.",
    },
    {
      category: "Técnico",
      question: "Como faço backup dos meus dados?",
      answer:
        "O banco de dados é executado em um contêiner Docker com armazenamento persistente. Para fazer backup, você pode exportar dados usando os recursos de relatório ou usar ferramentas de backup do PostgreSQL. Para backups completos, use o backup do volume Docker ou execute `pg_dump` no contêiner do banco de dados.",
    },
    {
      category: "Técnico",
      question: "Posso integrar com outros sistemas via API?",
      answer:
        "Sim! A aplicação fornece uma API RESTful abrangente. Todos os endpoints estão documentados na página de Documentação. Você pode usar essas APIs para integrar com sistemas externos, aplicativos móveis ou ferramentas de automação.",
    },
    {
      category: "Técnico",
      question: "Existe um aplicativo móvel disponível?",
      answer:
        "A aplicação web é totalmente responsiva e funciona em navegadores móveis. Embora atualmente não haja um aplicativo móvel nativo, o design responsivo oferece uma excelente experiência móvel para gerenciar o inventário em movimento.",
    },
  ];

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 sm:pt-20">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Perguntas Frequentes
            </h1>
            <p className="text-gray-600 mt-1">
              Encontre respostas para perguntas comuns sobre o PrimeGestor
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar Perguntas Frequentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/90 transition-all duration-300 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSearchTerm(category)}
              className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-lg hover:border-blue-300/70 hover:shadow-md hover:bg-white/90 transition-all duration-300 text-sm font-medium text-gray-700 hover:text-blue-700"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">
                Nenhuma Pergunta frequente encontrada correspondente à sua
                pesquisa.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Limpar pesquisa
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-200/50 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/90 transition-colors"
                >
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1">
                      {faq.question}
                    </h3>
                  </div>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 pt-2 border-t border-gray-200/50 bg-gradient-to-r from-blue-50/30 to-purple-50/30">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-12 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Ainda tem perguntas?
          </h2>
          <p className="text-gray-600 mb-4">
            Não consegue encontrar a resposta que procura? Entre em contato com
            a nossa equipe de suporte.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
          >
            <Home className="w-5 h-5" />
            Contatar Suporte
          </Link>
        </div>
      </div>
    </div>
  );
}
