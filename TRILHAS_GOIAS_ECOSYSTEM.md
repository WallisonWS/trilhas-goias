# 🏔️ Trilhas de Goiás - Ecossistema Completo

## 📋 Visão Geral do Projeto

Aplicativo mobile completo para trilhas em Goiás com funcionalidade offline, integração com Google Maps, fórum comunitário e sistema de emergência SOS.

---

## 🎯 Stack Tecnológica Definida

### Frontend Mobile
- **React Native** - Framework principal para iOS e Android
- **Expo** - Toolchain para desenvolvimento rápido
- **React Navigation** - Navegação entre telas
- **React Native Maps** - Integração com mapas
- **@mapbox/togeojson** - Processamento de GPX/KML
- **AsyncStorage** - Armazenamento local offline
- **React Native Geolocation** - GPS em tempo real
- **React Native FS** - Sistema de arquivos para mapas offline

### Backend
- **Node.js 20.x** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL (flexível para trilhas)
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **Multer** - Upload de fotos
- **Socket.io** - Comunicações em tempo real (SOS)
- **@we-gold/gpxjs** - Processamento GPX no backend

### Mapas & Geolocalização
- **Mapbox** - Solução principal para mapas offline (melhor que Google Maps para offline)
- **Google Maps API** - Backup e integração adicional
- **Leaflet** - Visualização de trilhas GPX
- **Turf.js** - Análise geoespacial

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                     MOBILE APP (React Native)                │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Login/  │  │  Mapa    │  │  Trilhas │  │  Perfil  │   │
│  │ Cadastro │  │ Offline  │  │ Catálogo │  │  Usuário │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Fórum   │  │   GPS    │  │   SOS    │  │Avaliações│   │
│  │Comunidade│  │ Tracking │  │Emergência│  │  & Fotos │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ REST API / WebSocket
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js/Express)                 │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │  Trilhas │  │  Fórum   │  │   SOS    │   │
│  │   API    │  │   API    │  │   API    │  │   API    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Usuários │  │Avaliações│  │  Upload  │  │   GPX    │   │
│  │   API    │  │   API    │  │   API    │  │ Processor│   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB)                        │
├─────────────────────────────────────────────────────────────┤
│  Users │ Trails │ Reviews │ Forum │ SOS │ Photos │ GPX     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Estrutura de Dados

### 1. Usuário (User)
```javascript
{
  _id: ObjectId,
  nome: String,
  email: String (unique),
  senha: String (hashed),
  nivel_experiencia: Enum['iniciante', 'intermediario', 'avancado'],
  preferencias: {
    tipos: ['caminhada', 'bike', 'long-course'],
    dificuldade_preferida: String
  },
  historico_trilhas: [{
    trilha_id: ObjectId,
    data: Date,
    tempo_percurso: Number,
    distancia_percorrida: Number,
    avaliacao: Number
  }],
  estatisticas: {
    total_trilhas: Number,
    total_km: Number,
    total_horas: Number,
    nivel_atual: String
  },
  foto_perfil: String (URL),
  contatos_emergencia: [{
    nome: String,
    telefone: String,
    relacao: String
  }],
  created_at: Date,
  updated_at: Date
}
```

