import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

function getRequiredEnv(name) {
  const value = (process.env[name] ?? '').trim();
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function getOptionalEnv(name, fallback = '') {
  const value = (process.env[name] ?? '').trim();
  return value || fallback;
}

function chunkArray(items, size) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toIsoDate(value, fallback = new Date().toISOString().slice(0, 10)) {
  if (!value) return fallback;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return fallback;
  return parsed.toISOString().slice(0, 10);
}

function toIsoTimestamp(value, fallback = new Date().toISOString()) {
  if (!value) return fallback;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return fallback;
  return parsed.toISOString();
}

function parseItems(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function sanitizeStatus(value) {
  return value === 'draft' || value === 'sent' || value === 'paid' ? value : 'draft';
}

function appwriteRequestUrl(baseEndpoint, path, queries = []) {
  const cleanBase = baseEndpoint.endsWith('/') ? baseEndpoint.slice(0, -1) : baseEndpoint;
  const url = new URL(`${cleanBase}${path}`);
  for (const query of queries) {
    url.searchParams.append('queries[]', query);
  }
  return url;
}

async function listAllAppwriteDocuments(config, collectionId) {
  const allDocuments = [];
  const limit = 100;
  let offset = 0;

  for (;;) {
    const url = appwriteRequestUrl(
      config.endpoint,
      `/databases/${config.databaseId}/collections/${collectionId}/documents`,
      [`limit(${limit})`, `offset(${offset})`]
    );

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Appwrite-Project': config.projectId,
        'X-Appwrite-Key': config.apiKey,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Appwrite request failed (${response.status}): ${body}`);
    }

    const payload = await response.json();
    const docs = Array.isArray(payload.documents) ? payload.documents : [];
    allDocuments.push(...docs);

    if (docs.length < limit) {
      break;
    }

    offset += docs.length;
  }

  return allDocuments;
}

async function upsertInBatches(supabase, table, rows, onConflict) {
  if (rows.length === 0) return;

  for (const batch of chunkArray(rows, 250)) {
    const { error } = await supabase.from(table).upsert(batch, {
      onConflict,
      ignoreDuplicates: false,
    });

    if (error) {
      throw new Error(`Supabase upsert failed for table "${table}": ${error.message}`);
    }
  }
}

async function main() {
  const appwrite = {
    endpoint: getRequiredEnv('APPWRITE_ENDPOINT'),
    projectId: getRequiredEnv('APPWRITE_PROJECT_ID'),
    apiKey: getRequiredEnv('APPWRITE_API_KEY'),
    databaseId: getRequiredEnv('APPWRITE_DATABASE_ID'),
    receiptsCollectionId: getOptionalEnv('APPWRITE_RECEIPTS_COLLECTION_ID', 'receipts'),
    countersCollectionId: getOptionalEnv('APPWRITE_COUNTERS_COLLECTION_ID', 'counters'),
    adminAuditCollectionId: getOptionalEnv('APPWRITE_ADMIN_AUDIT_COLLECTION_ID', 'admin_audit_logs'),
  };

  const supabaseUrl = getRequiredEnv('SUPABASE_URL');
  const supabaseServiceRoleKey = getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY');
  const receiptsTable = getOptionalEnv('SUPABASE_RECEIPTS_TABLE', 'receipts');
  const auditTable = getOptionalEnv('SUPABASE_ADMIN_AUDIT_TABLE', 'admin_audit_logs');
  const countersTable = 'counters';

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  console.log('Fetching Appwrite documents...');

  const [appwriteReceipts, appwriteCounters, appwriteAuditLogs] = await Promise.all([
    listAllAppwriteDocuments(appwrite, appwrite.receiptsCollectionId),
    listAllAppwriteDocuments(appwrite, appwrite.countersCollectionId),
    listAllAppwriteDocuments(appwrite, appwrite.adminAuditCollectionId),
  ]);

  const receiptRows = appwriteReceipts
    .map((doc) => ({
      id: String(doc.$id ?? '').trim(),
      receipt_number: String(doc.receiptNumber ?? '').trim(),
      client_name: String(doc.clientName ?? '').trim(),
      client_email: String(doc.clientEmail ?? '').trim(),
      company_name: doc.companyName ? String(doc.companyName).trim() : null,
      issue_date: toIsoDate(doc.issueDate),
      due_date: doc.dueDate ? toIsoDate(doc.dueDate, null) : null,
      items: parseItems(doc.items),
      subtotal: toNumber(doc.subtotal),
      tax: toNumber(doc.tax),
      discount: toNumber(doc.discount),
      total: toNumber(doc.total),
      notes: String(doc.notes ?? ''),
      status: sanitizeStatus(doc.status),
      created_at: toIsoTimestamp(doc.$createdAt),
    }))
    .filter((row) => row.id && row.receipt_number && row.client_name && row.client_email);

  const counterRows = appwriteCounters
    .map((doc) => ({
      name: String(doc.name ?? '').trim(),
      count: Math.max(0, Math.trunc(toNumber(doc.count))),
      updated_at: new Date().toISOString(),
    }))
    .filter((row) => row.name);

  const auditRows = appwriteAuditLogs
    .map((doc) => ({
      id: String(doc.$id ?? '').trim(),
      event: doc.event === 'login' || doc.event === 'logout' || doc.event === 'visit' ? doc.event : 'visit',
      email: String(doc.email ?? ''),
      path: String(doc.path ?? ''),
      ip: String(doc.ip ?? ''),
      user_agent: String(doc.userAgent ?? ''),
      device_type: String(doc.deviceType ?? 'unknown'),
      browser: String(doc.browser ?? 'unknown'),
      os: String(doc.os ?? 'unknown'),
      city: String(doc.city ?? ''),
      region: String(doc.region ?? ''),
      country: String(doc.country ?? ''),
      created_at: toIsoTimestamp(doc.$createdAt),
    }))
    .filter((row) => row.id);

  console.log(`Migrating ${receiptRows.length} receipts...`);
  await upsertInBatches(supabase, receiptsTable, receiptRows, 'id');

  console.log(`Migrating ${counterRows.length} counters...`);
  await upsertInBatches(supabase, countersTable, counterRows, 'name');

  console.log(`Migrating ${auditRows.length} admin audit logs...`);
  await upsertInBatches(supabase, auditTable, auditRows, 'id');

  console.log('Migration complete.');
  console.log(
    JSON.stringify(
      {
        receipts: receiptRows.length,
        counters: counterRows.length,
        adminAuditLogs: auditRows.length,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error('Migration failed:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
