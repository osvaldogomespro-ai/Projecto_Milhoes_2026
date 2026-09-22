# Issue #4: Módulo — Calculadora de Equilíbrio

> **Issue Pai**: Referência à Issue Geral `[MASTER] Pacote de Implementação — App de Gestão de Arbitragem`

## Descrição do Objetivo
Desenvolver o motor de cálculo e a interface da Calculadora de Equilíbrio de Arbitragem (mercado 1X2). O módulo deve permitir ao operador inserir as odds de cada mercado em tempo real, calcular a distribuição matemática ótima de stakes entre as contas disponíveis e determinar de forma inequívoca o retorno e o status de segurança (Protegido vs. Risco) para cada um dos três desfechos possíveis do evento esportivo.

---

## Critérios de Aceitação
- [ ] O operador consegue inserir as odds dos três desfechos do evento esportivo: Odd Casa ($O_1$), Odd Empate ($O_X$) e Odd Fora ($O_2$).
- [ ] O sistema calcula a margem de arbitragem:
  $$\text{Margem} = \left(\frac{1}{O_1} + \frac{1}{O_X} + \frac{1}{O_2}\right)$$
  Indicando se há oportunidade de surebet/arbitragem pura ($\text{Margem} < 1.00$).
- [ ] O simulador calcula a distribuição precisa de stakes por conta respeitando o valor total alocado ou a stake base configurada.
- [ ] **Cobertura Explícita dos Três Resultados Possíveis**:
  1. **Se a Casa Vencer (1)**:
     - Retorno Bruto = $\text{Stake}_{\text{Casa}} \times O_1$
     - Lucro Líquido = $\text{Retorno Bruto} - \text{Stake Total}$
     - A interface exibe o balanço final exato deste cenário.
  2. **Se o Jogo Terminar Empatado (X)**:
     - Retorno Bruto = $\text{Stake}_{\text{Empate}} \times O_X$
     - Lucro Líquido = $\text{Retorno Bruto} - \text{Stake Total}$
     - A interface exibe o balanço final exato deste cenário.
  3. **Se o Visitante/Fora Vencer (2)**:
     - Retorno Bruto = $\text{Stake}_{\text{Fora}} \times O_2$
     - Lucro Líquido = $\text{Retorno Bruto} - \text{Stake Total}$
     - A interface exibe o balanço final exato deste cenário.
- [ ] **Indicador de Status (Protegido / Risco)**:
  - **Status Protegido**: ativado apenas se o Lucro Líquido for $\ge 0$ em **todos os três cenários** (Casa, Empate e Fora).
  - **Status Risco**: acionado visualmente caso qualquer um dos três cenários resulte em retorno menor que a Stake Total ou se a margem for desfavorável.
- [ ] O operador pode vincular cada perna da aposta a uma conta cadastrada ativa e validar se o saldo da conta cobre a stake sugerida.
- [ ] Um botão de ação "Criar Ciclo a partir da Simulação" exporta os dados diretamente para o módulo de Execução de Ciclo.

---

## Subtarefas (Checklist)
- [ ] Criar interface de input de odds para os mercados Casa (1), Empate (X) e Fora (2)
- [ ] Implementar motor de cálculo matemático de margem, probabilidades implícitas e distribuição proporcional de stakes
- [ ] Criar painel comparativo dos 3 resultados detalhando retorno bruto e lucro líquido para Casa, Empate e Fora
- [ ] Implementar seletor de contas ativas e validação de saldo suficiente para cada perna da simulação
- [ ] Implementar componente visual de Status dinâmico (`Protegido` em verde vs. `Risco` em vermelho/âmbar)
- [ ] Criar mecanismo de conversão de simulação em novo Ciclo com pré-preenchimento para execução
