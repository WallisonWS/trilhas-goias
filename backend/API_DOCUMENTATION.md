# 📡 API Trilhas de Goiás - Documentação Completa

## Base URL

```
http://localhost:5000/api
```

## Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Após o login, inclua o token no header:

```
Authorization: Bearer {seu-token-jwt}
```

---

## 🔐 Autenticação

### Registrar Usuário

**POST** `/auth/register`

**Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123",
  "nivel_experiencia": "intermediario",
  "preferencias": {
    "tipos": ["caminhada", "bike"]
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "nome": "João Silva",
      "email": "joao@example.com",
      "nivel_experiencia": "intermediario",
      "foto_perfil": "https://via.placeholder.com/150"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login

**POST** `/auth/login`

**Body:**
```json
{
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "nome": "João Silva",
      "email": "joao@example.com",
      "nivel_experiencia": "intermediario",
      "foto_perfil": "https://via.placeholder.com/150",
      "is_premium": false,
      "estatisticas": {
        "total_trilhas": 5,
        "total_km": 42.5,
        "total_horas": 18.5,
        "nivel_atual": "Intermediário"
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Obter Usuário Atual

**GET** `/auth/me`

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "nome": "João Silva",
    "email": "joao@example.com",
    "nivel_experiencia": "intermediario",
    "preferencias": {
      "tipos": ["caminhada", "bike"]
    },
    "estatisticas": {
      "total_trilhas": 5,
      "total_km": 42.5,
      "total_horas": 18.5,
      "nivel_atual": "Intermediário"
    },
    "historico_trilhas": [],
    "contatos_emergencia": []
  }
}
```

### Atualizar Perfil

**PUT** `/auth/profile`

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "nome": "João Silva Santos",
  "nivel_experiencia": "avancado",
  "contatos_emergencia": [
    {
      "nome": "Maria Silva",
      "telefone": "+5562999999999",
      "relacao": "Esposa"
    }
  ]
}
```

---

## 🏔️ Trilhas

### Listar Trilhas

**GET** `/trails`

**Query Parameters:**
- `tipo` - Filtrar por tipo (pedestre, ciclismo, mista)
- `dificuldade` - Filtrar por dificuldade (facil, moderada, dificil, muito_dificil)
- `municipio` - Filtrar por município
- `caminho_veadeiros` - true/false
- `disponivel_offline` - true/false
- `search` - Busca textual
- `sort` - Ordenação (ex: -popularidade, extensao_km)
- `page` - Página (default: 1)
- `limit` - Itens por página (default: 20)

**Example:**
```
GET /trails?dificuldade=moderada&tipo=pedestre&page=1&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "nome": "Sertão Zen",
      "descricao": "Uma das trilhas mais icônicas...",
      "localizacao": {
        "municipio": "Alto Paraíso de Goiás",
        "estado": "GO",
        "coordenadas": {
          "type": "Point",
          "coordinates": [-47.5186, -14.1318]
        },
        "regiao": "Chapada dos Veadeiros"
      },
      "tipo": "pedestre",
      "dificuldade": "moderada",
      "extensao_km": 8.3,
      "tempo_estimado_horas": 6,
      "fotos": ["url1", "url2"],
      "estatisticas": {
        "total_avaliacoes": 45,
        "media_avaliacoes": 4.8,
        "total_conclusoes": 120
      },
      "caminho_veadeiros": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 10,
    "pages": 1
  }
}
```

### Obter Trilha por ID

**GET** `/trails/:id`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "nome": "Sertão Zen",
    "descricao": "Uma das trilhas mais icônicas do Parque Nacional...",
    "localizacao": {
      "municipio": "Alto Paraíso de Goiás",
      "estado": "GO",
      "coordenadas": {
        "type": "Point",
        "coordinates": [-47.5186, -14.1318]
      },
      "regiao": "Chapada dos Veadeiros"
    },
    "tipo": "pedestre",
    "dificuldade": "moderada",
    "extensao_km": 8.3,
    "desnivel_metros": 300,
    "tempo_estimado_horas": 6,
    "gpx_data": {
      "waypoints": [],
      "track": [],
      "arquivo_gpx": "url-do-arquivo"
    },
    "pontos_apoio": [
      {
        "tipo": "guia",
        "nome": "Guias Locais Alto Paraíso",
        "contato": "(62) 99999-0001",
        "coordenadas": {
          "type": "Point",
          "coordinates": [-47.5186, -14.1318]
        }
      }
    ],
    "seguranca": {
      "nivel_sinal": "sem_sinal",
      "areas_sem_cobertura": ["Todo o percurso"],
      "fauna_local": ["Lobo-guará", "Tamanduá-bandeira"],
      "riscos": ["Sol forte", "Desidratação"],
      "precaucoes": ["Levar água suficiente (3L mínimo)"]
    },
    "fotos": ["url1", "url2"],
    "estatisticas": {
      "total_avaliacoes": 45,
      "media_avaliacoes": 4.8,
      "total_conclusoes": 120,
      "popularidade": 95
    }
  }
}
```

