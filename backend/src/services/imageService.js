import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, '../../uploads/');
const PROCESSED_DIR = path.join(__dirname, '../../uploads/processed/');

// Ensure directories exist
const ensureDirectories = async () => {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.mkdir(PROCESSED_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating directories:', error);
  }
};

ensureDirectories();

/**
 * Process and optimize image
 * @param {string} filePath - Path to original image
 * @param {object} options - Processing options
 * @returns {Promise<string>} - Path to processed image
 */
export const processImage = async (filePath, options = {}) => {
  const {
    width = 1200,
    height = null,
    quality = 80,
    format = 'jpeg'
  } = options;

  try {
    const filename = path.basename(filePath, path.extname(filePath));
    const outputPath = path.join(PROCESSED_DIR, `${filename}-processed.${format}`);

    let sharpInstance = sharp(filePath);

    // Resize if dimensions provided
    if (width || height) {
      sharpInstance = sharpInstance.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Convert and compress
    if (format === 'jpeg') {
      sharpInstance = sharpInstance.jpeg({ quality });
    } else if (format === 'png') {
      sharpInstance = sharpInstance.png({ quality });
    } else if (format === 'webp') {
      sharpInstance = sharpInstance.webp({ quality });
    }

    await sharpInstance.toFile(outputPath);

    return outputPath;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

/**
 * Create thumbnail
 * @param {string} filePath - Path to original image
 * @returns {Promise<string>} - Path to thumbnail
 */
export const createThumbnail = async (filePath) => {
  try {
    const filename = path.basename(filePath, path.extname(filePath));
    const outputPath = path.join(PROCESSED_DIR, `${filename}-thumb.jpeg`);

    await sharp(filePath)
      .resize(300, 300, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 70 })
      .toFile(outputPath);

    return outputPath;
  } catch (error) {
    console.error('Error creating thumbnail:', error);
    throw error;
  }
};

/**
 * Process multiple images
 * @param {Array} files - Array of file objects
 * @returns {Promise<Array>} - Array of processed image paths
 */
export const processMultipleImages = async (files) => {
  const processed = [];

  for (const file of files) {
    try {
      const processedPath = await processImage(file.path);
      const thumbnailPath = await createThumbnail(file.path);

      processed.push({
        original: file.path,
        processed: processedPath,
        thumbnail: thumbnailPath,
        filename: file.filename
      });
    } catch (error) {
      console.error(`Error processing ${file.filename}:`, error);
    }
  }

  return processed;
};

/**
 * Delete image files
 * @param {string} filePath - Path to image
 */
export const deleteImage = async (filePath) => {
  try {
    await fs.unlink(filePath);
    
    // Try to delete processed versions
    const filename = path.basename(filePath, path.extname(filePath));
    const processedPath = path.join(PROCESSED_DIR, `${filename}-processed.jpeg`);
    const thumbnailPath = path.join(PROCESSED_DIR, `${filename}-thumb.jpeg`);

    try {
      await fs.unlink(processedPath);
    } catch (e) {}
    
    try {
      await fs.unlink(thumbnailPath);
    } catch (e) {}
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

/**
 * Get image metadata
 * @param {string} filePath - Path to image
 * @returns {Promise<object>} - Image metadata
 */
export const getImageMetadata = async (filePath) => {
  try {
    const metadata = await sharp(filePath).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: metadata.size,
      hasAlpha: metadata.hasAlpha
    };
  } catch (error) {
    console.error('Error getting metadata:', error);
    throw error;
  }
};