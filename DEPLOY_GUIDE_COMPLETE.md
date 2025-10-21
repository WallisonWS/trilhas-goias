# 🚀 Guia Completo de Deploy - Netlify + Play Store

## 📋 Checklist do Que Falta

### ✅ Já Implementado
- [x] Backend API completo
- [x] Frontend React completo
- [x] Banco de dados estruturado
- [x] Autenticação
- [x] Chat em tempo real
- [x] Upload de fotos
- [x] 20 trilhas de Goiás
- [x] Documentação completa

### ⚠️ Falta Implementar Antes do Deploy

#### Backend
- [ ] Variáveis de ambiente de produção
- [ ] CORS configurado para domínio
- [ ] Rate limiting ajustado
- [ ] Logs de produção
- [ ] Error tracking (Sentry)
- [ ] Backup automático do MongoDB

#### Frontend
- [ ] Build de produção otimizado
- [ ] Variáveis de ambiente de produção
- [ ] Analytics (Google Analytics)
- [ ] Error tracking
- [ ] Service Worker (PWA)
- [ ] Otimização de imagens

#### Mobile (Para Play Store)
- [ ] Criar projeto React Native
- [ ] Adaptar todas as telas
- [ ] Configurar build Android
- [ ] Ícones e splash screens
- [ ] Permissões (GPS, câmera, storage)
- [ ] Assinatura do APK

---

## 🌐 PARTE 1: DEPLOY NO NETLIFY (Frontend)

### Passo 1: Preparar o Frontend para Produção

#### 1.1 Criar arquivo de configuração Netlify

```bash
cd frontend
```

Crie `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

#### 1.2 Atualizar variáveis de ambiente

Crie `.env.production`:

```env
VITE_API_URL=https://seu-backend.railway.app/api
VITE_MAPBOX_TOKEN=seu-token-mapbox
```

#### 1.3 Otimizar build

Atualize `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'map-vendor': ['leaflet', 'react-leaflet'],
          'chart-vendor': ['recharts'],
          'animation-vendor': ['framer-motion']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

### Passo 2: Deploy no Netlify

#### Opção A: Via Interface Web (Mais Fácil)

1. **Criar conta no Netlify**
   - Acesse https://www.netlify.com
   - Crie conta gratuita

2. **Conectar repositório**
   - Clique em "Add new site"
   - Escolha "Import an existing project"
   - Conecte seu GitHub/GitLab
   - Selecione o repositório

3. **Configurar build**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `frontend`

4. **Adicionar variáveis de ambiente**
   - Site settings → Environment variables
   - Adicione:
     - `VITE_API_URL`
     - `VITE_MAPBOX_TOKEN`

5. **Deploy**
   - Clique em "Deploy site"
   - Aguarde 2-5 minutos
   - Seu site estará no ar!

#### Opção B: Via CLI (Mais Rápido)

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
cd frontend
npm run build

# Deploy
netlify deploy --prod

# Seguir instruções:
# - Publish directory: dist
# - Confirmar deploy
```

### Passo 3: Configurar Domínio Personalizado

1. **No Netlify:**
   - Site settings → Domain management
   - Add custom domain
   - Digite: `trilhasgoias.com.br`

2. **No seu provedor de domínio:**
   - Adicione registro CNAME:
     - Nome: `www`
     - Valor: `seu-site.netlify.app`
   - Adicione registro A:
     - Nome: `@`
     - Valor: `75.2.60.5` (IP do Netlify)

3. **SSL automático:**
   - Netlify configura HTTPS automaticamente
   - Aguarde 24h para propagação

---

## 🖥️ PARTE 2: DEPLOY DO BACKEND

### Opção 1: Railway (Recomendado)

#### Passo 1: Preparar Backend

```bash
cd backend
```

Crie `railway.json`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

Atualize `package.json`:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "engines": {
    "node": "20.x"
  }
}
```

#### Passo 2: Deploy no Railway

