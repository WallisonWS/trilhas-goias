# ⚡ Quick Start - Trilhas de Goiás

## 🚀 Começar em 5 Minutos

### 1️⃣ Instalar Dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2️⃣ Configurar Ambiente

```bash
# Backend - criar .env
cd backend
cat > .env << EOF
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/trilhas-goias
JWT_SECRET=meu-secret-123
JWT_REFRESH_SECRET=meu-refresh-456
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
EOF

# Frontend - criar .env
cd ../frontend
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### 3️⃣ Popular Banco de Dados

```bash
cd backend
node src/utils/seedTrails.js
```

### 4️⃣ Iniciar Servidores

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5️⃣ Acessar

- 🌐 Frontend: http://localhost:3000
- 🔌 API: http://localhost:5000
- ✅ Health: http://localhost:5000/health

---

## 🧪 Testar Rapidamente

### Teste 1: Health Check

```bash
curl http://localhost:5000/health
```

### Teste 2: Listar Trilhas

```bash
curl http://localhost:5000/api/trails
```

### Teste 3: Registrar Usuário

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste User",
    "email": "teste@example.com",
    "senha": "123456",
    "nivel_experiencia": "iniciante"
  }'
```

---

## 📱 Usar o App

1. Acesse http://localhost:3000
2. Clique em "Cadastrar"
3. Preencha o formulário
4. Explore as trilhas!

---

## 🛑 Parar os Servidores

```bash
# Pressione Ctrl+C em cada terminal
# Ou
pkill -f "node"
```

---

## 🔄 Resetar Banco de Dados

```bash
cd backend
node src/utils/seedTrails.js
```

---

## 📚 Documentação Completa

- 📖 **README.md** - Guia principal
- 📖 **INSTALLATION_GUIDE.md** - Instalação detalhada
- 📖 **API_DOCUMENTATION.md** - Referência da API
- 📖 **PROJECT_SUMMARY.md** - Resumo do projeto

---

## 🆘 Problemas Comuns

### MongoDB não conecta?
```bash
# Inicie o MongoDB
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

### Porta 5000 em uso?
```bash
# Mude no .env
PORT=5001
```

### Erro de módulo?
```bash
# Reinstale
rm -rf node_modules package-lock.json
npm install
```

---

**Pronto! Você está pronto para explorar! 🏔️**