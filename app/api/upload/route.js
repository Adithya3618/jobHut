import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import pdf from 'pdf-parse'
import mammoth from 'mammoth'

export async function POST(request) {
  const data = await request.formData()
  const file = data.get('file')

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = join('/tmp', file.name)
  await writeFile(path, buffer)

  let text = ''

  if (file.type === 'application/pdf') {
    const pdfData = await pdf(buffer)
    text = pdfData.text
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ buffer })
    text = result.value
  } else {
    return NextResponse.json({ success: false, error: 'Unsupported file type' })
  }

  return NextResponse.json({ success: true, text })
}

export const config = {
  api: {
    bodyParser: false,
  },
}

