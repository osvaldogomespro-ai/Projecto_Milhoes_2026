# Issue #3: Módulo — Gestão de Contas

> **Issue Pai**: Referência à Issue Geral `[MASTER] Pacote de Implementação — App de Gestão de Arbitragem`

## Descrição do Objetivo
Desenvolver o módulo responsável pelo ciclo de vida das contas cadastradas nas diferentes casas de apostas. O módulo permite cadastrar titulares, gerenciar saldos individuais, auditar o status operacional (ativo, limitado, bloqueado) e aplicar validações rígidas de integridade cadastral para evitar duplicações de dados de identificação.

---

## Critérios de Aceitação
- [ ] O ecrã de listagem exibe todas as contas com filtros por casa de aposta, status e busca por nome ou documento.
- [ ] Os cards ou linhas da listagem destacam claramente o saldo individual de cada conta e o total somado de todas as contas ativas.
- [ ] O formulário de criação/edição permite preencher todos os dados cadastrais obrigatórios com validações de formato.
- [ ] Validação automática de **Documento Repetido**: o sistema consulta o Firestore antes do salvamento e impede o cadastro se o mesmo número de documento já existir em qualquer outra conta, exibindo alerta explicativo.
- [ ] Validação automática de **Telefone Repetido**: o sistema impede que o mesmo número telefônico seja associado a mais de um registro ativo, evitando problemas de verificação por SMS nas casas de apostas.
- [ ] A alteração de status da conta (Ativo ➔ Limitado ou Bloqueado) reflete imediatamente nos seletores de contas da Calculadora de Equilíbrio e da Execução de Ciclo, impedindo novas apostas em contas inaptas.

---

## Subtarefas (Checklist)
- [ ] Construir o ecrã de listagem de contas com filtros avançados, busca e resumo de saldos
- [ ] Construir o formulário modal ou dedicado de criação e edição de conta
- [ ] Implementar hook e regras de validação automática para bloqueio de documento repetido
- [ ] Implementar hook e regras de validação automática para bloqueio de telefone repetido
- [ ] Adicionar controle de status rápido (`ativo`, `limitado`, `bloqueado`) com tags visuais
- [ ] Implementar histórico de notas e auditoria de alterações de saldo por conta
