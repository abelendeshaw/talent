'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, CheckCircle, XCircle, User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, DollarSign, Building, Award } from 'lucide-react';

// Type definitions for HR Flow API compatibility
interface JobDescription {
    title: string;
    company: string;
    location: string;
    workType: 'Remote' | 'Hybrid' | 'On-site';
    salaryRange: {
        min: number;
        max: number;
        currency: string;
    };
    experienceRequired: {
        min: number;
        max: number;
    };
    educationLevel: string;
    skills: {
        technical: string[];
        soft: string[];
        certifications: string[];
    };
    responsibilities: string[];
    benefits: string[];
    industry: string;
    department: string;
}

interface CandidateSkillMatch {
    skill: string;
    hasSkill: boolean;
    experienceYears?: number;
    proficiencyLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface CandidateEducation {
    degree: string;
    field: string;
    institution: string;
    year: number;
}

interface CandidateExperience {
    title: string;
    company: string;
    duration: string;
    yearsTotal: number;
}

interface Candidate {
    id: number;
    name: string;
    email: string;
    phone: string;
    location: string;
    currentTitle: string;
    experience: CandidateExperience;
    education: CandidateEducation;
    overallScore: number;
    experienceScore: number;
    skillsScore: number;
    educationScore: number;
    locationScore: number;
    avatar: string;
    skillMatches: CandidateSkillMatch[];
    summary: string;
    lastActive: string;
    expectedSalary?: {
        min: number;
        max: number;
        currency: string;
    };
    availability: string;
    workTypePreference: 'Remote' | 'Hybrid' | 'On-site' | 'Flexible';
}

type SortOption = 'overallScore' | 'experienceScore' | 'skillsScore' | 'name';

const TalentAcquisitionDashboard: React.FC = () => {
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>('overallScore');

    // Mock parsed job description data (would come from HR Flow API)
    const jobDescription: JobDescription = {
        title: "Senior Full Stack Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        workType: "Hybrid",
        salaryRange: {
            min: 120000,
            max: 180000,
            currency: "USD"
        },
        experienceRequired: {
            min: 5,
            max: 8
        },
        educationLevel: "Bachelor's degree in Computer Science or related field",
        skills: {
            technical: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "Docker"],
            soft: ["Team Leadership", "Problem Solving", "Communication", "Project Management"],
            certifications: ["AWS Certified Developer", "Agile/Scrum Master"]
        },
        responsibilities: [
            "Lead full-stack development projects",
            "Mentor junior developers",
            "Architect scalable solutions",
            "Collaborate with product teams"
        ],
        benefits: ["Health Insurance", "401k", "Remote Work", "Stock Options"],
        industry: "Technology",
        department: "Engineering"
    };

