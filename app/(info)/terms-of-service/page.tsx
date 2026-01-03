"use client";

import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 sm:pt-20">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Termos de Serviço
              </h1>
            </div>
            <p className="text-gray-600 text-sm">
              Termos e condições legais para uso do PrimeGestor
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
                1. Aceitação dos Termos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ao acessar e usar o PrimeGestor ("o Serviço"), você aceita e
                concorda em cumprir os termos e disposições deste contrato. Se
                você não concorda em cumprir o acima, não use este serviço.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Estes Termos de Serviço ("Termos") se aplicam a todos os
                usuários do sistema de gerenciamento de inventário PrimeGestor.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Descrição do Serviço
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                O PrimeGestor é um sistema abrangente de gerenciamento de
                inventário que fornece:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Rastreamento de produtos e inventário</li>
                <li>Gerenciamento de vendas e compras</li>
                <li>Relatórios e análises</li>
                <li>Gerenciamento de usuários e controle de acesso</li>
                <li>Serviços de armazenamento e backup de dados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Contas de Usuário
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                3.1 Criação de Conta
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Para usar o PrimeGestor, você deve criar uma conta. Você é
                responsável por manter a confidencialidade das credenciais da
                sua conta e por todas as atividades que ocorrem sob sua conta.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                3.2 Responsabilidades da Conta
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  Fornecer informações precisas e completas durante o registro
                </li>
                <li>Manter a segurança da sua senha e conta</li>
                <li>
                  Notificar-nos imediatamente sobre qualquer uso não autorizado
                </li>
                <li>
                  Aceitar responsabilidade por todas as atividades sob sua conta
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Política de Uso Aceitável
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Você concorda em não usar o Serviço para:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Violar quaisquer leis ou regulamentos aplicáveis</li>
                <li>Infringir direitos de propriedade intelectual</li>
                <li>Transmitir código prejudicial ou malicioso</li>
                <li>Tentar obter acesso não autorizado aos nossos sistemas</li>
                <li>Interferir no funcionamento adequado do Serviço</li>
                <li>
                  Usar o Serviço para quaisquer fins fraudulentos ou ilegais
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Propriedade de Dados e Privacidade
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Você mantém a propriedade de todos os dados que insere no
                PrimeGestor. Nós respeitamos sua privacidade e tratamos seus
                dados de acordo com nossa{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
              <p className="text-gray-700 leading-relaxed">
                Você é responsável por garantir que tem o direito de usar e
                armazenar quaisquer dados que você enviar para o nosso serviço.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Disponibilidade do Serviço
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Embora nos esforcemos para fornecer um serviço contínuo, não
                garantimos que o PrimeGestor estará disponível em todos os
                momentos. Nós podemos realizar manutenção, atualizações ou
                enfrentar problemas técnicos que interrompam temporariamente o
                serviço.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Faremos esforços razoáveis para minimizar interrupções no
                serviço e notificar os usuários sobre manutenções programadas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Taxas e Pagamento
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                O PrimeGestor pode oferecer planos gratuitos e pagos. As taxas
                para serviços pagos são exibidas claramente e devem ser pagas
                antecipadamente. Nós reservamos o direito de alterar os preços
                com 30 dias de antecedência.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Todas as taxas são não reembolsáveis, exceto conforme exigido
                por lei ou conforme explicitamente declarado em nossa política
                de reembolso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Propriedade Intelectual
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                O PrimeGestor e seu conteúdo original, recursos e
                funcionalidades são de nossa propriedade e estão protegidos por
                direitos autorais, marcas registradas e outras leis de
                propriedade intelectual.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Você não pode reproduzir, distribuir ou criar obras derivadas de
                nosso serviço sem permissão explícita.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Limitação de Responsabilidade
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                O PrimeGestor é fornecido "como está" sem garantias de qualquer
                tipo. Não seremos responsáveis por quaisquer danos indiretos,
                incidentais, especiais ou consequenciais decorrentes do seu uso
                do serviço.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nossa responsabilidade total não excederá o valor pago por você
                pelo serviço nos 12 meses anteriores à reclamação.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Terminação
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Podemos encerrar ou suspender sua conta imediatamente por
                violações destes Termos. Após a rescisão, seu direito de usar o
                Serviço cessará imediatamente.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Você pode encerrar sua conta a qualquer momento entrando em
                contato com nossa equipe de suporte.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Lei Aplicável
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Estes Termos serão regidos e interpretados de acordo com as leis
                do Sri Lanka, sem considerar seus conflitos de leis.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Alterações aos Termos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Reservamos o direito de modificar estes Termos a qualquer
                momento. Nós iremos notificar os usuários sobre alterações
                materiais por e-mail ou através do Serviço. O uso contínuo após
                as alterações constitui aceitação.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                13. Informações de Contato
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Se você tiver alguma dúvida sobre estes Termos, entre em contato
                conosco:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> hugobertoncelo@gmail.com
                </p>
                <p className="text-gray-700">
                  <strong>Endereço:</strong> Vitória - ES, Brasil
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
