# 🛍️ Afrodite Modas — Backend

**Backend de e-commerce** com Node.js, Express 5, PostgreSQL (Neon), autenticação JWT,
upload de imagens com Cloudinary e foco em segurança para produção.

📦 **API em produção:** https://loja-de-roupa-afroditemodas-backend.onrender.com

---

## Sumário

- [Stack](#-stack)
- [Arquitetura](#-arquitetura)
- [Estrutura Completa](#-estrutura-completa)
- [API Endpoints](#-api-endpoints)
- [Banco de Dados](#-banco-de-dados)
- [Autenticação e Autorização](#-autenticao-e-autorizao)
- [Upload de Imagens](#-upload-de-imagens)
- [Tratamento de Erros](#-tratamento-de-erros)
- [Segurança](#-segurana)
- [Variáveis de Ambiente](#-variveis-de-ambiente)
- [Como Rodar Localmente](#-como-rodar-localmente)
- [Deploy no Render](#-deploy-no-render)
- [Bugs Corrigidos](#-bugs-corrigidos)

---

## 🏗️ Stack

| Camada       | Tecnologia                                        |
|--------------|---------------------------------------------------|
| Runtime      | Node.js                                           |
| Framework    | Express 5                                         |
| Banco        | PostgreSQL 16 (Neon serverless)                   |
| Autenticação | JWT (jsonwebtoken) + bcrypt                       |
| Upload       | Multer (memoryStorage) + Cloudinary               |
| Segurança    | Helmet, express-rate-limit, CORS                  |
| Dev          | Nodemon (hot reload)                              |

---

## 🧠 Arquitetura

O backend segue o padrão **MVC adaptado** com camadas bem definidas:

```
Request → Routes → Middlewares → Controller → Model → PostgreSQL
                                  ↓
                           Response (JSON)
```

### Fluxo de uma requisição

1. **Rota** recebe a requisição e aplica middlewares necessários (auth, admin, upload)
2. **Middleware** valida token JWT, permissões, ou processa arquivo
3. **Controller** extrai dados da requisição, valida entrada e chama o model
4. **Model** executa SQL puro no banco e retorna os dados
5. **Controller** formata a resposta usando helpers padronizados
6. **Resposta** sempre no formato `{ success, data, error }`

### Formato padronizado de resposta

```json
// Sucesso
{ "success": true,  "data": { ... },  "error": null }

// Erro AppError (controlado)
{ "success": false, "data": null, "error": "mensagem" }

// Erro inesperado (500)
{ "success": false, "data": null, "error": "Erro interno do servidor" }
```

---

## 📂 Estrutura Completa

```
Loja_de_roupa-AfroditeModas/
├── .gitignore
├── README.md
│
└── backend/
    ├── .env                         # Credenciais (ignorado pelo git)
    ├── package.json                 # Dependências e scripts
    ├── server.js                    # Entry point
    ├── uploads/                     # Uploads temporários
    │
    └── src/
        ├── config/
        │   ├── cloudinary.js        # Conexão com Cloudinary
        │   └── multer.js            # Config do Multer
        │
        ├── controllers/
        │   ├── CategoriasController.js
        │   ├── DashboardController.js
        │   ├── PedidosControllers.js
        │   ├── ProdutoController.js
        │   └── usuarioController.js
        │
        ├── database/
        │   ├── connection.js        # Pool PostgreSQL
        │   └── models/
        │       ├── Usuario.js
        │       ├── categoria.js
        │       ├── pedidos.js
        │       ├── produto.js
        │       └── Dashboard.js
        │
        ├── errors/
        │   └── AppError.js
        │
        ├── middlewares/
        │   ├── admin.js
        │   ├── auth.js
        │   └── errorHandler.js
        │
        ├── routes/
        │   ├── categoriasRoutes.js
        │   ├── dashboardRoutes.js
        │   ├── PedidosRoutes.js
        │   ├── produtosRoutes.js
        │   └── usuariosRoutes.js
        │
        └── utils/
            ├── response.js
            └── uploadImagem.js
```

---

## 📋 API Endpoints

### Saúde

**`GET /`** — Retorna "Backend funcionando 🚀"

### Autenticação (`/usuarios`)

#### `POST /usuarios/registrar`

Cria um novo usuário.

**Body:**
```json
{ "nome": "Maria Silva", "email": "maria@email.com", "senha": "123456" }
```

**Validações:**
- `nome`: obrigatório, mínimo 3 caracteres
- `email`: obrigatório, deve conter `@`, convertido para minúsculas, único
- `senha`: obrigatório, mínimo 6 caracteres

#### `POST /usuarios/login`

Autentica e retorna JWT.

**Body:**
```json
{ "email": "maria@email.com", "senha": "123456" }
```

**Resposta (200):**
```json
{
  "mensagem": "Login realizado com sucesso",
  "usuario": { "id": 1, "nome": "Maria Silva", "email": "maria@email.com", "cargo": "cliente" },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Rate limit:** 10 tentativas a cada 15 minutos. Token expira em 1 dia.

### Categorias (`/categorias`)

| Método | Rota              | Auth     | Descrição    |
|--------|-------------------|----------|--------------|
| GET    | `/`               | ❌       | Listar todas |
| GET    | `/buscar/:id`     | ❌       | Buscar por ID|
| POST   | `/criar`          | ✅ Admin | Criar        |
| PUT    | `/buscar/:id`     | ✅ Admin | Atualizar    |
| DELETE | `/:id`            | ✅ Admin | Deletar      |

**Validação POST/PUT:** `nome` obrigatório, mínimo 3 caracteres.

### Produtos (`/produtos`)

| Método | Rota            | Auth     | Descrição                       |
|--------|-----------------|----------|---------------------------------|
| GET    | `/listar`       | ❌       | Listar todos + disponibilidade  |
| GET    | `/buscar/:id`   | ❌       | Buscar por ID                   |
| POST   | `/criar`        | ✅ Admin | Criar (multipart/form-data)     |
| PUT    | `/:id`          | ✅ Admin | Atualizar (JSON ou multipart)   |
| DELETE | `/:id`          | ✅ Admin | Deletar + imagem do Cloudinary  |

**POST (multipart):**
| Campo        | Tipo   | Obrigatório |
|--------------|--------|-------------|
| `nome`       | text   | ✅          |
| `preco`      | number | ✅          |
| `estoque`    | number | ❌          |
| `descricao`  | text   | ❌          |
| `categoria`  | number | ❌          |
| `imagem_url` | file   | ✅          |

**Regras do arquivo:** jpeg, png, webp, jpg — máx 5MB.

**PUT:** Aceita apenas os campos que devem ser alterados. Se imagem for enviada, a antiga é removida do Cloudinary. SQL é montado dinamicamente — nunca envia NULL.

### Pedidos (`/pedidos`)

| Método | Rota         | Auth     | Descrição                         |
|--------|--------------|----------|-----------------------------------|
| POST   | `/carrinho`  | ✅ User  | Criar pedido + decrementar estoque|
| GET    | `/meus`      | ✅ User  | Listar pedidos do usuário         |
| GET    | `/:id`       | ✅ User  | Detalhes do pedido + itens        |

**POST /carrinho:**
```json
{ "itens": [{ "produto_id": 1, "quantidade": 2 }] }
```

**Fluxo:** valida produtos → verifica estoque → calcula total → cria pedido → insere itens → decrementa estoque.

### Dashboard (`/dashboard`)

**`GET /`** 🔐 Admin

```json
{
  "resumo": { "produtos": 25, "categorias": 5, "usuarios": 100, "pedidos": 45, "receita": 12500.00 },
  "ultimosPedidos": [{ "id": 45, "total": "259.80", "status": "pendente", "usuario_nome": "Maria" }],
  "produtosEstoqueBaixo": [{ "id": 3, "nome": "Sandália", "estoque": 2, "preco": "89.90" }],
  "produtosSemEstoque": 1,
  "produtosPorCategoria": [{ "categoria": "Vestidos", "quantidade": 10 }]
}
```

---

## 🗄️ Banco de Dados

```sql
usuario (id SERIAL PK, nome TEXT NOT NULL, email TEXT NOT NULL UNIQUE,
         senha TEXT NOT NULL, cargo TEXT DEFAULT 'cliente')

categorias (id SERIAL PK, nome TEXT NOT NULL UNIQUE)

produtos (id SERIAL PK, nome TEXT NOT NULL, descricao TEXT, preco NUMERIC,
          estoque INTEGER NOT NULL, imagem_url TEXT NOT NULL,
          imagem_public_id TEXT, categoria_id INTEGER → categorias.id)

pedidos (id SERIAL PK, usuario_id INTEGER → usuario.id, total NUMERIC NOT NULL,
         status VARCHAR DEFAULT 'pendente', criado_em TIMESTAMP DEFAULT now())

pedido_itens (id SERIAL PK, pedido_id INTEGER → pedidos.id,
              produto_id INTEGER → produtos.id, quantidade INTEGER NOT NULL,
              preco_unitario NUMERIC NOT NULL)
```

---

## 🔐 Autenticação e Autorização

- **JWT** com expiração de 1 dia
- **Header:** `Authorization: Bearer <token>`
- **Payload:** `{ id, nome, email, cargo }`
- **Senhas:** bcrypt com salt rounds = 10
- **Cargos:** `admin` (acesso total) | `cliente` (acesso restrito)
- **Middleware `auth`:** verifica token e popula `req.usuario`
- **Middleware `admin`:** verifica token + cargo `admin`

---

## 📦 Upload de Imagens

1. Multer recebe arquivo em memória (memoryStorage, máx 5MB)
2. Controller envia buffer para Cloudinary via `upload_stream`
3. Cloudinary retorna `secure_url` e `public_id`
4. `imagem_url` e `imagem_public_id` são salvos no banco
5. Ao atualizar: imagem antiga é removida via `cloudinary.uploader.destroy`
6. Ao deletar: imagem também é removida

---

## ⚠️ Tratamento de Erros

- **AppError:** classe customizada com `statusCode` e `isAppError`
- **errorHandler:** middleware global que captura AppError e retorna JSON padronizado
- **Erros inesperados (500):** log no console + resposta genérica
- **Express 5:** throws síncronos e rejeições de promise são capturados automaticamente

---

## 🛡️ Segurança

| Medida            | Implementação                                               |
|-------------------|-------------------------------------------------------------|
| Helmet            | Headers de segurança (X-Frame-Options, CSP, etc)            |
| CORS              | Restrito à origem definida em `FRONTEND_URL`                |
| Rate limit global | 200 requisições / 15 minutos                                |
| Rate limit login  | 10 tentativas / 15 minutos (anti bruteforce)                |
| SSL do banco      | `rejectUnauthorized: true` em produção                      |
| admin.js          | try/catch no jwt.verify — token inválido não quebra         |
| .env              | Ignorado pelo git — credenciais nunca versionadas           |

---

## 🧪 Variáveis de Ambiente

| Variável         | Obrigatória | Descrição                                      |
|------------------|-------------|------------------------------------------------|
| `DB_URL`         | ✅          | String de conexão PostgreSQL (Neon)            |
| `JWT_SECRET`     | ✅          | Chave secreta para assinar tokens JWT          |
| `CLOUD_NAME`     | ✅          | Cloudinary cloud name                          |
| `API_KEY`        | ✅          | Cloudinary API key                             |
| `API_SECRET`     | ✅          | Cloudinary API secret                          |
| `FRONTEND_URL`   | ❌          | Origem permitida no CORS                       |
| `NODE_ENV`       | ❌          | `production` ativa SSL estrito no banco        |
| `PORT`           | ❌          | Porta do servidor (default: 3001)              |

---

## ⚙️ Como Rodar Localmente

```bash
# Clone
git clone https://github.com/GiovanniDEVazevedo/Loja_de_roupa-AfroditeModas.git
cd Loja_de_roupa-AfroditeModas/backend

# Configure as variáveis de ambiente
cp .env.example .env   # preencha com suas credenciais

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O servidor estará em **http://localhost:3001**.

---

## 🚀 Deploy no Render

1. Crie um **Web Service** no Render conectado ao repositório
2. **Build Command:** `npm install`
3. **Start Command:** `node server.js`
4. **Root Directory:** `backend`
5. Configure as **Environment Variables** no painel do Render:

| Variável       | Valor |
|----------------|-------|
| `DB_URL`       | `postgresql://...` (Neon) |
| `JWT_SECRET`   | Sua chave secreta |
| `CLOUD_NAME`   | Cloudinary cloud name |
| `API_KEY`      | Cloudinary API key |
| `API_SECRET`   | Cloudinary API secret |
| `FRONTEND_URL` | URL do seu frontend |
| `NODE_ENV`     | `production` |

---

## 🐛 Bugs Corrigidos

- SQL de UPDATE de categorias sem cláusula WHERE e placeholders na ordem errada
- Nome da tabela de itens do pedido: INSERT usava `pedidos_itens` (inexistente), corrigido para `pedido_itens`
- Controller de usuário usava `badRequest` e `created` sem importar do módulo `response.js`
- `PedidosRoutes` importava o router de `usuariosRoutes.js` em vez de criar o próprio — também faltavam as rotas `GET /meus` e `GET /:id`
- Controller de produto enviava `categoria` para o model, mas o model esperava `categoria_id`
- SQL de UPDATE de produtos faltava vírgula entre colunas (`imagem_public_id` e `categoria_id`)
- Variável `rowCont` (typo) em vez de `rowCount` no `diminuirEstoque` — sem validação de estoque insuficiente
- Controllers de pedido usavam `req.user` mas o middleware auth define `req.usuario`
- Chamada a `Produto.atualizarEstoque` (método inexistente) — corrigido para `diminuirEstoque`
- UPDATE de produtos sem enviar imagem enviava `NULL` para coluna `NOT NULL` — agora o SQL é montado dinamicamente
- Coluna `created_at` não existia no banco — nome correto é `criado_em`

---

> Projeto desenvolvido como sistema de e-commerce para a loja Afrodite Modas.
