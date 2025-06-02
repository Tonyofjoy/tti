import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { MongoClient, MongoServerError } from 'mongodb'
import { subscribeToMailchimp } from '@/lib/mailchimp'

export async function POST(req: Request) {
  let client: MongoClient | null = null;
  
  try {
    const body = await req.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    try {
      // Get MongoDB client - wrap in try/catch to handle connection issues
      client = await clientPromise
      const db = client.db("tony_tech")
      
      // Prepare contact data
      const contactData = {
        ...body,
        createdAt: new Date(),
        status: 'new'
      }

      // Insert the document
      const result = await db.collection("contacts").insertOne(contactData)

      // Attempt to subscribe to Mailchimp (don't block the response on this)
      try {
        // Only subscribe if the user opted in
        if (body.subscribeToNewsletter) {
          const mailchimpContactData = {
            name: body.name,
            subject: body.subject,
            message: body.message,
            // Add other fields as needed:
            // phone: body.phone,
            // company: body.company,
          }
          
          // Non-blocking Mailchimp subscription
          subscribeToMailchimp(body.email, mailchimpContactData)
            .then(mailchimpResult => {
              if (mailchimpResult.success) {
                console.log('Successfully subscribed to Mailchimp:', body.email)
              } else {
                console.error('Mailchimp subscription failed:', mailchimpResult.error)
              }
            })
            .catch(err => {
              console.error('Error during Mailchimp subscription:', err)
            })
        } else {
          console.log('User opted out of newsletter subscription')
        }
      } catch (mailchimpError) {
        // Log but don't fail the request if Mailchimp fails
        console.error('Failed to subscribe to Mailchimp:', mailchimpError)
      }

      return NextResponse.json({ 
        success: true,
        message: "Contact form submitted successfully",
        id: result.insertedId 
      })
    } catch (dbError) {
      console.error('Database connection error:', dbError)
      
      // Try to submit to Mailchimp even if DB fails
      try {
        // Only subscribe if the user opted in
        if (body.subscribeToNewsletter) {
          const mailchimpContactData = {
            name: body.name,
            subject: body.subject,
            message: body.message,
            // Add other fields as needed:
            // phone: body.phone,
            // company: body.company,
          }
          
          // Non-blocking Mailchimp subscription
          subscribeToMailchimp(body.email, mailchimpContactData)
            .catch(err => {
              console.error('Error during Mailchimp subscription (DB fallback):', err)
            })
        } else {
          console.log('User opted out of newsletter subscription')
        }
      } catch (mailchimpError) {
        console.error('Failed to subscribe to Mailchimp (DB fallback):', mailchimpError)
      }
      
      // Still return success even if DB fails - will be handled by log monitoring
      return NextResponse.json({ 
        success: true,
        message: "Contact form submitted",
        warning: "Database connection issue, but form data was received"
      })
    }

  } catch (error) {
    console.error('Error in contact API:', error)
    
    if (error instanceof MongoServerError) {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again later.' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
} 