import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Apenas imagens são permitidas!'), false);
  }
};

// Configure multer
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: fileFilter
});

// Multiple files upload
export const uploadMultiple = upload.array('photos', 10); // Max 10 photos

// Single file upload
export const uploadSingle = upload.single('photo');

// GPX file upload
export const uploadGPX = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB for GPX
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/gpx+xml' || 
        file.originalname.endsWith('.gpx') ||
        file.originalname.endsWith('.kml')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos GPX/KML são permitidos!'), false);
    }
  }
}).single('gpx');