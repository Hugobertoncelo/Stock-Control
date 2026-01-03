"use client";

import Link from "next/link";
import { Cookie, ArrowLeft } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 sm:pt-20">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl shadow-lg">
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Política de Cookies
              </h1>
            </div>
            <p className="text-gray-600 text-sm">
              Como usamos cookies e tecnologias de rastreamento
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-500 mb-8">
              Última atualização: 3 de Janeiro de 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. O que são Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies são pequenos arquivos de texto que são armazenados em
                seu dispositivo quando você visita nosso site. Eles nos ajudam a
                fornecer uma melhor experiência de navegação, lembrando suas
                preferências e entendendo como você usa nosso serviço.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Esta Política de Cookies explica como a PrimeGestor usa cookies
                e tecnologias semelhantes para melhorar sua experiência com
                nosso sistema de gerenciamento de inventário.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Tipos de Cookies que Usamos
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.1 Cookies Essenciais
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Esses cookies são necessários para o funcionamento adequado do
                site. Eles permitem funcionalidades básicas, como:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Autenticação de usuários e gerenciamento de sessões</li>
                <li>Recursos de segurança e prevenção de fraudes</li>
                <li>Lembrar seu status de login</li>
                <li>Manter seu carrinho de compras ou dados de formulários</li>
              </ul>
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Nota:</strong> Esses cookies não podem ser
                  desativados, pois são essenciais para o funcionamento do
                  serviço.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.2 Cookies Funcionais
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Esses cookies melhoram sua experiência ao lembrar suas
                preferências e configurações:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Preferências de idioma</li>
                <li>Configurações de exibição e temas</li>
                <li>Layouts personalizados do painel</li>
                <li>Preferências de formato de relatório</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.3 Cookies de Análise
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Usamos cookies de análise para entender como os usuários
                interagem com nosso serviço:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Páginas visitadas e tempo gasto</li>
                <li>Recursos mais utilizados</li>
                <li>Padrões de navegação do usuário</li>
                <li>Métricas de desempenho e rastreamento de erros</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.4 Cookies de Marketing
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Esses cookies nos ajudam a entregar anúncios relevantes e medir
                a eficácia das campanhas:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Rastreamento de desempenho de anúncios</li>
                <li>Retargeting com base em interesses</li>
                <li>Integração com redes sociais</li>
                <li>Rastreamento de conversões</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Cookies de Terceiros
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Podemos usar serviços de terceiros que colocam seus próprios
                cookies. Estes incluem:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Google Analytics:</strong> Para análise de site e
                  insights sobre o comportamento do usuário
                </li>
                <li>
                  <strong>Stripe/Processadores de Pagamento:</strong> Para
                  processamento seguro de pagamentos
                </li>
                <li>
                  <strong>Ferramentas de Suporte ao Cliente:</strong> Para chat
                  ao vivo e gerenciamento de tickets de suporte
                </li>
                <li>
                  <strong>Redes de Distribuição de Conteúdo:</strong> Para
                  carregamento mais rápido de conteúdo
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Esses terceiros têm suas próprias políticas de privacidade e
                práticas de cookies, que incentivamos você a revisar.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Gerenciamento de Cookies
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                4.1 Configurações do Navegador
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Você pode controlar e gerenciar cookies através das
                configurações do seu navegador. A maioria dos navegadores
                permite que você:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Visualizar quais cookies estão armazenados</li>
                <li>Excluir cookies existentes</li>
                <li>Bloquear cookies de sites específicos</li>
                <li>Bloquear todos os cookies</li>
                <li>Limpar cookies ao fechar o navegador</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                4.2 Nossas Preferências de Cookies
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Você pode gerenciar suas preferências de cookies diretamente
                através do nosso serviço. Cookies não essenciais só serão
                colocados com o seu consentimento.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Impacto da Desativação de Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Observe que desativar certos cookies pode afetar sua experiência
                com o PrimeGestor:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Cookies essenciais:</strong> Desativar esses cookies
                  impedirá que o serviço funcione corretamente
                </li>
                <li>
                  <strong>Cookies funcionais:</strong> Você pode precisar
                  reconfigurar preferências a cada visita
                </li>
                <li>
                  <strong>Cookies de Análise:</strong> Não poderemos melhorar o
                  serviço com base nos dados de uso
                </li>
                <li>
                  <strong>Cookies de Marketing:</strong> Você pode ver anúncios
                  menos relevantes
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Armazenamento e Retenção de Dados
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies geralmente expiram após um período definido, mas a
                duração exata depende do tipo de cookie:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Cookies de Sessão:</strong> Excluídos quando você
                  fecha o navegador
                </li>
                <li>
                  <strong>Cookies Persistentes:</strong> Permanecem até serem
                  excluídos ou expirarem (tipicamente de 30 dias a 2 anos)
                </li>
                <li>
                  <strong>Cookies de Autenticação:</strong> Geralmente expiram
                  após um período de inatividade
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Atualizações a Esta Política
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Podemos atualizar esta Política de Cookies de tempos em tempos
                para refletir mudanças em nossas práticas ou por razões legais.
                Nós o notificaremos sobre quaisquer alterações materiais e
                atualizaremos a data de "Última atualização".
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Seus Direitos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                De acordo com as leis de privacidade aplicáveis, você tem
                direitos em relação aos seus dados pessoais coletados por meio
                de cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Direito de acessar informações sobre a coleta de dados</li>
                <li>
                  Direito de retirar o consentimento para cookies não essenciais
                </li>
                <li>Direito de solicitar a exclusão de dados pessoais</li>
                <li>Direito de se opor a certos processos de dados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Entre em Contato
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Se você tiver dúvidas sobre o uso de cookies ou esta política,
                entre em contato conosco:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> hugobertoncelo@gmail.com
                </p>
                <p className="text-gray-700">
                  <strong>Endereço:</strong> Vitória, Espírito Santo, Brasil
                </p>
                <p className="text-gray-700">
                  <strong>Telefone:</strong> (28) 99945-3033
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                Para mais informações sobre nossas práticas gerais de
                privacidade, consulte nossa{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Lista de Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Aqui está uma lista detalhada de cookies que usamos:
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome do Cookie
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Finalidade
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duração
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        primegestor_session
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        Autenticação do usuário
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        24 horas
                      </td>
                      <td className="px-4 py-2 text-sm text-green-600">
                        Essencial
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        primegestor_prefs
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        Preferências do usuário
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        30 dias
                      </td>
                      <td className="px-4 py-2 text-sm text-blue-600">
                        Funcional
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">_ga</td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        Google Analytics
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        2 anos
                      </td>
                      <td className="px-4 py-2 text-sm text-purple-600">
                        Análise
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        primegestor_theme
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        Preferência de tema
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">1 ano</td>
                      <td className="px-4 py-2 text-sm text-blue-600">
                        Funcional
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
