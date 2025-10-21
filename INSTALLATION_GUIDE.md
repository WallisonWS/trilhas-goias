# 🚀 Guia de Instalação Rápida - Trilhas de Goiás

## ⚡ Instalação Rápida (5 minutos)

### Pré-requisitos

Certifique-se de ter instalado:
- ✅ Node.js 20.x ou superior
- ✅ MongoDB (local ou Atlas)
- ✅ Git

### Passo 1: Clone e Instale

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/trilhas-goias.git
cd trilhas-goias

# Instale dependências do backend
cd backend
npm install

# Instale dependências do frontend
cd ../frontend
npm install
```

### Passo 2: Configure o Backend

```bash
cd backend

# Copie o arquivo de exemplo
cp .env.example .env

# Edite o .env com suas configurações
nano .env  # ou use seu editor preferido
```

**Configuração mínima do .env:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/trilhas-goias
JWT_SECRET=meu-secret-super-seguro-123
JWT_REFRESH_SECRET=meu-refresh-secret-456
```

### Passo 3: Configure o Frontend

```bash
cd ../frontend

# Crie o arquivo .env
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### Passo 4: Inicie o MongoDB

**Opção A: MongoDB Local**
```bash
# Ubuntu/Debian
sudo systemctl start mongodb

# macOS
brew services start mongodb-community

# Windows
net start MongoDB
```

**Opção B: MongoDB Atlas (Cloud - Grátis)**
1. Acesse https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um cluster
4. Obtenha a connection string
5. Atualize `MONGODB_URI` no `.env`

### Passo 5: Popular o Banco de Dados

```bash
cd backend
node src/utils/seedTrails.js
```

Você verá:
```
✅ Trilhas inseridas com sucesso!
📊 Total de trilhas: 10
```

### Passo 6: Inicie os Servidores

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Aguarde ver:
```
╔═══════════════════════════════════════════════════════╗
║   🏔️  API TRILHAS DE GOIÁS                           ║
║   🚀 Servidor rodando na porta 5000                  ║
╚═══════════════════════════════════════════════════════╝
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Passo 7: Acesse o Aplicativo

Abra seu navegador em:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000

---

## 🎯 Teste Rápido

### 1. Teste a API

```bash
curl http://localhost:5000/health
```

Deve retornar:
```json
{
  "success": true,
  "message": "API Trilhas de Goiás está funcionando!"
}
```

### 2. Crie uma Conta

1. Acesse http://localhost:3000/register
2. Preencha o formulário
3. Clique em "Criar Conta"

### 3. Explore as Trilhas

1. Clique em "Trilhas" no menu
2. Veja as 10 trilhas de Goiás
3. Clique em uma para ver detalhes

---

## 🔧 Solução de Problemas

### Erro: "Cannot connect to MongoDB"

**Solução:**
```bash
# Verifique se o MongoDB está rodando
sudo systemctl status mongodb  # Linux
brew services list              # macOS

# Ou use MongoDB Atlas (cloud)
```

### Erro: "Port 5000 already in use"

**Solução:**
```bash
# Mude a porta no .env
PORT=5001

# Ou mate o processo na porta 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
```

### Erro: "Module not found"

**Solução:**
```bash
# Reinstale as dependências
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### Frontend não conecta com Backend

**Solução:**
```bash
# Verifique se o backend está rodando
curl http://localhost:5000/health

# Verifique o .env do frontend
cat frontend/.env
# Deve ter: VITE_API_URL=http://localhost:5000/api
```

---

## 🎨 Customização

### Adicionar Novas Trilhas

Edite `backend/src/utils/seedTrails.js` e adicione suas trilhas:

```javascript
{
  nome: "Minha Nova Trilha",
  descricao: "Descrição completa...",
  localizacao: {
    municipio: "Seu Município",
    estado: "GO",
    coordenadas: {
      type: "Point",
      coordinates: [-47.5186, -14.1318]
    }
  },
  tipo: "pedestre",
  dificuldade: "moderada",
  extensao_km: 5,
  tempo_estimado_horas: 3,
  // ... outros campos
}
```

Depois execute:
```bash
node src/utils/seedTrails.js
```

### Mudar Cores do Tema

Edite `frontend/src/index.css`:

```css
:root {
  --primary: #2E7D32;      /* Sua cor primária */
  --secondary: #FF6F00;    /* Sua cor secundária */
  --accent: #0277BD;       /* Sua cor de destaque */
}
```

---

## 📦 Build para Produção

### Backend

```bash
cd backend
npm start  # Usa node ao invés de nodemon
```

### Frontend

```bash
cd frontend
npm run build

# Os arquivos estarão em frontend/dist/
# Sirva com qualquer servidor estático
npm run preview  # Para testar o build
```

---

## 🌐 Deploy

### Backend - Heroku

```bash
cd backend
heroku create trilhas-goias-api
heroku addons:create mongolab
git push heroku main
```

### Frontend - Vercel

```bash
cd frontend
npm install -g vercel
vercel --prod
```

---

## 📞 Precisa de Ajuda?

- 📧 Email: suporte@trilhasgoias.com.br
- 💬 Issues: https://github.com/seu-usuario/trilhas-goias/issues
- 📖 Documentação completa: Ver `TRILHAS_GOIAS_ECOSYSTEM.md`

---

## ✅ Checklist de Instalação

- [ ] Node.js instalado
- [ ] MongoDB rodando
- [ ] Dependências do backend instaladas
- [ ] Dependências do frontend instaladas
- [ ] Arquivo .env do backend configurado
- [ ] Arquivo .env do frontend configurado
- [ ] Banco de dados populado com seedTrails.js
- [ ] Backend rodando em http://localhost:5000
- [ ] Frontend rodando em http://localhost:3000
- [ ] Conta de teste criada
- [ ] Trilhas visíveis no catálogo

---

**Pronto! Você está pronto para explorar o Cerrado! 🏔️**