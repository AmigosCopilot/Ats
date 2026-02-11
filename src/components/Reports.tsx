import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { hiringFunnelData, candidatesPerJobData, testScoreData } from '../data/mockData';
import { Download, TrendingUp } from 'lucide-react';

const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

export function Reports() {
  const hiringSuccessData = [
    { month: 'Aug', hired: 3 },
    { month: 'Sep', hired: 5 },
    { month: 'Oct', hired: 4 },
    { month: 'Nov', hired: 6 },
    { month: 'Dec', hired: 7 },
    { month: 'Jan', hired: 8 },
    { month: 'Feb', hired: 8 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-gray-900 mb-1">Reports & Analytics</h1>
          <p className="text-sm text-gray-600">Track and analyze your hiring performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Time to Hire', value: '18 days', change: '-12%', positive: true },
          { label: 'Offer Accept Rate', value: '85%', change: '+5%', positive: true },
          { label: 'Cost per Hire', value: '$4,200', change: '-8%', positive: true },
          { label: 'Quality of Hire', value: '4.2/5', change: '+0.3', positive: true }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
            <div className="text-2xl font-semibold text-gray-900 mb-2">{metric.value}</div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              metric.positive ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="w-4 h-4" />
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Funnel */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Hiring Funnel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hiringFunnelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Candidates per Job */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Candidates per Job</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={candidatesPerJobData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ job, count }) => `${job}: ${count}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {candidatesPerJobData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Test Score Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Test Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={testScoreData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hiring Success Rate */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Hiring Success Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hiringSuccessData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="hired" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Department Performance</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Open Positions
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Total Applicants
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Hired
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Avg. Time to Hire
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Success Rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { dept: 'Engineering', open: 6, applicants: 58, hired: 4, time: '21 days', rate: '6.9%' },
                  { dept: 'Product', open: 2, applicants: 18, hired: 1, time: '15 days', rate: '5.6%' },
                  { dept: 'Design', open: 1, applicants: 32, hired: 2, time: '18 days', rate: '6.3%' },
                  { dept: 'Marketing', open: 1, applicants: 12, hired: 0, time: '-', rate: '-' },
                  { dept: 'Analytics', open: 0, applicants: 12, hired: 1, time: '14 days', rate: '8.3%' }
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{row.dept}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{row.open}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{row.applicants}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{row.hired}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{row.time}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{row.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
