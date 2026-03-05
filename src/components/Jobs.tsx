import { Plus, MapPin, Users, Calendar, MoreVertical, Search, Filter, X, Eye, Mail, Phone, Briefcase, ArrowLeft, Award, GraduationCap, FileText, TrendingUp, Brain, Target } from 'lucide-react';
import { mockJobs, mockCandidates, type Job, type Candidate } from '../data/mockData';
import { useState, useMemo } from 'react';

export function Jobs() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Get unique values for filters
  const departments = useMemo(() => {
    return Array.from(new Set(mockJobs.map(job => job.department))).sort();
  }, []);

  const jobTypes = useMemo(() => {
    return Array.from(new Set(mockJobs.map(job => job.type))).sort();
  }, []);

  const locations = useMemo(() => {
    return Array.from(new Set(mockJobs.map(job => job.location))).sort();
  }, []);

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        job.title.toLowerCase().includes(searchLower) ||
        job.department.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;

      // Department filter
      const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;

      // Job Type filter
      const matchesJobType = jobTypeFilter === 'all' || job.type === jobTypeFilter;

      // Location filter
      const matchesLocation = locationFilter === 'all' || job.location === locationFilter;

      return matchesSearch && matchesStatus && matchesDepartment && matchesJobType && matchesLocation;
    });
  }, [searchQuery, statusFilter, departmentFilter, jobTypeFilter, locationFilter]);

  // Check if any filters are active
  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'all' || departmentFilter !== 'all' || 
                          jobTypeFilter !== 'all' || locationFilter !== 'all';

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDepartmentFilter('all');
    setJobTypeFilter('all');
    setLocationFilter('all');
  };

  // Get candidates for selected job
  const jobCandidates = useMemo(() => {
    if (!selectedJob) return [];
    return mockCandidates.filter(candidate => candidate.appliedJob === selectedJob.title);
  }, [selectedJob]);

  // If a candidate is selected, show detailed profile view
  if (selectedCandidate) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedCandidate(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-gray-900 mb-1">Candidate Profile</h1>
            <p className="text-sm text-gray-600">Detailed information and assessment results</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
              Download CV
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm">
              Schedule Interview
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={selectedCandidate.photo}
                  alt={selectedCandidate.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{selectedCandidate.name}</h2>
                  <p className="text-sm text-gray-600 mb-3">Applied for {selectedCandidate.appliedJob}</p>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedCandidate.status === 'Hired' ? 'bg-green-50 text-green-700' :
                      selectedCandidate.status === 'Rejected' ? 'bg-red-50 text-red-700' :
                      selectedCandidate.status === 'Interview' || selectedCandidate.status === 'Final Interview' ? 'bg-blue-50 text-blue-700' :
                      selectedCandidate.status === 'Psychometric Test' ? 'bg-purple-50 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedCandidate.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{selectedCandidate.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{selectedCandidate.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-900">{selectedCandidate.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Applied Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(selectedCandidate.appliedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Work Experience</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-2 border-indigo-200 pl-4">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-gray-900">Senior Software Engineer</h4>
                    <span className="text-sm text-gray-500">2021 - Present</span>
                  </div>
                  <p className="text-sm text-indigo-600 mb-2">Tech Innovations Inc.</p>
                  <p className="text-sm text-gray-600">
                    Led development of cloud-based solutions, managed team of 5 developers, 
                    implemented CI/CD pipelines, and improved system performance by 40%.
                  </p>
                </div>
                <div className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-gray-900">Frontend Developer</h4>
                    <span className="text-sm text-gray-500">2019 - 2021</span>
                  </div>
                  <p className="text-sm text-indigo-600 mb-2">Digital Solutions Co.</p>
                  <p className="text-sm text-gray-600">
                    Developed responsive web applications using React and TypeScript, 
                    collaborated with UX team, and mentored junior developers.
                  </p>
                </div>
                <div className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-gray-900">Junior Developer</h4>
                    <span className="text-sm text-gray-500">2018 - 2019</span>
                  </div>
                  <p className="text-sm text-indigo-600 mb-2">StartUp Ventures</p>
                  <p className="text-sm text-gray-600">
                    Built and maintained company website, created internal tools, 
                    and participated in agile development processes.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Education</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-2 border-indigo-200 pl-4">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-gray-900">Master of Science in Computer Science</h4>
                    <span className="text-sm text-gray-500">2016 - 2018</span>
                  </div>
                  <p className="text-sm text-indigo-600 mb-1">Stanford University</p>
                  <p className="text-sm text-gray-600">GPA: 3.8/4.0 • Focus: Artificial Intelligence and Machine Learning</p>
                </div>
                <div className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-gray-900">Bachelor of Science in Software Engineering</h4>
                    <span className="text-sm text-gray-500">2012 - 2016</span>
                  </div>
                  <p className="text-sm text-indigo-600 mb-1">University of California, Berkeley</p>
                  <p className="text-sm text-gray-600">GPA: 3.7/4.0 • Dean's List 2014-2016</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Skills & Expertise</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">React & TypeScript</span>
                    <span className="text-sm text-gray-500">Expert</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Node.js & Backend Development</span>
                    <span className="text-sm text-gray-500">Advanced</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Cloud Platforms (AWS, Azure)</span>
                    <span className="text-sm text-gray-500">Advanced</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">System Design & Architecture</span>
                    <span className="text-sm text-gray-500">Advanced</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Psychometric Tests */}
          <div className="space-y-6">
            {/* Test Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Psychometric Tests</h3>
              </div>
              
              <div className="space-y-4">
                {/* Test Status */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Test Status</p>
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                    selectedCandidate.psychometricTestStatus === 'Completed' ? 'bg-green-50 text-green-700' :
                    selectedCandidate.psychometricTestStatus === 'In Progress' ? 'bg-amber-50 text-amber-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {selectedCandidate.psychometricTestStatus}
                  </span>
                </div>

                {selectedCandidate.psychometricTestStatus === 'Completed' && (
                  <>
                    {/* Raven Test */}
                    {selectedCandidate.ravenScore && (
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Raven's Progressive Matrices</h4>
                          <Award className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="mb-3">
                          <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-indigo-600">{selectedCandidate.ravenScore}</span>
                            <span className="text-sm text-gray-500 mb-1">/100</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                            <div 
                              className="h-full bg-indigo-600 rounded-full transition-all" 
                              style={{ width: `${selectedCandidate.ravenScore}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Abstract Reasoning</span>
                            <span className="font-medium text-gray-900">Excellent</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Pattern Recognition</span>
                            <span className="font-medium text-gray-900">High</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Problem Solving</span>
                            <span className="font-medium text-gray-900">Advanced</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cleaver Test */}
                    {selectedCandidate.cleaverScore && (
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Cleaver (DISC) Profile</h4>
                          <TrendingUp className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="text-center mb-3">
                          <div className="text-2xl font-bold text-indigo-600 mb-1">
                            {selectedCandidate.cleaverScore}
                          </div>
                          <p className="text-xs text-gray-500">Profile Pattern</p>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Dominance</span>
                              <span className="font-medium text-gray-900">High</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Influence</span>
                              <span className="font-medium text-gray-900">Medium</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-500 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Steadiness</span>
                              <span className="font-medium text-gray-900">Medium</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '55%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Compliance</span>
                              <span className="font-medium text-gray-900">Low</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Personality Type */}
                    {selectedCandidate.personalityType && (
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Personality Type</h4>
                          <FileText className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="text-center mb-3">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-2">
                            <span className="text-xl font-bold text-indigo-600">{selectedCandidate.personalityType}</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedCandidate.personalityType === 'ENTJ' ? 'The Commander' :
                             selectedCandidate.personalityType === 'INFJ' ? 'The Advocate' :
                             selectedCandidate.personalityType === 'ESTJ' ? 'The Executive' :
                             'Personality Type'}
                          </p>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p className="leading-relaxed">
                            {selectedCandidate.personalityType === 'ENTJ' ? 
                              'Natural leaders who are strategic, assertive, and good at making decisions. They excel in organizational planning and implementation.' :
                             selectedCandidate.personalityType === 'INFJ' ?
                              'Creative, insightful, and principled individuals who seek meaning in relationships and ideas. They are driven by personal values.' :
                             selectedCandidate.personalityType === 'ESTJ' ?
                              'Organized, practical, and results-oriented. They value tradition and order, and are excellent at managing tasks and people.' :
                              'A unique personality profile with specific strengths and characteristics.'}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Overall Assessment */}
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                      <h4 className="font-medium text-indigo-900 mb-2">Overall Assessment</h4>
                      <p className="text-sm text-indigo-700 leading-relaxed">
                        {selectedCandidate.ravenScore && selectedCandidate.ravenScore >= 85 ?
                          'Exceptional cognitive abilities with strong problem-solving skills. Demonstrates excellent potential for complex technical roles and leadership positions.' :
                         selectedCandidate.ravenScore && selectedCandidate.ravenScore >= 70 ?
                          'Strong analytical and reasoning capabilities. Well-suited for technical positions requiring systematic thinking and attention to detail.' :
                          'Good foundational skills with room for growth. Recommended for positions with structured learning opportunities.'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Application Timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1"></div>
                    <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                    <p className="text-xs text-gray-500">
                      {new Date(selectedCandidate.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1"></div>
                    <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium text-gray-900">Resume Reviewed</p>
                    <p className="text-xs text-gray-500">
                      {new Date(new Date(selectedCandidate.appliedDate).getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                {selectedCandidate.psychometricTestStatus === 'Completed' && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1"></div>
                      <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium text-gray-900">Tests Completed</p>
                      <p className="text-xs text-gray-500">
                        {new Date(new Date(selectedCandidate.appliedDate).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mt-1"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Next Steps</p>
                    <p className="text-xs text-gray-400">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If a job is selected, show the candidates view
  if (selectedJob) {
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedJob(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-gray-900 mb-1">{selectedJob.title}</h1>
            <p className="text-sm text-gray-600">
              {jobCandidates.length} {jobCandidates.length === 1 ? 'candidate' : 'candidates'} applied
            </p>
          </div>
        </div>

        {/* Job Details Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Department</p>
              <p className="text-sm font-medium text-gray-900">{selectedJob.department}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Location</p>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <p className="text-sm font-medium text-gray-900">{selectedJob.location}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Job Type</p>
              <p className="text-sm font-medium text-gray-900">{selectedJob.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                selectedJob.status === 'Open' ? 'bg-green-50 text-green-700' :
                selectedJob.status === 'Closed' ? 'bg-gray-100 text-gray-700' :
                'bg-amber-50 text-amber-700'
              }`}>
                {selectedJob.status}
              </span>
            </div>
          </div>
        </div>

        {/* Candidates List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {jobCandidates.length === 0 ? (
            <div className="p-12 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-900">No candidates yet</p>
                <p className="text-sm text-gray-500">Candidates who apply will appear here</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {jobCandidates.map((candidate) => (
                <div key={candidate.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <img
                      src={candidate.photo}
                      alt={candidate.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    
                    {/* Candidate Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">{candidate.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4 text-gray-400" />
                              {candidate.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {candidate.phone}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            candidate.status === 'Hired' ? 'bg-green-50 text-green-700' :
                            candidate.status === 'Rejected' ? 'bg-red-50 text-red-700' :
                            candidate.status === 'Interview' || candidate.status === 'Final Interview' ? 'bg-blue-50 text-blue-700' :
                            candidate.status === 'Psychometric Test' ? 'bg-purple-50 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {candidate.status}
                          </span>
                          <button
                            onClick={() => setSelectedCandidate(candidate)}
                            className="px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View Profile
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{candidate.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{candidate.experience} experience</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            Applied {new Date(candidate.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      {/* Psychometric Test Status */}
                      {candidate.psychometricTestStatus !== 'N/A' && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Psychometric Test:</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              candidate.psychometricTestStatus === 'Completed' ? 'bg-green-50 text-green-700' :
                              candidate.psychometricTestStatus === 'In Progress' ? 'bg-amber-50 text-amber-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {candidate.psychometricTestStatus}
                            </span>
                            {candidate.ravenScore && (
                              <span className="text-gray-600 ml-2">
                                Raven Score: <span className="font-medium text-gray-900">{candidate.ravenScore}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-gray-900 mb-1">Jobs</h1>
          <p className="text-sm text-gray-600">Manage your job openings and postings</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Create New Job
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by job title, department, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        {/* Filters Row */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter className="w-4 h-4" />
            Filters:
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
          >
            <option value="all">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Draft">Draft</option>
          </select>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Job Type Filter */}
          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
          >
            <option value="all">All Types</option>
            {jobTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Location Filter */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
          >
            <option value="all">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          )}

          {/* Results Count */}
          <div className="ml-auto text-sm text-gray-600">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Candidates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Created Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">No jobs found</p>
                      <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">{job.title}</div>
                        <div className="text-xs text-gray-500">{job.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{job.department}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {job.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job.status === 'Open' ? 'bg-green-50 text-green-700' :
                      job.status === 'Closed' ? 'bg-gray-100 text-gray-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex items-center gap-1 hover:text-indigo-600 transition-colors group"
                    >
                      <Users className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                      <span className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">{job.candidatesCount}</span>
                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(job.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Create New Job</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Design</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Remote"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  placeholder="Enter job description..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
              >
                Create Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
