# 🚀 Deploy no Render - Guia Completo e Simples

## 🎯 Objetivo: Backend online em 15 minutos (mais fácil que Railway!)

---

## 📋 PASSO A PASSO

### Passo 1: Criar Conta no Render (2 minutos)

1. **Acesse:** https://render.com

2. **Clique em:** "Get Started" ou "Sign Up"

3. **Faça login com GitHub:**
   - Clique em "GitHub"
   - Autorize o Render
   - Pronto!

---

### Passo 2: Criar Web Service (1 minuto)

1. **No dashboard do Render:**
   - Clique em "+ New"
   - Escolha "Web Service"

2. **Conecte o repositório:**
   - Procure por: `WallisonWS/trilhas-goias`
   - Clique em "Connect"

---

### Passo 3: Configurar o Serviço (3 minutos)

**Preencha:**

- **Name:** `trilhas-goias-backend`
- **Region:** Oregon (US West) - mais próximo
- **Branch:** `main`
- **Root Directory:** `backend` ← IMPORTANTE!
- **Runtime:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** Free

---

### Passo 4: Adicionar Variáveis de Ambiente (5 minutos)

**Role até "Environment Variables"**

**Clique em "Add Environment Variable" e adicione:**

```
MONGODB_URI = mongodb+srv://trilhasgoias:trilhas2025@trilhas.qbci0he.mongodb.net/trilhas-goias?retryWrites=true&w=majority&appName=Trilhas

PORT = 5000

NODE_ENV = production

JWT_SECRET = trilhas-goias-super-secret-key-2025-production

JWT_EXPIRE = 7d

JWT_REFRESH_SECRET = trilhas-goias-refresh-secret-2025-production

JWT_REFRESH_EXPIRE = 30d

MAX_FILE_SIZE = 10485760

UPLOAD_PATH = ./uploads

FRONTEND_URL = *
```

**Clique em "Add" para cada uma!**

---

### Passo 5: Criar o Serviço (1 minuto)

1. **Clique em:** "Create Web Service" (botão no final)

2. **Aguarde:** 3-5 minutos

3. **Você verá:**
   ```
   Building...
   Deploying...
   ✅ Live
   ```

---

### Passo 6: Pegar a URL

**No topo da página você verá a URL:**
```
https://trilhas-goias-backend.onrender.com
```

**Copie essa URL!**

---

### Passo 7: Testar

**Acesse no navegador:**
```
https://trilhas-goias-backend.onrender.com/health
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
https://trilhas-goias-backend.onrender.com/api/trails
```

**Deve retornar 20 trilhas!**

---

## ✅ CHECKLIST

- [ ] Conta criada no Render
- [ ] Web Service criado
- [ ] Repositório conectado
- [ ] Root Directory = backend
- [ ] Variáveis adicionadas
- [ ] Deploy concluído
- [ ] URL funcionando

---

## 🎯 RESULTADO

Após esses passos:

✅ **Backend online 24/7**
✅ **URL fixa:** https://seu-app.onrender.com
✅ **SSL automático**
✅ **20 trilhas disponíveis**
✅ **Totalmente grátis!**

---

## 💡 VANTAGENS DO RENDER

- ✅ **100% gratuito** (plano free)
- ✅ Mais simples que Railway
- ✅ SSL automático
- ✅ Deploy automático
- ✅ Logs claros
- ✅ Sem problemas de configuração

---

## 🚀 PRÓXIMO PASSO

Depois de ter a URL do Render funcionando:

1. **Popular banco** com trilhas
2. **Deploy frontend** no Netlify
3. **Conectar frontend ao backend**
4. **Aplicativo 100% online!**

---

## 🆘 PROBLEMAS?

### "Build failed"
- Verifique Root Directory = backend
- Verifique Build Command = npm install

### "Deploy failed"
- Verifique as variáveis
- Verifique se MongoDB está acessível

### "Application error"
- Verifique os logs
- Me envie o erro

---

🏔️ **Render é mais simples! Siga este guia!**

**Me avise quando tiver a URL do Render funcionando!**