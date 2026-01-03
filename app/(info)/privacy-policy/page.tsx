"use client";

import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 sm:pt-20">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Política de Privacidade
              </h1>
            </div>
            <p className="text-gray-600 text-sm">
              Como protegemos e lidamos com seus dados
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
                1. Introdução
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                PrimeGestor ("nós", "nosso" ou "nos") está comprometido em
                proteger sua privacidade. Esta Política de Privacidade explica
                como coletamos, usamos, divulgamos e protegemos suas informações
                quando você usa nosso sistema de gerenciamento de inventário.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Ao usar o PrimeGestor, você concorda com a coleta e uso de
                informações de acordo com esta política.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Informações que Coletamos
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.1 Informações Pessoais
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Podemos coletar informações pessoalmente identificáveis que você
                nos fornece diretamente, incluindo:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  Nome e informações de contato (e-mail, número de telefone)
                </li>
                <li>Credenciais da conta (nome de usuário, senha)</li>
                <li>Informações e preferências comerciais</li>
                <li>Histórico de comunicação com nossa equipe de suporte</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.2 Dados de Uso
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Coletamos automaticamente certas informações quando você usa
                nosso serviço:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Endereço IP e informações de localização</li>
                <li>Tipo e versão do navegador</li>
                <li>Páginas visitadas e tempo gasto em nossa plataforma</li>
                <li>Informações do dispositivo e sistema operacional</li>
                <li>Logs de atividade e padrões de uso</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Como Usamos Suas Informações
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Usamos as informações coletadas para:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  Fornecer e manter nosso serviço de gerenciamento de inventário
                </li>
                <li>Processar transações e gerenciar sua conta</li>
                <li>Comunicar com você sobre atualizações e suporte</li>
                <li>Analisar padrões de uso para melhorar nosso serviço</li>
                <li>Garantir segurança e prevenir atividades fraudulentas</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Segurança dos Dados
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Implementamos medidas técnicas e organizacionais apropriadas
                para proteger suas informações pessoais contra acesso não
                autorizado, alteração, divulgação ou destruição. Essas medidas
                incluem:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Auditorias de segurança e atualizações regulares</li>
                <li>Mecanismos de controle de acesso e autenticação</li>
                <li>Infraestrutura de banco de dados segura</li>
                <li>
                  Backups regulares e procedimentos de recuperação de desastres
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Compartilhamento e Divulgação de Dados
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Não vendemos, trocamos ou transferimos suas informações pessoais
                para terceiros sem o seu consentimento, exceto nas seguintes
                circunstâncias:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  Com prestadores de serviços que auxiliam em nossas operações
                  (sob acordos de confidencialidade rigorosos)
                </li>
                <li>Quando exigido por lei ou para proteger nossos direitos</li>
                <li>
                  Em conexão com uma transferência ou aquisição de negócios
                </li>
                <li>Com seu consentimento explícito</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Seus Direitos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Você tem o direito de:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Acessar e revisar suas informações pessoais</li>
                <li>Corrigir dados imprecisos ou incompletos</li>
                <li>Solicitar a exclusão de suas informações pessoais</li>
                <li>
                  Opor-se ou restringir certas atividades de processamento
                </li>
                <li>Portabilidade de dados</li>
                <li>Retirar consentimento quando aplicável</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Cookies e Rastreamento
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Usamos cookies e tecnologias semelhantes para melhorar sua
                experiência. Para obter informações detalhadas sobre nossas
                práticas de cookies, consulte nossa{" "}
                <Link
                  href="/cookie-policy"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Política de Cookies
                </Link>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Retenção de Dados
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Retemos suas informações pessoais apenas pelo tempo necessário
                para os fins descritos nesta política, a menos que um período de
                retenção mais longo seja exigido por lei. Quando não precisarmos
                mais de suas informações, as excluímos ou anonimizamos de forma
                segura.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Transferências Internacionais de Dados
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Suas informações podem ser transferidas e processadas em países
                diferentes do seu. Garantimos que tais transferências estejam em
                conformidade com as leis de proteção de dados aplicáveis e
                implementem salvaguardas apropriadas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Alterações a Esta Política
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Podemos atualizar esta Política de Privacidade de tempos em
                tempos. Notificaremos você sobre quaisquer alterações materiais
                publicando a nova política nesta página e atualizando a data de
                "Última atualização".
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Entre em Contato
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Se você tiver alguma dúvida sobre esta Política de Privacidade
                ou nossas práticas de dados, entre em contato conosco:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> hugobertoncelo@gmail.com
                </p>
                <p className="text-gray-700">
                  <strong>Endereço:</strong> Vitória, Espirito Santo, Brasil
                </p>
                <p className="text-gray-700">
                  <strong>Telefone:</strong> (28) 99945-3033
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
