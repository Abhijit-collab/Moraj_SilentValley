import { BigQuery } from '@google-cloud/bigquery';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { first_name, last_name, email, phone, message, utm_source, utm_medium, utm_campaign, client_id } = req.body;

    const bigquery = new BigQuery({
      projectId: process.env.BQ_PROJECT_ID,
      credentials: JSON.parse(process.env.BQ_CREDENTIALS),
    });

    const dataset = bigquery.dataset(process.env.BQ_DATASET);
    const table = dataset.table(process.env.BQ_TABLE);

    await table.insert({
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "phone": phone,
      "message": message,
      "utm_source": utm_source || '',
      "utm_medium": utm_medium || '',
      "utm_campaign": utm_campaign || '',
      "client_id": client_id || '',
      "submitted_at": new Date().toISOString(),
    });

    return res.status(200).json({ message: 'Success' });
  } catch (err) {
    if (err.name === 'PartialFailureError') {
      err.errors.forEach((insertError, index) => {
        console.error(`Row ${index + 1} failed:`, {
          row: insertError.row,
          details: insertError.errors
        });
      });
    } else {
      console.error('BigQuery Insert Error:', err);
    }

    return res.status(500).json({
      message: 'BigQuery insert failed',
      error: err.message || 'Unknown insert error',
    });
  }
} 