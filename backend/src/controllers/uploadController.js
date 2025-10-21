import { processImage, createThumbnail, processMultipleImages } from '../services/imageService.js';
import path from 'path';

// @desc    Upload single photo
// @route   POST /api/upload/photo
// @access  Private
export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum arquivo enviado'
      });
    }

    // Process image
    const processedPath = await processImage(req.file.path);
    const thumbnailPath = await createThumbnail(req.file.path);

    // Generate URLs (adjust based on your server setup)
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const processedUrl = `${baseUrl}/uploads/processed/${path.basename(processedPath)}`;
    const thumbnailUrl = `${baseUrl}/uploads/processed/${path.basename(thumbnailPath)}`;

    res.json({
      success: true,
      data: {
        original: req.file.filename,
        processed: processedUrl,
        thumbnail: thumbnailUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao fazer upload da foto',
      error: error.message
    });
  }
};

// @desc    Upload multiple photos
// @route   POST /api/upload/photos
// @access  Private
export const uploadPhotos = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum arquivo enviado'
      });
    }

    // Process all images
    const processed = await processMultipleImages(req.files);

    // Generate URLs
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const photos = processed.map(img => ({
      original: img.filename,
      processed: `${baseUrl}/uploads/processed/${path.basename(img.processed)}`,
      thumbnail: `${baseUrl}/uploads/processed/${path.basename(img.thumbnail)}`
    }));

    res.json({
      success: true,
      data: {
        count: photos.length,
        photos
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao fazer upload das fotos',
      error: error.message
    });
  }
};

// @desc    Upload GPX file
// @route   POST /api/upload/gpx
// @access  Private
export const uploadGPX = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum arquivo GPX enviado'
      });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const gpxUrl = `${baseUrl}/uploads/${req.file.filename}`;

    res.json({
      success: true,
      data: {
        filename: req.file.filename,
        url: gpxUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao fazer upload do arquivo GPX',
      error: error.message
    });
  }
};

// @desc    Delete uploaded file
// @route   DELETE /api/upload/:filename
// @access  Private
export const deleteFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(UPLOAD_DIR, filename);

    await deleteImage(filePath);

    res.json({
      success: true,
      message: 'Arquivo deletado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar arquivo',
      error: error.message
    });
  }
};