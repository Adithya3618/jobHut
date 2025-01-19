'use client'

import { useState } from 'react'
import { Upload, FileText, Briefcase, AlertCircle } from 'lucide-react'

export default function ResumeAnalysisForm() {
  const [resumeContent, setResumeContent] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [file, setFile] = useState(null)
  const [analysisType, setAnalysisType] = useState('resume')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB')
      setFile(null)
      return
    }

    if (selectedFile.type === 'application/pdf' || 
        selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setFile(selectedFile)
      setError(null)
    } else {
      setError('Please upload a PDF or Word document')
      setFile(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)
    setError(null)
    setUploadProgress(0)

    let content = resumeContent

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'File upload failed')
        }

        const data = await response.json()
        if (data.success) {
          content = data.text
          setUploadProgress(100)
        } else {
          throw new Error(data.error || 'Failed to extract text from file')
        }
      } catch (error) {
        setIsLoading(false)
        setError(error.message || 'An unknown error occurred during file upload')
        return
      }
    }

    if (!content) {
      setIsLoading(false)
      setError('Please provide resume content or upload a file')
      return
    }

    try {
      const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB5OXRVT7-ga8OaCKMIqyACEA8A0TVZ6ZE"
      
      let prompt = `Analyze the following resume and provide a detailed assessment. Include:
      1. Overall score out of 10
      2. Strengths of the resume
      3. Areas for improvement
      4. Missing important keywords or sections
      5. Suggestions for better formatting or structure
      6. Any additional advice for making the resume stand out

      Resume content:
      ${content}`
      
      if (analysisType === 'job' && jobDescription) {
        prompt = `Analyze the following resume for the given job description. Provide a detailed assessment including:
        1. Overall score out of 10 for job fit
        2. Strengths of the resume in relation to the job
        3. Areas for improvement to better match the job requirements
        4. Missing important keywords or qualifications from the job description
        5. Suggestions for tailoring the resume to this specific job
        6. Any additional advice for increasing chances of getting an interview

        Resume content:
        ${content}

        Job Description:
        ${jobDescription}`
      }

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

      if (!response.ok) {
        throw new Error('Failed to analyze resume')
      }

      const data = await response.json()
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        setResult(data.candidates[0].content.parts[0].text)
      } else {
        throw new Error('Invalid response from API')
      }
    } catch (error) {
      console.error('Error analyzing resume:', error)
      setError('An error occurred while analyzing the resume. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Resume Analysis Tool</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="resumeContent" className="block text-sm font-medium text-gray-700 mb-1">
              Paste your resume content
            </label>
            <textarea
              id="resumeContent"
              rows={10}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={resumeContent}
              onChange={(e) => setResumeContent(e.target.value)}
              placeholder="Paste your resume content here..."
            ></textarea>
          </div>

          <div>
            <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-1">
              Or upload your resume (PDF or Word)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="fileUpload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Upload a file</span>
                    <input
                      id="fileUpload"
                      name="fileUpload"
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF or Word up to 10MB</p>
              </div>
            </div>
            {file && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Selected file: {file.name}</p>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Analysis Type</label>
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
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                id="jobDescription"
                rows={5}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
              ></textarea>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-inner">
            <h3 className="text-xl font-bold mb-4">Analysis Result</h3>
            <div className="prose max-w-none">
              {result.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

