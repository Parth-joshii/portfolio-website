import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import ExcelJS from 'exceljs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths relative to this file
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const EXCEL_FILE = path.join(DATA_DIR, 'enquiries.xlsx');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {}
}

/**
 * Database Helpers (JSON)
 */
export async function readDB() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty structure
    return { videos: [], books: [], enquiries: [], users: [] };
  }
}

export async function writeDB(data) {
  await ensureDataDir();
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

/**
 * Excel Helpers
 */
export async function saveToExcel(enquiry) {
  await ensureDataDir();
  const workbook = new ExcelJS.Workbook();
  let worksheet;

  try {
    // Try to load existing workbook
    await workbook.xlsx.readFile(EXCEL_FILE);
    worksheet = workbook.getWorksheet('Enquiries');
  } catch (error) {
    // Create new if load fails
  }

  if (!worksheet) {
    worksheet = workbook.addWorksheet('Enquiries');
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 20 },
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Message', key: 'message', width: 50 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Time', key: 'time', width: 15 }
    ];
    
    // Style headers
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };
  }

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0];

  worksheet.addRow({
    id: enquiry.id,
    name: enquiry.name,
    email: enquiry.email,
    message: enquiry.message,
    date: dateStr,
    time: timeStr
  });

  await workbook.xlsx.writeFile(EXCEL_FILE);
}
