import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API route to handle lead form submissions and log to terminal
app.post('/api/submit-lead', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      tourType,
      message,
      contactPreference,
      preferredDate,
      preferredTime,
      formType,
      timestamp,
      source
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: firstName, lastName, email'
      });
    }

    // Log the submission to console with detailed information
    console.log('\n🎯 === NEW LEAD SUBMISSION ===');
    console.log('📅 Timestamp:', new Date().toLocaleString());
    console.log('👤 Name:', `${firstName} ${lastName}`);
    console.log('📧 Email:', email);
    console.log('📱 Phone:', phone || 'Not provided');
    console.log('📋 Form Type:', formType || 'information-request');
    console.log('🌐 Source:', source || 'marina-heights-website');
    
    if (formType === 'tour-request') {
      console.log('🏠 Tour Type:', tourType || 'Not specified');
      console.log('📅 Preferred Date:', preferredDate || 'Not specified');
      console.log('⏰ Preferred Time:', preferredTime || 'Not specified');
    }
    
    console.log('📞 Contact Preference:', contactPreference || 'email');
    console.log('💬 Message:', message || 'No message provided');
    console.log('==========================\n');

    // Prepare data for BigQuery API
    const bigQueryData = {
      "First Name": firstName,
      "Last Name": lastName,
      "Email": email,
      "Phone": phone,
      "Message": message,
      "Created at": timestamp || new Date().toISOString()
    };

    // Try to send to BigQuery API (if available)
    try {
      const response = await fetch('http://localhost:3000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bigQueryData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Successfully sent to BigQuery API');
        console.log('📊 Response:', result);
        
        res.json({
          success: true,
          message: 'Form submitted successfully! We will contact you soon.',
          data: result
        });
      } else {
        console.log('⚠️ BigQuery API not available, but form data logged to terminal');
        res.json({
          success: true,
          message: 'Form submitted successfully! We will contact you soon.',
          note: 'Data logged to terminal (BigQuery API not available)'
        });
      }
    } catch (apiError) {
      console.log('⚠️ BigQuery API not available, but form data logged to terminal');
      console.log('🔧 API Error:', apiError.message);
      
      res.json({
        success: true,
        message: 'Form submitted successfully! We will contact you soon.',
        note: 'Data logged to terminal (BigQuery API not available)'
      });
    }

  } catch (error) {
    console.error('❌ Error submitting form:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Server is running and ready to receive form submissions'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Form endpoint: http://localhost:${PORT}/api/submit-lead`);
  console.log(`📊 Form submissions will be logged to this terminal\n`);
}); 