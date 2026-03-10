/**
 * Server-side bin store. Tracks soft-deleted item IDs in a local JSON file.
 * This runs only in Node.js (Next.js API routes / server components).
 */
import fs from 'fs';
import path from 'path';

interface BinData {
  blogs: string[];
  receipts: string[];
}

const BIN_FILE = path.join(process.cwd(), 'data', 'bin.json');

function ensureFile(): void {
  const dir = path.dirname(BIN_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(BIN_FILE)) {
    fs.writeFileSync(BIN_FILE, JSON.stringify({ blogs: [], receipts: [] }), 'utf8');
  }
}

export function readBin(): BinData {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(BIN_FILE, 'utf8')) as BinData;
  } catch {
    return { blogs: [], receipts: [] };
  }
}

function writeBin(data: BinData): void {
  ensureFile();
  fs.writeFileSync(BIN_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export function addToBin(type: 'blogs' | 'receipts', id: string): void {
  const data = readBin();
  if (!data[type].includes(id)) {
    data[type].push(id);
    writeBin(data);
  }
}

export function removeFromBin(type: 'blogs' | 'receipts', id: string): void {
  const data = readBin();
  data[type] = data[type].filter((i) => i !== id);
  writeBin(data);
}

export function isInBin(type: 'blogs' | 'receipts', id: string): boolean {
  return readBin()[type].includes(id);
}
