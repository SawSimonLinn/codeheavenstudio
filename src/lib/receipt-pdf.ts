import { readFile } from 'fs/promises';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import type { Receipt } from '@/types/receipt';

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 48;
const TOTALS_TOP_GAP = 48;

function money(value: number): string {
  return `$${value.toFixed(2)}`;
}

function parseDate(value: string): string {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getReceiptPdfFilename(receiptNumber: string): string {
  return `receipt-${receiptNumber}.pdf`;
}

export async function generateReceiptPdf(receipt: Receipt): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  const drawText = (
    text: string,
    x: number,
    yPos: number,
    size = 11,
    color = rgb(0.1, 0.1, 0.1),
    font = regular
  ) => {
    page.drawText(text, { x, y: yPos, size, font, color });
  };

  const wrapText = (
    text: string,
    maxWidth: number,
    size = 10,
    font = regular
  ): string[] => {
    const normalized = (text || '-').replace(/\r\n/g, '\n');
    const paragraphs = normalized.split('\n');
    const lines: string[] = [];

    for (const paragraph of paragraphs) {
      const words = paragraph.trim().split(/\s+/).filter(Boolean);

      if (words.length === 0) {
        lines.push('');
        continue;
      }

      const splitWord = (word: string): string[] => {
        if (font.widthOfTextAtSize(word, size) <= maxWidth) return [word];

        const chunks: string[] = [];
        let chunk = '';
        for (const char of word) {
          const candidate = `${chunk}${char}`;
          if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
            chunk = candidate;
          } else {
            if (chunk) chunks.push(chunk);
            chunk = char;
          }
        }
        if (chunk) chunks.push(chunk);
        return chunks;
      };

      const expandedWords = words.flatMap((word) => splitWord(word));

      let current = expandedWords[0];
      for (let i = 1; i < expandedWords.length; i += 1) {
        const candidate = `${current} ${expandedWords[i]}`;
        if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
          current = candidate;
        } else {
          lines.push(current);
          current = expandedWords[i];
        }
      }
      lines.push(current);
    }

    return lines.length > 0 ? lines : ['-'];
  };

  const drawWrappedText = (
    lines: string[],
    x: number,
    yPos: number,
    lineHeight = 12,
    size = 10,
    color = rgb(0.35, 0.39, 0.44),
    font = regular
  ) => {
    for (let i = 0; i < lines.length; i += 1) {
      drawText(lines[i], x, yPos - i * lineHeight, size, color, font);
    }
  };

  const drawTextRight = (
    text: string,
    rightX: number,
    yPos: number,
    size = 10,
    color = rgb(0.35, 0.39, 0.44),
    font = regular
  ) => {
    const width = font.widthOfTextAtSize(text, size);
    drawText(text, rightX - width, yPos, size, color, font);
  };

  const newPageIfNeeded = (requiredHeight: number) => {
    if (y - requiredHeight > MARGIN) return;
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - MARGIN;
  };

  page.drawRectangle({
    x: 0,
    y: PAGE_HEIGHT - 118,
    width: PAGE_WIDTH,
    height: 118,
    color: rgb(0.11, 0.23, 0.37),
  });

  try {
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    const logoBytes = await readFile(logoPath);
    const logo = await pdfDoc.embedPng(logoBytes);
    page.drawImage(logo, {
      x: MARGIN,
      y: PAGE_HEIGHT - 94,
      width: 42,
      height: 42,
    });
  } catch {
    // Logo is optional in case the file is missing in certain deployments.
  }

  drawText('Code Heaven Studio', MARGIN + 54, PAGE_HEIGHT - 64, 16, rgb(1, 1, 1), bold);
  drawText('Professional Web Development', MARGIN + 54, PAGE_HEIGHT - 82, 10, rgb(0.82, 0.9, 1));

  const rightEdge = PAGE_WIDTH - MARGIN;
  const receiptTitleWidth = bold.widthOfTextAtSize('RECEIPT', 24);
  drawText('RECEIPT', rightEdge - receiptTitleWidth, PAGE_HEIGHT - 64, 24, rgb(1, 1, 1), bold);
  const receiptNo = receipt.receiptNumber;
  const receiptNoWidth = regular.widthOfTextAtSize(receiptNo, 11);
  drawText(receiptNo, rightEdge - receiptNoWidth, PAGE_HEIGHT - 84, 11, rgb(0.82, 0.9, 1));

  y = PAGE_HEIGHT - 148;

  const rightMetaX = PAGE_WIDTH - 220;
  const billToMaxWidth = rightMetaX - MARGIN - 24;

  drawText('Bill To', MARGIN, y, 10, rgb(0.43, 0.48, 0.54), bold);
  drawText('Issue Date', rightMetaX, y, 10, rgb(0.43, 0.48, 0.54), bold);

  y -= 18;
  const clientNameLines = wrapText(receipt.clientName, billToMaxWidth, 12, bold);
  drawWrappedText(clientNameLines, MARGIN, y, 14, 12, rgb(0.1, 0.1, 0.1), bold);
  drawText(parseDate(receipt.issueDate), rightMetaX, y, 12);

  y -= clientNameLines.length * 14;

  if (receipt.companyName) {
    const companyLines = wrapText(receipt.companyName, billToMaxWidth, 11);
    drawWrappedText(companyLines, MARGIN, y, 13, 11, rgb(0.25, 0.28, 0.33));
    y -= companyLines.length * 13;
  }

  const emailLines = wrapText(receipt.clientEmail, billToMaxWidth, 11);
  drawWrappedText(emailLines, MARGIN, y, 13, 11, rgb(0.35, 0.39, 0.44));

  if (receipt.dueDate) {
    drawText('Due Date', rightMetaX, y + 16, 10, rgb(0.43, 0.48, 0.54), bold);
    drawText(parseDate(receipt.dueDate), rightMetaX, y, 11);
  }

  y -= emailLines.length * 13 + 18;
  newPageIfNeeded(42);

  const tableX = MARGIN;
  const tableWidth = PAGE_WIDTH - MARGIN * 2;

  const serviceColWidth = 150;
  const descriptionColWidth = 220;
  const qtyColWidth = 40;
  const priceColWidth = 52;
  const totalColWidth = 54;

  const serviceX = tableX + 8;
  const descriptionX = tableX + serviceColWidth + 8;
  const qtyRightX = tableX + serviceColWidth + descriptionColWidth + qtyColWidth - 8;
  const priceRightX = tableX + serviceColWidth + descriptionColWidth + qtyColWidth + priceColWidth - 8;
  const totalRightX = tableX + tableWidth - 8;

  const drawTableHeader = () => {
    page.drawRectangle({
      x: tableX,
      y: y - 24,
      width: tableWidth,
      height: 24,
      color: rgb(0.95, 0.96, 0.98),
    });

    drawText('Service', serviceX, y - 16, 9, rgb(0.43, 0.48, 0.54), bold);
    drawText('Description', descriptionX, y - 16, 9, rgb(0.43, 0.48, 0.54), bold);
    drawTextRight('Qty', qtyRightX, y - 16, 9, rgb(0.43, 0.48, 0.54), bold);
    drawTextRight('Price', priceRightX, y - 16, 9, rgb(0.43, 0.48, 0.54), bold);
    drawTextRight('Total', totalRightX, y - 16, 9, rgb(0.43, 0.48, 0.54), bold);

    y -= 34;
  };

  drawTableHeader();

  const itemRows = receipt.items.length === 0
    ? [{ serviceName: 'No services added', description: '', quantity: 0, price: 0 }]
    : receipt.items;

  for (const item of itemRows) {
    const serviceLines = wrapText(item.serviceName || '-', serviceColWidth - 16, 10, bold);
    const descriptionLines = wrapText(item.description || '-', descriptionColWidth - 16, 10);
    const maxLines = Math.max(serviceLines.length, descriptionLines.length);
    const rowHeight = Math.max(24, maxLines * 12 + 10);

    if (y - rowHeight <= MARGIN) {
      page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      y = PAGE_HEIGHT - MARGIN;
      drawTableHeader();
    }

    page.drawLine({
      start: { x: tableX, y: y - rowHeight },
      end: { x: tableX + tableWidth, y: y - rowHeight },
      thickness: 0.6,
      color: rgb(0.9, 0.91, 0.93),
    });

    drawWrappedText(serviceLines, serviceX, y - 16, 12, 10, rgb(0.1, 0.1, 0.1), bold);
    drawWrappedText(descriptionLines, descriptionX, y - 16, 12, 10, rgb(0.35, 0.39, 0.44));
    drawTextRight(String(item.quantity), qtyRightX, y - 16, 10, rgb(0.35, 0.39, 0.44));
    drawTextRight(money(item.price), priceRightX, y - 16, 10, rgb(0.35, 0.39, 0.44));
    drawTextRight(money(item.quantity * item.price), totalRightX, y - 16, 10, rgb(0.1, 0.1, 0.1), bold);

    y -= rowHeight;
  }

  // Add top padding before totals section for clearer separation.
  y -= TOTALS_TOP_GAP;
  newPageIfNeeded(90);

  const subtotal = receipt.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const taxAmount = (subtotal * receipt.tax) / 100;

  const totalsXLabel = PAGE_WIDTH - 220;
  const totalsXValue = PAGE_WIDTH - MARGIN;

  const drawTotalRow = (label: string, value: string, yPos: number, isStrong = false) => {
    drawText(label, totalsXLabel, yPos, 10, rgb(0.35, 0.39, 0.44), isStrong ? bold : regular);
    const font = isStrong ? bold : regular;
    const width = font.widthOfTextAtSize(value, isStrong ? 12 : 10);
    drawText(value, totalsXValue - width, yPos, isStrong ? 12 : 10, rgb(0.1, 0.1, 0.1), font);
  };

  drawTotalRow('Subtotal', money(subtotal), y);
  y -= 16;
  drawTotalRow(`Tax (${receipt.tax}%)`, money(taxAmount), y);
  y -= 16;
  drawTotalRow('Discount', `-${money(receipt.discount)}`, y);
  y -= 18;
  page.drawLine({
    start: { x: totalsXLabel, y: y + 10 },
    end: { x: totalsXValue, y: y + 10 },
    thickness: 1,
    color: rgb(0.85, 0.87, 0.9),
  });
  drawTotalRow('Total', money(receipt.total), y, true);

  y -= 34;
  if (receipt.notes) {
    const notesLines = wrapText(receipt.notes, PAGE_WIDTH - MARGIN * 2, 10);
    const notesHeight = notesLines.length * 12 + 24;
    newPageIfNeeded(notesHeight);
    drawText('Notes', MARGIN, y, 10, rgb(0.15, 0.39, 0.87), bold);
    y -= 16;
    drawWrappedText(notesLines, MARGIN, y, 12, 10, rgb(0.35, 0.39, 0.44));
  }

  page.drawLine({
    start: { x: MARGIN, y: 48 },
    end: { x: PAGE_WIDTH - MARGIN, y: 48 },
    thickness: 0.8,
    color: rgb(0.9, 0.91, 0.93),
  });
  drawText('Thank you for working with Code Heaven Studio', MARGIN, 34, 9, rgb(0.62, 0.65, 0.69));

  return pdfDoc.save();
}
