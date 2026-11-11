import { createClient } from '@libsql/client';

// ⚠️ PASTE YOUR URL AND TOKEN HERE
const db = createClient({
  url: 'libsql://sams-academy-db-drsamsacademy.aws-ap-south-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTQ0MTA3ODMsImlkIjoiMDFhMWNiMzYtMjEwMS03YzhkLTg2NTItMTllOTRjNzIyY2Q0Iiwia2lkIjoiOURVUlR0dGlHZWFVX25KT0UycTl4SmRNRjVzN0VhOVpEUjFDQ05qMHdJQSIsInJpZCI6ImI5OGYzY2JkLTkwMDktNDdmMi05YTMzLTZjMTEwZjc1NGU4MiJ9.XSAQjv_Tic1TLtliZi1qhTd-LpLN4-gKPVgaVijpeHuqrXg2121Qwh4DSSj1qrGPjfOhR1yR_F4hXqB8JejvDw'
});

// This creates the table in the cloud
await db.execute(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    link_url TEXT,
    file_url TEXT, 
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;