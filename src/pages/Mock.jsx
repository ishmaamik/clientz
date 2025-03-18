


import { Groq } from 'groq-sdk';
import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Map,
  Target,
  Users,
  Video
} from 'lucide-react';
import React, { useState } from 'react';
import SideButtons from "../components/SideButtons";

export default function Mock() {
  const [career, setCareer] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [expandedSteps, setExpandedSteps] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);

  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const toggleStep = (stepIndex) => {
    setExpandedSteps(prev => 
      prev.includes(stepIndex)
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const formatRoadmapContent = (content) => {
    const steps = content.split(/Step \d+:/).filter(Boolean);
    return steps.map((step, index) => {
      const [title, ...details] = step.trim().split('\n');
      const isExpanded = expandedSteps.includes(index);
      
      return (
        <div key={index} className="mb-6">
          <div 
            className="flex items-center justify-between bg-yellow-50 p-4 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
            onClick={() => toggleStep(index)}
          >
            <div className="flex items-center space-x-3">
              <Target className="h-6 w-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Step {index + 1}: {title}
              </h3>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-yellow-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-yellow-600" />
            )}
          </div>
          
          {isExpanded && (
            <div className="mt-4 ml-8 p-4 bg-white rounded-lg border border-yellow-100">
              <div className="prose max-w-none">
                {details.map((detail, i) => (
                  <div key={i} className="mb-2">
                    {detail.startsWith('Timeline:') ? (
                      <div className="flex items-center text-yellow-700 mb-2">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="font-medium">{detail.replace('Timeline:', '').trim()}</span>
                      </div>
                    ) : detail.trim().startsWith('-') ? (
                      <div className="flex items-start ml-4">
                        <span className="text-yellow-600 mr-2">•</span>
                        <span className="text-gray-700">{detail.replace('-', '').trim()}</span>
                      </div>
                    ) : (
                      <p className="text-gray-700">{detail.trim()}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  const generateRoadmap = async () => {
    setIsLoading(true);
    try {
      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1024,
        messages: [
          {
            role: "system",
            content: `You are a roadmap creator specializing in IT and programming job interview preparation. Create a detailed step-by-step roadmap with the following format for each step:

Step 1: [Brief Title]
Timeline: [Specific timeframe, e.g., Week 1-2]
[Main description of the step]
- [Detailed point 1]
- [Detailed point 2]
- [Resources and links]

Cover essential technical skills, problem-solving strategies, system design, behavioral interview preparation, and industry trends. Make each step actionable and specific.Don't give any roadmap if it is not related to any tech field`,
          },
          {
            role: "user",
            content: `Create a detailed roadmap for becoming a ${career}`,
          },
        ],
      });
      setRoadmap(response.choices[0]?.message?.content || '');
      setExpandedSteps([0]); // Expand first step by default
    } catch (error) {
      console.error('Error generating roadmap:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createMeeting = async () => {
    // Note: This is a placeholder for Google Meet API integration
    const meetLink = 'https://meet.google.com/new';
    setMeetingLink(meetLink);
    window.open(meetLink, '_blank');
  };

  return (
    <div className="flex min-h-screen bg-[#FFFDF7]">
    <SideButtons />
    <div
      id="main-content"
      className="flex-1 transition-all duration-300"
      style={{ marginLeft: isExpanded ? "260px" : "80px" }}
    >
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Prepare for Your Dream</span>
              <span className="block text-yellow-600">Tech Career</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Get personalized roadmaps, interview preparation tips, and connect with mentors to ace your next tech interview.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center p-6 bg-yellow-50 rounded-lg">
              <Users className="h-12 w-12 text-yellow-600" />
              <p className="mt-2 text-3xl font-semibold text-gray-900">5000+</p>
              <p className="text-gray-600">Success Stories</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-yellow-50 rounded-lg">
              <BookOpen className="h-12 w-12 text-yellow-600" />
              <p className="mt-2 text-3xl font-semibold text-gray-900">200+</p>
              <p className="text-gray-600">Interview Topics</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-yellow-50 rounded-lg">
              <Award className="h-12 w-12 text-yellow-600" />
              <p className="mt-2 text-3xl font-semibold text-gray-900">95%</p>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-yellow-50 rounded-lg">
              <CheckCircle className="h-12 w-12 text-yellow-600" />
              <p className="mt-2 text-3xl font-semibold text-gray-900">50+</p>
              <p className="text-gray-600">Expert Mentors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Creator Section */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Map className="h-12 w-12 mx-auto text-yellow-600" />
            <h2 className="mt-2 text-3xl font-bold text-gray-900">Your ultimate guide to career growth and success!!!</h2>
            <p className="mt-2 text-gray-600">Enter your desired career path to get a personalized roadmap</p>
          </div>
          <div className="mt-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                placeholder="e.g., Frontend Developer, Data Scientist"
                className="flex-1 rounded-lg border-yellow-200 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
              <button
                onClick={generateRoadmap}
                disabled={isLoading}
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? 'Generating...' : 'Generate Roadmap'}
              </button>
            </div>
            {roadmap && (
              <div className="mt-6">
                {formatRoadmapContent(roadmap)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Meeting Scheduler Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Video className="h-12 w-12 mx-auto text-yellow-600" />
            <h2 className="mt-2 text-3xl font-bold text-gray-900">Schedule a Meeting</h2>
            <p className="mt-2 text-gray-600">Connect with mentors through video calls</p>
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={createMeeting}
              className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Create Meeting
            </button>
            {meetingLink && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Your meeting link:</p>
                <a
                  href={meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  {meetingLink}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
    </div>
    </div>
  );
}