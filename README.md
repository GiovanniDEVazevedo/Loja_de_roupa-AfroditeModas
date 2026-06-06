# 🛍️ Afrodite Modas

Sistema completo de e-commerce com backend em Node.js + Express + PostgreSQL (Neon) e frontend em React + Vite.

## 🚀 Demonstração

🔗 **Backend API:** https://loja-de-roupa-afroditemodas-backend.onrender.com  
🔗 **Frontend:** (em desenvolvimento)

---

## 🧠 Sobre o Projeto

- Cadastro e autenticação de usuários (JWT)
- Controle de acesso por perfil (`admin` / `cliente`)
- CRUD completo de produtos com upload de imagens (Cloudinary)
- Controle de estoque
- Carrinho de compras e criação de pedidos
- Dashboard administrativo com métricas
- Rate limiting, helmet e CORS configurados para produção

---

## 🏗️ Stack

| Camada   | Tecnologias |
|----------|-------------|
| Backend  | Node.js, Express 5, PostgreSQL (Neon), JWT, bcrypt |
| Upload   | Multer (memoryStorage), Cloudinary |
| Segurança| Helmet, express-rate-limit, CORS |
| Frontend | React 18, Vite, React Router v7, Axios, Zustand |

---

## 📂 Estrutura do Backend

```
backend/
├── server.js                    # Entry point
├── src/
│   ├── config/                  # Multer, Cloudinary
│   ├── controllers/             # Lógica das rotas
│   ├── database/
│   │   ├── connection.js        # Pool PostgreSQL
│   │   └── models/              # Queries SQL (sem ORM)
│   ├── errors/                  # AppError customizado
│   ├── middlewares/              # auth, admin, errorHandler
│   ├── routes/                  # Definição de rotas
│   └── utils/                   # Response helpers, upload
└── uploads/
```

---

## 📋 API Endpoints

### Saúde

| Método | Rota     | Descrição     |
|--------|----------|---------------|
| GET    | `/`      | Health check  |

### Autenticação (`/usuarios`)

| Método | Rota            | Auth     | Descrição            |
|--------|-----------------|----------|----------------------|
| POST   | `/registrar`    | ❌       | Cadastro de usuário  |
| POST   | `/login`        | ❌       | Login (retorna JWT)  |

**Regras:** nome ≥ 3 caracteres, email com `@`, senha ≥ 6 caracteres.  
**Resposta login:** `{ mensagem, usuario: { id, nome, email, cargo }, token }`  
**Rate limit:** 10 tentativas por 15 minutos no login.

### Categorias (`/categorias`)

| Método | Rota              | Auth        | Descrição            |
|--------|-------------------|-------------|----------------------|
| GET    | `/`               | ❌          | Listar todas         |
| GET    | `/buscar/:id`     | ❌          | Buscar por ID        |
| POST   | `/criar`          | ✅ Admin    | Criar                |
| PUT    | `/buscar/:id`     | ✅ Admin    | Atualizar            |
| DELETE | `/:id`            | ✅ Admin    | Deletar              |

### Produtos (`/produtos`)

| Método | Rota            | Auth        | Descrição                    |
|--------|-----------------|-------------|------------------------------|
| GET    | `/listar`       | ❌          | Listar todos                 |
| GET    | `/buscar/:id`   | ❌          | Buscar por ID                |
| POST   | `/criar`        | ✅ Admin    | Criar (multipart/form-data)  |
| PUT    | `/:id`          | ✅ Admin    | Atualizar (JSON ou multipart)|
| DELETE | `/:id`          | ✅ Admin    | Deletar                      |

**Campos do POST:** `nome`, `descricao`, `preco`, `estoque`, `categoria`, `imagem_url` (file).  
**Tipos aceitos:** jpeg, png, webp, jpg — máx 5MB.  
**PUT** aceita apenas os campos que devem ser alterados (não envia `null` para os demais).

### Pedidos (`/pedidos`)

| Método | Rota         | Auth        | Descrição               |
|--------|--------------|-------------|-------------------------|
| POST   | `/carrinho`  | ✅ User     | Criar pedido            |
| GET    | `/meus`      | ✅ User     | Listar meus pedidos     |
| GET    | `/:id`       | ✅ User     | Detalhes do pedido      |

**Body do POST:** `{ itens: [{ produto_id, quantidade }] }`  
Valida estoque, calcula total, cria pedido + itens, decrementa estoque.

### Dashboard (`/dashboard`)

| Método | Rota  | Auth        | Descrição               |
|--------|-------|-------------|-------------------------|
| GET    | `/`   | ✅ Admin    | Métricas administrativas|

