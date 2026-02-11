import { TrendingUp, TrendingDown, Users, Briefcase, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { dashboardMetrics, mockCandidates, mockJobs } from '../data/mockData';

export function Dashboard() {
  const metrics = [
    {
      title: 'Total Candidates',
      value: dashboardMetrics.totalCandidates,
      change: 12,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
      iconBg: 'bg-blue-100'
    },
    {
      title: 'Active Job Openings',
      value: dashboardMetrics.activeJobs,
      change: 3,
      icon: Briefcase,
      color: 'bg-indigo-50 text-indigo-600',
      iconBg: 'bg-indigo-100'
    },
    {
      title: 'Candidates in Process',
      value: dashboardMetrics.candidatesInProcess,
      change: 8,
      icon: Clock,
      color: 'bg-amber-50 text-amber-600',
      iconBg: 'bg-amber-100'
    },
    {
      title: 'Hired Candidates',
      value: dashboardMetrics.hiredCandidates,
      change: 15,
      icon: CheckCircle,
      color: 'bg-green-50 text-green-600',
      iconBg: 'bg-green-100'
    },
    {
      title: 'Pending Evaluations',
      value: dashboardMetrics.pendingEvaluations,
      change: -5,
      icon: AlertCircle,
      color: 'bg-purple-50 text-purple-600',
      iconBg: 'bg-purple-100'
    }
  ];

  const recentCandidates = mockCandidates.slice(0, 5);
  const recentJobs = mockJobs.filter(j => j.status === 'Open').slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-sm text-gray-600">Welcome back! Here's what's happening with your hiring.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${metric.iconBg}`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  metric.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <div className="text-2xl font-semibold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.title}</div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Candidates */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Recent Candidates</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentCandidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center gap-4">
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">{candidate.name}</div>
                    <div className="text-xs text-gray-500 truncate">{candidate.appliedJob}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    candidate.status === 'Hired' ? 'bg-green-50 text-green-700' :
                    candidate.status === 'Rejected' ? 'bg-red-50 text-red-700' :
                    candidate.status === 'Interview' || candidate.status === 'Final Interview' ? 'bg-blue-50 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {candidate.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Jobs */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Active Job Openings</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900 mb-1">{job.title}</div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{job.candidatesCount}</div>
                    <div className="text-xs text-gray-500">candidates</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Hiring Pipeline Overview</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {['Applied', 'Screening', 'Interview', 'Psychometric Test', 'Final Interview', 'Hired', 'Rejected'].map((stage) => {
              const count = mockCandidates.filter(c => c.status === stage).length;
              return (
                <div key={stage} className="text-center">
                  <div className="text-2xl font-semibold text-gray-900 mb-1">{count}</div>
                  <div className="text-xs text-gray-600">{stage}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
