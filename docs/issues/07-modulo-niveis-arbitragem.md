# Issue #7: Módulo — Níveis de Arbitragem (Fase Futura)

> **Issue Pai**: Referência à Issue Geral `[MASTER] Pacote de Implementação — App de Gestão de Arbitragem`  
> **Prioridade**: Baixa (Backlog / Próxima Fase)

## Descrição do Objetivo
Estruturar o módulo avançado de progressão por níveis e agrupamento em cascata de contas vencedoras. Esta funcionalidade permitirá orquestrar ciclos em múltiplos níveis sequenciais (Tier 1 ➔ Tier 2 ➔ Tier 3), redirecionando o capital acumulado nas contas que obtiveram lucro no ciclo anterior diretamente para novos ciclos de maior liquidez, sem necessidade de transferências bancárias intermediárias.

---

## Critérios de Aceitação
- [ ] O operador consegue visualizar a árvore hierárquica de níveis de arbitragem (Nível 1: Entrada, Nível 2: Escala, Nível 3: Maximização).
- [ ] O algoritmo de cascata identifica automaticamente quais contas foram vencedoras em ciclos anteriores com base no resultado efetivo do jogo:
  1. **Se o ciclo anterior foi vencido na CASA (1)**:
     - Apenas a conta associada à ponta **CASA** acumula o saldo total do prêmio e é qualificada para o grupo do próximo nível de stake.
     - As contas de **EMPATE** e **FORA** são marcadas para recarga de saldo ou substituídas na esteira de entrada (Nível 1).
  2. **Se o ciclo anterior foi vencido no EMPATE (X)**:
     - Apenas a conta associada ao **EMPATE** acumula o saldo e sobe para o próximo nível na cascata.
     - As contas de **CASA** e **FORA** retornam à esteira de reposição ou pausa de verificação.
  3. **Se o ciclo anterior foi vencido no FORA (2)**:
     - Apenas a conta associada à ponta **FORA** acumula o saldo e sobe para o próximo nível na cascata.
     - As contas de **CASA** e **EMPATE** retornam à esteira de reposição ou pausa de verificação.
- [ ] O sistema permite criar um "Ciclo Composto / Cascata" unindo as contas vencedoras de ciclos paralelos independentes para cobrir uma nova arbitragem de alto valor.
- [ ] Painel analítico de eficiência da cascata, comparando o rendimento acumulado de ciclos em níveis versus ciclos simples avulsos.

---

## Subtarefas (Checklist)
- [ ] Modelar a estrutura de níveis e dependência entre ciclos no Firestore
- [ ] Implementar motor de detecção e agrupamento em cascata de contas vencedoras pós-liquidação
- [ ] Desenvolver regras de elegibilidade para cada um dos três cenários de vitória (Casa, Empate, Fora)
- [ ] Criar visualizador em árvore/funil de progressão das contas entre os níveis
- [ ] Implementar assistente de formação de ciclos de Nível Superior a partir do pool de contas vencedoras