**Resposta:**
```json
{
  "resumo": { "produtos", "categorias", "usuarios", "pedidos", "receita" },
  "ultimosPedidos": [{ "id", "total", "status", "usuario_nome" }],
  "produtosEstoqueBaixo": [{ "id", "nome", "estoque", "preco" }],
  "produtosSemEstoque": 0,
  "produtosPorCategoria": [{ "categoria", "quantidade" }]
}
```

---

## 🗄️ Banco de Dados (PostgreSQL)

| Tabela         | Colunas principais |
|----------------|--------------------|
| `usuario`      | id, nome, email, senha, cargo (`admin`/`cliente`) |
| `categorias`   | id, nome |
| `produtos`     | id, nome, descricao, preco, estoque, imagem_url, imagem_public_id, categoria_id |
| `pedidos`      | id, usuario_id, total, status (default `pendente`), criado_em |
| `pedido_itens` | id, pedido_id, produto_id, quantidade, preco_unitario |

---

## 🔐 Autenticação

- **Tipo:** JWT (expira em 1 dia)
- **Header:** `Authorization: Bearer {token}`
- **Payload:** `{ id, nome, email, cargo }`
- **Senhas:** hasheadas com bcrypt (salt rounds = 10)

### Fluxo
1. Usuário faz `POST /usuarios/registrar` ou `POST /usuarios/login`
2. Recebe `token` JWT
3. Envia token no header em requisições protegidas
4. Middleware `auth` verifica token, middleware `admin` verifica cargo

---

## 📦 Upload de Imagem

1. Multer recebe o arquivo em memória (máx 5MB)
2. Controller envia buffer para Cloudinary via `upload_stream`
3. Retorna `{ imagem_url, public_id }` armazenados no banco
4. Ao atualizar/deletar, a imagem antiga é removida do Cloudinary

---

## 🛡️ Segurança (Produção)

| Medida | Implementação |
|--------|---------------|
| Helmet  | Headers de segurança (X-Frame-Options, CSP, etc) |
| CORS    | Restrito à origem definida em `FRONTEND_URL` |
| Rate limit global | 200 requisições / 15 min |
| Rate limit login  | 10 tentativas / 15 min |
| SSL DB  | `rejectUnauthorized: true` em produção |

---

## 🧪 Variáveis de Ambiente

| Variável         | Obrigatória | Descrição |
|------------------|-------------|-----------|
| `DB_URL`         | ✅          | String de conexão PostgreSQL (Neon) |
| `JWT_SECRET`     | ✅          | Chave secreta para assinar tokens |
| `CLOUD_NAME`     | ✅          | Cloudinary cloud name |
| `API_KEY`        | ✅          | Cloudinary API key |
| `API_SECRET`     | ✅          | Cloudinary API secret |
| `FRONTEND_URL`   | ❌          | Origem permitida no CORS (default: `http://localhost:5173`) |
| `NODE_ENV`       | ❌          | `production` ativa SSL estrito no banco |
| `PORT`           | ❌          | Porta do servidor (default: 3001) |

---

## ⚙️ Como Rodar Localmente

### Backend

```bash
cd backend
cp .env.example .env    # configure suas variáveis
npm install
npm run dev             # nodemon com reload automático
```

### Frontend

```bash
cd frontend
npm install
npm run dev             # Vite em http://localhost:5173
```

---

## 🛒 Frontend

O frontend React está em `frontend/` e inclui:

- Páginas: catálogo, login, cadastro, carrinho, checkout, admin
- Autenticação com `AuthContext` (localStorage + JWT)
- Carrinho com `CartContext` (persistência local)
- Rotas públicas, privadas e admin
- Axios configurado com interceptador de token
- Dashboard admin integrado com `GET /dashboard`

---

## 🐛 Bugs Corrigidos

- SQL de atualização de categorias sem WHERE (categoria.js)
- Nome inconsistente da tabela de itens do pedido (`pedido_itens` vs `pedidos_itens`)
- Importação faltando de `badRequest`/`created` no controller de usuário
- `PedidosRoutes` reutilizava router de usuários em vez de criar o próprio
- Campo `categoria` vs `categoria_id` no ProdutoController
- SQL de update de produtos sem vírgula entre colunas
- Typo `rowCont` em vez de `rowCount` no model de produtos
- Uso de `req.user` em vez de `req.usuario` nos PedidosControllers
- Método `atualizarEstoque` inexistente (chamava método que não existia)
- Update de produtos enviava `NULL` para `imagem_url` ao não enviar arquivo
- Coluna `created_at` não existia (nome correto: `criado_em`)
