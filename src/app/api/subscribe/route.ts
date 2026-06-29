import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    let apiKey = process.env.MAILCHIMP_API_KEY
    let listId = process.env.MAILCHIMP_AUDIENCE_ID || process.env.MAILCHIMP_LIST_ID

    // Fallback to reading mailchipAPIkey.txt if environment variable is missing
    if (!apiKey) {
      try {
        const keyFilePath = path.join(process.cwd(), 'mailchipAPIkey.txt')
        if (fs.existsSync(keyFilePath)) {
          const fileContent = fs.readFileSync(keyFilePath, 'utf-8').trim()
          if (fileContent) {
            apiKey = fileContent
          }
        }
      } catch (err) {
        console.error('Error reading MailChimp API key file:', err)
      }
    }

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'MailChimp API key is missing. Please add your key to MailChimp API key.txt or .env.local',
        },
        { status: 500 }
      )
    }

    // Extract datacenter prefix from key (e.g. key-us21 => us21)
    const datacenter = apiKey.includes('-') ? apiKey.split('-')[1] : null

    if (!datacenter) {
      return NextResponse.json(
        {
          error:
            'Invalid MailChimp API key format. It should end with a datacenter prefix (e.g. -us21).',
        },
        { status: 400 }
      )
    }

    const authHeader = `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`

    // Auto-discover Audience ID if not explicitly provided
    if (!listId) {
      try {
        const listsRes = await fetch(`https://${datacenter}.api.mailchimp.com/3.0/lists`, {
          headers: { Authorization: authHeader },
        })
        const listsData = await listsRes.json()
        if (listsData.lists && listsData.lists.length > 0) {
          listId = listsData.lists[0].id
        }
      } catch (err) {
        console.error('Failed to auto-discover MailChimp list ID:', err)
      }
    }

    if (!listId) {
      return NextResponse.json(
        {
          error:
            'MailChimp Audience ID is missing and could not be auto-discovered. Please set MAILCHIMP_AUDIENCE_ID in .env.local',
        },
        { status: 500 }
      )
    }

    const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${listId}/members`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    })

    const data = await response.json()

    if (response.status >= 400) {
      if (data.title === 'Member Exists') {
        return NextResponse.json({
          success: true,
          message: "You're already subscribed 🤍",
        })
      }
      return NextResponse.json(
        { error: data.detail || 'Unable to subscribe at this time.' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      message: "You're on the list 🤍 I'll be in touch.",
    })
  } catch (error) {
    console.error('MailChimp subscribe error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}
