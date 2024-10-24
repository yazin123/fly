import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY;

async function getSheet() {
  try {
    console.log('Sheet ID:', SHEET_ID);
    console.log('Service Account Email:', GOOGLE_SERVICE_ACCOUNT_EMAIL);
    console.log('Private Key exists:', !!GOOGLE_PRIVATE_KEY);

    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });

    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    
    // Load the header row
    await sheet.loadHeaderRow();
    
    console.log('Sheet Title:', sheet.title);
    console.log('Sheet Row Count:', sheet.rowCount);
    console.log('Sheet Column Count:', sheet.columnCount);
    console.log('Sheet Headers:', sheet.headerValues);
    
    return sheet;
  } catch (error) {
    console.error('Error accessing Google Sheet:', error);
    throw new Error(`Failed to access Google Sheet: ${error.message}`);
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    
    const sheet = await getSheet();
    const rows = await sheet.getRows();
    
    const exists = rows.some(row => 
      row.get('email') === email || row.get('phone') === phone
    );
    
    return NextResponse.json({ exists });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to check registration', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Received POST data:', data);
    
    const sheet = await getSheet();
    
    // Prepare the row data
    const rowData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      timestamp: new Date().toISOString()
    };

    // Add answers to the row data
    if (data.answers) {
      Object.entries(data.answers).forEach(([id, answer]) => {
        rowData[`question_${id}`] = answer;
      });
    }
    
    console.log('Adding row with data:', rowData);
    
    try {
      // Add the row using the direct array approach
      const result = await sheet.addRow(rowData);
      console.log('Row added successfully:', result);
      
      // Verify the row was added
      const rows = await sheet.getRows();
      const lastRow = rows[rows.length - 1];
      console.log('Last row in sheet:', lastRow.toObject());
      
      return NextResponse.json({ success: true });
    } catch (addRowError) {
      console.error('Error adding row:', addRowError);
      throw addRowError;
    }
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit data', details: error.message },
      { status: 500 }
    );
  }
}