### Trilhas Próximas

**GET** `/trails/nearby`

**Query Parameters:**
- `longitude` - Longitude (obrigatório)
- `latitude` - Latitude (obrigatório)
- `maxDistance` - Distância máxima em metros (default: 50000)

**Example:**
```
GET /trails/nearby?longitude=-47.5186&latitude=-14.1318&maxDistance=30000
```

---

## ⭐ Avaliações

### Listar Avaliações de uma Trilha

**GET** `/reviews/trail/:trailId`

**Query Parameters:**
- `page` - Página (default: 1)
- `limit` - Itens por página (default: 10)
- `sort` - Ordenação (default: -createdAt)

### Criar Avaliação

**POST** `/reviews`

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "trilha_id": "507f1f77bcf86cd799439011",
  "avaliacao": 5,
  "comentario": "Trilha incrível! Paisagens deslumbrantes.",
  "fotos": ["url1", "url2"],
  "experiencia": {
    "data_trilha": "2025-10-15",
    "tempo_percurso": 360,
    "dificuldade_percebida": "moderada",
    "condicoes_trilha": "Boa",
    "clima": "Ensolarado"
  },
  "dicas": "Leve bastante água e comece cedo",
  "recomenda": true
}
```

---

## 💬 Fórum

### Listar Posts

**GET** `/forum`

**Query Parameters:**
- `tipo` - Filtrar por tipo (dica, relato, pergunta, alerta)
- `trilha_id` - Filtrar por trilha
- `tags` - Filtrar por tags (separadas por vírgula)
- `search` - Busca textual
- `page` - Página
- `limit` - Itens por página

### Criar Post

**POST** `/forum`

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "titulo": "Dicas para o Sertão Zen",
  "conteudo": "Fiz a trilha ontem e tenho algumas dicas...",
  "tipo": "dica",
  "trilha_id": "507f1f77bcf86cd799439011",
  "fotos": ["url1"],
  "tags": ["dicas", "sertao-zen", "agua"]
}
```

### Adicionar Comentário

**POST** `/forum/:id/comment`

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "texto": "Ótimas dicas! Obrigado por compartilhar."
}
```

---

## 🚨 Emergência

### Criar Alerta SOS

**POST** `/emergency/sos`

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "tipo": "perdido",
  "localizacao": {
    "type": "Point",
    "coordinates": [-47.5186, -14.1318]
  },
  "mensagem": "Perdi o caminho na trilha",
  "trilha_id": "507f1f77bcf86cd799439011"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "usuario_id": {
      "nome": "João Silva",
      "email": "joao@example.com"
    },
    "tipo": "perdido",
    "status": "ativo",
    "localizacao": {
      "type": "Point",
      "coordinates": [-47.5186, -14.1318]
    },
    "contatos_notificados": [
      {
        "nome": "Maria Silva",
        "telefone": "+5562999999999",
        "status_notificacao": "enviado"
      }
    ],
    "createdAt": "2025-10-21T10:30:00.000Z"
  },
  "message": "SOS ativado! Contatos de emergência foram notificados."
}
```

### Resolver Emergência

**PUT** `/emergency/:id/resolve`

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "notas": "Encontrei o caminho e estou bem"
}
```

---

## 🔌 WebSocket Events

### Conexão

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('Conectado!');
});
```

### Eventos Disponíveis

#### Entrar em uma Trilha
```javascript
socket.emit('join-trail', trailId);
```

#### Atualizar Posição GPS
```javascript
socket.emit('gps-update', {
  userId: 'user-id',
  trailId: 'trail-id',
  position: {
    latitude: -14.1318,
    longitude: -47.5186,
    altitude: 1200
  }
});
```

#### Alerta SOS
```javascript
socket.emit('sos-alert', {
  userId: 'user-id',
  trailId: 'trail-id',
  position: {
    latitude: -14.1318,
    longitude: -47.5186
  },
  message: 'Preciso de ajuda'
});
```

#### Receber Posição de Outros Usuários
```javascript
socket.on('user-position', (data) => {
  console.log('Usuário:', data.userId);
  console.log('Posição:', data.position);
});
```

#### Receber Alertas SOS
```javascript
socket.on('sos-broadcast', (data) => {
  console.log('🚨 SOS ALERT:', data);
  // Mostrar notificação de emergência
});
```

