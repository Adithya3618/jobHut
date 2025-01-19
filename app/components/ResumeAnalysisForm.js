'use client'

import { useState } from 'react'
import { Upload, FileText, Briefcase, AlertCircle, CheckCircle, Star, List, ArrowRight } from 'lucide-react'

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

    if (selectedFile.size > 10 * 1024 * 1024) {
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

  const formatAnalysisResult = (text) => {
    // Split the text into sections based on numbered points
    const sections = text.split(/(?=\d\.)/g).filter(Boolean)
    
    return sections.map(section => {
      const [title, ...content] = section.split('\n').filter(Boolean)
      return {
        title: title.trim(),
        content: content.join('\n').trim()
      }
    })
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
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_API_KEY}`
      
      let prompt = `Analyze the following resume and provide a detailed assessment. Include:
      1. Overall Score: Give a score out of 10 and explain why
      2. Key Strengths: List the main strengths and positive aspects
      3. Areas for Improvement: Identify specific areas that need enhancement
      4. Missing Elements: List important keywords or sections that should be added
      5. Format Suggestions: Provide specific formatting recommendations
      6. Expert Advice: Share additional tips to make the resume stand out

      Resume content:
      ${content}`
      
      if (analysisType === 'job' && jobDescription) {
        prompt = `Analyze the following resume for the given job description. Provide a detailed assessment including:
        1. Job Fit Score: Rate the match out of 10 and explain why
        2. Matching Strengths: List skills and experiences that align with the job
        3. Gap Analysis: Identify missing qualifications or skills
        4. Keyword Optimization: Suggest important keywords from the job description
        5. Tailoring Tips: Provide specific suggestions to customize the resume
        6. Interview Preparation: Share advice to address potential concerns

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
        const analysisText = data.candidates[0].content.parts[0].text
        setResult(formatAnalysisResult(analysisText))
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
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Analysis Tool</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="resumeContent" className="block text-sm font-medium text-gray-700 mb-1">
                Paste your resume content
              </label>
              <textarea
                id="resumeContent"
                rows={10}
                className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={resumeContent}
                onChange={(e) => setResumeContent(e.target.value)}
                placeholder="Paste your resume content here..."
              ></textarea>
            </div>

           

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAnalysisType('resume')}
                  className={`flex items-center justify-center px-4 py-3 border rounded-lg text-sm font-medium transition duration-200 ${
                    analysisType === 'resume'
                      ? 'bg-blue-600 text-white border-transparent'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Resume Analysis
                </button>
                <button
                  type="button"
                  onClick={() => setAnalysisType('job')}
                  className={`flex items-center justify-center px-4 py-3 border rounded-lg text-sm font-medium transition duration-200 ${
                    analysisType === 'job'
                      ? 'bg-blue-600 text-white border-transparent'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Job Match Analysis
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
                  className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
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
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : 'Analyze Resume'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Analysis Result</h3>
              <div className="space-y-6">
                {result.map((section, index) => (
                  <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      {index === 0 && <Star className="w-5 h-5 text-yellow-500 mr-2" />}
                      {index === 1 && <CheckCircle className="w-5 h-5 text-green-500 mr-2" />}
                      {index === 2 && <List className="w-5 h-5 text-blue-500 mr-2" />}
                      {index > 2 && <ArrowRight className="w-5 h-5 text-gray-500 mr-2" />}
                      {section.title}
                    </h4>
                    <div className="prose prose-sm max-w-none text-gray-600">
                      {section.content.split('\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="mb-2 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

