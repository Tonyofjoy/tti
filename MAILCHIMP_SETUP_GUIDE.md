# Mailchimp Integration Setup Guide

## Overview
This guide explains how to properly map your contact form fields to Mailchimp merge fields and configure environment variables.

## Step 1: Environment Variables Setup

**Create a `.env.local` file** in your project root with the following configuration:

```env
# Mailchimp Configuration
MAILCHIMP_API_KEY=51554d640881b87e3fdc7ed575347202-us10
MAILCHIMP_API_SERVER=us10
MAILCHIMP_AUDIENCE_ID=3dc648c101

# MongoDB Configuration (if not already set)
# MONGODB_URI=your_mongodb_connection_string

# Admin Configuration (if not already set)
# JWT_SECRET=your_jwt_secret_key
# ADMIN_USERNAME=your_admin_username
# ADMIN_PASSWORD=your_admin_password
```

**Important Security Notes:**
- Never commit `.env.local` or `.env` files to version control
- The `.gitignore` file should include `.env*` to prevent accidental commits
- Use different API keys for development and production environments

## Step 2: Create Custom Merge Fields in Mailchimp

1. **Log in to your Mailchimp account**
2. **Navigate to Audience Settings:**
   - Go to **Audience** → **All contacts**
   - Click **Settings** → **Audience fields and |*MERGE*| tags**

3. **Add Custom Fields:**
   For the contact form integration, you need to create these custom fields:

   | Field Name | Merge Tag | Field Type | Required |
   |------------|-----------|------------|----------|
   | Subject | `SUBJECT` | Text | No |
   | Message | `MESSAGE` | Text | No |
   | Phone | `PHONE` | Phone | No |
   | Company | `COMPANY` | Text | No |

## Step 3: Field Mapping Configuration

### Default Fields (Already exist in Mailchimp):
- **Email Address** - Primary identifier (automatically mapped)
- **First Name** - `FNAME` merge tag
- **Last Name** - `LNAME` merge tag

### Custom Fields (You need to create these):
- **Subject** - `SUBJECT` merge tag (Contact inquiry subject)
- **Message** - `MESSAGE` merge tag (Contact message content)
- **Phone** - `PHONE` merge tag (Optional, for future use)
- **Company** - `COMPANY` merge tag (Optional, for future use)

## Step 4: How the Mapping Works

### Environment Variables:
```env
MAILCHIMP_API_KEY=51554d640881b87e3fdc7ed575347202-us10
MAILCHIMP_API_SERVER=us10
MAILCHIMP_AUDIENCE_ID=3dc648c101
```

### In Your Contact Form:
```typescript
const formData = {
  name: "John Doe",           // → Split into FNAME & LNAME
  email: "john@example.com",  // → Email Address
  subject: "Website Inquiry", // → SUBJECT merge field
  message: "I need help...",  // → MESSAGE merge field
  subscribeToNewsletter: true // → Controls if Mailchimp is called
}
```

### In Mailchimp:
- **Email:** john@example.com
- **FNAME:** John
- **LNAME:** Doe
- **SUBJECT:** Website Inquiry
- **MESSAGE:** I need help...
- **Tags:** contact-form (automatically added)

## Step 5: Testing the Integration

1. **Restart your development server** after adding environment variables
2. **Submit a test contact form** with newsletter subscription checked
3. **Check your Mailchimp audience** for the new subscriber
4. **Verify the merge fields** are populated correctly
5. **Check the console logs** for any errors

## Step 6: Environment Variable Management

### Development (.env.local):
```env
MAILCHIMP_API_KEY=your_development_api_key
MAILCHIMP_API_SERVER=us10
MAILCHIMP_AUDIENCE_ID=your_development_audience_id
```

### Production:
- Set environment variables in your hosting platform (Vercel, Netlify, etc.)
- Use production Mailchimp API keys and audience IDs
- Never expose API keys in client-side code

### For Vercel:
1. Go to your project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the Mailchimp variables for production

## Step 7: Customizing Field Mapping

### To add new fields:

1. **Create the merge field in Mailchimp** (e.g., `PHONE`)
2. **Update the mapping in `lib/mailchimp.ts`:**
   ```typescript
   const MERGE_FIELD_MAPPING = {
     // ... existing fields
     PHONE: 'PHONE',  // Add new field
   };
   ```
3. **Add the field handling:**
   ```typescript
   if (contactData.phone && MERGE_FIELD_MAPPING.PHONE) {
     merge_fields[MERGE_FIELD_MAPPING.PHONE] = contactData.phone;
   }
   ```
4. **Update your contact forms** to include the new field
5. **Update the API calls** to pass the new field data

## Step 8: Security Features

### Built-in Security Measures:
1. **Environment variable validation** - warns if config is missing
2. **Graceful degradation** - form still works if Mailchimp fails
3. **No client-side API keys** - all Mailchimp calls happen server-side
4. **Input sanitization** - character limits and data validation

### Configuration Validation:
The integration includes automatic validation:
- Warns if `MAILCHIMP_API_KEY` is missing
- Warns if `MAILCHIMP_AUDIENCE_ID` is missing
- Continues to save contact data even if Mailchimp fails

## Step 9: Character Limits & Best Practices

### Mailchimp Field Limits:
- **Text fields:** Usually 255 characters max
- **Message field:** Truncated to 500 characters in our implementation
- **Subject field:** Truncated to 255 characters

### Best Practices:
1. **Always handle errors gracefully** - don't fail form submission if Mailchimp fails
2. **Use tags** to organize subscribers (e.g., 'contact-form', 'newsletter', etc.)
3. **Respect user preferences** - only subscribe if they opt-in
4. **Test thoroughly** before going live
5. **Monitor logs** for any API errors
6. **Use environment-specific configurations**

## Troubleshooting

### Common Issues:

1. **"MAILCHIMP_API_KEY environment variable is not set" warning:**
   - Create `.env.local` file with your API key
   - Restart your development server
   - Check that the variable name matches exactly

2. **"Merge field doesn't exist" error:**
   - Make sure you created the custom field in Mailchimp
   - Check that the merge tag name matches exactly

3. **"Invalid API key" error:**
   - Verify your API key in `.env.local`
   - Make sure the API server (us10) matches your account

4. **"List/Audience not found" error:**
   - Verify the AUDIENCE_ID in `.env.local`
   - Check that the audience exists in your Mailchimp account

5. **Subscriber not appearing:**
   - Check if email is already subscribed
   - Look for the subscriber in "Cleaned" or "Unsubscribed" lists
   - Check console logs for error messages

### Debug Mode:
The integration includes console logging. Check your browser's developer console or server logs for detailed information about API calls and responses.

## Current Configuration

Your integration should be configured with these environment variables:
- **MAILCHIMP_API_KEY:** 51554d640881b87e3fdc7ed575347202-us10
- **MAILCHIMP_API_SERVER:** us10  
- **MAILCHIMP_AUDIENCE_ID:** 3dc648c101

Make sure these values are set in your `.env.local` file and match your actual Mailchimp account settings. 