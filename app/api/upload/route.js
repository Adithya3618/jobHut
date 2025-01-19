import { NextResponse } from 'next/server'
import PDFParser from 'pdf-parse/lib/pdf-parse.js'
import mammoth from 'mammoth'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    let text = ''

    try {
      if (file.type === 'application/pdf') {
        // Use the buffer directly with PDFParser
        const data = await PDFParser(buffer)
        text = data.text
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const result = await mammoth.extractRawText({ buffer })
        text = result.value
      } else {
        return NextResponse.json({ success: false, error: 'Unsupported file type' }, { status: 400 })
      }
    } catch (parseError) {
      console.error('Error parsing file:', parseError)
      return NextResponse.json({ success: false, error: 'Failed to parse file' }, { status: 400 })
    }

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'No text content found in file' }, { status: 400 })
    }

    return NextResponse.json({ success: true, text })
  } catch (error) {
    console.error('Error in file upload:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

