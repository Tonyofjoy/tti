# Mailchimp Integration Setup Guide

## Overview
This guide explains how to properly map your contact form fields to Mailchimp merge fields.

## Step 1: Create Custom Merge Fields in Mailchimp

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

## Step 2: Field Mapping Configuration

### Default Fields (Already exist in Mailchimp):
- **Email Address** - Primary identifier (automatically mapped)
- **First Name** - `FNAME` merge tag
- **Last Name** - `LNAME` merge tag

### Custom Fields (You need to create these):
- **Subject** - `SUBJECT` merge tag (Contact inquiry subject)
- **Message** - `MESSAGE` merge tag (Contact message content)
- **Phone** - `PHONE` merge tag (Optional, for future use)
- **Company** - `COMPANY` merge tag (Optional, for future use)

## Step 3: How the Mapping Works

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

## Step 4: Testing the Integration

1. **Submit a test contact form** with newsletter subscription checked
2. **Check your Mailchimp audience** for the new subscriber
3. **Verify the merge fields** are populated correctly
4. **Check the console logs** for any errors

## Step 5: Customizing Field Mapping

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

## Step 6: Character Limits & Best Practices

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

## Troubleshooting

### Common Issues:

1. **"Merge field doesn't exist" error:**
   - Make sure you created the custom field in Mailchimp
   - Check that the merge tag name matches exactly

2. **"Invalid API key" error:**
   - Verify your API key in `lib/mailchimp.ts`
   - Make sure the API server (us10) matches your account

3. **"List/Audience not found" error:**
   - Verify the AUDIENCE_ID in `lib/mailchimp.ts`
   - Check that the audience exists in your Mailchimp account

4. **Subscriber not appearing:**
   - Check if email is already subscribed
   - Look for the subscriber in "Cleaned" or "Unsubscribed" lists
   - Check console logs for error messages

### Debug Mode:
The integration includes console logging. Check your browser's developer console or server logs for detailed information about API calls and responses.

## Current Configuration

Your integration is set up with:
- **API Key:** 51554d640881b87e3fdc7ed575347202-us10
- **Server:** us10
- **Audience ID:** 3dc648c101

Make sure these values match your actual Mailchimp account settings. 