    // Mock candidate data (would come from HR Flow API parsing)
    const candidates: Candidate[] = [
        {
            id: 1,
            name: "Sarah Chen",
            email: "sarah.chen@email.com",
            phone: "+1 (555) 123-4567",
            location: "San Francisco, CA",
            currentTitle: "Senior Software Engineer",
            experience: {
                title: "Senior Software Engineer",
                company: "Meta",
                duration: "3 years",
                yearsTotal: 6
            },
            education: {
                degree: "Bachelor of Science",
                field: "Computer Science",
                institution: "Stanford University",
                year: 2018
            },
            overallScore: 94,
            experienceScore: 95,
            skillsScore: 92,
            educationScore: 98,
            locationScore: 100,
            avatar: "SC",
            skillMatches: [
                { skill: "React", hasSkill: true, experienceYears: 5, proficiencyLevel: "Expert" },
                { skill: "Node.js", hasSkill: true, experienceYears: 4, proficiencyLevel: "Advanced" },
                { skill: "TypeScript", hasSkill: true, experienceYears: 3, proficiencyLevel: "Advanced" },
                { skill: "AWS", hasSkill: true, experienceYears: 2, proficiencyLevel: "Intermediate" },
                { skill: "PostgreSQL", hasSkill: true, experienceYears: 4, proficiencyLevel: "Advanced" },
                { skill: "Docker", hasSkill: true, experienceYears: 2, proficiencyLevel: "Intermediate" },
                { skill: "Team Leadership", hasSkill: true, experienceYears: 2, proficiencyLevel: "Advanced" },
                { skill: "AWS Certified Developer", hasSkill: false }
            ],
            summary: "Senior full-stack developer with 6 years of experience at top tech companies. Strong leadership skills and proven track record in React ecosystem.",
            lastActive: "2 days ago",
            expectedSalary: {
                min: 150000,
                max: 180000,
                currency: "USD"
            },
            availability: "2 weeks notice",
            workTypePreference: "Hybrid"
        },
        {
            id: 2,
            name: "Marcus Johnson",
            email: "marcus.j@email.com",
            phone: "+1 (555) 987-6543",
            location: "Austin, TX",
            currentTitle: "DevOps Engineer",
            experience: {
                title: "DevOps Engineer",
                company: "Amazon",
                duration: "4 years",
                yearsTotal: 7
            },
            education: {
                degree: "Master of Science",
                field: "Software Engineering",
                institution: "UT Austin",
                year: 2017
            },
            overallScore: 89,
            experienceScore: 92,
            skillsScore: 85,
            educationScore: 95,
            locationScore: 70,
            avatar: "MJ",
            skillMatches: [
                { skill: "React", hasSkill: true, experienceYears: 3, proficiencyLevel: "Intermediate" },
                { skill: "Node.js", hasSkill: true, experienceYears: 5, proficiencyLevel: "Advanced" },
                { skill: "TypeScript", hasSkill: false },
                { skill: "AWS", hasSkill: true, experienceYears: 4, proficiencyLevel: "Expert" },
                { skill: "PostgreSQL", hasSkill: true, experienceYears: 3, proficiencyLevel: "Advanced" },
                { skill: "Docker", hasSkill: true, experienceYears: 4, proficiencyLevel: "Expert" },
                { skill: "AWS Certified Developer", hasSkill: true, proficiencyLevel: "Expert" }
            ],
            summary: "DevOps engineer with strong full-stack capabilities. Extensive AWS experience and infrastructure expertise.",
            lastActive: "1 day ago",
            expectedSalary: {
                min: 140000,
                max: 170000,
                currency: "USD"
            },
            availability: "1 month notice",
            workTypePreference: "Remote"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            email: "emily.rodriguez@email.com",
            phone: "+1 (555) 456-7890",
            location: "New York, NY",
            currentTitle: "Frontend Developer",
            experience: {
                title: "Frontend Developer",
                company: "Spotify",
                duration: "2 years",
                yearsTotal: 4
            },
            education: {
                degree: "Bachelor of Arts",
                field: "Computer Science",
                institution: "NYU",
                year: 2020
            },
            overallScore: 76,
            experienceScore: 65,
            skillsScore: 88,
            educationScore: 85,
            locationScore: 80,
            avatar: "ER",
            skillMatches: [
                { skill: "React", hasSkill: true, experienceYears: 4, proficiencyLevel: "Expert" },
                { skill: "Node.js", hasSkill: true, experienceYears: 2, proficiencyLevel: "Intermediate" },
                { skill: "TypeScript", hasSkill: true, experienceYears: 3, proficiencyLevel: "Advanced" },
                { skill: "AWS", hasSkill: false },
                { skill: "PostgreSQL", hasSkill: true, experienceYears: 1, proficiencyLevel: "Beginner" },
                { skill: "Docker", hasSkill: false },
                { skill: "Team Leadership", hasSkill: false }
            ],
            summary: "Frontend specialist with strong React skills. Growing full-stack capabilities with room for backend development.",
            lastActive: "5 hours ago",
            expectedSalary: {
                min: 110000,
                max: 140000,
                currency: "USD"
            },
            availability: "Immediate",
            workTypePreference: "Hybrid"
        }
    ];

