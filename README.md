# 🛍️ Afrodite Modas

Sistema completo de e-commerce desenvolvido com foco em arquitetura backend sólida, upload de imagens com Cloudinary e integração fullstack.

## 🚀 Demonstração

🔗 Frontend: (em desenvolvimento)  
🔗 Backend API: https://loja-de-roupa-afroditemodas-backend.onrender.com

---

## 🧠 Sobre o Projeto

Afrodite Modas é uma aplicação de e-commerce que permite:

- Cadastro e autenticação de usuários
- Controle de acesso por perfil (admin/usuário)
- CRUD completo de produtos
- Upload de imagens via Cloudinary
- Controle de estoque
- Sistema de carrinho
- Criação de pedidos
- Paginação de produtos
- Deploy em produção

---

## 🏗️ Arquitetura

O projeto está dividido em:

### 🔹 Backend
- Node.js
- Express
- PostgreSQL
- Multer
- Cloudinary
- JWT Authentication
- Middleware global de erro

### 🔹 Frontend(em Desenvolvimento)
- React
- Context API (Carrinho)
- Fetch API
- Controle de estado com Hooks

---

## 📂 Estrutura do Backend


src/
├── controllers/
├── models/
├── middlewares/
├── services/
├── utils/
└── routes/


Separação por responsabilidade:
- Controller → recebe requisição
- Model → acesso ao banco
- Middleware → autenticação / erro
- Service → regras auxiliares

---

## 🔐 Autenticação

O sistema utiliza JWT.

Headers obrigatórios:


Authorization: Bearer {token}


Rotas protegidas exigem token válido.

---

## 📦 Upload de Imagem

- Upload feito via Multer (memoryStorage)
- Envio para Cloudinary
- Armazenamento de:
  - imagem_url
  - imagem_public_id
- Exclusão automática da imagem antiga ao atualizar produto

---

## 🛒 Funcionalidades

- ✅ Criar produto (admin)
- ✅ Editar produto
- ✅ Deletar produto
- ✅ Listar produtos com paginação
- ✅ Controle de estoque
- ✅ Carrinho de compras
- ✅ Criar pedido
- ✅ Histórico de pedidos

---

## 🧪 Variáveis de Ambiente

Backend necessita:


DATABASE_URL=
JWT_SECRET=
CLOUDINARY_URL=


No ambiente de produção (Render), configurar as variáveis manualmente.

---

## ⚙️ Como Rodar Localmente

### Backend

```bash
npm install
npm run dev
