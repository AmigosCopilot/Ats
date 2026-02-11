import { Mail, Phone, MapPin, Calendar, FileText, Clock, X, MessageSquare } from 'lucide-react';
import { mockCandidates, Candidate } from '../data/mockData';
import { useState } from 'react';

export function Candidates() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-gray-900 mb-1">Candidates</h1>
          <p className="text-sm text-gray-600">View and manage all candidate applications</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>All Status</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Hired</option>
          </select>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Applied Job
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Psychometric Test
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Applied Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  onClick={() => setSelectedCandidate(candidate)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={candidate.photo}
                        alt={candidate.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-sm text-gray-900">{candidate.name}</div>
                        <div className="text-xs text-gray-500">{candidate.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{candidate.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{candidate.appliedJob}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      candidate.status === 'Hired' ? 'bg-green-50 text-green-700' :
                      candidate.status === 'Rejected' ? 'bg-red-50 text-red-700' :
                      candidate.status === 'Interview' || candidate.status === 'Final Interview' ? 'bg-blue-50 text-blue-700' :
                      candidate.status === 'Psychometric Test' ? 'bg-purple-50 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      candidate.psychometricTestStatus === 'Completed' ? 'bg-green-50 text-green-700' :
                      candidate.psychometricTestStatus === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                      candidate.psychometricTestStatus === 'Not Started' ? 'bg-gray-100 text-gray-700' :
                      'bg-gray-50 text-gray-500'
                    }`}>
                      {candidate.psychometricTestStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(candidate.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Candidate Profile</h2>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Header Section */}
              <div className="flex items-start gap-6 mb-6 pb-6 border-b border-gray-200">
                <img
                  src={selectedCandidate.photo}
                  alt={selectedCandidate.name}
                  className="w-20 h-20 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedCandidate.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {selectedCandidate.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {selectedCandidate.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedCandidate.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCandidate.status === 'Hired' ? 'bg-green-50 text-green-700' :
                      selectedCandidate.status === 'Rejected' ? 'bg-red-50 text-red-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {selectedCandidate.status}
                    </span>
                    <span className="text-sm text-gray-600">{selectedCandidate.experience} experience</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm">
                    Schedule Interview
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                    Send Email
                  </button>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="col-span-2 space-y-6">
                  {/* Applied Position */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Applied Position</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-medium text-gray-900 mb-1">{selectedCandidate.appliedJob}</div>
                      <div className="text-sm text-gray-600">Applied on {new Date(selectedCandidate.appliedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                  </div>

                  {/* Psychometric Test Results */}
                  {selectedCandidate.psychometricTestStatus === 'Completed' && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Psychometric Test Results</h4>
                      <div className="space-y-3">
                        {selectedCandidate.ravenScore && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Raven Test</span>
                              <span className="text-lg font-semibold text-gray-900">{selectedCandidate.ravenScore}/100</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full"
                                style={{ width: `${selectedCandidate.ravenScore}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {selectedCandidate.cleaverScore && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-sm font-medium text-gray-700 mb-1">Cleaver Test</div>
                            <div className="text-lg font-semibold text-gray-900">{selectedCandidate.cleaverScore}</div>
                          </div>
                        )}
                        {selectedCandidate.personalityType && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-sm font-medium text-gray-700 mb-1">Personality Type</div>
                            <div className="text-lg font-semibold text-gray-900">{selectedCandidate.personalityType}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Resume Preview */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Resume</h4>
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{selectedCandidate.name}_Resume.pdf</div>
                          <div className="text-xs text-gray-500">2.4 MB</div>
                        </div>
                      </div>
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Timeline */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Activity Timeline</h4>
                    <div className="space-y-4">
                      {[
                        { action: 'Applied for position', date: selectedCandidate.appliedDate },
                        { action: 'Resume reviewed', date: '2026-02-06' },
                        { action: 'Moved to screening', date: '2026-02-07' },
                      ].map((item, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                            {index < 2 && <div className="w-px h-8 bg-gray-200" />}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="text-sm text-gray-900 mb-1">{item.action}</div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Notes</h4>
                    <div className="space-y-3">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <MessageSquare className="w-4 h-4 text-amber-600 mt-0.5" />
                          <div className="text-xs font-medium text-amber-900">John Smith</div>
                        </div>
                        <p className="text-sm text-amber-800">Strong technical background. Schedule technical interview.</p>
                      </div>
                      <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Add Note
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