---

## 📊 Códigos de Status

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔄 Rate Limiting

A API tem rate limiting de **100 requisições por 15 minutos** por IP.

Se exceder, receberá:

```json
{
  "success": false,
  "message": "Muitas requisições deste IP, tente novamente mais tarde."
}
```

---

## 🧪 Exemplos de Uso

### JavaScript/Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Login
const login = async () => {
  const response = await api.post('/auth/login', {
    email: 'joao@example.com',
    senha: 'senha123'
  });
  
  const token = response.data.data.token;
  
  // Configurar token para próximas requisições
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Buscar trilhas
const getTrails = async () => {
  const response = await api.get('/trails', {
    params: {
      dificuldade: 'moderada',
      limit: 10
    }
  });
  
  console.log(response.data.data);
};
```

### cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@example.com","senha":"senha123"}'

# Buscar trilhas (com token)
curl http://localhost:5000/api/trails \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Criar avaliação
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "trilha_id": "507f1f77bcf86cd799439011",
    "avaliacao": 5,
    "comentario": "Trilha incrível!",
    "experiencia": {
      "data_trilha": "2025-10-15",
      "tempo_percurso": 360
    }
  }'
```

---

## 🗺️ Dados Geoespaciais

### Formato de Coordenadas

MongoDB usa o formato GeoJSON para dados geoespaciais:

```json
{
  "type": "Point",
  "coordinates": [longitude, latitude]
}
```

**⚠️ IMPORTANTE:** A ordem é `[longitude, latitude]`, não `[latitude, longitude]`!

### Exemplo de Busca Geoespacial

```javascript
// Trilhas em um raio de 50km
const nearbyTrails = await Trail.find({
  'localizacao.coordenadas': {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [-47.5186, -14.1318]
      },
      $maxDistance: 50000 // metros
    }
  }
});
```

---

## 🔍 Filtros e Busca

### Busca Textual

A API suporta busca textual em trilhas e posts do fórum:

```
GET /trails?search=cachoeira
GET /forum?search=dicas sertão zen
```

### Filtros Combinados

```
GET /trails?tipo=pedestre&dificuldade=moderada&municipio=Alto Paraíso de Goiás
```

### Ordenação

```
GET /trails?sort=-estatisticas.popularidade  # Mais populares primeiro
GET /trails?sort=extensao_km                 # Mais curtas primeiro
GET /trails?sort=-extensao_km                # Mais longas primeiro
```

---

## 📝 Validações

### Usuário

- **nome**: Obrigatório, string
- **email**: Obrigatório, único, formato válido
- **senha**: Obrigatório, mínimo 6 caracteres
- **nivel_experiencia**: Enum [iniciante, intermediario, avancado]

### Trilha

- **nome**: Obrigatório
- **descricao**: Obrigatório
- **localizacao.coordenadas**: Obrigatório, formato GeoJSON
- **tipo**: Enum [pedestre, ciclismo, mista]
- **dificuldade**: Enum [facil, moderada, dificil, muito_dificil]
- **extensao_km**: Obrigatório, número positivo
- **tempo_estimado_horas**: Obrigatório, número positivo

### Avaliação

- **trilha_id**: Obrigatório, ObjectId válido
- **avaliacao**: Obrigatório, número entre 1 e 5
- **comentario**: Obrigatório, máximo 1000 caracteres
- **experiencia.data_trilha**: Obrigatório, data válida

---

## 🚨 Tratamento de Erros

Todos os erros seguem o formato:

```json
{
  "success": false,
  "message": "Descrição do erro",
  "error": "Detalhes técnicos (apenas em development)"
}
```

### Exemplos de Erros Comuns

**Email já cadastrado:**
```json
{
  "success": false,
  "message": "Email já cadastrado"
}
```

**Token inválido:**
```json
{
  "success": false,
  "message": "Token inválido ou expirado"
}
```

**Trilha não encontrada:**
```json
{
  "success": false,
  "message": "Trilha não encontrada"
}
```

---

## 🔧 Configurações Avançadas

### Variáveis de Ambiente

```env
# Servidor
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/trilhas-goias

# JWT
JWT_SECRET=super-secret-key-change-in-production
JWT_EXPIRE=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutos
RATE_LIMIT_MAX=100           # 100 requisições

# File Upload
MAX_FILE_SIZE=10485760       # 10MB
UPLOAD_PATH=./uploads

# CORS
FRONTEND_URL=https://trilhasgoias.com.br
```

---

**Documentação da API v1.0**
**Última atualização**: 21 de Outubro de 2025