### 2. Trilha (Trail)
```javascript
{
  _id: ObjectId,
  nome: String,
  descricao: String,
  localizacao: {
    municipio: String,
    estado: 'GO',
    coordenadas: {
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    regiao: String // Ex: "Chapada dos Veadeiros"
  },
  tipo: Enum['pedestre', 'ciclismo', 'mista'],
  dificuldade: Enum['facil', 'moderada', 'dificil', 'muito_dificil'],
  extensao_km: Number,
  desnivel_metros: Number,
  tempo_estimado_horas: Number,
  
  // Dados GPX/KML
  gpx_data: {
    waypoints: [{
      lat: Number,
      lon: Number,
      ele: Number,
      name: String,
      desc: String
    }],
    track: [{
      lat: Number,
      lon: Number,
      ele: Number,
      time: Date
    }],
    arquivo_gpx: String (URL)
  },
  
  // Informações específicas de Goiás
  bioma: 'Cerrado',
  clima: {
    melhor_epoca: String,
    temperatura_media: String,
    precipitacao: String
  },
  
  // Pontos de apoio
  pontos_apoio: [{
    tipo: Enum['pousada', 'guia', 'abastecimento', 'primeiros_socorros'],
    nome: String,
    contato: String,
    coordenadas: {
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    descricao: String
  }],
  
  // Segurança
  seguranca: {
    nivel_sinal: Enum['bom', 'fraco', 'sem_sinal'],
    areas_sem_cobertura: [String],
    fauna_local: [String],
    riscos: [String],
    precaucoes: [String]
  },
  
  // Infraestrutura
  infraestrutura: {
    sinalizacao: Enum['excelente', 'boa', 'regular', 'precaria'],
    manutencao: Enum['recente', 'regular', 'necessaria'],
    acessibilidade: String
  },
  
  // Mídia
  fotos: [String], // URLs
  videos: [String], // URLs
  
  // Estatísticas
  estatisticas: {
    total_avaliacoes: Number,
    media_avaliacoes: Number,
    total_conclusoes: Number,
    popularidade: Number
  },
  
  // Parte do Caminho dos Veadeiros?
  caminho_veadeiros: Boolean,
  setor_caminho: String,
  
  created_at: Date,
  updated_at: Date
}
```

### 3. Avaliação (Review)
```javascript
{
  _id: ObjectId,
  usuario_id: ObjectId,
  trilha_id: ObjectId,
  avaliacao: Number (1-5),
  comentario: String,
  fotos: [String],
  
  experiencia: {
    data_trilha: Date,
    tempo_percurso: Number,
    dificuldade_percebida: String,
    condicoes_trilha: String,
    clima: String
  },
  
  dicas: String,
  recomenda: Boolean,
  
  likes: Number,
  
  created_at: Date,
  updated_at: Date
}
```

### 4. Post do Fórum (ForumPost)
```javascript
{
  _id: ObjectId,
  usuario_id: ObjectId,
  trilha_id: ObjectId (opcional),
  titulo: String,
  conteudo: String,
  tipo: Enum['dica', 'relato', 'pergunta', 'alerta'],
  
  fotos: [String],
  gpx_compartilhado: String (URL),
  
  tags: [String],
  
  comentarios: [{
    usuario_id: ObjectId,
    texto: String,
    created_at: Date
  }],
  
  likes: Number,
  visualizacoes: Number,
  
  created_at: Date,
  updated_at: Date
}
```

### 5. Emergência SOS (Emergency)
```javascript
{
  _id: ObjectId,
  usuario_id: ObjectId,
  trilha_id: ObjectId,
  
  status: Enum['ativo', 'resolvido', 'cancelado'],
  tipo: Enum['perigo', 'acidente', 'perdido', 'ajuda'],
  
  localizacao: {
    type: 'Point',
    coordinates: [longitude, latitude]
  },
  
  mensagem: String,
  
  contatos_notificados: [{
    nome: String,
    telefone: String,
    notificado_em: Date
  }],
  
  created_at: Date,
  resolvido_em: Date
}
```

---

## 🗺️ Sistema de Mapas Offline

### Estratégia de Implementação

1. **Mapbox como Solução Principal**
   - Suporte robusto para offline
   - Download de tiles por região
   - Melhor performance que Google Maps offline

2. **Processo de Download**
   ```javascript
   // Usuário seleciona trilha
   // App calcula área necessária (trilha + buffer de 5km)
   // Download de tiles do Mapbox
   // Armazenamento local com AsyncStorage/FileSystem
   // Índice de mapas baixados
   ```

3. **Sincronização**
   - Download automático quando conectado ao WiFi
   - Atualização periódica de mapas (30 dias)
   - Gerenciamento de espaço (limite configurável)

4. **Fallback**
   - Se offline e mapa não baixado: mostrar apenas trilha GPX
   - Modo "somente GPS" com coordenadas

---

## 🔐 Sistema de Autenticação

### Fluxo de Autenticação
```
1. Cadastro → Email + Senha + Dados Perfil
2. Validação → Email único, senha forte
3. Token JWT → Gerado com expiração de 7 dias
4. Refresh Token → Para renovação automática
5. Armazenamento → AsyncStorage (token local)
```

