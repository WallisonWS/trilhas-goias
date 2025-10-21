# 🚂 Deploy no Railway - Passo a Passo Visual

## 🎯 Objetivo: Colocar o backend online em 30 minutos

---

## 📋 PASSO A PASSO

### Passo 1: Criar Conta no Railway (2 minutos)

1. **Acesse:** https://railway.app

2. **Clique em:** "Start a New Project" ou "Login"

3. **Faça login com GitHub:**
   - Clique em "Login with GitHub"
   - Autorize o Railway
   - Pronto!

---

### Passo 2: Criar Novo Projeto (1 minuto)

1. **No dashboard do Railway:**
   - Clique em "+ New Project"

2. **Escolha:**
   - "Deploy from GitHub repo"

3. **Selecione:**
   - Seu repositório (ou faça upload dos arquivos)
   - Pasta: `backend`

4. **Railway começará o deploy automático!**

---

### Passo 3: Configurar Variáveis de Ambiente (5 minutos)

1. **No projeto do Railway:**
   - Clique na aba "Variables"

2. **Adicione estas variáveis:**

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://trilhasgoias:trilhas2025@trilhas.qbci0he.mongodb.net/trilhas-goias?retryWrites=true&w=majority&appName=Trilhas
JWT_SECRET=trilhas-goias-super-secret-key-2025-production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=trilhas-goias-refresh-secret-2025-production
JWT_REFRESH_EXPIRE=30d
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
FRONTEND_URL=https://seu-site.netlify.app
```

3. **Clique em "Add" para cada variável**

4. **Railway fará redeploy automático!**

---

### Passo 4: Aguardar Deploy (3-5 minutos)

Você verá:
```
Building...
Deploying...
✅ Deployed successfully!
```

---

### Passo 5: Pegar a URL do Backend

1. **No Railway:**
   - Clique em "Settings"
   - Vá em "Networking"
   - Clique em "Generate Domain"

2. **Você receberá uma URL tipo:**
   ```
   https://trilhas-goias-backend-production.up.railway.app
   ```

3. **Copie essa URL!**

---

### Passo 6: Testar o Backend

**Acesse no navegador:**
```
https://sua-url.up.railway.app/health
```

**Deve retornar:**
```json
{
  "success": true,
  "message": "API Trilhas de Goiás está funcionando!",
  "timestamp": "2025-10-21T..."
}
```

**Teste as trilhas:**
```
https://sua-url.up.railway.app/api/trails
```

**Deve retornar 20 trilhas!**

---

## ✅ CHECKLIST

- [ ] Conta criada no Railway
- [ ] Projeto criado
- [ ] Variáveis configuradas
- [ ] Deploy concluído
- [ ] URL gerada
- [ ] Backend testado e funcionando

---

## 🎯 RESULTADO

Após esses passos, você terá:

✅ **Backend online 24/7**
✅ **URL fixa e permanente**
✅ **SSL automático (HTTPS)**
✅ **20 trilhas disponíveis**
✅ **API funcionando**

---

## 📝 PRÓXIMO PASSO

Depois de ter a URL do Railway, vamos:

1. **Deploy do Frontend no Netlify**
2. **Configurar VITE_API_URL** com a URL do Railway
3. **Aplicativo 100% funcional!**

---

## 💡 DICAS

- Railway oferece **$5 grátis/mês**
- Depois disso: ~$5-10/mês
- SSL automático
- Deploy automático a cada push
- Logs em tempo real

---

## 🆘 PROBLEMAS?

### "Build failed"
- Verifique se package.json está correto
- Verifique se todas as dependências estão instaladas

### "Deploy failed"
- Verifique as variáveis de ambiente
- Verifique se MongoDB está acessível

### "Cannot connect to MongoDB"
- Verifique se o IP está liberado no MongoDB Atlas
- Verifique se a connection string está correta

---

## 🚀 ALTERNATIVA RÁPIDA

Se preferir, posso criar um guia para:
- **Render** (similar ao Railway)
- **Heroku** (mais conhecido)
- **DigitalOcean** (mais controle)

---

🏔️ **Siga este guia e seu backend estará online em 30 minutos!**

**Depois me avise a URL do Railway que vou configurar o frontend!**