# [MASTER] Pacote de Implementação — App de Gestão de Arbitragem

## Descrição do Objetivo
Esta é a Issue Geral (Master) que centraliza e orquestra todas as entregas do ciclo de desenvolvimento da aplicação de **Gestão de Arbitragem**. Ela funciona como o índice e roadmap executivo do projeto, garantindo rastreabilidade, aderência à arquitetura técnica e acompanhamento do progresso das issues filhas.

---

## Roadmap de Execução & Checklist de Dependências

- [ ] #1 **Configuração do Projeto e Firebase** — *Infraestrutura, ambiente base, Firestore e autenticação de utilizador único* ([ver issue #1](./01-configuracao-projeto-firebase.md))
- [ ] #2 **Modelo de Dados — Coleções Firestore** — *Criação e tipagem das coleções `contas`, `jogos`, `ciclos`, `execucao_ciclo` e `movimentos_banca`* ([ver issue #2](./02-modelo-dados-firestore.md))
- [ ] #3 **Módulo — Gestão de Contas** — *Listagem, formulários de criação/edição e validações de unicidade de documento e telefone* ([ver issue #3](./03-modulo-gestao-contas.md))
- [ ] #4 **Módulo — Calculadora de Equilíbrio** — *Input de odds (1X2), distribuição de stakes, simulação de contas e indicador Protegido/Risco* ([ver issue #4](./04-modulo-calculadora-equilibrio.md))
- [ ] #5 **Módulo — Execução de Ciclo** — *Painel operacional ao vivo por conta, controle de status, captura de erros e apuração dos 3 cenários (Casa/Empate/Fora)* ([ver issue #5](./05-modulo-execucao-ciclo.md))
- [ ] #6 **Módulo — Movimentos e Banca** — *Lançamentos financeiros manuais e automáticos pós-ciclo, consolidação da banca e painel de KPIs* ([ver issue #6](./06-modulo-movimentos-banca.md))
- [ ] #7 **Módulo — Níveis de Arbitragem (Fase Futura)** — *Agrupamento em cascata de contas vencedoras e escalonamento de banca* ([ver issue #7](./07-modulo-niveis-arbitragem.md))

---

## Critérios de Aceitação Gerais
1. **Rastreabilidade**: Todas as issues filhas devem obrigatoriamente referenciar esta Issue Master em suas descrições.
2. **Ciclo Completo de Arbitragem**: O sistema deve cobrir com precisão matemática e contábil o ciclo de ponta a ponta para os três resultados possíveis de cada evento esportivo:
   - **Resultado Casa (1)**: retorno garantido cobre a stake total, atualiza a conta de Casa como vencedora e debita as demais.
   - **Resultado Empate (X)**: retorno garantido cobre a stake total, atualiza a conta de Empate como vencedora e debita as demais.
   - **Resultado Fora (2)**: retorno garantido cobre a stake total, atualiza a conta de Fora como vencedora e debita as demais.
3. **Consistência de Estado**: Em nenhuma hipótese deve haver divergência entre o saldo total da banca e a soma dos saldos das contas ativas somados aos movimentos registrados.
4. **Deploy & Validação**: Todas as sub-tarefas de cada issue devem ser testadas em ambiente de homologação antes de serem marcadas como concluídas.
