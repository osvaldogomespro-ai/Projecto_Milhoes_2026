# Issue #2: Modelo de Dados — Coleções Firestore

> **Issue Pai**: Referência à Issue Geral `[MASTER] Pacote de Implementação — App de Gestão de Arbitragem`

## Descrição do Objetivo
Definir, tipar em TypeScript e provisionar no Cloud Firestore o modelo de dados relacional e escalável da aplicação. As coleções devem suportar todo o ciclo de vida da arbitragem esportiva (1X2), permitindo rastrear cadastros de contas, parametrização dos jogos, planejamento e consolidação dos ciclos, execuções de apostas e auditoria de cada movimento financeiro.

---

## Critérios de Aceitação
- [ ] Todas as 5 coleções principais (`contas`, `jogos`, `ciclos`, `execucao_ciclo`, `movimentos_banca`) possuem interfaces TypeScript rígidas com tipagem completa de cada campo.
- [ ] A coleção `jogos` suporta explicitamente no campo de resultado os três desfechos possíveis: `'CASA'`, `'EMPATE'`, `'FORA'` (ou `'PENDENTE'`).
- [ ] A coleção `ciclos` armazena de forma auditável os valores de `lucro_esperado`, `lucro_real`, `stake_total` e o `resultado_apurado`, cobrindo de maneira independente os 3 cenários de finalização:
  - Vitória da Casa (`'CASA'`)
  - Empate no Jogo (`'EMPATE'`)
  - Vitória de Fora (`'FORA'`)
- [ ] A coleção `execucao_ciclo` vincula cada aposta individual a uma conta específica, mercado escolhido (`'CASA'` | `'EMPATE'` | `'FORA'`), odd, stake, saldo anterior, saldo final e detalhes de erro quando houver.
- [ ] A coleção `movimentos_banca` registra os créditos e débitos decorrentes da finalização do ciclo para os três casos de vitória, além de depósitos, levantamentos e ajustes manuais.
- [ ] Índices compostos necessários no Firestore estão configurados para ordenação por data e consultas por status.

---

## Subtarefas (Checklist)
- [ ] Criar e tipar a coleção `contas`
  - Campos: `id: string`, `nome: string`, `documento: string`, `telefone: string`, `casa_aposta: string`, `status: 'ativo' | 'limitado' | 'bloqueado'`, `saldo_atual: number`, `data_criacao: Timestamp`, `notas?: string`
- [ ] Criar e tipar a coleção `jogos`
  - Campos: `id: string`, `data_hora: Timestamp`, `equipa_casa: string`, `equipa_fora: string`, `competicao: string`, `odd_casa: number`, `odd_empate: number`, `odd_fora: number`, `status: 'agendado' | 'em_andamento' | 'encerrado'`, `resultado_final?: 'CASA' | 'EMPATE' | 'FORA'`
- [ ] Criar e tipar a coleção `ciclos`
  - Campos: `id: string`, `nome: string`, `jogo_id: string`, `data_inicio: Timestamp`, `data_fim?: Timestamp`, `status: 'planeamento' | 'em_execucao' | 'concluido' | 'cancelado'`, `stake_total: number`, `retorno_total_esperado: number`, `lucro_esperado: number`, `lucro_real?: number`, `resultado_apurado?: 'CASA' | 'EMPATE' | 'FORA'`
- [ ] Criar e tipar a coleção `execucao_ciclo`
  - Campos: `id: string`, `ciclo_id: string`, `conta_id: string`, `jogo_id: string`, `mercado: 'CASA' | 'EMPATE' | 'FORA'`, `odd_utilizada: number`, `stake_alocada: number`, `retorno_potencial: number`, `status: 'pendente' | 'executada' | 'ganha' | 'perdida' | 'erro'`, `saldo_anterior: number`, `saldo_final: number`, `erro_detalhes?: string`
- [ ] Criar e tipar a coleção `movimentos_banca`
  - Campos: `id: string`, `data: Timestamp`, `tipo: 'deposito' | 'levantamento' | 'lucro_ciclo' | 'prejuizo_ciclo' | 'ajuste'`, `valor: number`, `conta_id: string`, `ciclo_id_ref?: string`, `resultado_desfecho?: 'CASA' | 'EMPATE' | 'FORA'`, `descricao: string`, `saldo_apos: number`
