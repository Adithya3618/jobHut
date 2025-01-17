'use client'

import { useState } from 'react'
import { Upload, FileText, Briefcase } from 'lucide-react'

export default function ResumeAnalysisForm() {
  const [resumeContent, setResumeContent] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [file, setFile] = useState(null)
  const [analysisType, setAnalysisType] = useState('resume')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFile(selectedFile)
    } else {
      alert('Please upload a PDF or Word document')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    let content = resumeContent

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      if (data.success) {
        content = data.text
      } else {
        setIsLoading(false)
        alert('Error uploading file')
        return
      }
    }

    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB5OXRVT7-ga8OaCKMIqyACEA8A0TVZ6ZE"
    
    let prompt = `Analyze the following resume and provide a score out of 10, suggestions for improvement, and identify any missing fields or keywords:\n\n${content}`
    
    if (analysisType === 'job' && jobDescription) {
      prompt = `Analyze the following resume for the given job description. Provide a score out of 10, suggestions for improvement, identify any missing fields or keywords, and assess the resume's suitability for the job:\n\nResume:\n${content}\n\nJob Description:\n${jobDescription}`
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      })

      const data = await response.json()
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        setResult(data.candidates[0].content.parts[0].text)
      } else {
        setResult('An error occurred while analyzing the resume. Please try again.')
      }
    } catch (error) {
      console.error('Error analyzing resume:', error)
      setResult('An error occurred while analyzing the resume. Please try again.')
    }

    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="resumeContent" className="block text-sm font-medium text-gray-700">
            Paste your resume content
          </label>
          <textarea
            id="resumeContent"
            rows={10}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={resumeContent}
            onChange={(e) => setResumeContent(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
            Or upload your resume (PDF or Word)
          </label>
          <input
            type="file"
            id="fileUpload"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Analysis Type</label>
          <div className="mt-2 space-x-4">
            <button
              type="button"
              onClick={() => setAnalysisType('resume')}
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                analysisType === 'resume'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FileText className="mr-2 h-5 w-5" />
              Resume Only
            </button>
            <button
              type="button"
              onClick={() => setAnalysisType('job')}
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                analysisType === 'job'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Briefcase className="mr-2 h-5 w-5" />
              With Job Description
            </button>
          </div>
        </div>

        {analysisType === 'job' && (
          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              id="jobDescription"
              rows={5}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading || (!resumeContent && !file)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  )
}

