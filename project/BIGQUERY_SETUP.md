# BigQuery Integration Setup

## Environment Variables Required

Add these environment variables to your Vercel project:

### 1. GOOGLE_CLOUD_PROJECT_ID
Your Google Cloud Project ID where BigQuery is set up.

### 2. GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY
The full JSON service account key for BigQuery access. This should be the complete JSON string including all fields.

Example format:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account@your-project-id.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project-id.iam.gserviceaccount.com"
}
```

## BigQuery Table Schema

The API expects a table with the following schema in `lead_dataset.raw_leads`:

```sql
CREATE TABLE `lead_dataset.raw_leads` (
  `first_name` STRING NOT NULL,
  `last_name` STRING NOT NULL,
  `email` STRING NOT NULL,
  `phone` STRING,
  `tour_type` STRING,
  `message` STRING,
  `contact_preference` STRING,
  `preferred_date` DATE,
  `preferred_time` STRING,
  `form_type` STRING,
  `timestamp` TIMESTAMP,
  `source` STRING,
  `created_at` TIMESTAMP
);
```

## Installation

1. Install the BigQuery dependency:
```bash
npm install @google-cloud/bigquery
```

2. Deploy to Vercel with the environment variables set.

## Testing

The form will now submit to `/api/submit` and store data in BigQuery. You can test by:

1. Filling out the "Schedule a visit" form
2. Submitting the form
3. Checking the BigQuery table for new records

## API Endpoint

- **URL**: `/api/submit`
- **Method**: POST
- **Content-Type**: application/json

### Request Body
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "tourType": "virtual",
  "message": "Interested in 2BHK",
  "contactPreference": "email",
  "preferredDate": "2024-01-15",
  "preferredTime": "2:00 PM",
  "formType": "tour-request",
  "timestamp": "2024-01-10T10:30:00Z",
  "source": "marina-heights-website"
}
```

### Response
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "data": {
    "id": "job-id",
    "timestamp": "2024-01-10T10:30:00Z"
  }
}
``` 