1. **Criar conta:**
   - Acesse https://railway.app
   - Crie conta gratuita

2. **Novo projeto:**
   - New Project → Deploy from GitHub
   - Conecte repositório
   - Selecione pasta `backend`

3. **Adicionar MongoDB:**
   - Add service → Database → MongoDB
   - Copie a connection string

4. **Configurar variáveis:**
   - Settings → Variables
   - Adicione todas do `.env.example`:
     ```
     PORT=5000
     NODE_ENV=production
     MONGODB_URI=mongodb://...
     JWT_SECRET=seu-secret-forte
     JWT_REFRESH_SECRET=seu-refresh-secret
     FRONTEND_URL=https://trilhasgoias.netlify.app
     ```

5. **Deploy:**
   - Railway faz deploy automático
   - Aguarde 3-5 minutos
   - Copie a URL: `https://seu-backend.up.railway.app`

6. **Atualizar frontend:**
   - No Netlify, atualize `VITE_API_URL`
   - Redeploy do frontend

### Opção 2: Render

Similar ao Railway, mas com interface diferente.

---

## 📱 PARTE 3: CRIAR APP PARA PLAY STORE

### Passo 1: Criar Projeto React Native

```bash
# Criar projeto
npx create-expo-app trilhas-goias-mobile
cd trilhas-goias-mobile

# Instalar dependências essenciais
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-maps
npm install @react-native-async-storage/async-storage
npm install axios
npm install expo-location
npm install expo-camera
npm install expo-image-picker
```

### Passo 2: Estrutura do App Mobile

Crie a estrutura:

```
trilhas-goias-mobile/
├── App.js
├── app.json
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── TrailsScreen.js
│   │   ├── TrailDetailScreen.js
│   │   ├── MapScreen.js
│   │   ├── ProfileScreen.js
│   │   └── LoginScreen.js
│   ├── components/
│   │   ├── TrailCard.js
│   │   └── Header.js
│   ├── services/
│   │   └── api.js
│   └── navigation/
│       └── AppNavigator.js
```

### Passo 3: Configurar app.json

```json
{
  "expo": {
    "name": "Trilhas de Goiás",
    "slug": "trilhas-goias",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#2E7D32"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.trilhasgoias.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#2E7D32"
      },
      "package": "com.trilhasgoias.app",
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Permitir que $(PRODUCT_NAME) use sua localização para rastrear trilhas."
        }
      ]
    ]
  }
}
```

### Passo 4: Criar Telas Principais

