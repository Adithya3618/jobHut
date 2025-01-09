import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { resume, jobDescription } = body;

    // Validate input
    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: 'Both resume and job description are required' },
        { status: 400 }
      );
    }

    // Extract key skills and requirements from job description
    const jobRequirements = extractRequirements(jobDescription);
    
    // Extract skills and experience from resume
    const resumeSkills = extractSkills(resume);
    
    // Calculate detailed match analysis
    const analysis = analyzeMatch(resumeSkills, jobRequirements);
    
    // Generate specific recommendations
    const recommendations = generateRecommendations(analysis, jobRequirements);

    return NextResponse.json({
      score: analysis.score,
      matchedSkills: analysis.matchedSkills,
      missingSkills: analysis.missingSkills,
      tips: recommendations,
      details: {
        technicalSkillsMatch: analysis.technicalMatch,
        experienceMatch: analysis.experienceMatch,
        educationMatch: analysis.educationMatch
      }
    });
  } catch (error) {
    console.error('Error in analyze-resume API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

function extractRequirements(jobDescription) {
  const requirements = {
    technicalSkills: [],
    softSkills: [],
    experience: null,
    education: null
  };

  // Technical skills extraction (common programming languages, tools, frameworks)
  const technicalKeywords = [
    'javascript', 'python', 'java', 'react', 'node', 'angular', 'vue', 
    'aws', 'docker', 'kubernetes', 'sql', 'nosql', 'mongodb', 'git',
    'ci/cd', 'rest', 'api', 'frontend', 'backend', 'full stack', 'devops'
  ];

  // Soft skills extraction
  const softKeywords = [
    'communication', 'leadership', 'teamwork', 'problem solving',
    'analytical', 'agile', 'scrum', 'project management'
  ];

  // Extract technical skills
  requirements.technicalSkills = technicalKeywords.filter(skill => 
    jobDescription.toLowerCase().includes(skill.toLowerCase())
  );

  // Extract soft skills
  requirements.softSkills = softKeywords.filter(skill => 
    jobDescription.toLowerCase().includes(skill.toLowerCase())
  );

  // Extract experience requirement
  const experienceMatch = jobDescription.match(/(\d+)[\+]?\s+years? of experience/i);
  if (experienceMatch) {
    requirements.experience = parseInt(experienceMatch[1]);
  }

  // Extract education requirement
  const educationKeywords = ['bachelor', 'master', 'phd', 'degree'];
  for (const edu of educationKeywords) {
    if (jobDescription.toLowerCase().includes(edu)) {
      requirements.education = edu;
      break;
    }
  }

  return requirements;
}

function extractSkills(resume) {
  const skills = {
    technicalSkills: [],
    softSkills: [],
    experience: null,
    education: null
  };

  // Similar technical and soft skills extraction as above
  const technicalKeywords = [
    'javascript', 'python', 'java', 'react', 'node', 'angular', 'vue', 
    'aws', 'docker', 'kubernetes', 'sql', 'nosql', 'mongodb', 'git',
    'ci/cd', 'rest', 'api', 'frontend', 'backend', 'full stack', 'devops'
  ];

  const softKeywords = [
    'communication', 'leadership', 'teamwork', 'problem solving',
    'analytical', 'agile', 'scrum', 'project management'
  ];

  skills.technicalSkills = technicalKeywords.filter(skill => 
    resume.toLowerCase().includes(skill.toLowerCase())
  );

  skills.softSkills = softKeywords.filter(skill => 
    resume.toLowerCase().includes(skill.toLowerCase())
  );

  // Extract experience
  const experienceMatch = resume.match(/(\d+)[\+]?\s+years? of experience/i);
  if (experienceMatch) {
    skills.experience = parseInt(experienceMatch[1]);
  }

  // Extract education
  const educationKeywords = ['bachelor', 'master', 'phd', 'degree'];
  for (const edu of educationKeywords) {
    if (resume.toLowerCase().includes(edu)) {
      skills.education = edu;
      break;
    }
  }

  return skills;
}

function analyzeMatch(resumeSkills, jobRequirements) {
  const analysis = {
    matchedSkills: [],
    missingSkills: [],
    technicalMatch: 0,
    experienceMatch: 0,
    educationMatch: 0,
    score: 0
  };

  // Analyze technical skills match
  const matchedTechnical = jobRequirements.technicalSkills.filter(skill => 
    resumeSkills.technicalSkills.includes(skill)
  );
  analysis.matchedSkills.push(...matchedTechnical);
  analysis.missingSkills.push(
    ...jobRequirements.technicalSkills.filter(skill => !matchedTechnical.includes(skill))
  );
  
  analysis.technicalMatch = jobRequirements.technicalSkills.length > 0 
    ? (matchedTechnical.length / jobRequirements.technicalSkills.length) * 100 
    : 100;

  // Analyze experience match
  if (jobRequirements.experience && resumeSkills.experience) {
    analysis.experienceMatch = resumeSkills.experience >= jobRequirements.experience ? 100 : 
      (resumeSkills.experience / jobRequirements.experience) * 100;
  }

  // Analyze education match
  if (jobRequirements.education && resumeSkills.education) {
    const eduLevels = ['bachelor', 'master', 'phd'];
    const reqLevel = eduLevels.indexOf(jobRequirements.education.toLowerCase());
    const resumeLevel = eduLevels.indexOf(resumeSkills.education.toLowerCase());
    analysis.educationMatch = resumeLevel >= reqLevel ? 100 : 75;
  }

  // Calculate overall score
  analysis.score = Math.round(
    (analysis.technicalMatch * 0.5) + 
    (analysis.experienceMatch * 0.3) + 
    (analysis.educationMatch * 0.2)
  );

  return analysis;
}

function generateRecommendations(analysis, jobRequirements) {
  const recommendations = [];

  // Add missing skills recommendation
  if (analysis.missingSkills.length > 0) {
    recommendations.push(
      `Consider adding these key skills to your resume: ${analysis.missingSkills.join(', ')}`
    );
  }

  // Experience recommendations
  if (analysis.experienceMatch < 100) {
    recommendations.push(
      'Highlight any relevant project work or internships to compensate for the experience gap'
    );
  }

  // Education recommendations
  if (analysis.educationMatch < 100) {
    recommendations.push(
      'Consider highlighting relevant certifications or continuing education'
    );
  }

  // General recommendations
  if (analysis.score < 70) {
    recommendations.push(
      'Tailor your resume specifically to this job description by using similar keywords and phrases'
    );
  }

  if (recommendations.length === 0) {
    recommendations.push('Your resume is well-aligned with the job requirements!');
  }

  return recommendations;
}

