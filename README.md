# 🏔️ Trilhas de Goiás - Ecossistema Completo

![Trilhas de Goiás](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop)

Aplicativo completo de trilhas focado na região de Goiás, integrado com Google Maps e Mapbox, com funcionalidade offline, catálogo de trilhas, fórum comunitário e sistema de emergência SOS.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológica](#stack-tecnológica)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## 🎯 Visão Geral

O **Trilhas de Goiás** é um ecossistema completo para trilheiros que exploram o Cerrado goiano, com foco especial na Chapada dos Veadeiros e no Caminho dos Veadeiros (trilha de longo curso reconhecida nacionalmente).

### Destaques

- ✅ **Mapas Offline**: Funciona sem internet usando Mapbox
- ✅ **GPS em Tempo Real**: Rastreamento preciso da posição
- ✅ **Catálogo Completo**: Trilhas de Goiás com informações detalhadas
- ✅ **Fórum Comunitário**: Compartilhe experiências e dicas
- ✅ **Sistema SOS**: Emergência com envio de localização
- ✅ **Integração Google Maps**: Backup e funcionalidades adicionais

## 🚀 Funcionalidades

### Para Usuários

#### 📱 Cadastro e Perfil
- Registro com nome, email e nível de experiência
- Preferências personalizadas (caminhada, bike, long-course)
- Histórico completo de trilhas realizadas
- Estatísticas pessoais e badges de conquistas

#### 🗺️ Mapas & Geolocalização
- **Mapas offline** (essencial para áreas sem sinal)
- Traçado completo da trilha (GPX/KML)
- Indicador de posição atual em tempo real
- Porcentagem do percurso concluído
- Waypoints e pontos de interesse
- Informações de dificuldade, extensão e desnível

#### 🏞️ Catálogo de Trilhas de Goiás
- Trilhas principais da Chapada dos Veadeiros
- Caminho dos Veadeiros (500km integrados)
- Filtros por tipo, dificuldade e município
- Fotos, vídeos e descrições completas
- Pontos de apoio (pousadas, guias, abastecimento)
- Estado de manutenção e sinalização

#### 🚨 Segurança & Emergências
- **Botão SOS** que envia coordenadas para contatos
- Alertas de áreas sem sinal
- Informações sobre fauna local e riscos
- Plano de trilha compartilhável
- Precauções específicas do Cerrado

#### 👥 Comunidade
- Avaliações e comentários de trilhas
- Upload de fotos e relatos
- Fórum para compartilhar experiências
- Sistema de likes e interações
- Compartilhamento em redes sociais

### Para Administradores

- Painel de gerenciamento de trilhas
- Aprovação de avaliações
- Analytics de uso
- Monitoramento de emergências ativas

## 🛠️ Stack Tecnológica

### Backend
- **Node.js 20.x** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação segura
- **Socket.io** - Comunicação em tempo real
- **Bcrypt** - Hash de senhas
- **@we-gold/gpxjs** - Processamento de arquivos GPX

### Frontend
- **React 18** - Biblioteca UI
- **Vite** - Build tool moderna e rápida
- **React Router** - Navegação
- **Axios** - Cliente HTTP
- **React Leaflet** - Mapas interativos
- **Socket.io Client** - WebSocket
- **React Icons** - Ícones
- **@mapbox/togeojson** - Conversão GPX/KML

### Mapas
- **Mapbox** - Solução principal para offline
- **Google Maps API** - Integração adicional
- **Leaflet** - Visualização de trilhas
- **Turf.js** - Análise geoespacial

## 📦 Instalação

### Pré-requisitos

- Node.js 20.x ou superior
- MongoDB 6.0+ (local ou Atlas)
- npm ou yarn
- Git

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/trilhas-goias.git
cd trilhas-goias
```

### 2. Instalar Dependências do Backend

```bash
cd backend
npm install
```

### 3. Instalar Dependências do Frontend

```bash
cd ../frontend
npm install
```

## ⚙️ Configuração

### Backend

1. Crie um arquivo `.env` na pasta `backend/`:

```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/trilhas-goias

# JWT
JWT_SECRET=seu-secret-super-seguro-aqui
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=seu-refresh-secret-aqui
JWT_REFRESH_EXPIRE=30d

# Mapbox (obtenha em https://www.mapbox.com/)
MAPBOX_ACCESS_TOKEN=seu-token-mapbox

# Google Maps (obtenha em https://console.cloud.google.com/)
GOOGLE_MAPS_API_KEY=sua-chave-google-maps

# Twilio para SMS (opcional - para SOS)
TWILIO_ACCOUNT_SID=seu-twilio-sid
TWILIO_AUTH_TOKEN=seu-twilio-token
TWILIO_PHONE_NUMBER=+5562999999999
```

### Frontend

1. Crie um arquivo `.env` na pasta `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_MAPBOX_TOKEN=seu-token-mapbox
VITE_GOOGLE_MAPS_KEY=sua-chave-google-maps
```

### MongoDB

#### Opção 1: MongoDB Local

```bash
# Instalar MongoDB
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb-community

# Iniciar MongoDB
mongod
```

#### Opção 2: MongoDB Atlas (Cloud)

1. Crie uma conta em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster gratuito
3. Obtenha a connection string
4. Atualize `MONGODB_URI` no `.env`

## 🚀 Uso

### 1. Popular Banco de Dados

Antes de iniciar, popule o banco com as trilhas de Goiás:

```bash
cd backend
node src/utils/seedTrails.js
```

Você verá:
```
✅ Trilhas inseridas com sucesso!
📊 Total de trilhas: 10
```

### 2. Iniciar Backend

```bash
cd backend
npm run dev
```

O servidor estará rodando em `http://localhost:5000`

Você verá:
```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🏔️  API TRILHAS DE GOIÁS                           ║
║                                                       ║
║   🚀 Servidor rodando na porta 5000                  ║
║   🌍 Ambiente: development                           ║
║   📡 Socket.io ativo para comunicação em tempo real  ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

### 3. Iniciar Frontend

Em outro terminal:

```bash
cd frontend
npm run dev
```

O app estará disponível em `http://localhost:3000`

### 4. Acessar o Aplicativo

Abra seu navegador e acesse:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📡 API Endpoints

### Autenticação

```
POST   /api/auth/register      - Registrar novo usuário
POST   /api/auth/login          - Login
POST   /api/auth/refresh        - Renovar token
GET    /api/auth/me             - Dados do usuário atual
PUT    /api/auth/profile        - Atualizar perfil
```

### Trilhas

```
GET    /api/trails              - Listar trilhas (com filtros)
GET    /api/trails/:id          - Detalhes de uma trilha
GET    /api/trails/nearby       - Trilhas próximas (geolocalização)
GET    /api/trails/:id/stats    - Estatísticas da trilha
POST   /api/trails              - Criar trilha (admin)
PUT    /api/trails/:id          - Atualizar trilha (admin)
DELETE /api/trails/:id          - Deletar trilha (admin)
```

### Avaliações

```
GET    /api/reviews/trail/:id   - Avaliações de uma trilha
GET    /api/reviews/user        - Avaliações do usuário
POST   /api/reviews             - Criar avaliação
PUT    /api/reviews/:id         - Atualizar avaliação
DELETE /api/reviews/:id         - Deletar avaliação
POST   /api/reviews/:id/like    - Curtir avaliação
```

### Fórum

```
GET    /api/forum               - Listar posts (com filtros)
GET    /api/forum/:id           - Detalhes de um post
GET    /api/forum/user          - Posts do usuário
POST   /api/forum               - Criar post
PUT    /api/forum/:id           - Atualizar post
DELETE /api/forum/:id           - Deletar post
POST   /api/forum/:id/comment   - Adicionar comentário
POST   /api/forum/:id/like      - Curtir post
```

### Emergência

```
POST   /api/emergency/sos       - Criar alerta SOS
GET    /api/emergency/user      - Emergências do usuário
GET    /api/emergency/:id       - Detalhes de emergência
GET    /api/emergency/active    - Emergências ativas (admin)
PUT    /api/emergency/:id/resolve - Resolver emergência
PUT    /api/emergency/:id/cancel  - Cancelar emergência
```

## 📁 Estrutura do Projeto

```
trilhas-goias/
├── backend/                    # API Node.js/Express
│   ├── src/
│   │   ├── config/            # Configurações (DB, etc)
│   │   ├── controllers/       # Controladores da API
│   │   ├── models/            # Modelos MongoDB
│   │   ├── routes/            # Rotas da API
│   │   ├── middleware/        # Middlewares (auth, etc)
│   │   ├── services/          # Lógica de negócio
│   │   ├── utils/             # Utilitários e seeders
│   │   └── server.js          # Servidor principal
│   ├── .env.example           # Exemplo de variáveis de ambiente
│   └── package.json
│
├── frontend/                   # App React
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── pages/             # Páginas/Rotas
│   │   ├── services/          # APIs e serviços
│   │   ├── context/           # Context API (Auth, etc)
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Utilitários
│   │   ├── App.jsx            # Componente principal
│   │   └── main.jsx           # Entry point
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── TRILHAS_GOIAS_ECOSYSTEM.md # Documentação completa
└── README.md                   # Este arquivo
```

## 🗺️ Trilhas Incluídas (Seed Data)

O projeto já vem com 10 trilhas principais de Goiás:

1. **Sertão Zen** - 8.3km, Moderada (Caminho dos Veadeiros)
2. **Trilha dos Saltos** - 10km, Moderada
3. **Trilha dos Cânions** - 12km, Difícil
4. **Cachoeira Almécegas I e II** - 3km, Fácil
5. **Vale da Lua** - 1km, Fácil
6. **Cachoeira Santa Bárbara** - 4km, Moderada (Caminho dos Veadeiros)
7. **Mirante da Janela** - 2km, Moderada
8. **Cachoeira dos Cristais** - 2.5km, Fácil
9. **Travessia Leste** - 56km, Muito Difícil (Caminho dos Veadeiros)
10. **Cachoeira Loquinhas** - 1.5km, Fácil

## 🔑 Funcionalidades Principais

### ✅ Implementadas

- [x] Sistema de autenticação completo (JWT)
- [x] CRUD de usuários com perfis
- [x] CRUD de trilhas com geolocalização
- [x] Sistema de avaliações e comentários
- [x] Fórum comunitário
- [x] Sistema de emergência SOS
- [x] API REST completa
- [x] WebSocket para tempo real
- [x] Frontend React com rotas
- [x] Design responsivo
- [x] Seed data com trilhas de Goiás

### 🔄 Em Desenvolvimento

- [ ] Integração completa com Mapbox offline
- [ ] Download de mapas para uso offline
- [ ] GPS tracking em tempo real no mapa
- [ ] Upload de fotos e GPX
- [ ] Notificações push
- [ ] Sistema de pagamento (premium)
- [ ] Integração SMS (Twilio) para SOS
- [ ] Painel administrativo

## 🎨 Design System

### Cores

- **Primary**: #2E7D32 (Verde Cerrado)
- **Secondary**: #FF6F00 (Laranja Pôr do Sol)
- **Accent**: #0277BD (Azul Céu)
- **Danger**: #D32F2F (Vermelho SOS)

### Tipografia

- **Headings**: Montserrat (Bold)
- **Body**: Roboto (Regular)

## 🧪 Testes

### Testar API

```bash
# Health check
curl http://localhost:5000/health

# Registrar usuário
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "senha": "123456",
    "nivel_experiencia": "intermediario"
  }'

# Listar trilhas
curl http://localhost:5000/api/trails
```

## 📱 Uso do Aplicativo

### 1. Criar Conta

1. Acesse http://localhost:3000/register
2. Preencha seus dados
3. Escolha seu nível de experiência
4. Selecione suas preferências

### 2. Explorar Trilhas

1. Navegue para "Trilhas" no menu
2. Use os filtros para encontrar trilhas
3. Clique em uma trilha para ver detalhes

### 3. Iniciar uma Trilha

1. Na página de detalhes, clique em "Iniciar Trilha"
2. O mapa será carregado com sua posição
3. Siga o traçado da trilha
4. Use o botão SOS em caso de emergência

### 4. Avaliar Trilha

1. Após completar, adicione uma avaliação
2. Compartilhe fotos e dicas
3. Ajude outros trilheiros!

## 🔐 Segurança

### Implementações de Segurança

- ✅ Senhas com hash bcrypt (10 salt rounds)
- ✅ JWT com expiração configurável
- ✅ HTTPS recomendado em produção
- ✅ Rate limiting (100 req/15min)
- ✅ Helmet.js para headers de segurança
- ✅ CORS configurado
- ✅ Validação de inputs
- ✅ Sanitização de dados

### LGPD Compliance

- Dados de localização apenas durante trilha
- Opção de perfil privado
- Controle de compartilhamento
- Direito de exclusão de conta

## 🌍 Deploy

### Backend (Heroku/Railway/Render)

```bash
# Exemplo com Heroku
heroku create trilhas-goias-api
heroku addons:create mongolab
git push heroku main
```

### Frontend (Vercel/Netlify)

```bash
# Build de produção
cd frontend
npm run build

# Deploy automático com Vercel
vercel --prod
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Equipe Trilhas de Goiás** - Desenvolvimento inicial

## 🙏 Agradecimentos

- Secretaria de Turismo de Goiás
- ICMBio - Parque Nacional da Chapada dos Veadeiros
- Rede Nacional de Trilhas de Longo Curso
- Comunidade Kalunga
- Guias locais de Alto Paraíso e Cavalcante
- Todos os trilheiros que contribuem com avaliações

## 📞 Suporte

- **Email**: suporte@trilhasgoias.com.br
- **WhatsApp**: (62) 9XXXX-XXXX
- **Issues**: https://github.com/seu-usuario/trilhas-goias/issues

## 🗺️ Roadmap

### Versão 1.0 (MVP) - ✅ Concluído
- Sistema de autenticação
- Catálogo de trilhas
- Avaliações e fórum
- Sistema SOS básico

### Versão 1.1 - 🔄 Em Progresso
- Mapas offline completos
- GPS tracking avançado
- Upload de fotos
- Notificações

### Versão 2.0 - 📅 Planejado
- App mobile nativo (React Native)
- Integração com wearables
- Gamificação completa
- Marketplace de guias

---

**Desenvolvido com ❤️ para os trilheiros de Goiás**

🏔️ **Explore o Cerrado. Respeite a Natureza. Compartilhe Experiências.**