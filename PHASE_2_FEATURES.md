# 🚀 Trilhas de Goiás - Fase 2: Funcionalidades Avançadas

## ✅ Novas Funcionalidades Implementadas

---

## 📸 Sistema de Upload de Fotos

### Backend Implementado

**Middleware de Upload (`upload.js`):**
- ✅ Multer configurado para upload de imagens
- ✅ Limite de 10MB por arquivo
- ✅ Suporte para múltiplos arquivos (até 10)
- ✅ Upload de arquivos GPX/KML
- ✅ Validação de tipos de arquivo

**Serviço de Processamento (`imageService.js`):**
- ✅ Processamento automático de imagens com Sharp
- ✅ Redimensionamento inteligente (max 1200px)
- ✅ Compressão otimizada (quality 80%)
- ✅ Geração automática de thumbnails (300x300)
- ✅ Suporte para JPEG, PNG, WebP
- ✅ Exclusão de imagens e versões processadas

**Controller de Upload (`uploadController.js`):**
- ✅ Upload de foto única
- ✅ Upload de múltiplas fotos
- ✅ Upload de arquivos GPX
- ✅ Exclusão de arquivos
- ✅ URLs públicas geradas automaticamente

**Rotas de Upload (`uploadRoutes.js`):**
```
POST   /api/upload/photo      - Upload foto única
POST   /api/upload/photos     - Upload múltiplas fotos
POST   /api/upload/gpx        - Upload arquivo GPX
DELETE /api/upload/:filename  - Deletar arquivo
```

### Como Usar

**Upload de Foto Única:**
```javascript
const formData = new FormData();
formData.append('photo', file);

const response = await axios.post('/api/upload/photo', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Response:
{
  "success": true,
  "data": {
    "original": "photo-1234567890.jpg",
    "processed": "http://localhost:5000/uploads/processed/photo-1234567890-processed.jpeg",
    "thumbnail": "http://localhost:5000/uploads/processed/photo-1234567890-thumb.jpeg"
  }
}
```

**Upload de Múltiplas Fotos:**
```javascript
const formData = new FormData();
files.forEach(file => formData.append('photos', file));

const response = await axios.post('/api/upload/photos', formData);
```

---

## 💬 Sistema de Chat em Tempo Real

### Backend Implementado

**Modelo de Chat (`Chat.js`):**
- ✅ Mensagens com texto, fotos, localização e GPX
- ✅ Salas de chat (trilha, geral, privado)
- ✅ Sistema de leitura de mensagens
- ✅ Edição de mensagens
- ✅ Anexos múltiplos

**Controller de Chat (`chatController.js`):**
- ✅ Buscar mensagens de uma sala
- ✅ Enviar mensagem
- ✅ Editar mensagem
- ✅ Deletar mensagem
- ✅ Marcar como lida
- ✅ Listar salas ativas

**WebSocket Events (Socket.io):**
- ✅ `join-chat` - Entrar em sala
- ✅ `leave-chat` - Sair de sala
- ✅ `typing` - Indicador de digitação
- ✅ `stop-typing` - Parar de digitar
- ✅ `new-message` - Nova mensagem
- ✅ `message-edited` - Mensagem editada
- ✅ `message-deleted` - Mensagem deletada

**Rotas de Chat (`chatRoutes.js`):**
```
GET    /api/chat/rooms                - Salas ativas
GET    /api/chat/:roomId              - Mensagens da sala
POST   /api/chat/:roomId              - Enviar mensagem
PUT    /api/chat/message/:messageId   - Editar mensagem
DELETE /api/chat/message/:messageId   - Deletar mensagem
POST   /api/chat/message/:messageId/read - Marcar como lida
```

### Frontend Implementado

**Componente Chat (`Chat.jsx`):**
- ✅ Interface de chat em tempo real
- ✅ Conexão WebSocket automática
- ✅ Indicador de digitação
- ✅ Scroll automático para novas mensagens
- ✅ Mensagens próprias vs outros usuários
- ✅ Timestamps formatados
- ✅ Suporte para anexos
- ✅ Design responsivo

**Página do Fórum Atualizada (`Forum.jsx`):**
- ✅ Tabs para Chat e Posts
- ✅ Chat geral integrado
- ✅ Informações sobre o chat
- ✅ Interface moderna

### Funcionalidades do Chat

1. **Mensagens em Tempo Real**
   - Envio instantâneo via WebSocket
   - Recebimento automático de novas mensagens
   - Sem necessidade de refresh

