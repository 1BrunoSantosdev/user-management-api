# User Management API

API RESTful para gerenciamento de usuários com autenticação JWT, desenvolvida com Node.js, TypeScript e Prisma ORM, seguindo boas práticas de arquitetura em camadas.

---

## Tecnologias

| Tecnologia | Versão | Descrição |
|---|---|---|
| Node.js | ≥18 | Runtime JavaScript |
| TypeScript | ^6.0 | Tipagem estática |
| Express | ^5.2 | Framework web |
| Prisma ORM | ^5.22 | Acesso ao banco de dados |
| SQLite | — | Banco de dados (dev) |
| JWT | ^9.0 | Autenticação via token |
| Bcryptjs | ^3.0 | Hash de senhas |
| Zod | ^4.3 | Validação de dados |

---

## Arquitetura

O projeto segue o padrão de **arquitetura em camadas**, com separação clara de responsabilidades:

```
Src/
├── config/              # Configurações globais
├── lib/                 # Instâncias compartilhadas (Prisma)
├── middlewares/         # Autenticação e tratamento de erros
├── modules/
│   ├── auth/            # Módulo de autenticação
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.schema.ts
│   │   └── auth.service.ts
│   └── user/            # Módulo de usuários
│       ├── dto/
│       ├── user.controller.ts
│       ├── user.repository.ts
│       ├── user.routes.ts
│       ├── user.schema.ts
│       └── user.service.ts
├── utils/               # Utilitários (AppError)
├── app.ts               # Configuração do Express
└── server.ts            # Entrada da aplicação
```

**Controller** → recebe a requisição e retorna a resposta  
**Service** → contém as regras de negócio  
**Repository** → responsável pelo acesso ao banco de dados  
**Middleware** → autenticação JWT e tratamento centralizado de erros  
**Schema** → validação de entrada com Zod  

---

## Configuração

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/1BrunoSantosdev/user-management-api
cd user-management-api

# Instale as dependências
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_longa_e_aleatoria"
PORT=3000
```

> Para gerar um JWT_SECRET seguro:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

### Banco de dados

```bash
# Cria o banco e executa as migrations
npx prisma migrate dev
```

### Rodando o projeto

```bash
# Desenvolvimento (com hot reload)
npm run dev
```

---

## Endpoints

### Autenticação

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| `POST` | `/api/auth/login` | Login e geração de token JWT | Não |

### Usuários

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| `POST` | `/api/users` | Criar usuário | Não |
| `GET` | `/api/users` | Listar usuários (paginado) | Sim |
| `GET` | `/api/users/:id` | Buscar usuário por ID | Sim |
| `PUT` | `/api/users/:id` | Atualizar nome e/ou email | Sim |
| `DELETE` | `/api/users/:id` | Remover usuário | Sim |
| `PATCH` | `/api/users/:id/password` | Alterar senha | Sim |

> Rotas autenticadas exigem o header: `Authorization: Bearer <token>`

---

## Exemplos de uso

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "senha123"
}
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com"
  }
}
```

### Criar usuário

```http
POST /api/users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

### Listar usuários com paginação

```http
GET /api/users?page=1&limit=10
Authorization: Bearer <token>
```

```json
{
  "data": [...],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

### Alterar senha

```http
PATCH /api/users/:id/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "password": "novaSenha123"
}
```

---

## Segurança

- Senhas armazenadas com hash **bcrypt** (salt rounds: 10)
- Autenticação via **JWT** com expiração de 1 dia
- Validação de todos os inputs com **Zod**
- Campos sensíveis (senha) nunca retornados nas respostas
- Tratamento centralizado de erros sem exposição de stack trace

---

## Autor

**Bruno Williams Santos**  
[GitHub](https://github.com/1BrunoSantosdev)
