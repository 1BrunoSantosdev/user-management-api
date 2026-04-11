User Management API

API REST para gerenciamento de usuários com autenticação utilizando JWT, desenvolvida com Node.js, TypeScript e Prisma seguindo boas práticas de arquitetura.

---

Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- JWT (JSON Web Token)
- Bcrypt

---

Funcionalidades

- Cadastro de usuários
- Listagem de usuários
- Busca por ID
- Atualização de dados
- Remoção de usuários
- Autenticação com JWT
- Alteração de senha
- Rotas protegidas com middleware

---

Autenticação

As rotas protegidas utilizam Bearer Token:

Authorization: Bearer SEU_TOKEN

---

Como rodar o projeto

# Instalar dependências
npm install

# Gerar banco de dados
npx prisma migrate dev

# Rodar servidor
npm run dev

---

Variáveis de ambiente

Crie um arquivo .env baseado no .env.example:

DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret"
PORT=3000

---

Rotas

Usuários

POST /api/users
GET /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id
PATCH /api/users/:id/password

Autenticação

POST /api/auth/login

---

Observações

- Senhas são armazenadas com hash utilizando bcrypt
- API estruturada com separação de responsabilidades (Controller, Service, Repository)
- Tratamento de erros com padrão profissional (AppError)

---

Autor

Bruno Williams Santos

