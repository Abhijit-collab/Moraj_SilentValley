# Production Form Submission Troubleshooting

## 🔍 **Quick Diagnosis Steps**

### 1. Test Environment Configuration
Visit your production URL + `/api/test` to check if BigQuery is properly configured:
```
https://your-domain.vercel.app/api/test
```

This will show you:
- ✅ Environment variables status
- ✅ Service account key validity
- ✅ BigQuery connection status
- ✅ Table access permissions

### 2. Check Vercel Logs
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Functions" tab
4. Look for `/api/submit` function logs
5. Check for error messages

## 🚨 **Common Production Errors & Solutions**

### **Error 1: "Missing required environment variables"**
**Symptoms:** Form submission fails with environment variable errors

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these variables:
   ```
   GOOGLE_CLOUD_PROJECT_ID = your-project-id
   GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY = {"type":"service_account",...}
   ```
3. Redeploy your project

### **Error 2: "Invalid GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY"**
**Symptoms:** JSON parsing errors

**Solution:**
1. Ensure the service account key is the complete JSON string
2. Copy the entire JSON from Google Cloud Console
3. Paste it as a single line in Vercel environment variables
4. No line breaks or formatting

### **Error 3: "BigQuery permission denied"**
**Symptoms:** PERMISSION_DENIED errors

**Solution:**
1. Check if service account has BigQuery permissions:
   - BigQuery Data Editor
   - BigQuery Job User
2. Verify the dataset and table exist
3. Ensure service account can access `lead_dataset.raw_leads`

### **Error 4: "Table not found"**
**Symptoms:** ENOTFOUND or table access errors

**Solution:**
1. Create the BigQuery table with this schema:
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

### **Error 5: "Database connection not available"**
**Symptoms:** BigQuery client not initialized

**Solution:**
1. Check environment variables are set correctly
2. Verify service account key is valid JSON
3. Ensure project ID matches the service account

## 🛠️ **Debugging Steps**

### **Step 1: Check Environment Variables**
```bash
# In Vercel dashboard, verify these are set:
GOOGLE_CLOUD_PROJECT_ID = your-actual-project-id
GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY = {"type":"service_account",...}
```

### **Step 2: Test BigQuery Connection**
1. Visit `/api/test` endpoint
2. Check all tests pass
3. If any fail, fix the specific issue

### **Step 3: Check Vercel Function Logs**
1. Submit a test form
2. Check Vercel function logs immediately
3. Look for specific error messages

### **Step 4: Verify BigQuery Setup**
1. Go to Google Cloud Console
2. Navigate to BigQuery
3. Verify `lead_dataset.raw_leads` table exists
4. Check service account permissions

## 📋 **Environment Variables Checklist**

### **Required Variables:**
- [ ] `GOOGLE_CLOUD_PROJECT_ID` - Your Google Cloud Project ID
- [ ] `GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY` - Complete JSON service account key

### **Service Account Key Must Include:**
- [ ] `type`: "service_account"
- [ ] `project_id`: Your project ID
- [ ] `private_key_id`: Key identifier
- [ ] `private_key`: The actual private key
- [ ] `client_email`: Service account email
- [ ] `client_id`: Client identifier
- [ ] `auth_uri`: "https://accounts.google.com/o/oauth2/auth"
- [ ] `token_uri`: "https://oauth2.googleapis.com/token"

## 🔧 **Quick Fix Commands**

### **1. Redeploy with Environment Variables**
```bash
# After setting environment variables in Vercel
vercel --prod
```

### **2. Test API Endpoint**
```bash
curl -X GET https://your-domain.vercel.app/api/test
```

### **3. Test Form Submission**
```bash
curl -X POST https://your-domain.vercel.app/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "formType": "information-request",
    "source": "marina-heights-website"
  }'
```

## 📞 **Still Having Issues?**

If you're still experiencing problems:

1. **Check the `/api/test` endpoint** - This will tell you exactly what's wrong
2. **Review Vercel function logs** - Look for specific error messages
3. **Verify BigQuery permissions** - Ensure service account has proper access
4. **Test with minimal data** - Try submitting with just required fields

The most common issue is missing or incorrectly formatted environment variables in Vercel. Double-check those first! 