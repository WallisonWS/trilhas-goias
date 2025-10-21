# 🐙 Guia Completo - Subir Projeto no GitHub

## 🎯 Objetivo: Colocar o projeto no GitHub para conectar no Railway

---

## 📋 PASSO A PASSO

### Passo 1: Criar Repositório no GitHub (2 minutos)

1. **Acesse:** https://github.com/new

2. **Preencha:**
   - **Repository name:** `trilhas-goias`
   - **Description:** "Aplicativo completo de trilhas de Goiás com mapas offline, chat e sistema SOS"
   - **Visibility:** Private (recomendado) ou Public
   - **NÃO marque:** "Initialize with README" (já temos)

3. **Clique em:** "Create repository"

4. **Copie a URL que aparece:**
   ```
   https://github.com/seu-usuario/trilhas-goias.git
   ```

---

### Passo 2: Inicializar Git no Workspace

**Execute estes comandos no terminal:**

```bash
# Ir para a raiz do projeto
cd /workspace

# Inicializar git
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Initial commit - Trilhas de Goiás completo"

# Adicionar remote (substitua pela SUA URL)
git remote add origin https://github.com/SEU-USUARIO/trilhas-goias.git

# Fazer push
git branch -M main
git push -u origin main
```

---

### Passo 3: Autenticar no GitHub

Quando pedir credenciais:

**Username:** seu-usuario-github

**Password:** Use um **Personal Access Token** (não a senha normal)

#### Como criar Personal Access Token:

1. **GitHub:** Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Clique em:** "Generate new token (classic)"

3. **Preencha:**
   - Note: "Railway Deploy"
   - Expiration: 90 days
   - **Marque:** `repo` (full control)

4. **Clique em:** "Generate token"

5. **Copie o token** (só aparece uma vez!)

6. **Use como senha** no git push

---

### Passo 4: Verificar no GitHub

1. **Acesse:** https://github.com/seu-usuario/trilhas-goias

2. **Você deve ver:**
   - Pasta `backend/`
   - Pasta `frontend/`
   - Arquivos `.md` de documentação
   - `.gitignore`
   - `README.md`

---

## ✅ CHECKLIST

- [ ] Repositório criado no GitHub
- [ ] Git inicializado
- [ ] Arquivos commitados
- [ ] Push realizado
- [ ] Código visível no GitHub

---

## 🚀 DEPOIS DISSO

Com o código no GitHub, você poderá:

1. **No Railway:**
   - "+ New" → "Deploy from GitHub repo"
   - Selecionar `trilhas-goias`
   - Escolher pasta `backend`
   - Deploy automático!

2. **Configurar variáveis** (já temos a lista)

3. **Gerar domínio**

4. **Backend online!**

---

## 💡 COMANDOS RESUMIDOS

```bash
cd /workspace
git init
git add .
git commit -m "Initial commit - Trilhas de Goiás"
git remote add origin https://github.com/SEU-USUARIO/trilhas-goias.git
git branch -M main
git push -u origin main
```

---

## 🆘 PROBLEMAS?

### "Permission denied"
- Use Personal Access Token como senha
- Não use a senha normal do GitHub

### "Repository not found"
- Verifique se a URL está correta
- Verifique se o repositório foi criado

### "Failed to push"
- Verifique sua conexão
- Tente novamente

---

🏔️ **Siga este guia e seu código estará no GitHub!**

**Depois me avise que vou te guiar no deploy do Railway!**