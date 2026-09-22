# Issue #5: Módulo — Execução de Ciclo

> **Issue Pai**: Referência à Issue Geral `[MASTER] Pacote de Implementação — App de Gestão de Arbitragem`

## Descrição do Objetivo
Desenvolver a central operacional de Execução de Ciclo em tempo real. Este módulo fornece um ecrã "ao vivo" onde o operador acompanha e registra a colocação de apostas em cada conta individual envolvida na operação, altera status em tempo real, documenta imprevistos operacionais (erros de colocação, oscilação de odds, limites) e liquida o ciclo atualizando os saldos das contas conforme o desfecho final do evento esportivo.

---

## Critérios de Aceitação
- [ ] O ecrã "ao vivo" exibe um painel estruturado por conta participante com os dados da aposta: Casa de Aposta, Titular, Mercado Alocado (`CASA`, `EMPATE` ou `FORA`), Odd Contratada, Stake, Saldo Anterior e Saldo Final projetado.
- [ ] Cada conta possui um dropdown de status operacional com as opções:
  - `Pendente` (aguardando inserção manual na casa)
  - `Executada / Confirmada` (aposta aceita pelo bookmaker)
  - `Ganha` (liquidada com lucro após encerramento)
  - `Perdida` (liquidada com perda da stake após encerramento)
  - `Erro / Cancelada` (falha na colocação ou evento anulado)
- [ ] Um campo de texto específico para registro de ocorrências operacionais (`campo de erro`) é disponibilizado por conta (ex.: *"Odd caiu de 3.40 para 3.15 antes da submissão"*, *"Conta limitada para stake máxima de 50€"*).
- [ ] O sistema calcula automaticamente o `saldo_anterior` (capturado da conta no momento da vinculação) e o `saldo_final` (recalculado dinamicamente com base no status e resultado).
- [ ] **Critérios de Liquidação e Resolução Explícita dos Três Resultados Possíveis**:
  1. **Se o resultado do evento for CASA (1)**:
     - A conta com aposta em **CASA** tem status alterado para **Ganha**; seu saldo final passa a ser:
       $$\text{Saldo Final} = \text{Saldo Anterior} + (\text{Stake}_{\text{Casa}} \times O_1) - \text{Stake}_{\text{Casa}}$$
     - As contas com apostas em **EMPATE** e **FORA** têm status alterados para **Perdida**; seus saldos finais passam a ser:
       $$\text{Saldo Final} = \text{Saldo Anterior} - \text{Stake}$$
     - O ciclo é finalizado com status "Concluído", registrando o lucro real apurado do cenário Casa.
  2. **Se o resultado do evento for EMPATE (X)**:
     - A conta com aposta em **EMPATE** tem status alterado para **Ganha**; seu saldo final passa a ser:
       $$\text{Saldo Final} = \text{Saldo Anterior} + (\text{Stake}_{\text{Empate}} \times O_X) - \text{Stake}_{\text{Empate}}$$
     - As contas com apostas em **CASA** e **FORA** têm status alterados para **Perdida**; seus saldos finais passam a ser:
       $$\text{Saldo Final} = \text{Saldo Anterior} - \text{Stake}$$
     - O ciclo é finalizado com status "Concluído", registrando o lucro real apurado do cenário Empate.
  3. **Se o resultado do evento for FORA (2)**:
     - A conta com aposta em **FORA** tem status alterado para **Ganha**; seu saldo final passa a ser:
       $$\text{Saldo Final} = \text{Saldo Anterior} + (\text{Stake}_{\text{Fora}} \times O_2) - \text{Stake}_{\text{Fora}}$$
     - As contas com apostas em **CASA** e **EMPATE** têm status alterados para **Perdida**; seus saldos finais passam a ser:
       $$\text{Saldo Final} = \text{Saldo Anterior} - \text{Stake}$$
     - O ciclo é finalizado com status "Concluído", registrando o lucro real apurado do cenário Fora.
- [ ] Se houver qualquer registro no `campo de erro` ou se uma das três pernas não tiver sido executada, o encerramento do ciclo emite um aviso de inconsistência para validação manual do operador antes de persistir a atualização de saldo.

---

## Subtarefas (Checklist)
- [ ] Criar o ecrã "ao vivo" de monitoramento de execução do ciclo dividido por cards de contas
- [ ] Implementar dropdown de status em tempo real (`Pendente`, `Executada`, `Ganha`, `Perdida`, `Erro`)
- [ ] Implementar campo de erro e observações operacionais com persistência instantânea no Firestore
- [ ] Desenvolver a lógica de cálculo e visualização de saldo anterior, stake debitada e saldo final projetado
- [ ] Implementar seletor de liquidação final do jogo com os botões rápidos de resultado (`Casa (1)`, `Empate (X)`, `Fora (2)`)
- [ ] Implementar rotina transacional de resolução que atualiza simultaneamente a coleção `execucao_ciclo`, o status do `ciclos` e os saldos na coleção `contas`
- [ ] Criar gatilho automático para notificar o módulo de Movimentos e Banca após a conclusão do ciclo
