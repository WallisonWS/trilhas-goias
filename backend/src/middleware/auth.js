import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Não autorizado - Token não fornecido'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido ou expirado'
    });
  }
};

export const premiumOnly = (req, res, next) => {
  if (!req.user.is_premium) {
    return res.status(403).json({
      success: false,
      message: 'Acesso restrito a usuários premium'
    });
  }
  
  // Check if premium is expired
  if (req.user.premium_expira_em && new Date() > req.user.premium_expira_em) {
    req.user.is_premium = false;
    req.user.save();
    
    return res.status(403).json({
      success: false,
      message: 'Assinatura premium expirada'
    });
  }
  
  next();
};