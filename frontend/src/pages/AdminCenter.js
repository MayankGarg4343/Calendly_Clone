import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, Phone, MapPin, Mail, Search, X, CheckCircle, XCircle, Menu, Activity, Eye, Settings, UserCheck, Phone as PhoneIcon, GitBranch, Puzzle, ArrowUp, BarChart3, Building, HelpCircle, MoreVertical, ChevronRight, Shield, Users2, Key, Database, Globe, Bell, CreditCard, Download, RefreshCw, AlertTriangle, Info, Lock, UserPlus, FileText, Zap, TrendingUp, Award, Target, Star, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import showToast from '../utils/toast';

export const AdminCenter = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalBookings: 5634,
    revenue: 125890,
    conversionRate: 68.5,
    avgSessionDuration: '12m 34s',
    serverUptime: '99.9%',
    storageUsed: '67.4 GB',
    apiCalls: 125678,
    errorRate: '0.12%',
    responseTime: '142ms'
  };

  const recentActivity = [
    { id: 1, user: 'John Smith', action: 'Created new event type', time: '2 minutes ago', type: 'create' },
    { id: 2, user: 'Sarah Johnson', action: 'Updated availability settings', time: '15 minutes ago', type: 'update' },
    { id: 3, user: 'Mike Davis', action: 'Deleted booking', time: '1 hour ago', type: 'delete' },
    { id: 4, user: 'Emma Wilson', action: 'Added new team member', time: '2 hours ago', type: 'create' },
    { id: 5, user: 'Alex Brown', action: 'Modified workflow', time: '3 hours ago', type: 'update' }
  ];

  const systemHealth = [
    { name: 'API Server', status: 'healthy', uptime: '99.9%', responseTime: '142ms' },
    { name: 'Database', status: 'healthy', uptime: '99.8%', responseTime: '89ms' },
    { name: 'Email Service', status: 'healthy', uptime: '99.7%', responseTime: '234ms' },
    { name: 'Payment Gateway', status: 'healthy', uptime: '99.9%', responseTime: '178ms' },
    { name: 'File Storage', status: 'warning', uptime: '98.5%', responseTime: '456ms' }
  ];

  const teamMembers = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', role: 'Admin', status: 'active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Manager', status: 'active', lastLogin: '1 day ago' },
    { id: 3, name: 'Mike Davis', email: 'mike.davis@example.com', role: 'User', status: 'active', lastLogin: '3 days ago' },
    { id: 4, name: 'Emma Wilson', email: 'emma.w@example.com', role: 'User', status: 'inactive', lastLogin: '2 weeks ago' }
  ];

  const securityLogs = [
    { id: 1, event: 'Login attempt', user: 'admin@calendlyclone.com', ip: '192.168.1.1', time: '2 minutes ago', status: 'success' },
    { id: 2, event: 'Password change', user: 'sarah.j@example.com', ip: '192.168.1.2', time: '15 minutes ago', status: 'success' },
    { id: 3, event: 'Failed login', user: 'unknown', ip: '192.168.1.3', time: '1 hour ago', status: 'failed' },
    { id: 4, event: 'API key generated', user: 'mike.davis@example.com', ip: '192.168.1.4', time: '2 hours ago', status: 'success' },
    { id: 5, event: 'Account locked', user: 'unknown', ip: '192.168.1.5', time: '3 hours ago', status: 'warning' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'create':
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case 'update':
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      case 'delete':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSecurityStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:fixed border-r border-gray-200`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-black">Calendly</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-600 hover:text-gray-600"
            >
              <Settings className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto px-4 py-8">
            <div className="space-y-6">
              {/* Main Navigation */}
              <div className="space-y-1">
                <Link
                  to="/admin"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <Activity className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/admin/event-types"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Event Types</span>
                </Link>
                <Link
                  to="/admin/availability"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <Clock className="h-5 w-5" />
                  <span>Availability</span>
                </Link>
                <Link
                  to="/admin/meetings"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <Users className="h-5 w-5" />
                  <span>Meetings</span>
                </Link>
                <Link
                  to="/admin/contacts"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <Phone className="h-5 w-5" />
                  <span>Contacts</span>
                </Link>
                <Link
                  to="/admin/workflows"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <GitBranch className="h-5 w-5" />
                  <span>Workflows</span>
                </Link>
                <Link
                  to="/admin/integrations"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <Puzzle className="h-5 w-5" />
                  <span>Integrations & apps</span>
                </Link>
                <Link
                  to="/admin/analytics"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics</span>
                </Link>
                <Link
                  to="/admin/upgrade"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <ArrowUp className="h-5 w-5" />
                  <span>Upgrade plan</span>
                </Link>
                <Link
                  to="/admin/admin-center"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white"
                >
                  <Building className="h-5 w-5" />
                  <span>Admin center</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Secondary Navigation */}
              <div className="space-y-1">
                <Link
                  to="/admin/help"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>Help</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>
            </div>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-black">Admin User</p>
                <p className="text-xs text-gray-600">admin@calendlyclone.com</p>
              </div>
              <Settings className="h-4 w-4 text-gray-600 hover:text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-600 hover:text-gray-900"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Center</h1>
                  <p className="text-gray-600 mt-1">System administration and management</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-gray-600">
                  <Download className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-600">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex space-x-1 p-1">
              {['overview', 'users', 'security', 'system', 'billing'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
                    <Users2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Active Users</h3>
                    <Activity className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+8.3% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Total Bookings</h3>
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBookings.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+15.2% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+18.7% from last month</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <button className="p-2 text-gray-600 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getActivityIcon(activity.type)}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">by {activity.user}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <button
                  onClick={() => showToast.success('Team member added successfully!')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Add Member</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {teamMembers.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            member.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.lastLogin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Security Logs</h3>
                <button
                  onClick={() => showToast.success('Security logs exported successfully!')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Export Logs
                </button>
              </div>
              <div className="space-y-4">
                {securityLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{log.event}</p>
                        <p className="text-xs text-gray-500">{log.user} • {log.ip}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSecurityStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              {/* System Health */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
                  <button className="p-2 text-gray-600 hover:text-gray-600">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {systemHealth.map((service) => (
                    <div key={service.name} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{service.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}>
                          {service.status}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600">Uptime: {service.uptime}</p>
                        <p className="text-xs text-gray-600">Response: {service.responseTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">System Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Server Uptime</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.serverUptime}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Storage Used</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.storageUsed}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">API Calls</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.apiCalls.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Error Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.errorRate}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Billing Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Current Plan</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold text-blue-900">Teams Plan</p>
                          <p className="text-sm text-blue-600">$16/month</p>
                        </div>
                        <Award className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Next Billing Date</p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-lg font-semibold text-green-900">January 15, 2025</p>
                      <p className="text-sm text-green-600">In 30 days</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Usage Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API Calls This Month</span>
                    <span className="text-sm font-medium text-gray-900">125,678 / 1,000,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '12.6%' }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Storage Used</span>
                    <span className="text-sm font-medium text-gray-900">67.4 GB / 100 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '67.4%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