    const getScoreColor = (score: number): string => {
        if (score >= 90) return 'text-green-600 bg-green-50';
        if (score >= 80) return 'text-blue-600 bg-blue-50';
        if (score >= 70) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    const getScoreBorderColor = (score: number): string => {
        if (score >= 90) return 'border-green-200';
        if (score >= 80) return 'border-blue-200';
        if (score >= 70) return 'border-yellow-200';
        return 'border-red-200';
    };

    const formatSalary = (salary: { min: number; max: number; currency: string }): string => {
        return `$${(salary.min / 1000).toFixed(0)}k - $${(salary.max / 1000).toFixed(0)}k ${salary.currency}`;
    };

    const sortedCandidates = [...candidates].sort((a, b) => {
        if (sortBy === 'overallScore') return b.overallScore - a.overallScore;
        if (sortBy === 'experienceScore') return b.experienceScore - a.experienceScore;
        if (sortBy === 'skillsScore') return b.skillsScore - a.skillsScore;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
    });

    const handleCandidateSelect = (candidate: Candidate): void => {
        setSelectedCandidate(candidate);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSortBy(event.target.value as SortOption);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Talent Acquisition Dashboard</h1>
                            <p className="text-gray-600">{jobDescription.title} at {jobDescription.company} • {candidates.length} candidates parsed</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                type="button"
                            >
                                <Download className="w-4 h-4" />
                                Export Results
                            </button>
                            <button
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                type="button"
                            >
                                <Filter className="w-4 h-4" />
                                Advanced Filters
                            </button>
                        </div>
                    </div>

                    {/* Search and Sort */}
                    <div className="flex gap-4 mb-4">
                        <div className="flex-1 relative">
                            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search candidates by name, skills, or company..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            value={sortBy}
                            onChange={handleSortChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="overallScore">Overall Match Score</option>
                            <option value="experienceScore">Experience Score</option>
                            <option value="skillsScore">Skills Score</option>
                            <option value="name">Alphabetical</option>
                        </select>
                    </div>

                    {/* Parsed Job Description Summary */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5" />
                            Parsed Job Requirements
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Experience Required
                                </h4>
                                <p className="text-lg font-semibold text-gray-900">
                                    {jobDescription.experienceRequired.min}-{jobDescription.experienceRequired.max} years
                                </p>
                                <p className="text-sm text-gray-600 mt-1">{jobDescription.workType} • {jobDescription.location}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" />
                                    Salary Range
                                </h4>
                                <p className="text-lg font-semibold text-gray-900">
                                    {formatSalary(jobDescription.salaryRange)}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">{jobDescription.industry}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4" />
                                    Education Level
                                </h4>
                                <p className="text-sm text-gray-900">{jobDescription.educationLevel}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Key Skills ({jobDescription.skills.technical.length})</h4>
                                <div className="flex flex-wrap gap-1">
                                    {jobDescription.skills.technical.slice(0, 3).map((skill, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-200">
                      {skill}
                    </span>
                                    ))}
                                    {jobDescription.skills.technical.length > 3 && (
                                        <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                      +{jobDescription.skills.technical.length - 3} more
                    </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Candidates List */}
                    <div className="lg:col-span-2 space-y-4">
                        {sortedCandidates.map((candidate) => (
                            <div
                                key={candidate.id}
                                onClick={() => handleCandidateSelect(candidate)}
                                className={`bg-white rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-md ${
                                    selectedCandidate?.id === candidate.id
                                        ? 'border-blue-500 shadow-md'
                                        : `border-gray-200 ${getScoreBorderColor(candidate.overallScore)}`
                                }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                            {candidate.avatar}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                                            <p className="text-gray-700">{candidate.currentTitle} at {candidate.experience.company}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                            {candidate.location}
                        </span>
                                                <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                                                    {candidate.experience.yearsTotal} years exp
                        </span>
                                                <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                                                    {candidate.availability}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-2 rounded-lg font-bold text-lg ${getScoreColor(candidate.overallScore)}`}>
                                        {candidate.overallScore}%
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-4">{candidate.summary}</p>

                                {/* Score Breakdown */}
                                <div className="grid grid-cols-4 gap-4 mb-4">
                                    <div className="text-center">
                                        <div className={`text-lg font-bold ${getScoreColor(candidate.experienceScore).split(' ')[0]}`}>
                                            {candidate.experienceScore}%
                                        </div>
                                        <div className="text-xs text-gray-600">Experience</div>
                                    </div>
                                    <div className="text-center">
                                        <div className={`text-lg font-bold ${getScoreColor(candidate.skillsScore).split(' ')[0]}`}>
                                            {candidate.skillsScore}%
                                        </div>
                                        <div className="text-xs text-gray-600">Skills</div>
                                    </div>
                                    <div className="text-center">
                                        <div className={`text-lg font-bold ${getScoreColor(candidate.educationScore).split(' ')[0]}`}>
                                            {candidate.educationScore}%
                                        </div>
                                        <div className="text-xs text-gray-600">Education</div>
                                    </div>
                                    <div className="text-center">
                                        <div className={`text-lg font-bold ${getScoreColor(candidate.locationScore).split(' ')[0]}`}>
                                            {candidate.locationScore}%
                                        </div>
                                        <div className="text-xs text-gray-600">Location</div>
                                    </div>
                                </div>

                                {/* Key Skills Match */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Match</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {candidate.skillMatches.slice(0, 6).map((skillMatch, idx) => (
                                            <span
                                                key={idx}
                                                className={`px-2 py-1 text-xs rounded border ${
                                                    skillMatch.hasSkill
                                                        ? 'bg-green-50 text-green-700 border-green-200'
                                                        : 'bg-red-50 text-red-700 border-red-200'
                                                }`}
                                            >
                        {skillMatch.skill} {skillMatch.hasSkill && skillMatch.proficiencyLevel && `(${skillMatch.proficiencyLevel})`}
                      </span>
                                        ))}
                                        {candidate.skillMatches.length > 6 && (
                                            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                        +{candidate.skillMatches.length - 6} more
                      </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detailed View Panel */}
                    <div className="lg:col-span-1">
                        {selectedCandidate ? (
                            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                                        {selectedCandidate.avatar}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{selectedCandidate.name}</h3>
                                        <div className={`inline-block px-3 py-1 rounded-lg font-bold ${getScoreColor(selectedCandidate.overallScore)} mt-1`}>
                                            {selectedCandidate.overallScore}% Overall Match
                                        </div>
                                    </div>
                                </div>

                                {/* Contact & Basic Info */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Mail className="w-4 h-4" />
                                        <span className="text-sm">{selectedCandidate.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Phone className="w-4 h-4" />
                                        <span className="text-sm">{selectedCandidate.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Building className="w-4 h-4" />
                                        <span className="text-sm">{selectedCandidate.experience.company}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <DollarSign className="w-4 h-4" />
                                        <span className="text-sm">
                      {selectedCandidate.expectedSalary ? formatSalary(selectedCandidate.expectedSalary) : 'Not specified'}
                    </span>
                                    </div>
                                </div>

                                {/* Experience Details */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        Experience ({selectedCandidate.experience.yearsTotal} years)
                                    </h4>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <p className="font-medium text-gray-900">{selectedCandidate.experience.title}</p>
                                        <p className="text-sm text-gray-600">{selectedCandidate.experience.company} • {selectedCandidate.experience.duration}</p>
                                    </div>
                                </div>

                                {/* Education */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4" />
                                        Education
                                    </h4>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <p className="font-medium text-gray-900">{selectedCandidate.education.degree}</p>
                                        <p className="text-sm text-gray-600">{selectedCandidate.education.field}</p>
                                        <p className="text-sm text-gray-600">{selectedCandidate.education.institution} • {selectedCandidate.education.year}</p>
                                    </div>
                                </div>

                                {/* Detailed Skills Analysis */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Award className="w-4 h-4" />
                                        Skills Analysis
                                    </h4>

                                    <div className="space-y-2">
                                        {selectedCandidate.skillMatches.map((skillMatch, idx) => (
                                            <div key={idx} className={`flex items-center justify-between p-2 rounded border ${
                                                skillMatch.hasSkill
                                                    ? 'bg-green-50 border-green-200'
                                                    : 'bg-red-50 border-red-200'
                                            }`}>
                                                <div>
                          <span className={`text-sm font-medium ${
                              skillMatch.hasSkill ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {skillMatch.skill}
                          </span>
                                                    {skillMatch.hasSkill && skillMatch.experienceYears && (
                                                        <span className="text-xs text-gray-600 ml-2">
                              {skillMatch.experienceYears} years
                            </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {skillMatch.hasSkill && skillMatch.proficiencyLevel && (
                                                        <span className="text-xs px-2 py-1 bg-white rounded">
                              {skillMatch.proficiencyLevel}
                            </span>
                                                    )}
                                                    {skillMatch.hasSkill ? (
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4 text-red-600" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 mt-6">
                                    <button
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                        type="button"
                                    >
                                        Schedule Interview
                                    </button>
                                    <button
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        type="button"
                                    >
                                        Download Resume
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500">
                                <User className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                <p>Select a candidate to view detailed analysis</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TalentAcquisitionDashboard;