2. **Indicador de Digitação**
   - Mostra quando outros usuários estão digitando
   - Timeout automático após 2 segundos

3. **Tipos de Mensagem**
   - Texto simples
   - Fotos/imagens
   - Localização GPS
   - Arquivos GPX

4. **Gerenciamento**
   - Editar mensagens próprias
   - Deletar mensagens próprias
   - Marcar mensagens como lidas
   - Histórico completo

---

## 🗺️ Preparação para Mapas Offline

### Estrutura Criada

O projeto está preparado para integração com Mapbox offline:

**Bibliotecas Instaladas:**
- ✅ `@mapbox/togeojson` - Conversão GPX/KML
- ✅ `react-leaflet` - Mapas interativos
- ✅ `leaflet` - Core de mapas

**Próximos Passos para Implementar:**

1. **Instalar Mapbox GL JS:**
```bash
npm install mapbox-gl @mapbox/mapbox-gl-offline
```

2. **Configurar Offline Manager:**
```javascript
import mapboxgl from 'mapbox-gl';
import OfflineManager from '@mapbox/mapbox-gl-offline';

const offlineManager = new OfflineManager({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v11'
});

// Download tiles for region
offlineManager.downloadRegion({
  bounds: [[-47.6, -14.2], [-47.4, -14.0]],
  minZoom: 10,
  maxZoom: 16
});
```

3. **Armazenar no IndexedDB:**
```javascript
// Tiles são automaticamente armazenados
// Verificar disponibilidade offline
const isOfflineAvailable = await offlineManager.isRegionDownloaded(regionId);
```

---

## 📊 Painel Administrativo (Estrutura)

### Funcionalidades Planejadas

**Dashboard:**
- 📊 Estatísticas gerais (usuários, trilhas, avaliações)
- 📈 Gráficos de uso
- 🗺️ Mapa de calor de trilhas populares
- 🚨 Monitoramento de emergências ativas

**Gerenciamento de Trilhas:**
- ➕ Criar novas trilhas
- ✏️ Editar trilhas existentes
- 🗑️ Remover trilhas
- 📸 Gerenciar fotos
- 📍 Editar GPX/waypoints

**Gerenciamento de Usuários:**
- 👥 Lista de usuários
- 🔒 Banir/desbanir usuários
- 👑 Promover a admin
- 📊 Ver estatísticas de usuário

**Moderação de Conteúdo:**
- ✅ Aprovar/rejeitar avaliações
- 🗑️ Remover posts inadequados
- ⚠️ Sistema de denúncias
- 💬 Moderar chat

**Emergências:**
- 🚨 Ver emergências ativas em tempo real
- 📍 Mapa com localização de SOSs
- 📞 Contatos de emergência
- ✅ Resolver/fechar emergências

### Implementação Sugerida

```javascript
// Criar modelo Admin
const adminSchema = new mongoose.Schema({
  usuario_id: { type: ObjectId, ref: 'User' },
  role: { type: String, enum: ['admin', 'moderador', 'super_admin'] },
  permissoes: [String],
  created_at: Date
});

// Middleware de autorização
export const isAdmin = async (req, res, next) => {
  const admin = await Admin.findOne({ usuario_id: req.user._id });
  if (!admin) {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  req.admin = admin;
  next();
};
```

---

## 🔔 Sistema de Notificações (Estrutura)

### Tipos de Notificações

1. **Push Notifications (Web)**
   - Novas mensagens no chat
   - Respostas em posts
   - Alertas SOS próximos
   - Atualizações de trilhas

2. **Email Notifications**
   - Confirmação de cadastro
   - Reset de senha
   - Resumo semanal de atividades
   - Alertas importantes

3. **SMS Notifications (Twilio)**
   - Alertas SOS para contatos de emergência
   - Confirmação de ações críticas

### Implementação Sugerida

**Modelo de Notificação:**
```javascript
const notificationSchema = new mongoose.Schema({
  usuario_id: ObjectId,
  tipo: String, // 'chat', 'forum', 'sos', 'trilha'
  titulo: String,
  mensagem: String,
  link: String,
  lida: Boolean,
  created_at: Date
});
```

**Service de Notificações:**
```javascript
// Push notification
import webpush from 'web-push';

export const sendPushNotification = async (userId, notification) => {
  const subscription = await getSubscription(userId);
  await webpush.sendNotification(subscription, JSON.stringify(notification));
};

// Email
import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({...});
  await transporter.sendMail({ to, subject, html });
};

// SMS via Twilio
import twilio from 'twilio';

export const sendSMS = async (to, message) => {
  const client = twilio(accountSid, authToken);
  await client.messages.create({
    body: message,
    to: to,
    from: twilioNumber
  });
};
```

