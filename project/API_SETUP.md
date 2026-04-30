# API Setup Guide

This project now includes a backend API server to handle form submissions from the LeadForm component.

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@vistaheights.com

# Server Configuration
PORT=3001
```

### 2. Email Configuration

For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an "App Password" 
3. Use the app password in the `EMAIL_PASS` variable

For other email services, update the `service` field in `server.js`.

### 3. Running the Application

#### Option 1: Run both frontend and backend together
```bash
npm run dev:full
```

#### Option 2: Run them separately
Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 4. API Endpoints

- `POST /api/submit-lead` - Handles form submissions
- `GET /api/health` - Health check endpoint

### 5. Form Data Structure

The API expects the following data structure:

```json
{
  "firstName": "string",
  "lastName": "string", 
  "email": "string",
  "phone": "string (optional)",
  "tourType": "virtual|in-person",
  "message": "string (optional)",
  "contactPreference": "email|phone",
  "preferredDate": "string (optional)",
  "preferredTime": "string (optional)",
  "formType": "tour-request|information-request",
  "timestamp": "ISO string"
}
```

### 6. Email Notifications

When a form is submitted, an email will be sent to the `ADMIN_EMAIL` address with all the form details.

### 7. Error Handling

The API includes validation for required fields and proper error responses. Check the browser console and server logs for any issues.

## Production Deployment

For production, consider:
- Using a proper email service (SendGrid, AWS SES, etc.)
- Adding rate limiting
- Implementing CSRF protection
- Using environment-specific configurations
- Setting up a database to store submissions 