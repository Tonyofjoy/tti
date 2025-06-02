import md5 from 'md5';

// Mailchimp configuration from environment variables
const API_KEY = process.env.MAILCHIMP_API_KEY;
const API_SERVER = process.env.MAILCHIMP_API_SERVER || 'us10';
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

// Validate environment variables
if (!API_KEY) {
  console.warn('MAILCHIMP_API_KEY environment variable is not set. Mailchimp integration will be disabled.');
}

if (!AUDIENCE_ID) {
  console.warn('MAILCHIMP_AUDIENCE_ID environment variable is not set. Mailchimp integration will be disabled.');
}

// Define merge field mapping
// These correspond to the merge tags you set up in your Mailchimp audience
const MERGE_FIELD_MAPPING = {
  // Default Mailchimp fields (these exist by default)
  FNAME: 'FNAME',     // First Name
  LNAME: 'LNAME',     // Last Name
  
  // Custom fields - you need to create these in your Mailchimp audience settings
  // Format: MERGE_TAG_NAME: 'MERGE_TAG_NAME'
  SUBJECT: 'SUBJECT', // Contact subject/inquiry type
  MESSAGE: 'MESSAGE', // Contact message content
  PHONE: 'PHONE',     // Phone number (if you add this field later)
  COMPANY: 'COMPANY', // Company name (if you add this field later)
};

// Subscribe a new contact to Mailchimp audience/list
export async function subscribeToMailchimp(email: string, contactData: { 
  name?: string;
  subject?: string;
  message?: string;
  phone?: string;
  company?: string;
  [key: string]: any;
} = {}) {
  // Check if Mailchimp is properly configured
  if (!API_KEY || !AUDIENCE_ID) {
    console.warn('Mailchimp is not properly configured. Skipping subscription for:', email);
    return { 
      success: false, 
      error: 'Mailchimp configuration missing. Please set MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID environment variables.'
    };
  }

  try {
    // Create a subscriber hash for the provided email (md5 hash of lowercase email)
    const subscriberHash = md5(email.toLowerCase());
    
    // Prepare the request URL
    const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`;
    
    // Parse name into first and last name
    const nameParts = contactData.name?.trim().split(' ') || [];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    // Map contact form fields to Mailchimp merge fields
    const merge_fields: { [key: string]: string } = {};
    
    // Always include first and last name (default fields)
    if (firstName) merge_fields[MERGE_FIELD_MAPPING.FNAME] = firstName;
    if (lastName) merge_fields[MERGE_FIELD_MAPPING.LNAME] = lastName;
    
    // Add custom fields only if they have values and the merge field exists
    if (contactData.subject && MERGE_FIELD_MAPPING.SUBJECT) {
      merge_fields[MERGE_FIELD_MAPPING.SUBJECT] = contactData.subject.substring(0, 255); // Mailchimp has character limits
    }
    
    if (contactData.message && MERGE_FIELD_MAPPING.MESSAGE) {
      merge_fields[MERGE_FIELD_MAPPING.MESSAGE] = contactData.message.substring(0, 500); // Truncate long messages
    }
    
    if (contactData.phone && MERGE_FIELD_MAPPING.PHONE) {
      merge_fields[MERGE_FIELD_MAPPING.PHONE] = contactData.phone;
    }
    
    if (contactData.company && MERGE_FIELD_MAPPING.COMPANY) {
      merge_fields[MERGE_FIELD_MAPPING.COMPANY] = contactData.company;
    }
    
    // Prepare the request data
    const data = {
      email_address: email,
      status_if_new: 'subscribed',
      status: 'subscribed',
      merge_fields: merge_fields,
      tags: ['contact-form'], // Optional: tag subscribers from contact form
    };
    
    console.log('Sending to Mailchimp:', JSON.stringify(data, null, 2)); // Debug log
    
    // Make the API request
    const response = await fetch(url, {
      method: 'PUT', // Use PUT to update if exists or create if doesn't exist
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`apikey:${API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify(data),
    });
    
    // Parse and return the response
    const result = await response.json();
    
    if (!response.ok) {
      console.error('Mailchimp API Error:', result);
      throw new Error(result.title || result.detail || 'Failed to subscribe to newsletter');
    }
    
    console.log('Mailchimp success:', result.email_address, 'Status:', result.status);
    return { success: true, result };
    
  } catch (error) {
    console.error('Mailchimp subscription error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to subscribe to newsletter'
    };
  }
} 