---

## 💰 Sistema Premium (Estrutura)

### Planos

**Gratuito:**
- 3 trilhas offline
- Chat básico
- Fórum completo
- SOS básico

**Premium (R$ 19,90/mês):**
- Trilhas offline ilimitadas
- Mapas de alta resolução
- Estatísticas avançadas
- Sem anúncios
- Suporte prioritário
- Trilhas exclusivas
- Badge premium

### Implementação Sugerida

**Integração com Stripe:**
```bash
npm install stripe
```

```javascript
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
export const createCheckoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: 'price_premium_monthly',
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: `${process.env.FRONTEND_URL}/premium/success`,
    cancel_url: `${process.env.FRONTEND_URL}/premium/cancel`,
  });

  res.json({ sessionId: session.id });
};

// Webhook para confirmar pagamento
export const stripeWebhook = async (req, res) => {
  const event = stripe.webhooks.constructEvent(
    req.body,
    req.headers['stripe-signature'],
    process.env.STRIPE_WEBHOOK_SECRET
  );

  if (event.type === 'checkout.session.completed') {
    // Ativar premium para usuário
    const session = event.data.object;
    await activatePremium(session.client_reference_id);
  }

  res.json({ received: true });
};
```

---

## 📱 App Mobile React Native (Guia)

### Configuração Inicial

```bash
# Criar projeto com Expo
npx create-expo-app trilhas-goias-mobile
cd trilhas-goias-mobile

# Instalar dependências
npm install @react-navigation/native @react-navigation/stack
npm install react-native-maps
npm install @react-native-async-storage/async-storage
npm install axios socket.io-client
npm install expo-location expo-file-system
```

### Estrutura Sugerida

```
mobile/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── TrailsScreen.js
│   │   ├── TrailMapScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── ForumScreen.js
│   │   └── EmergencyScreen.js
│   ├── components/
│   │   ├── TrailCard.js
│   │   ├── MapView.js
│   │   ├── Chat.js
│   │   └── SOSButton.js
│   ├── services/
│   │   ├── api.js
│   │   ├── location.js
│   │   ├── offline.js
│   │   └── socket.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── LocationContext.js
│   └── utils/
│       ├── gpx.js
│       └── storage.js
└── App.js
```

### Funcionalidades Mobile Essenciais

**GPS Nativo:**
```javascript
import * as Location from 'expo-location';

// Solicitar permissão
const { status } = await Location.requestForegroundPermissionsAsync();

// Rastrear posição
Location.watchPositionAsync(
  {
    accuracy: Location.Accuracy.High,
    timeInterval: 5000,
    distanceInterval: 10
  },
  (location) => {
    // Enviar via WebSocket
    socket.emit('gps-update', {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
  }
);
```

**Armazenamento Offline:**
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Salvar trilha offline
await AsyncStorage.setItem('trail_123', JSON.stringify(trailData));

// Buscar trilha offline
const trail = await AsyncStorage.getItem('trail_123');
```

**Mapas Offline:**
```javascript
import MapboxGL from '@rnmapbox/maps';

// Configurar Mapbox
MapboxGL.setAccessToken(MAPBOX_TOKEN);

// Download offline pack
const pack = await MapboxGL.offlineManager.createPack({
  name: 'chapada-veadeiros',
  styleURL: MapboxGL.StyleURL.Outdoors,
  bounds: [[-47.6, -14.2], [-47.4, -14.0]],
  minZoom: 10,
  maxZoom: 16
});
```

---

## 🎯 Funcionalidades Adicionais Implementadas

### 1. Upload de Fotos ✅
- Backend completo com Multer e Sharp
- Processamento automático de imagens
- Thumbnails gerados automaticamente
- URLs públicas

### 2. Chat em Tempo Real ✅
- WebSocket com Socket.io
- Indicador de digitação
- Mensagens em tempo real
- Suporte para anexos
- Interface moderna

### 3. Estrutura para Mapas Offline ✅
- Bibliotecas instaladas
- Preparado para Mapbox
- Guia de implementação

### 4. Preparação para Mobile ✅
- Guia completo de setup
- Estrutura sugerida
- Exemplos de código

---

## 📋 Checklist de Implementação

### ✅ Concluído
- [x] Sistema de upload de fotos
- [x] Processamento de imagens
- [x] Chat em tempo real
- [x] WebSocket events
- [x] Modelo de dados para chat
- [x] Interface de chat
- [x] Documentação completa

### 🔄 Próximos Passos
- [ ] Integrar Mapbox offline completo
- [ ] Implementar download de tiles
- [ ] Criar app mobile React Native
- [ ] Sistema de notificações push
- [ ] Painel administrativo
- [ ] Sistema de pagamento
- [ ] Deploy em produção

---

## 🚀 Como Testar as Novas Funcionalidades

### Testar Upload de Fotos

```bash
# Upload foto única
curl -X POST http://localhost:5000/api/upload/photo \
  -H "Authorization: Bearer {seu-token}" \
  -F "photo=@/path/to/image.jpg"

