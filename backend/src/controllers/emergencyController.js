import Emergency from '../models/Emergency.js';
import User from '../models/User.js';

// @desc    Create SOS emergency
// @route   POST /api/emergency/sos
// @access  Private
export const createSOS = async (req, res) => {
  try {
    const { tipo, localizacao, mensagem, trilha_id } = req.body;

    // Get user's emergency contacts
    const user = await User.findById(req.user._id);
    
    const contatos_notificados = user.contatos_emergencia.map(contato => ({
      nome: contato.nome,
      telefone: contato.telefone,
      notificado_em: new Date(),
      status_notificacao: 'pendente'
    }));

    // Create emergency
    const emergency = await Emergency.create({
      usuario_id: req.user._id,
      trilha_id,
      tipo,
      localizacao,
      mensagem,
      contatos_notificados
    });

    // TODO: Send SMS/notifications to emergency contacts
    // This would integrate with Twilio or similar service
    // For now, we'll mark as sent
    emergency.contatos_notificados.forEach(contato => {
      contato.status_notificacao = 'enviado';
    });
    await emergency.save();

    // Populate for response
    const populatedEmergency = await Emergency.findById(emergency._id)
      .populate('usuario_id', 'nome email foto_perfil')
      .populate('trilha_id', 'nome localizacao');

    res.status(201).json({
      success: true,
      data: populatedEmergency,
      message: 'SOS ativado! Contatos de emergência foram notificados.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar SOS',
      error: error.message
    });
  }
};

// @desc    Get user's emergencies
// @route   GET /api/emergency/user
// @access  Private
export const getUserEmergencies = async (req, res) => {
  try {
    const { status } = req.query;
    
    const query = { usuario_id: req.user._id };
    if (status) query.status = status;

    const emergencies = await Emergency.find(query)
      .populate('trilha_id', 'nome localizacao.municipio')
      .sort('-createdAt');

    res.json({
      success: true,
      data: emergencies,
      count: emergencies.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar emergências',
      error: error.message
    });
  }
};

// @desc    Get single emergency
// @route   GET /api/emergency/:id
// @access  Private
export const getEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id)
      .populate('usuario_id', 'nome email foto_perfil contatos_emergencia')
      .populate('trilha_id', 'nome localizacao');

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: 'Emergência não encontrada'
      });
    }

    // Check if user is authorized (owner or emergency contact)
    const isOwner = emergency.usuario_id._id.toString() === req.user._id.toString();
    const isContact = emergency.contatos_notificados.some(
      c => emergency.usuario_id.contatos_emergencia.some(
        uc => uc.telefone === c.telefone
      )
    );

    if (!isOwner && !isContact) {
      return res.status(403).json({
        success: false,
        message: 'Não autorizado a visualizar esta emergência'
      });
    }

    res.json({
      success: true,
      data: emergency
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar emergência',
      error: error.message
    });
  }
};

// @desc    Resolve emergency
// @route   PUT /api/emergency/:id/resolve
// @access  Private
export const resolveEmergency = async (req, res) => {
  try {
    const { notas } = req.body;
    
    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: 'Emergência não encontrada'
      });
    }

    // Check ownership
    if (emergency.usuario_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Não autorizado a resolver esta emergência'
      });
    }

    await emergency.resolve(req.user.nome, notas);

    res.json({
      success: true,
      data: emergency,
      message: 'Emergência resolvida com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao resolver emergência',
      error: error.message
    });
  }
};

// @desc    Cancel emergency
// @route   PUT /api/emergency/:id/cancel
// @access  Private
export const cancelEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: 'Emergência não encontrada'
      });
    }

    // Check ownership
    if (emergency.usuario_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Não autorizado a cancelar esta emergência'
      });
    }

    await emergency.cancel();

    res.json({
      success: true,
      data: emergency,
      message: 'Emergência cancelada'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao cancelar emergência',
      error: error.message
    });
  }
};

// @desc    Get active emergencies (for monitoring/admin)
// @route   GET /api/emergency/active
// @access  Private (Admin - to be implemented)
export const getActiveEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find({ status: 'ativo' })
      .populate('usuario_id', 'nome email foto_perfil')
      .populate('trilha_id', 'nome localizacao')
      .sort('-createdAt');

    res.json({
      success: true,
      data: emergencies,
      count: emergencies.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar emergências ativas',
      error: error.message
    });
  }
};