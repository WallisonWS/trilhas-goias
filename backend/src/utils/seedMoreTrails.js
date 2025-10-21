import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Trail from '../models/Trail.js';
import connectDB from '../config/database.js';

dotenv.config();

const maisTrillhasGoias = [
  {
    nome: "Cachoeira do Segredo",
    descricao: "Cachoeira escondida com águas cristalinas e piscina natural profunda. Trilha moderada através de mata fechada com travessia de rio. Uma das cachoeiras mais bonitas e menos conhecidas da região.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5345, -14.1123]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "moderada",
    extensao_km: 5.5,
    desnivel_metros: 250,
    tempo_estimado_horas: 3.5,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Maio a Setembro",
      temperatura_media: "20-26°C",
      precipitacao: "Baixa"
    },
    pontos_apoio: [
      {
        tipo: "guia",
        nome: "Guias Cachoeira do Segredo",
        contato: "(62) 99888-5544",
        coordenadas: {
          type: "Point",
          coordinates: [-47.5345, -14.1123]
        },
        descricao: "Guias locais especializados"
      }
    ],
    seguranca: {
      nivel_sinal: "sem_sinal",
      areas_sem_cobertura: ["Todo o percurso"],
      fauna_local: ["Macacos", "Tucanos", "Cobras"],
      riscos: ["Travessia de rio", "Pedras escorregadias", "Mata fechada"],
      precaucoes: ["Guia recomendado", "Calçado impermeável", "Repelente"]
    },
    infraestrutura: {
      sinalizacao: "regular",
      manutencao: "regular",
      acessibilidade: "Requer experiência"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Cachoeira dos Anjos",
    descricao: "Complexo de 7 cachoeiras em sequência, cada uma mais bonita que a outra. Trilha longa mas recompensadora com várias piscinas naturais para banho. Ideal para passar o dia todo.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5678, -14.1890]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "dificil",
    extensao_km: 16,
    desnivel_metros: 600,
    tempo_estimado_horas: 8,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Dezembro a Março (cachoeiras mais volumosas)",
      temperatura_media: "22-30°C",
      precipitacao: "Alta no verão"
    },
    seguranca: {
      nivel_sinal: "fraco",
      areas_sem_cobertura: ["Maior parte da trilha"],
      fauna_local: ["Aves", "Capivaras", "Lagartos"],
      riscos: ["Trilha longa", "Exposição ao sol", "Cansaço"],
      precaucoes: ["Começar muito cedo", "Levar muita água e comida", "Condicionamento físico"]
    },
    infraestrutura: {
      sinalizacao: "regular",
      manutencao: "necessaria",
      acessibilidade: "Para experientes"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Morro da Baleia",
    descricao: "Formação rochosa que lembra uma baleia. Vista 360° espetacular da Chapada. Pôr do sol incrível! Trilha curta mas com subida íngreme. Um dos mirantes mais fotogênicos da região.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5234, -14.1789]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "moderada",
    extensao_km: 3,
    desnivel_metros: 200,
    tempo_estimado_horas: 2,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Ano todo",
      temperatura_media: "20-28°C",
      precipitacao: "Variável"
    },
    seguranca: {
      nivel_sinal: "bom",
      areas_sem_cobertura: [],
      fauna_local: ["Aves de rapina", "Lagartos"],
      riscos: ["Vento forte no topo", "Exposição"],
      precaucoes: ["Ir no final da tarde", "Levar lanterna"]
    },
    infraestrutura: {
      sinalizacao: "boa",
      manutencao: "regular",
      acessibilidade: "Subida íngreme"
    },
    fotos: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Cachoeira do Label",
    descricao: "Cachoeira com queda de 80m em paredão de pedra. Piscina natural grande e profunda. Trilha fácil e bem sinalizada. Ótima para iniciantes e famílias.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5456, -14.1345]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "facil",
    extensao_km: 2,
    desnivel_metros: 80,
    tempo_estimado_horas: 1.5,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Ano todo",
      temperatura_media: "22-30°C",
      precipitacao: "Moderada"
    },
    pontos_apoio: [
      {
        tipo: "abastecimento",
        nome: "Recepção Label",
        contato: "(62) 3446-7788",
        coordenadas: {
          type: "Point",
          coordinates: [-47.5456, -14.1345]
        },
        descricao: "Entrada com estacionamento e lanchonete"
      }
    ],
    seguranca: {
      nivel_sinal: "bom",
      areas_sem_cobertura: [],
      fauna_local: ["Peixes", "Aves"],
      riscos: ["Mínimos"],
      precaucoes: ["Protetor solar"]
    },
    infraestrutura: {
      sinalizacao: "excelente",
      manutencao: "recente",
      acessibilidade: "Excelente para todos"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Cachoeira Raizama",
    descricao: "Cachoeira com 20m de queda em meio a jardim de pedras. Várias piscinas naturais rasas perfeitas para relaxar. Trilha curta e fácil, ideal para todas as idades.",
    localizacao: {
      municipio: "São Jorge",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.7890, -14.0987]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "facil",
    extensao_km: 1.8,
    desnivel_metros: 60,
    tempo_estimado_horas: 1.5,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Ano todo",
      temperatura_media: "22-30°C",
      precipitacao: "Moderada"
    },
    seguranca: {
      nivel_sinal: "bom",
      areas_sem_cobertura: [],
      fauna_local: ["Peixes pequenos", "Borboletas"],
      riscos: ["Mínimos"],
      precaucoes: ["Protetor solar biodegradável"]
    },
    infraestrutura: {
      sinalizacao: "excelente",
      manutencao: "recente",
      acessibilidade: "Perfeita para famílias"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Cachoeira São Bento",
    descricao: "Cachoeira com 30m de queda em paredão vertical. Piscina natural grande e profunda. Trilha moderada com paisagens lindas do cerrado. Muito popular entre locais.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5123, -14.1456]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "moderada",
    extensao_km: 4.5,
    desnivel_metros: 180,
    tempo_estimado_horas: 2.5,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Ano todo",
      temperatura_media: "22-28°C",
      precipitacao: "Moderada"
    },
    seguranca: {
      nivel_sinal: "bom",
      areas_sem_cobertura: [],
      fauna_local: ["Aves", "Peixes"],
      riscos: ["Pedras molhadas"],
      precaucoes: ["Calçado adequado"]
    },
    infraestrutura: {
      sinalizacao: "boa",
      manutencao: "regular",
      acessibilidade: "Boa"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Poço Encantado",
    descricao: "Poço natural com águas azul-turquesa cristalinas. Formação rochosa única com caverna subaquática. Trilha super fácil, perfeita para relaxar e nadar.",
    localizacao: {
      municipio: "Teresina de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.2345, -13.8901]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "facil",
    extensao_km: 0.8,
    desnivel_metros: 30,
    tempo_estimado_horas: 1,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Ano todo",
      temperatura_media: "24-32°C",
      precipitacao: "Moderada"
    },
    seguranca: {
      nivel_sinal: "bom",
      areas_sem_cobertura: [],
      fauna_local: ["Peixes", "Aves aquáticas"],
      riscos: ["Profundidade do poço"],
      precaucoes: ["Saber nadar", "Não mergulhar de cabeça"]
    },
    infraestrutura: {
      sinalizacao: "excelente",
      manutencao: "recente",
      acessibilidade: "Muito fácil"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Cachoeira Morada do Sol",
    descricao: "Cachoeira com 40m de queda em meio a jardim de pedras. Várias quedas menores pelo caminho. Trilha moderada com paisagens incríveis. Ótima para fotografia.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5567, -14.1678]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "moderada",
    extensao_km: 6,
    desnivel_metros: 280,
    tempo_estimado_horas: 4,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Abril a Outubro",
      temperatura_media: "20-28°C",
      precipitacao: "Baixa"
    },
    seguranca: {
      nivel_sinal: "fraco",
      areas_sem_cobertura: ["Parte da trilha"],
      fauna_local: ["Aves", "Macacos"],
      riscos: ["Sol forte", "Pedras escorregadias"],
      precaucoes: ["Água suficiente", "Protetor solar", "Lanche"]
    },
    infraestrutura: {
      sinalizacao: "boa",
      manutencao: "regular",
      acessibilidade: "Moderada"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Cachoeira Macaquinhos",
    descricao: "Cachoeira com 8m de queda e piscina natural perfeita. Trilha curtíssima e super fácil. Ideal para crianças e idosos. Uma das mais acessíveis da região.",
    localizacao: {
      municipio: "Cavalcante",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.6789, -13.7234]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "facil",
    extensao_km: 0.5,
    desnivel_metros: 20,
    tempo_estimado_horas: 0.5,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Ano todo",
      temperatura_media: "22-30°C",
      precipitacao: "Moderada"
    },
    seguranca: {
      nivel_sinal: "bom",
      areas_sem_cobertura: [],
      fauna_local: ["Peixes", "Aves"],
      riscos: ["Nenhum"],
      precaucoes: ["Protetor solar"]
    },
    infraestrutura: {
      sinalizacao: "excelente",
      manutencao: "recente",
      acessibilidade: "Perfeita - acessível para todos"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Cachoeira Capivara",
    descricao: "Cachoeira com 15m de queda e várias piscinas naturais. Trilha fácil através de mata ciliar. Frequentemente visitada por capivaras (daí o nome). Ótima para observação de fauna.",
    localizacao: {
      municipio: "Cavalcante",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.6456, -13.7567]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "facil",
    extensao_km: 2.5,
    desnivel_metros: 90,
    tempo_estimado_horas: 1.5,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Ano todo",
      temperatura_media: "22-30°C",
      precipitacao: "Moderada"
    },
    seguranca: {
      nivel_sinal: "bom",
      areas_sem_cobertura: [],
      fauna_local: ["Capivaras", "Peixes", "Aves"],
      riscos: ["Mínimos"],
      precaucoes: ["Não alimentar os animais"]
    },
    infraestrutura: {
      sinalizacao: "excelente",
      manutencao: "recente",
      acessibilidade: "Muito boa"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Travessia das Sete Quedas",
    descricao: "Travessia épica de 2 dias passando por 7 cachoeiras diferentes. Camping selvagem no meio da trilha. Para aventureiros experientes! Uma das travessias mais bonitas de Goiás.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5234, -14.1234]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "muito_dificil",
    extensao_km: 32,
    desnivel_metros: 1200,
    tempo_estimado_horas: 16,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Maio a Setembro (seca)",
      temperatura_media: "18-28°C",
      precipitacao: "Baixa"
    },
    pontos_apoio: [
      {
        tipo: "guia",
        nome: "Guias Travessia Sete Quedas",
        contato: "(62) 99777-5544",
        coordenadas: {
          type: "Point",
          coordinates: [-47.5234, -14.1234]
        },
        descricao: "Guias especializados em travessias (obrigatório)"
      }
    ],
    seguranca: {
      nivel_sinal: "sem_sinal",
      areas_sem_cobertura: ["Todo o percurso"],
      fauna_local: ["Lobo-guará", "Tamanduá", "Aves", "Cobras"],
      riscos: ["Isolamento", "Mudanças climáticas", "Fauna selvagem", "Travessias de rio"],
      precaucoes: ["Guia obrigatório", "Equipamento completo", "Experiência em camping", "Comunicação via satélite"]
    },
    infraestrutura: {
      sinalizacao: "precaria",
      manutencao: "necessaria",
      acessibilidade: "Apenas para muito experientes"
    },
    fotos: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
    ],
    caminho_veadeiros: true,
    setor_caminho: "Travessia Avançada",
    disponivel_offline: true
  }
];

const seedMoreTrails = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Inserindo mais trilhas de Goiás...');
    await Trail.insertMany(maisTrillhasGoias);
    
    const total = await Trail.countDocuments();
    
    console.log('✅ Mais trilhas inseridas com sucesso!');
    console.log(`📊 Total de trilhas no banco: ${total}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error);
    process.exit(1);
  }
};

seedMoreTrails();