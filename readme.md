User Management API

---

API REST para gerenciamento de usuários com autenticação JWT, desenvolvida com 
Node.js, TypeScript e Prisma, seguindo boas práticas de arquitetura em camadas.

---

Tecnologias
- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- JWT (JSON Web Token)
- Bcrypt
- Zod (validação)

---

- Controller: recebe requisições e retorna respostas
- Service: regras de negócio
- Repository: acesso ao banco
- Middleware: erros e autenticação
- Schema: validação com Zod

---

Funcionalidades
- Cadastro de usuários
- Listagem com paginação
- Busca por ID
- Atualização
- Remoção
- Login JWT
- Alteração de senha
- Validação com Zod
- Erro global

---

Execução
npm install
npx prisma migrate dev
npm run dev

---

.env:
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret"
PORT=3000