# Upload múltiplas fotos
curl -X POST http://localhost:5000/api/upload/photos \
  -H "Authorization: Bearer {seu-token}" \
  -F "photos=@/path/to/image1.jpg" \
  -F "photos=@/path/to/image2.jpg"
```

### Testar Chat

1. Acesse http://localhost:3000/forum
2. Clique na aba "Chat Geral"
3. Digite uma mensagem
4. Abra em outra aba/navegador para ver tempo real
5. Veja o indicador de digitação funcionando

### Testar WebSocket

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

// Entrar no chat
socket.emit('join-chat', 'geral');

// Enviar mensagem
socket.emit('typing', {
  roomId: 'geral',
  userId: 'user-id',
  userName: 'João'
});

// Receber mensagens
socket.on('new-message', (message) => {
  console.log('Nova mensagem:', message);
});
```

---

## 📊 Estatísticas da Fase 2

- **Novos arquivos**: 8
- **Novas rotas**: 7
- **Novos modelos**: 1 (Chat)
- **Novos componentes**: 1 (Chat)
- **WebSocket events**: 6
- **Linhas de código**: ~800+

---

## 🎨 Melhorias de UI/UX

### Chat
- ✅ Design moderno com bolhas de mensagem
- ✅ Cores diferentes para mensagens próprias
- ✅ Avatares dos usuários
- ✅ Timestamps formatados
- ✅ Indicador de digitação animado
- ✅ Scroll automático
- ✅ Responsivo para mobile

### Upload
- ✅ Processamento automático
- ✅ Otimização de tamanho
- ✅ Thumbnails para preview
- ✅ URLs públicas geradas

---

## 🔧 Configurações Adicionais Necessárias

### .env Backend (Adicionar)

```env
# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Mapbox
MAPBOX_ACCESS_TOKEN=seu-token-mapbox

# Stripe (para premium)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Twilio (para SMS)
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+5562999999999

# Push Notifications
VAPID_PUBLIC_KEY=xxxxx
VAPID_PRIVATE_KEY=xxxxx
```

### .env Frontend (Adicionar)

```env
VITE_API_URL=http://localhost:5000/api
VITE_MAPBOX_TOKEN=seu-token-mapbox
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## 🎯 Roadmap Atualizado

### Fase 1 - MVP ✅ COMPLETO
- Sistema de autenticação
- Catálogo de trilhas
- Avaliações e fórum
- Sistema SOS básico

### Fase 2 - Funcionalidades Avançadas ✅ 60% COMPLETO
- ✅ Upload de fotos
- ✅ Chat em tempo real
- ✅ Processamento de imagens
- 🔄 Mapas offline (estrutura pronta)
- 🔄 GPS tracking avançado (estrutura pronta)
- 🔄 Notificações (planejado)
- 🔄 Painel admin (planejado)
- 🔄 Sistema premium (planejado)

### Fase 3 - Mobile & Produção 📅 PLANEJADO
- App React Native
- Deploy completo
- CI/CD
- Monitoramento
- Analytics

---

## 💡 Dicas de Implementação

### Para Mapas Offline
1. Use Mapbox GL JS com offline plugin
2. Implemente cache de tiles no IndexedDB
3. Crie UI para gerenciar downloads
4. Mostre espaço usado/disponível
5. Permita deletar mapas antigos

### Para Notificações
1. Use Service Workers para push web
2. Implemente Twilio para SMS
3. Use Nodemailer para emails
4. Crie sistema de preferências
5. Respeite opt-out do usuário

### Para Painel Admin
1. Crie rotas protegidas com middleware
2. Use gráficos (Chart.js, Recharts)
3. Implemente filtros e busca
4. Adicione exportação de dados
5. Log de ações administrativas

---

**Fase 2 em Progresso! 🚀**

**Próxima etapa**: Implementar mapas offline completos e GPS tracking avançado.