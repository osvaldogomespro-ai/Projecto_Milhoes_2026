# Issue #6: Módulo — Movimentos e Banca

> **Issue Pai**: Referência à Issue Geral `[MASTER] Pacote de Implementação — App de Gestão de Arbitragem`

## Descrição do Objetivo
Desenvolver o módulo de inteligência financeira e controle de banca da aplicação. O módulo permite realizar lançamentos avulsos de caixa (depósitos, levantamentos, taxas e correções manuais), calcular e exibir os principais Indicadores-Chave de Desempenho (KPIs de banca total acumulada, lucro acumulado e taxa de acerto por desfecho) e gerar automaticamente os movimentos financeiros quando um ciclo for concluído no módulo de Execução.

---

## Critérios de Aceitação
- [ ] O ecrã financeiro apresenta um formulário de lançamento rápido de movimentos manuais (tipos: Depósito, Levantamento, Ajuste de Saldo) associados a uma conta específica.
- [ ] **Painel de KPIs Estratégicos**:
  - **Banca Acumulada**: soma atualizada em tempo real dos saldos de todas as contas ativas mais o caixa não alocado.
  - **Lucro Acumulado**: resultado financeiro líquido obtido por todos os ciclos concluídos somado aos ajustes operacionais.
  - **Taxa de Acerto & Distribuição de Desfechos**: percentual e contagem de ciclos vencidos nas pontas Casa, Empate e Fora, além do ROI médio por ciclo.
- [ ] **Geração Automática de Movimentos a Partir de Ciclo Concluído**:
  - Ao finalizar um ciclo no módulo de Execução, o sistema gera de forma atômica os lançamentos na coleção `movimentos_banca`:
  1. **Se o ciclo foi ganho na CASA (1)**:
     - Gera registro de crédito de lucro líquido associado à conta que cobriu a **CASA**, referenciando o ID do ciclo e o desfecho `'CASA'`.
     - Gera registros de débito/atualização nas contas de **EMPATE** e **FORA** correspondentes às stakes consumidas.
  2. **Se o ciclo foi ganho no EMPATE (X)**:
     - Gera registro de crédito de lucro líquido associado à conta que cobriu o **EMPATE**, referenciando o ID do ciclo e o desfecho `'EMPATE'`.
     - Gera registros de débito/atualização nas contas de **CASA** e **FORA** correspondentes às stakes consumidas.
  3. **Se o ciclo foi ganho no FORA (2)**:
     - Gera registro de crédito de lucro líquido associado à conta que cobriu o **FORA**, referenciando o ID do ciclo e o desfecho `'FORA'`.
     - Gera registros de débito/atualização nas contas de **CASA** e **EMPATE** correspondentes às stakes consumidas.
- [ ] Histórico de extrato contábil com filtros por período, conta, tipo de movimento e ciclo referenciado, com opção de exportação de dados (CSV/JSON).
- [ ] O saldo consolidado da banca nunca fica dessincronizado dos saldos individuais das contas.

---

## Subtarefas (Checklist)
- [ ] Construir interface de registro e formulário de lançamentos manuais de caixa (depósitos e levantamentos)
- [ ] Implementar serviço de geração automática de movimentos financeiros disparado pela liquidação de ciclos
- [ ] Implementar tratamento específico para os 3 casos de desfecho do ciclo (Casa, Empate e Fora) na geração dos extratos
- [ ] Desenvolver cartões de KPIs em tempo real (Banca Acumulada, Lucro Líquido Acumulado, ROI Geral)
- [ ] Criar gráfico de evolução patrimonial da banca e métricas de distribuição dos desfechos dos jogos
- [ ] Desenvolver tabela de extrato histórico com filtros avançados e detalhes do ciclo vinculado
