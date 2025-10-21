import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Trail from '../models/Trail.js';
import connectDB from '../config/database.js';

dotenv.config();

const trilhasGoias = [
  {
    nome: "Sertão Zen",
    descricao: "Uma das trilhas mais icônicas do Parque Nacional da Chapada dos Veadeiros. Percurso de 8,3km (só ida) através do cerrado com paisagens deslumbrantes, formações rochosas milenares e vistas panorâmicas. Pode ser feita em um dia (ida e volta) ou dois dias com pernoite na trilha.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5186, -14.1318]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "moderada",
    extensao_km: 8.3,
    desnivel_metros: 300,
    tempo_estimado_horas: 6,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Abril a Outubro (seca)",
      temperatura_media: "20-28°C",
      precipitacao: "Baixa no período seco"
    },
    pontos_apoio: [
      {
        tipo: "guia",
        nome: "Guias Locais Alto Paraíso",
        contato: "(62) 99999-0001",
        coordenadas: {
          type: "Point",
          coordinates: [-47.5186, -14.1318]
        },
        descricao: "Guias certificados para trilhas na Chapada"
      }
    ],
    seguranca: {
      nivel_sinal: "sem_sinal",
      areas_sem_cobertura: ["Todo o percurso"],
      fauna_local: ["Lobo-guará", "Tamanduá-bandeira", "Aves do cerrado"],
      riscos: ["Sol forte", "Desidratação", "Perda de orientação"],
      precaucoes: ["Levar água suficiente (3L mínimo)", "Protetor solar", "Chapéu", "GPS ou mapa offline", "Informar alguém sobre o percurso"]
    },
    infraestrutura: {
      sinalizacao: "boa",
      manutencao: "regular",
      acessibilidade: "Trilha natural, não adaptada"
    },
    fotos: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
    ],
    caminho_veadeiros: true,
    setor_caminho: "Setor Alto Paraíso",
    disponivel_offline: true
  },
  {
    nome: "Trilha dos Saltos",
    descricao: "Trilha clássica do Parque Nacional com 10km que leva a duas cachoeiras espetaculares: Salto de 120m e Salto de 80m. Paisagens incríveis do cerrado, cânions e piscinas naturais para banho.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5234, -14.1456]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "moderada",
    extensao_km: 10,
    desnivel_metros: 400,
    tempo_estimado_horas: 5,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Maio a Setembro",
      temperatura_media: "18-26°C",
      precipitacao: "Baixa"
    },
    pontos_apoio: [
      {
        tipo: "primeiros_socorros",
        nome: "Posto de Atendimento Parque",
        contato: "(62) 3455-1000",
        coordenadas: {
          type: "Point",
          coordinates: [-47.5234, -14.1456]
        },
        descricao: "Posto de primeiros socorros na entrada do parque"
      }
    ],
    seguranca: {
      nivel_sinal: "fraco",
      areas_sem_cobertura: ["Interior da trilha"],
      fauna_local: ["Aves", "Macacos", "Lagartos"],
      riscos: ["Pedras escorregadias", "Sol intenso"],
      precaucoes: ["Calçado adequado", "Água", "Lanche energético"]
    },
    infraestrutura: {
      sinalizacao: "excelente",
      manutencao: "recente",
      acessibilidade: "Trilha bem mantida"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Trilha dos Cânions",
    descricao: "Trilha de 12km que passa por formações rochosas impressionantes, cânions profundos e mirantes com vistas panorâmicas da Chapada. Uma das mais bonitas da região.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5289, -14.1523]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "dificil",
    extensao_km: 12,
    desnivel_metros: 500,
    tempo_estimado_horas: 7,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Abril a Outubro",
      temperatura_media: "20-28°C",
      precipitacao: "Baixa no período seco"
    },
    seguranca: {
      nivel_sinal: "sem_sinal",
      areas_sem_cobertura: ["Todo o percurso"],
      fauna_local: ["Veado-campeiro", "Lobo-guará", "Aves de rapina"],
      riscos: ["Exposição ao sol", "Terreno irregular", "Altitude"],
      precaucoes: ["Condicionamento físico", "Equipamento adequado", "Guia recomendado"]
    },
    infraestrutura: {
      sinalizacao: "boa",
      manutencao: "regular",
      acessibilidade: "Trilha desafiadora"
    },
    fotos: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Cachoeira Almécegas I e II",
    descricao: "Duas cachoeiras espetaculares em propriedade particular. Almécegas I tem 45m de queda livre e Almécegas II tem piscina natural perfeita para banho. Trilha fácil e bem sinalizada.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5678, -14.1234]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "facil",
    extensao_km: 3,
    desnivel_metros: 150,
    tempo_estimado_horas: 2,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Ano todo",
      temperatura_media: "22-30°C",
      precipitacao: "Moderada"
    },
    pontos_apoio: [
      {
        tipo: "abastecimento",
        nome: "Fazenda São Bento",
        contato: "(62) 3446-1234",
        coordenadas: {
          type: "Point",
          coordinates: [-47.5678, -14.1234]
        },
        descricao: "Entrada da trilha com estacionamento e lanchonete"
      }
    ],
    seguranca: {
      nivel_sinal: "bom",
      areas_sem_cobertura: [],
      fauna_local: ["Aves", "Borboletas"],
      riscos: ["Pedras molhadas"],
      precaucoes: ["Calçado antiderrapante"]
    },
    infraestrutura: {
      sinalizacao: "excelente",
      manutencao: "recente",
      acessibilidade: "Boa para iniciantes"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Vale da Lua",
    descricao: "Formação rochosa única esculpida pelo Rio São Miguel ao longo de milhões de anos. Parece uma paisagem lunar com crateras e piscinas naturais. Trilha curta mas muito fotogênica.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5432, -14.1567]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "facil",
    extensao_km: 1,
    desnivel_metros: 50,
    tempo_estimado_horas: 1.5,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Período seco (Abril-Outubro)",
      temperatura_media: "22-30°C",
      precipitacao: "Baixa"
    },
    seguranca: {
      nivel_sinal: "bom",
      areas_sem_cobertura: [],
      fauna_local: ["Peixes", "Aves aquáticas"],
      riscos: ["Pedras escorregadias", "Correnteza em época de chuva"],
      precaucoes: ["Não entrar no rio em época de chuva", "Cuidado com as pedras"]
    },
    infraestrutura: {
      sinalizacao: "boa",
      manutencao: "regular",
      acessibilidade: "Fácil acesso"
    },
    fotos: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Cachoeira Santa Bárbara",
    descricao: "Uma das cachoeiras mais bonitas do Brasil! Água azul turquesa cristalina em meio ao cerrado. Localizada em comunidade quilombola Kalunga. Trilha moderada com paisagens incríveis.",
    localizacao: {
      municipio: "Cavalcante",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.6234, -13.7456]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "moderada",
    extensao_km: 4,
    desnivel_metros: 200,
    tempo_estimado_horas: 3,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Maio a Setembro",
      temperatura_media: "20-28°C",
      precipitacao: "Baixa"
    },
    pontos_apoio: [
      {
        tipo: "guia",
        nome: "Guias Kalunga",
        contato: "(62) 99888-7766",
        coordenadas: {
          type: "Point",
          coordinates: [-47.6234, -13.7456]
        },
        descricao: "Guias da comunidade Kalunga (obrigatório)"
      },
      {
        tipo: "pousada",
        nome: "Pousada Kalunga",
        contato: "(62) 3494-1234",
        coordenadas: {
          type: "Point",
          coordinates: [-47.6200, -13.7400]
        },
        descricao: "Hospedagem na comunidade"
      }
    ],
    seguranca: {
      nivel_sinal: "fraco",
      areas_sem_cobertura: ["Interior da trilha"],
      fauna_local: ["Aves", "Capivaras", "Peixes"],
      riscos: ["Sol forte", "Travessia de rio"],
      precaucoes: ["Guia obrigatório", "Respeitar a comunidade local", "Levar água"]
    },
    infraestrutura: {
      sinalizacao: "boa",
      manutencao: "regular",
      acessibilidade: "Requer guia local"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
    ],
    caminho_veadeiros: true,
    setor_caminho: "Setor Cavalcante",
    disponivel_offline: true
  },
  {
    nome: "Mirante da Janela",
    descricao: "Mirante natural com vista de 360° da Chapada dos Veadeiros. Pôr do sol espetacular! Trilha curta mas com subida íngreme no final. Vale muito a pena o esforço.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5123, -14.1678]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "moderada",
    extensao_km: 2,
    desnivel_metros: 180,
    tempo_estimado_horas: 1.5,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Ano todo",
      temperatura_media: "20-28°C",
      precipitacao: "Variável"
    },
    seguranca: {
      nivel_sinal: "bom",
      areas_sem_cobertura: [],
      fauna_local: ["Aves", "Lagartos"],
      riscos: ["Vento forte no topo", "Exposição ao sol"],
      precaucoes: ["Ir no final da tarde para pôr do sol", "Levar lanterna para volta"]
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
    nome: "Cachoeira dos Cristais",
    descricao: "Cachoeira com águas cristalinas e formações de quartzo. Trilha fácil e acessível, perfeita para famílias. Várias piscinas naturais para banho.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5567, -14.1234]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "facil",
    extensao_km: 2.5,
    desnivel_metros: 100,
    tempo_estimado_horas: 2,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Ano todo",
      temperatura_media: "22-30°C",
      precipitacao: "Moderada"
    },
    pontos_apoio: [
      {
        tipo: "abastecimento",
        nome: "Recepção Cristais",
        contato: "(62) 3446-5678",
        coordenadas: {
          type: "Point",
          coordinates: [-47.5567, -14.1234]
        },
        descricao: "Entrada com estacionamento e lanchonete"
      }
    ],
    seguranca: {
      nivel_sinal: "bom",
      areas_sem_cobertura: [],
      fauna_local: ["Peixes", "Aves"],
      riscos: ["Mínimos"],
      precaucoes: ["Protetor solar", "Roupa de banho"]
    },
    infraestrutura: {
      sinalizacao: "excelente",
      manutencao: "recente",
      acessibilidade: "Excelente para iniciantes e famílias"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Travessia Leste - Chapada dos Veadeiros",
    descricao: "Travessia épica de 56km através da Chapada dos Veadeiros, de Alto Paraíso até Macaquinhos. 3-4 dias de caminhada com pernoites em camping. Para aventureiros experientes!",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5186, -14.1318]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "muito_dificil",
    extensao_km: 56,
    desnivel_metros: 1976,
    tempo_estimado_horas: 24,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Maio a Setembro (seca)",
      temperatura_media: "18-28°C",
      precipitacao: "Baixa"
    },
    pontos_apoio: [
      {
        tipo: "guia",
        nome: "Guias Especializados Travessia",
        contato: "(62) 99777-6655",
        coordenadas: {
          type: "Point",
          coordinates: [-47.5186, -14.1318]
        },
        descricao: "Guias especializados em travessias longas (obrigatório)"
      }
    ],
    seguranca: {
      nivel_sinal: "sem_sinal",
      areas_sem_cobertura: ["Todo o percurso"],
      fauna_local: ["Lobo-guará", "Tamanduá", "Onça-parda (raro)", "Aves"],
      riscos: ["Isolamento", "Mudanças climáticas", "Fauna selvagem"],
      precaucoes: ["Guia obrigatório", "Equipamento completo de camping", "Comunicação via satélite recomendada", "Seguro de viagem"]
    },
    infraestrutura: {
      sinalizacao: "regular",
      manutencao: "necessaria",
      acessibilidade: "Apenas para experientes"
    },
    fotos: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
    ],
    caminho_veadeiros: true,
    setor_caminho: "Travessia Leste",
    disponivel_offline: true
  },
  {
    nome: "Cachoeira Loquinhas",
    descricao: "Complexo de 12 cachoeiras e piscinas naturais em sequência. Trilha super fácil e acessível, perfeita para crianças e idosos. Águas cristalinas e rasas.",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5789, -14.1456]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "facil",
    extensao_km: 1.5,
    desnivel_metros: 50,
    tempo_estimado_horas: 2,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Ano todo",
      temperatura_media: "22-30°C",
      precipitacao: "Moderada"
    },
    pontos_apoio: [
      {
        tipo: "abastecimento",
        nome: "Recepção Loquinhas",
        contato: "(62) 3446-9999",
        coordenadas: {
          type: "Point",
          coordinates: [-47.5789, -14.1456]
        },
        descricao: "Estrutura completa com banheiros e lanchonete"
      }
    ],
    seguranca: {
      nivel_sinal: "bom",
      areas_sem_cobertura: [],
      fauna_local: ["Peixes pequenos", "Aves"],
      riscos: ["Mínimos"],
      precaucoes: ["Protetor solar biodegradável"]
    },
    infraestrutura: {
      sinalizacao: "excelente",
      manutencao: "recente",
      acessibilidade: "Excelente - acessível para todos"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  },
  {
    nome: "Catarata dos Couros",
    descricao: "Sequência impressionante de cachoeiras com mais de 50m de queda. Trilha longa mas recompensadora com várias quedas d'água pelo caminho. Cenário cinematográfico!",
    localizacao: {
      municipio: "Alto Paraíso de Goiás",
      estado: "GO",
      coordenadas: {
        type: "Point",
        coordinates: [-47.5901, -14.1789]
      },
      regiao: "Chapada dos Veadeiros"
    },
    tipo: "pedestre",
    dificuldade: "dificil",
    extensao_km: 14,
    desnivel_metros: 450,
    tempo_estimado_horas: 6,
    bioma: "Cerrado",
    clima: {
      melhor_epoca: "Dezembro a Março (chuvas - cachoeira mais volumosa)",
      temperatura_media: "20-28°C",
      precipitacao: "Alta no verão"
    },
    seguranca: {
      nivel_sinal: "fraco",
      areas_sem_cobertura: ["Maior parte da trilha"],
      fauna_local: ["Aves", "Macacos", "Capivaras"],
      riscos: ["Trilha longa", "Exposição ao sol", "Terreno irregular"],
      precaucoes: ["Condicionamento físico", "Água abundante", "Lanche", "Começar cedo"]
    },
    infraestrutura: {
      sinalizacao: "regular",
      manutencao: "regular",
      acessibilidade: "Para trilheiros experientes"
    },
    fotos: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
    ],
    caminho_veadeiros: false,
    disponivel_offline: true
  }
];

const seedTrails = async () => {
  try {
    await connectDB();
    
    console.log('🗑️  Limpando trilhas existentes...');
    await Trail.deleteMany();
    
    console.log('🌱 Inserindo trilhas de Goiás...');
    await Trail.insertMany(trilhasGoias);
    
    console.log('✅ Trilhas inseridas com sucesso!');
    console.log(`📊 Total de trilhas: ${trilhasGoias.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error);
    process.exit(1);
  }
};

// Run seeder
seedTrails();