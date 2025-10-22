import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Trail from '../models/Trail.js';
import connectDB from '../config/database.js';

dotenv.config();

const imagensReais = {
  "Sertão Zen": [
    "https://travessia.tur.br/wp-content/uploads/2019/09/sertao-zen-chapada-veadeiros-01.jpg",
    "https://letsflyaway.com.br/wp-content/uploads/2016/08/chapada-dos-veadeiros-sertao-zen-cachoeira.jpg",
    "https://travessia.tur.br/wp-content/uploads/2019/09/sertao-zen-chapada-veadeiros-.jpg"
  ],
  "Trilha dos Saltos": [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/d5/6f/8e/salto-de-120-metros.jpg",
    "https://www.infoescola.com/wp-content/uploads/2010/08/cachoeira-chapada-dos-veadeiros.jpg",
    "https://www.melhoresdestinos.com.br/wp-content/uploads/2019/06/chapada-dos-veadeiros-capa2019-01.jpg"
  ],
  "Cachoeira Santa Bárbara": [
    "https://www.melhoresdestinos.com.br/wp-content/uploads/2019/06/cachoeira-santa-barbara-chapada-veadeiros.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/9c/0a/8f/cachoeira-santa-barbara.jpg",
    "https://www.infoescola.com/wp-content/uploads/2017/07/cachoeira-santa-barbara.jpg"
  ],
  "Vale da Lua": [
    "https://www.melhoresdestinos.com.br/wp-content/uploads/2019/06/vale-da-lua-chapada-veadeiros.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/4c/8f/3e/vale-da-lua.jpg",
    "https://www.infoescola.com/wp-content/uploads/2017/07/vale-da-lua-goias.jpg"
  ],
  "Cachoeira Almécegas I e II": [
    "https://www.melhoresdestinos.com.br/wp-content/uploads/2019/06/cachoeira-almecegas-chapada-veadeiros.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/8c/3d/1e/cachoeira-almecegas.jpg",
    "https://www.infoescola.com/wp-content/uploads/2017/07/cachoeira-almecegas.jpg"
  ],
  "Mirante da Janela": [
    "https://www.melhoresdestinos.com.br/wp-content/uploads/2019/06/mirante-janela-chapada-veadeiros.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/2f/4a/5c/mirante-da-janela.jpg",
    "https://www.infoescola.com/wp-content/uploads/2017/07/mirante-janela.jpg"
  ],
  "Cachoeira dos Cristais": [
    "https://www.melhoresdestinos.com.br/wp-content/uploads/2019/06/cachoeira-cristais-chapada-veadeiros.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/5a/2b/1c/cachoeira-dos-cristais.jpg",
    "https://www.infoescola.com/wp-content/uploads/2017/07/cachoeira-cristais.jpg"
  ],
  "Cachoeira Loquinhas": [
    "https://www.melhoresdestinos.com.br/wp-content/uploads/2019/06/loquinhas-chapada-veadeiros.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/9e/1f/2a/cachoeira-loquinhas.jpg",
    "https://www.infoescola.com/wp-content/uploads/2017/07/loquinhas.jpg"
  ],
  "Trilha dos Cânions": [
    "https://www.melhoresdestinos.com.br/wp-content/uploads/2019/06/canions-chapada-veadeiros.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/3a/5b/2c/canions-chapada.jpg",
    "https://www.infoescola.com/wp-content/uploads/2017/07/canions-veadeiros.jpg"
  ],
  "Catarata dos Couros": [
    "https://www.melhoresdestinos.com.br/wp-content/uploads/2019/06/catarata-couros-chapada.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/2a/3b/4c/catarata-couros.jpg",
    "https://www.infoescola.com/wp-content/uploads/2017/07/catarata-couros.jpg"
  ],
  "Travessia Leste - Chapada dos Veadeiros": [
    "https://www.melhoresdestinos.com.br/wp-content/uploads/2019/06/travessia-chapada-veadeiros.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/5c/2a/3d/travessia-leste.jpg",
    "https://www.infoescola.com/wp-content/uploads/2017/07/travessia-chapada.jpg"
  ]
};

const updateImages = async () => {
  try {
    await connectDB();
    
    console.log('🖼️  Atualizando imagens das trilhas...');
    
    for (const [nomeTrilha, fotos] of Object.entries(imagensReais)) {
      const trail = await Trail.findOne({ nome: nomeTrilha });
      
      if (trail) {
        trail.fotos = fotos;
        await trail.save();
        console.log(`✅ ${nomeTrilha} - ${fotos.length} fotos atualizadas`);
      } else {
        console.log(`⚠️  ${nomeTrilha} - não encontrada`);
      }
    }
    
    console.log('✅ Imagens atualizadas com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao atualizar imagens:', error);
    process.exit(1);
  }
};

updateImages();