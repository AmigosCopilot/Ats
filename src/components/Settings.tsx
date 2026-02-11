import { Building2, Users, CreditCard, Link2, Save } from 'lucide-react';
import { useState } from 'react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('company');

  const tabs = [
    { id: 'company', label: 'Company Profile', icon: Building2 },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'subscription', label: 'Subscription Plan', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: Link2 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold text-gray-900 mb-1">Settings</h1>
        <p className="text-sm text-gray-600">Manage your account and application preferences</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-1 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Company Profile */}
      {activeTab === 'company' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Company Information</h3>
          <div className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  defaultValue="Acme Inc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Technology</option>
                  <option>Healthcare</option>
                  <option>Finance</option>
                  <option>Retail</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
              <input
                type="url"
                defaultValue="https://acme.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
              <input
                type="email"
                defaultValue="hr@acme.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                rows={3}
                defaultValue="123 Business St, San Francisco, CA 94102"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="pt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users & Roles */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Team Members</h3>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm">
              Invite User
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { name: 'John Smith', email: 'john@acme.com', role: 'HR Manager', status: 'Active' },
                { name: 'Sarah Johnson', email: 'sarah@acme.com', role: 'Recruiter', status: 'Active' },
                { name: 'Michael Chen', email: 'michael@acme.com', role: 'Hiring Manager', status: 'Active' },
                { name: 'Emily Rodriguez', email: 'emily@acme.com', role: 'Recruiter', status: 'Invited' }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {user.role}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subscription Plan */}
      {activeTab === 'subscription' && (
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Current Plan</h3>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">Professional Plan</div>
                <div className="text-gray-600 mb-4">Perfect for growing teams</div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <div className="text-sm text-gray-600">Next billing date: March 15, 2026</div>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                Manage Billing
              </button>
            </div>
          </div>

          {/* Plan Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: '$29', features: ['Up to 10 jobs', '100 candidates', 'Basic tests', 'Email support'] },
              { name: 'Professional', price: '$99', features: ['Unlimited jobs', '1000 candidates', 'All tests', 'Priority support'], current: true },
              { name: 'Enterprise', price: '$299', features: ['Everything in Pro', 'Custom tests', 'API access', 'Dedicated manager'] }
            ].map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-xl border-2 p-6 ${
                  plan.current ? 'border-indigo-600' : 'border-gray-200'
                }`}
              >
                {plan.current && (
                  <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium inline-block mb-4">
                    Current Plan
                  </div>
                )}
                <div className="font-semibold text-gray-900 mb-2">{plan.name}</div>
                <div className="text-3xl font-bold text-gray-900 mb-4">{plan.price}<span className="text-base font-normal text-gray-600">/mo</span></div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                  plan.current
                    ? 'bg-gray-100 text-gray-600 cursor-default'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}>
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integrations */}
      {activeTab === 'integrations' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Available Integrations</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Slack', description: 'Get notifications in Slack', connected: true },
                { name: 'LinkedIn', description: 'Import candidate profiles', connected: true },
                { name: 'Google Calendar', description: 'Sync interview schedules', connected: false },
                { name: 'Zoom', description: 'Create video interviews', connected: false },
                { name: 'Gmail', description: 'Send emails directly', connected: true },
                { name: 'Greenhouse', description: 'Sync job postings', connected: false }
              ].map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Link2 className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">{integration.name}</div>
                      <div className="text-xs text-gray-500">{integration.description}</div>
                    </div>
                  </div>
                  <button className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    integration.connected
                      ? 'bg-green-50 text-green-700 hover:bg-green-100'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    {integration.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
