'use client';

import { useState } from 'react';
import { Upload, FileText, Briefcase, AlertCircle } from 'lucide-react';

export default function ResumeAnalysisForm() {
  const [resumeContent, setResumeContent] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [analysisType, setAnalysisType] = useState('resume');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(selectedFile.type)
    ) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please upload a PDF or Word document');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);

    let content = resumeContent;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`File upload failed: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data.success) {
          content = data.text;
        } else {
          throw new Error(data.error || 'File upload failed');
        }
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
        return;
      }
    }

    if (!content) {
      setIsLoading(false);
      setError('Please provide resume content or upload a file');
      return;
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_API_KEY}`;

    let prompt = `Analyze the following resume and provide a detailed assessment. Include:
    1. Overall score out of 10
    2. Strengths of the resume
    3. Areas for improvement
    4. Missing key elements or keywords
    5. Suggestions for better formatting or structure
    6. Any additional advice for the job seeker

    Resume content:
    ${content}`;

    if (analysisType === 'job' && jobDescription) {
      prompt += `\n\nJob Description:\n${jobDescription}\n\nAdditionally, assess how well the resume matches the job description, including:
      1. Key skills or experiences that align well
      2. Important requirements from the job description that are missing in the resume
      3. Suggestions for tailoring the resume to this specific job`;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        setResult(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setError('An error occurred while analyzing the resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Resume Analysis Tool</h2>
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
            <input
              type="file"
              id="fileUpload"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Type</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setAnalysisType('resume')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  analysisType === 'resume'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <FileText className="mr-2 h-5 w-5" />
                Resume Only
              </button>
              <button
                type="button"
                onClick={() => setAnalysisType('job')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  analysisType === 'job'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <div className="flex">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-inner">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Analysis Result</h3>
            <div className="prose max-w-none">
              {result.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