#### App.js

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import TrailsScreen from './src/screens/TrailsScreen';
import MapScreen from './src/screens/MapScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Trilhas') iconName = focused ? 'map' : 'map-outline';
            else if (route.name === 'Mapa') iconName = focused ? 'navigate' : 'navigate-outline';
            else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2E7D32',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Tab.Screen name="Trilhas" component={TrailsScreen} />
        <Tab.Screen name="Mapa" component={MapScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

#### HomeScreen.js

```javascript
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Explore as Trilhas de Goiás</Text>
          <Text style={styles.heroSubtitle}>Descubra o Cerrado</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Trilhas em Destaque</Text>
        
        <TouchableOpacity 
          style={styles.trailCard}
          onPress={() => navigation.navigate('Trilhas')}
        >
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4' }}
            style={styles.trailImage}
          />
          <View style={styles.trailInfo}>
            <Text style={styles.trailName}>Sertão Zen</Text>
            <Text style={styles.trailDetails}>8.3 km • Moderada</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  hero: {
    height: 250,
    position: 'relative'
  },
  heroImage: {
    width: '100%',
    height: '100%'
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(46, 125, 50, 0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 8
  },
  content: {
    padding: 16
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16
  },
  trailCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3
  },
  trailImage: {
    width: '100%',
    height: 150
  },
  trailInfo: {
    padding: 12
  },
  trailName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121'
  },
  trailDetails: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4
  }
});

export default HomeScreen;
```

### Passo 5: Criar Ícones e Assets

#### Gerar ícones:

1. **Criar ícone 1024x1024:**
   - Use Canva ou Figma
   - Logo com fundo verde (#2E7D32)
   - Salve como `icon.png`

2. **Gerar adaptive icon:**
   - Mesmo ícone
   - Salve como `adaptive-icon.png`

3. **Criar splash screen:**
   - 1242x2436 (iPhone)
   - Logo centralizado
   - Fundo verde
   - Salve como `splash.png`

4. **Colocar em:**
   ```
   assets/
   ├── icon.png
   ├── adaptive-icon.png
   └── splash.png
   ```

### Passo 6: Build para Android

#### 6.1 Configurar EAS Build

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Configurar projeto
eas build:configure
```

#### 6.2 Criar eas.json

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

#### 6.3 Build APK (Para testar)

```bash
eas build --platform android --profile preview
```

Aguarde 10-20 minutos. Você receberá um link para baixar o APK.

#### 6.4 Build AAB (Para Play Store)

```bash
eas build --platform android --profile production
```

Aguarde 10-20 minutos. Você receberá o arquivo `.aab`.

---

## 📱 PARTE 4: PUBLICAR NA PLAY STORE

### Passo 1: Criar Conta de Desenvolvedor

1. **Acesse:** https://play.google.com/console
2. **Crie conta:** Taxa única de US$ 25
3. **Preencha informações** da empresa/desenvolvedor

### Passo 2: Criar Novo App

1. **Criar app:**
   - Nome: "Trilhas de Goiás"
   - Idioma padrão: Português (Brasil)
   - App ou jogo: App
   - Gratuito ou pago: Gratuito

2. **Preencher informações:**
   - Categoria: Viagens e local
   - Tags: trilhas, ecoturismo, goiás

### Passo 3: Preparar Assets da Store

#### Screenshots (Obrigatório)

Crie 4-8 screenshots:
- Resolução: 1080x1920 (portrait)
- Telas principais do app
- Com textos explicativos

**Dica:** Use emulador Android para capturar.

#### Ícone da Store

- 512x512 pixels
- PNG com transparência
- Mesmo design do ícone do app

#### Banner (Opcional)

- 1024x500 pixels
- Imagem promocional

#### Vídeo Promocional (Opcional)

- YouTube link
- 30 segundos a 2 minutos
- Mostrando funcionalidades

### Passo 4: Descrição da Store

#### Título (50 caracteres)
```
Trilhas de Goiás - Explore o Cerrado
```

#### Descrição Curta (80 caracteres)
```
Descubra trilhas, cachoeiras e o Caminho dos Veadeiros com mapas offline
```

#### Descrição Completa (4000 caracteres)

```
🏔️ TRILHAS DE GOIÁS - SEU GUIA COMPLETO DO CERRADO

Explore as melhores trilhas de Goiás com o app mais completo de ecoturismo da região!

✨ FUNCIONALIDADES PRINCIPAIS:

🗺️ MAPAS OFFLINE
• Baixe mapas e use sem internet
• Perfeito para áreas remotas do Cerrado
• GPS tracking em tempo real

🥾 20+ TRILHAS CATALOGADAS
• Chapada dos Veadeiros
• Caminho dos Veadeiros (500km)
• Cachoeiras incríveis
• Informações detalhadas

📊 PERFIL DE ELEVAÇÃO
• Gráficos interativos
• Estatísticas completas
• Análise de dificuldade

📸 GALERIA DE FOTOS
• Compartilhe suas experiências
• Veja fotos da comunidade
• Upload ilimitado (premium)

💬 CHAT EM TEMPO REAL
• Converse com outros trilheiros
• Tire dúvidas
• Organize grupos

🚨 SISTEMA SOS
• Botão de emergência
• Envia localização automática
• Notifica contatos

⭐ AVALIAÇÕES
• Leia experiências reais
• Compartilhe suas dicas
• Ajude a comunidade

🎯 INFORMAÇÕES COMPLETAS:
• Nível de dificuldade
• Distância e tempo
• Desnível e elevação
• Melhor época para visitar
• Pontos de apoio (guias, pousadas)
• Informações de segurança
• Fauna e flora local

🏆 GAMIFICAÇÃO:
• Badges e conquistas
• Ranking de trilheiros
• Desafios mensais
• Estatísticas pessoais

👥 COMUNIDADE ATIVA:
• Fórum de discussões
• Eventos organizados
• Grupos de trilheiros
• Feed de atividades

💎 PREMIUM (R$ 19,90/mês):
• Mapas offline ilimitados
• Upload ilimitado de fotos
• Estatísticas avançadas
• Sem anúncios
• Suporte prioritário

📍 REGIÕES COBERTAS:
• Chapada dos Veadeiros
• Alto Paraíso de Goiás
• Cavalcante
• São Jorge
• Pirenópolis
• E muito mais!

🌳 SOBRE O CERRADO:
Informações específicas sobre o bioma, fauna, flora e como preservar.

📞 SUPORTE:
suporte@trilhasgoias.com.br

Baixe agora e comece sua aventura no Cerrado! 🏔️
```

### Passo 5: Upload do APK/AAB

1. **Produção → Versões:**
   - Criar nova versão
   - Upload do arquivo `.aab`
   - Preencher notas da versão

2. **Notas da versão:**
   ```
   Versão 1.0.0 - Lançamento Inicial
   
   ✨ Funcionalidades:
   • 20+ trilhas de Goiás
   • Mapas offline
   • Chat em tempo real
   • Sistema SOS
   • Perfil de elevação
   • Galeria de fotos
   • Avaliações da comunidade
   ```

### Passo 6: Classificação de Conteúdo

1. **Questionário:**
   - Violência: Não
   - Conteúdo sexual: Não
   - Linguagem imprópria: Não
   - Drogas: Não
   - Etc.

2. **Classificação esperada:** Livre

### Passo 7: Política de Privacidade

Crie uma página com política de privacidade:

```
https://trilhasgoias.netlify.app/privacy-policy
```

**Conteúdo mínimo:**
- Dados coletados (localização, fotos, perfil)
- Como são usados
- Compartilhamento (não compartilhamos)
- Direitos do usuário (LGPD)
- Contato

### Passo 8: Revisar e Enviar

1. **Revisar tudo:**
   - Screenshots ✓
   - Descrição ✓
   - Ícones ✓
   - APK/AAB ✓
   - Política de privacidade ✓

2. **Enviar para revisão:**
   - Clique em "Enviar para revisão"
   - Aguarde 1-7 dias
   - Google analisa o app

3. **Aprovação:**
   - Você receberá email
   - App fica disponível na Play Store
   - Comemore! 🎉

---

## 🔧 CONFIGURAÇÕES FINAIS

### Backend - Variáveis de Produção

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/trilhas-goias
JWT_SECRET=secret-super-forte-producao-123456789
JWT_REFRESH_SECRET=refresh-secret-producao-987654321
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
FRONTEND_URL=https://trilhasgoias.netlify.app
CORS_ORIGIN=https://trilhasgoias.netlify.app
```

### Frontend - Variáveis de Produção

```env
VITE_API_URL=https://seu-backend.up.railway.app/api
VITE_MAPBOX_TOKEN=seu-token-mapbox-real
```

---

## 📊 CHECKLIST COMPLETO DE DEPLOY

### Backend
- [ ] Código no GitHub
- [ ] Variáveis de ambiente configuradas
- [ ] MongoDB Atlas configurado
- [ ] Deploy no Railway/Render
- [ ] CORS configurado
- [ ] SSL ativo
- [ ] Testado em produção

### Frontend
- [ ] Build otimizado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy no Netlify
- [ ] Domínio configurado
- [ ] SSL ativo
- [ ] Analytics configurado
- [ ] Testado em produção

### Mobile
- [ ] Projeto React Native criado
- [ ] Telas principais implementadas
- [ ] Ícones e splash screen
- [ ] Build APK gerado
- [ ] Build AAB gerado
- [ ] Testado em dispositivo real
- [ ] Conta Google Play criada
- [ ] Screenshots preparados
- [ ] Descrição escrita
- [ ] Política de privacidade publicada
- [ ] App enviado para revisão

---

## ⏱️ TEMPO ESTIMADO

### Deploy Frontend (Netlify)
- Preparação: 30 minutos
- Deploy: 5 minutos
- Configuração domínio: 1 hora
- **Total: 2 horas**

### Deploy Backend (Railway)
- Preparação: 30 minutos
- Deploy: 10 minutos
- Configuração: 30 minutos
- **Total: 1 hora**

### App Mobile
- Criar projeto: 1 hora
- Implementar telas: 8-16 horas
- Gerar builds: 1 hora
- Preparar store: 2 horas
- Enviar para revisão: 30 minutos
- **Total: 12-20 horas**

### Aprovação Play Store
- **Tempo: 1-7 dias**

---

## 💰 CUSTOS

### Netlify (Frontend)
- **Gratuito** até 100GB bandwidth
- Domínio: R$ 40/ano (Registro.br)

### Railway (Backend)
- **Gratuito** até $5/mês de uso
- Depois: ~$10-20/mês

### MongoDB Atlas
- **Gratuito** até 512MB
- Depois: $9/mês (2GB)

### Google Play
- **Taxa única:** US$ 25 (~R$ 125)

### Total Inicial:
- **R$ 165** (taxa Play Store + domínio)

### Total Mensal:
- **R$ 0-150** (dependendo do uso)

---

## 🎯 ORDEM DE EXECUÇÃO

### Semana 1: Deploy Web
1. **Dia 1:** Deploy backend (Railway)
2. **Dia 2:** Deploy frontend (Netlify)
3. **Dia 3:** Configurar domínio
4. **Dia 4:** Testar tudo em produção
5. **Dia 5:** Lançamento soft (50 pessoas)

### Semana 2-3: Criar App Mobile
1. **Dias 6-10:** Criar projeto e telas
2. **Dias 11-13:** Testar e ajustar
3. **Dia 14:** Gerar builds

### Semana 4: Publicar na Play Store
1. **Dia 15:** Preparar assets
2. **Dia 16:** Criar conta e app
3. **Dia 17:** Upload e configuração
4. **Dia 18:** Enviar para revisão
5. **Dias 19-25:** Aguardar aprovação

---

## 🚀 COMANDOS RÁPIDOS

### Deploy Frontend (Netlify)

```bash
cd frontend
npm run build
netlify deploy --prod
```

### Deploy Backend (Railway)

```bash
cd backend
git add .
git commit -m "Deploy to production"
git push
# Railway faz deploy automático
```

### Build Mobile

```bash
cd trilhas-goias-mobile
eas build --platform android --profile production
```

---

## 📞 SUPORTE

### Problemas com Deploy?
- Netlify Docs: https://docs.netlify.com
- Railway Docs: https://docs.railway.app
- Expo Docs: https://docs.expo.dev

### Problemas com Play Store?
- Google Play Console Help: https://support.google.com/googleplay/android-developer

---

## 🎉 RESULTADO FINAL

Após seguir este guia, você terá:

✅ **Frontend no ar** (Netlify)
✅ **Backend no ar** (Railway)
✅ **Domínio próprio**
✅ **App na Play Store**
✅ **SSL configurado**
✅ **Pronto para usuários**

---

🏔️ **Seu aplicativo estará LIVE em 1-2 semanas!**

**Link atual:** https://3000-887e66ee-6f24-416d-a9c9-de0386d7084d.proxy.daytona.works

**Siga este guia passo a passo e você terá sucesso!**