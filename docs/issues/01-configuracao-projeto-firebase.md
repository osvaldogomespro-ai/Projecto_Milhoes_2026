# Issue #1: Configuração do Projeto e Firebase

> **Issue Pai**: Referência à Issue Geral `[MASTER] Pacote de Implementação — App de Gestão de Arbitragem`

## Descrição do Objetivo
Estabelecer a base estrutural da aplicação e integrar os serviços do Firebase (Authentication e Cloud Firestore). O objetivo é garantir um ambiente de execução seguro, moderno e com autenticação restrita a um utilizador único (gestor da banca), estabelecendo a fundação técnica sobre a qual todos os módulos operarão.

---

## Critérios de Aceitação
- [ ] O projeto compila sem erros com TypeScript em modo estrito, empacotamento rápido via Vite e estilização Tailwind CSS.
- [ ] O Firebase está inicializado via SDK oficial (`firebase/app`, `firebase/auth`, `firebase/firestore`), gerenciando credenciais de forma segura por variáveis de ambiente.
- [ ] O fluxo de autenticação por Email/Password está implementado e protege todas as rotas da aplicação.
- [ ] O sistema restringe o acesso ao utilizador único autorizado; tentativas de cadastro ou login com credenciais não autorizadas são bloqueadas com feedback visual claro.
- [ ] A persistência da sessão é configurada para manter o operador conectado de forma segura durante a rotina operacional.
- [ ] As regras de segurança do Firestore (`firestore.rules`) garantem que somente o utilizador autenticado tenha permissões de leitura e gravação nas coleções.

---

## Subtarefas (Checklist)
- [ ] Inicializar e validar a estrutura do projeto com Vite, React e TypeScript
- [ ] Configurar SDK do Firebase e arquivo de inicialização de serviços (`src/lib/firebase.ts`)
- [ ] Configurar Firestore com persistência local e validação de conexão
- [ ] Configurar Autenticação Firebase (Email/Password) com validação de utilizador único
- [ ] Criar tela de Login e componente de rota protegida (`ProtectedRoute`)
- [ ] Definir arquivo `.env.example` com todas as chaves necessárias do Firebase
