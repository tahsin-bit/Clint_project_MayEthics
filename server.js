import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const SPREADSHEET_ID = '17AXnqMO4sh7FzqMp1lFgS4GXK3dpZEqmNVLCSxyeT2Q';
const KEYFILE_PATH = path.join(__dirname, 'xenon-hub-513620-r1-efbfc39774f9.json');

// Google Sheets Auth
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILE_PATH,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function getSheetsInstance() {
  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client });
}

// Ensure Headers Exist on Startup or First Write
async function ensureHeaders() {
  try {
    const sheets = await getSheetsInstance();
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const sheetTitles = (meta.data.sheets || []).map(s => s.properties?.title);

    // 1. Ensure "Orders" tab exists
    if (!sheetTitles.includes('Orders')) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: { title: 'Orders' },
              },
            },
          ],
        },
      });
      // Add Order Headers
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Orders!A1:K1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              'Timestamp',
              'Order ID',
              'Customer Name',
              'Phone',
              'Delivery City',
              'Full Address',
              'Items Details',
              'Total Amount (BDT)',
              'Promo Code',
              'Payment Mode',
              'Transaction ID (TrxID)',
              'Order Notes'
            ],
          ],
        },
      });
    }

    // 2. Ensure "Contact Messages" tab exists
    if (!sheetTitles.includes('Contact Messages')) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: { title: 'Contact Messages' },
              },
            },
          ],
        },
      });
      // Add Contact Headers
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: "'Contact Messages'!A1:F1",
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              'Timestamp',
              'Sender Name',
              'Email',
              'Phone',
              'Subject',
              'Message'
            ],
          ],
        },
      });
    }
  } catch (err) {
    console.error('Error ensuring headers in Google Sheets:', err.message);
  }
}

// Route to handle new Order
app.post('/api/orders', async (req, res) => {
  try {
    const {
      orderId,
      name,
      phone,
      address,
      city,
      items,
      total,
      promoCode,
      paymentMethod,
      transactionId,
      notes,
    } = req.body;

    const sheets = await getSheetsInstance();
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });

    // Format items summary nicely
    const itemsSummary = (items || [])
      .map(i => `${i.name} (Color: ${i.color}, Size: ${i.size}, Qty: ${i.qty})`)
      .join(' | ');

    const rowData = [
      timestamp,
      orderId || 'N/A',
      name || '',
      phone || '',
      city || '',
      address || '',
      itemsSummary,
      total || 0,
      promoCode || 'NONE',
      paymentMethod || 'COD',
      transactionId || 'N/A',
      notes || ''
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Orders!A:L',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });

    res.json({ success: true, message: 'Order appended to Google Sheets' });
  } catch (error) {
    console.error('Google Sheets Order error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to handle Contact Form Messages
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const sheets = await getSheetsInstance();
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });

    const rowData = [
      timestamp,
      name || '',
      email || '',
      phone || '',
      subject || '',
      message || ''
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'Contact Messages'!A:F",
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });

    res.json({ success: true, message: 'Contact message appended to Google Sheets' });
  } catch (error) {
    console.error('Google Sheets Contact error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log(`Backend Sheets API running on http://localhost:${PORT}`);
  await ensureHeaders();
});

