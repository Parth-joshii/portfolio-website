import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { readDB, writeDB, saveToExcel } from './services/storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // Uses environment variable if available

// Systematic Paths - Pointing to root directories
const ROOT_DIR = path.join(__dirname, '..');
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads');

// Ensure uploads directory exists
await fs.mkdir(UPLOADS_DIR, { recursive: true });
await fs.mkdir(path.join(UPLOADS_DIR, 'videos'), { recursive: true });
await fs.mkdir(path.join(UPLOADS_DIR, 'thumbnails'), { recursive: true });
await fs.mkdir(path.join(UPLOADS_DIR, 'books'), { recursive: true });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

// Auth Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// --- ROUTES ---

// Auth
app.post('/api/auth/login', async (req, res) => {
  let { email, password } = req.body;
  email = email?.trim();
  password = password?.trim();
  
  const db = await readDB();
  const user = db.users.find(u => u.email === email);
  
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user.id, email: user.email, role: 'admin' }, SECRET_KEY, { expiresIn: '24h' });
      return res.json({ token, user: { email: user.email, role: 'admin' } });
    }
  }
  
  res.status(401).json({ error: 'Invalid credentials' });
});

// Videos
app.get('/api/videos', async (req, res) => {
  const db = await readDB();
  res.json(db.videos);
});

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'video') cb(null, path.join(UPLOADS_DIR, 'videos'));
    else cb(null, path.join(UPLOADS_DIR, 'thumbnails'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const uploadVideo = multer({ storage: videoStorage });

app.post('/api/videos', authenticate, uploadVideo.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), async (req, res) => {
  const { title, description } = req.body;
  const videoFile = req.files['video'][0];
  const thumbFile = req.files['thumbnail']?.[0];

  const db = await readDB();
  const newVideo = {
    id: Date.now().toString(),
    title,
    description,
    url: `/uploads/videos/${videoFile.filename}`,
    thumbnailUrl: thumbFile ? `/uploads/thumbnails/${thumbFile.filename}` : null,
    createdAt: new Date().toISOString()
  };
  db.videos.unshift(newVideo);
  await writeDB(db);
  res.status(201).json(newVideo);
});

app.delete('/api/videos/:id', authenticate, async (req, res) => {
  const db = await readDB();
  const video = db.videos.find(v => v.id === req.params.id);
  if (video) {
    db.videos = db.videos.filter(v => v.id !== req.params.id);
    await writeDB(db);
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Video not found' });
  }
});

// Books
app.get('/api/books', async (req, res) => {
  const db = await readDB();
  res.json(db.books);
});

const bookStorage = multer.diskStorage({
  destination: path.join(UPLOADS_DIR, 'books'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const uploadBook = multer({ storage: bookStorage });

app.post('/api/books', authenticate, uploadBook.single('image'), async (req, res) => {
  const { title, author, description, price, amazonUrl } = req.body;
  const imageFile = req.file;

  const db = await readDB();
  const newBook = {
    id: Date.now().toString(),
    title,
    author,
    description,
    price,
    amazonUrl,
    url: imageFile ? `/uploads/books/${imageFile.filename}` : null,
    downloads: 0,
    createdAt: new Date().toISOString()
  };
  db.books.unshift(newBook);
  await writeDB(db);
  res.status(201).json(newBook);
});

app.post('/api/books/:id/download', async (req, res) => {
  const db = await readDB();
  const index = db.books.findIndex(b => b.id === req.params.id);
  if (index !== -1) {
    db.books[index].downloads = (db.books[index].downloads || 0) + 1;
    await writeDB(db);
    res.json({ downloads: db.books[index].downloads });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.delete('/api/books/:id', authenticate, async (req, res) => {
  const db = await readDB();
  db.books = db.books.filter(b => b.id !== req.params.id);
  await writeDB(db);
  res.status(204).end();
});

// Enquiries
app.post('/api/enquiries', async (req, res) => {
  const { name, email, message } = req.body;
  const db = await readDB();
  const newEnquiry = { id: Date.now().toString(), name, email, message, createdAt: new Date().toISOString() };
  
  // Save to JSON
  db.enquiries.unshift(newEnquiry);
  await writeDB(db);
  
  // Save to Excel
  try {
    await saveToExcel(newEnquiry);
  } catch (err) {
    console.error('Failed to save to Excel:', err);
  }
  
  res.status(201).json(newEnquiry);
});

// --- PRODUCTION FRONTEND SERVING ---
const DIST_DIR = path.join(ROOT_DIR, 'dist');
app.use(express.static(DIST_DIR));

// Catch-all route to serve the frontend index.html for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