### Endpoints de Auth
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me
PUT  /api/auth/profile
```

---

## 📱 Telas Principais

### 1. Login/Cadastro
- Formulário de login
- Cadastro com nível de experiência
- Recuperação de senha
- Login social (opcional)

### 2. Home/Dashboard
- Trilhas próximas
- Trilhas recomendadas
- Estatísticas pessoais
- Acesso rápido ao mapa

### 3. Catálogo de Trilhas
- Lista com filtros:
  - Dificuldade
  - Tipo (caminhada/bike)
  - Distância
  - Município
  - Disponibilidade offline
- Busca por nome
- Ordenação (popularidade, distância, avaliação)

### 4. Detalhes da Trilha
- Informações completas
- Mapa com traçado
- Fotos e vídeos
- Avaliações
- Pontos de apoio
- Botão "Baixar Mapa Offline"
- Botão "Iniciar Trilha"

### 5. Mapa em Tempo Real
- Posição atual GPS
- Traçado da trilha
- Waypoints
- Porcentagem concluída
- Distância percorrida
- Tempo decorrido
- Botão SOS (destaque)

### 6. Perfil do Usuário
- Foto e dados
- Estatísticas
- Histórico de trilhas
- Conquistas/badges
- Configurações

### 7. Fórum
- Feed de posts
- Criar novo post
- Comentários
- Compartilhar trilha/GPX
- Filtros por tipo

### 8. SOS/Emergência
- Botão grande vermelho
- Envio automático de coordenadas
- Lista de contatos de emergência
- Histórico de alertas

---

## 🚨 Sistema de Emergência SOS

### Funcionalidades
1. **Botão SOS Acessível**
   - Sempre visível durante trilha
   - Confirmação antes de ativar
   - Cores de alerta (vermelho)

2. **Ações Automáticas**
   - Captura coordenadas GPS
   - Envia SMS para contatos de emergência
   - Registra no backend
   - Notificação push para contatos (se app instalado)

3. **Informações Enviadas**
   - Localização exata (lat/lon)
   - Nome da trilha
   - Nome do usuário
   - Horário do alerta
   - Link do Google Maps

4. **Plano de Trilha**
   - Usuário pode registrar antes de sair
   - Horário previsto de retorno
   - Alerta automático se não retornar

---

## 📍 Trilhas Principais de Goiás (Dados Iniciais)

### Caminho dos Veadeiros
- **Extensão**: ~500km
- **Municípios**: Formosa, Alto Paraíso, Cavalcante, São João d'Aliança
- **Tipo**: Caminhada e Cicloturismo
- **Setores**: 4 principais
- **Destaque**: Sertão Zen (8,3km)

### Parque Nacional Chapada dos Veadeiros
1. **Trilha dos Saltos** (10km)
2. **Trilha dos Cânions** (12km)
3. **Trilha das Corredeiras** (800m)
4. **Sertão Zen** (8,3km)

### Outras Trilhas Importantes
- Cachoeira Almécegas (Alto Paraíso)
- Vale da Lua (Alto Paraíso)
- Cachoeira Santa Bárbara (Cavalcante)
- Cachoeira dos Cristais (Alto Paraíso)
- Mirante da Janela (Alto Paraíso)

---

## 💰 Modelo de Monetização

### Versão Gratuita
- Acesso a trilhas básicas
- Mapas offline limitados (3 trilhas)
- Fórum completo
- SOS básico

### Versão Premium (R$ 19,90/mês)
- Todas as trilhas
- Mapas offline ilimitados
- Estatísticas avançadas
- Sem anúncios
- Prioridade no suporte
- Trilhas exclusivas

### Parcerias Locais
- Comissão de guias contratados
- Comissão de pousadas reservadas
- Anúncios de serviços locais

---

## 🔧 Requisitos Técnicos

### Mobile
- Android 8.0+ (API 26+)
- iOS 12.0+
- 100MB espaço mínimo
- GPS obrigatório
- Câmera (opcional, para fotos)

### Backend
- Node.js 20.x
- MongoDB 6.0+
- 2GB RAM mínimo
- SSL/HTTPS obrigatório

---

## 📦 Estrutura de Pastas do Projeto

```
trilhas-goias/
├── mobile/                 # App React Native
│   ├── src/
│   │   ├── screens/       # Telas
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── navigation/    # Navegação
│   │   ├── services/      # APIs e serviços
│   │   ├── utils/         # Utilitários
│   │   ├── hooks/         # Custom hooks
│   │   ├── context/       # Context API
│   │   └── assets/        # Imagens, fontes
│   ├── android/
│   ├── ios/
│   └── package.json
│
├── backend/               # API Node.js
│   ├── src/
│   │   ├── controllers/   # Controladores
│   │   ├── models/        # Modelos MongoDB
│   │   ├── routes/        # Rotas da API
│   │   ├── middleware/    # Middlewares
│   │   ├── services/      # Lógica de negócio
│   │   ├── utils/         # Utilitários
│   │   └── config/        # Configurações
│   ├── tests/
│   └── package.json
│
├── docs/                  # Documentação
└── README.md
```

---

## 🚀 Roadmap de Desenvolvimento

### MVP (Fase 1 - 2 meses)
- ✅ Autenticação básica
- ✅ Catálogo com 10-20 trilhas
- ✅ Visualização de trilha com mapa
- ✅ GPS tracking básico
- ✅ Mapas offline (Mapbox)
- ✅ Sistema SOS
- ✅ Avaliações e fotos

### Fase 2 (1 mês)
- Fórum completo
- Estatísticas avançadas
- Gamificação (badges)
- Notificações push
- Compartilhamento social

### Fase 3 (1 mês)
- Versão premium
- Integração com guias locais
- Sistema de reservas
- Modo offline completo
- Otimizações de performance

---

## 🎨 Design System

### Cores Principais
- **Primary**: #2E7D32 (Verde Cerrado)
- **Secondary**: #FF6F00 (Laranja Pôr do Sol)
- **Accent**: #0277BD (Azul Céu)
- **Danger**: #D32F2F (Vermelho SOS)
- **Background**: #FAFAFA
- **Text**: #212121

### Tipografia
- **Headings**: Montserrat Bold
- **Body**: Roboto Regular
- **Buttons**: Roboto Medium

---

## 📈 Métricas de Sucesso

### KPIs
- Número de usuários ativos
- Trilhas completadas
- Mapas baixados
- Avaliações postadas
- Taxa de conversão premium
- Tempo médio no app
- NPS (Net Promoter Score)

---

## 🔒 Segurança e Privacidade

### Medidas de Segurança
- Senhas com bcrypt (salt rounds: 10)
- JWT com expiração
- HTTPS obrigatório
- Rate limiting nas APIs
- Validação de inputs
- Sanitização de dados

### Privacidade
- LGPD compliance
- Dados de localização apenas durante trilha
- Opção de perfil privado
- Controle de compartilhamento
- Exclusão de conta

---

## 📞 Suporte e Comunidade

### Canais de Suporte
- Email: suporte@trilhasgoias.com.br
- WhatsApp: (62) 9XXXX-XXXX
- FAQ no app
- Fórum da comunidade

### Parcerias Estratégicas
- Secretaria de Turismo de Goiás
- ICMBio (Parques Nacionais)
- Guias locais certificados
- Pousadas e hotéis
- Lojas de equipamentos

---

## 🌟 Diferenciais Competitivos

1. **Foco em Goiás**: Especialização regional
2. **Offline First**: Funciona sem internet
3. **Caminho dos Veadeiros**: Trilha nacional integrada
4. **Comunidade Local**: Fórum e compartilhamento
5. **Segurança**: Sistema SOS robusto
6. **Dados Locais**: Informações específicas do Cerrado

---

## 📝 Próximos Passos

1. ✅ Pesquisa e planejamento concluídos
2. 🔄 Configurar ambiente de desenvolvimento
3. 🔄 Criar estrutura do backend
4. 🔄 Implementar autenticação
5. 🔄 Desenvolver APIs principais
6. 🔄 Criar app mobile
7. 🔄 Integrar mapas offline
8. 🔄 Popular banco de dados
9. 🔄 Testes e ajustes
10. 🔄 Deploy e lançamento

---

**Documento criado em**: 21 de Outubro de 2025
**Versão**: 1.0
**Status**: Em Desenvolvimento