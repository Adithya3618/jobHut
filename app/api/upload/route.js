import { NextResponse } from 'next/server'
import { Buffer } from 'buffer'
import pdf from 'pdf-parse'
import mammoth from 'mammoth'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    let text = ''

    if (file.type === 'application/pdf') {
      const pdfData = await pdf(buffer)
      text = pdfData.text
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else {
      return NextResponse.json({ success: false, error: 'Unsupported file type' }, { status: 400 })
    }

    return NextResponse.json({ success: true, text })
  } catch (error) {
    console.error('Error in file upload:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

