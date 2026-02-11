import { Plus, Brain, Users, BarChart3, FileText } from 'lucide-react';
import { mockCandidates } from '../data/mockData';

export function PsychometricTests() {
  const tests = [
    {
      id: '1',
      name: 'Raven Progressive Matrices',
      description: 'Measures abstract reasoning and fluid intelligence',
      icon: Brain,
      color: 'bg-purple-100 text-purple-600',
      candidates: mockCandidates.filter(c => c.ravenScore !== undefined).length,
      avgScore: 87
    },
    {
      id: '2',
      name: 'Cleaver DISC Assessment',
      description: 'Evaluates behavioral traits and work style',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      candidates: mockCandidates.filter(c => c.cleaverScore !== undefined).length,
      avgScore: null
    },
    {
      id: '3',
      name: 'Personality Type Indicator',
      description: 'Identifies personality preferences and team fit',
      icon: BarChart3,
      color: 'bg-indigo-100 text-indigo-600',
      candidates: mockCandidates.filter(c => c.personalityType !== undefined).length,
      avgScore: null
    }
  ];

  const recentTestResults = mockCandidates
    .filter(c => c.psychometricTestStatus === 'Completed')
    .slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-gray-900 mb-1">Psychometric Tests</h1>
          <p className="text-sm text-gray-600">Create and manage psychometric assessments for candidates</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" />
          Create Test
        </button>
      </div>

      {/* Test Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tests.map((test) => {
          const Icon = test.icon;
          return (
            <div key={test.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${test.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{test.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{test.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <div className="text-sm text-gray-600">Candidates Tested</div>
                  <div className="text-xl font-semibold text-gray-900">{test.candidates}</div>
                </div>
                {test.avgScore && (
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Avg Score</div>
                    <div className="text-xl font-semibold text-gray-900">{test.avgScore}%</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Test Results */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Recent Test Results</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Raven Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  DISC Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Personality Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentTestResults.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={candidate.photo}
                        alt={candidate.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-sm text-gray-900">{candidate.name}</div>
                        <div className="text-xs text-gray-500">{candidate.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{candidate.appliedJob}</td>
                  <td className="px-6 py-4">
                    {candidate.ravenScore ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              candidate.ravenScore >= 80 ? 'bg-green-500' :
                              candidate.ravenScore >= 60 ? 'bg-blue-500' :
                              'bg-amber-500'
                            }`}
                            style={{ width: `${candidate.ravenScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{candidate.ravenScore}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {candidate.cleaverScore ? (
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {candidate.cleaverScore}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {candidate.personalityType ? (
                      <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                        {candidate.personalityType}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                      <FileText className="w-4 h-4" />
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Test Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Test Completion Rate</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Overall Completion</span>
                <span className="text-sm font-medium text-gray-900">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">In Progress</span>
                <span className="text-sm font-medium text-gray-900">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Not Started</span>
                <span className="text-sm font-medium text-gray-900">17%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-full" style={{ width: '17%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Score Distribution</h3>
          <div className="space-y-3">
            {[
              { range: '81-100', count: 8, color: 'bg-green-500' },
              { range: '61-80', count: 12, color: 'bg-blue-500' },
              { range: '41-60', count: 6, color: 'bg-amber-500' },
              { range: '0-40', count: 2, color: 'bg-red-500' }
            ].map((item) => (
              <div key={item.range} className="flex items-center gap-3">
                <div className="w-20 text-sm text-gray-600">{item.range}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6">
                  <div
                    className={`${item.color} h-6 rounded-full flex items-center justify-end px-2`}
                    style={{ width: `${(item.count / 28) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-white">{item.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
