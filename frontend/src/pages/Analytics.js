import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Video, Phone, MapPin, Mail, Search, X, CheckCircle, XCircle, Menu, Activity, Eye, Settings, UserCheck, Phone as PhoneIcon, GitBranch, Puzzle, ArrowUp, BarChart3, Building, HelpCircle, MoreVertical, ChevronRight, TrendingUp, TrendingDown, CalendarDays, UserPlus, DollarSign, AlertCircle, Filter, Download, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalBookings: 1256,
    totalRevenue: 45890,
    totalUsers: 892,
    conversionRate: 68.5,
    averageMeetingDuration: 42,
    topEventTypes: [
      { name: '30 Minute Meeting', bookings: 456, revenue: 18240 },
      { name: '1 Hour Consultation', bookings: 312, revenue: 15600 },
      { name: '15 Minute Quick Chat', bookings: 289, revenue: 8667 },
      { name: 'Team Meeting', bookings: 199, revenue: 3383 }
    ],
    monthlyData: [
      { month: 'Jan', bookings: 89, revenue: 3456 },
      { month: 'Feb', bookings: 124, revenue: 2890 },
      { month: 'Mar', bookings: 156, revenue: 4234 },
      { month: 'Apr', bookings: 198, revenue: 5678 },
      { month: 'May', bookings: 234, revenue: 6789 },
      { month: 'Jun', bookings: 189, revenue: 4567 },
      { month: 'Jul', bookings: 145, revenue: 3456 },
      { month: 'Aug', bookings: 167, revenue: 2890 },
      { month: 'Sep', bookings: 178, revenue: 4234 },
      { month: 'Oct', bookings: 201, revenue: 5678 },
      { month: 'Nov', bookings: 156, revenue: 3456 },
      { month: 'Dec', bookings: 189, revenue: 4567 }
    ],
    weeklyData: [
      { week: 'Week 1', bookings: 234, revenue: 6789 },
      { week: 'Week 2', bookings: 189, revenue: 4567 },
      { week: 'Week 3', bookings: 156, revenue: 3456 },
      { week: 'Week 4', bookings: 201, revenue: 5678 }
    ],
    deviceBreakdown: [
      { device: 'Desktop', users: 456, percentage: 51.2 },
      { device: 'Mobile', users: 312, percentage: 35.0 },
      { device: 'Tablet', users: 124, percentage: 13.8 }
    ],
    topSources: [
      { source: 'Direct', visitors: 2345, percentage: 45.2 },
      { source: 'Google', visitors: 1890, percentage: 36.4 },
      { source: 'Social Media', visitors: 678, percentage: 13.1 },
      { source: 'Email', visitors: 334, percentage: 5.3 }
    ]
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('last30days');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Secondary Navigation */}
              <div className="space-y-1">
                <Link
                  to="/admin/upgrade"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <ArrowUp className="h-5 w-5" />
                  <span>Upgrade plan</span>
                </Link>
                <Link
                  to="/admin/admin-center"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <Building className="h-5 w-5" />
                  <span>Admin center</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Help Section */}
              <div className="space-y-1">
                <Link
                  to="/admin/help"
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>Help</span>
                </Link>
              </div>
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
                  <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                  <p className="text-gray-600 mt-1">Track your booking performance and user engagement</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="last7days">Last 7 days</option>
                  <option value="last30days">Last 30 days</option>
                  <option value="last90days">Last 90 days</option>
                  <option value="lastyear">Last year</option>
                </select>
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
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Total Bookings</h3>
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">12.5%</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalBookings}</p>
              <p className="text-sm text-gray-500 mt-1">+142 from last month</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">8.3%</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.totalRevenue)}</p>
              <p className="text-sm text-gray-500 mt-1">+{formatCurrency(3456)} from last month</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Active Users</h3>
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">15.2%</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalUsers}</p>
              <p className="text-sm text-gray-500 mt-1">+118 from last month</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
                <div className="flex items-center space-x-1 text-red-600">
                  <TrendingDown className="h-4 w-4" />
                  <span className="text-sm font-medium">2.1%</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatPercentage(analyticsData.conversionRate)}</p>
              <p className="text-sm text-gray-500 mt-1">-1.4% from last month</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Bookings Over Time Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Bookings Over Time</h3>
                <button className="p-2 text-gray-600 hover:text-gray-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              <div className="h-64 flex items-end justify-between space-x-2">
                {analyticsData.monthlyData.map((month, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(month.bookings / 250) * 100}%` }}
                    ></div>
                    <p className="text-xs text-gray-600 mt-2">{month.month}</p>
                    <p className="text-sm font-medium text-gray-900">{month.bookings}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
                <button className="p-2 text-gray-600 hover:text-gray-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              <div className="h-64 flex items-end justify-between space-x-2">
                {analyticsData.monthlyData.map((month, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-green-500 rounded-t"
                      style={{ height: `${(month.revenue / 7000) * 100}%` }}
                    ></div>
                    <p className="text-xs text-gray-600 mt-2">{month.month}</p>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(month.revenue)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Event Types */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Event Types</h3>
              <div className="space-y-3">
                {analyticsData.topEventTypes.map((eventType, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{eventType.name}</p>
                        <p className="text-xs text-gray-500">{eventType.bookings} bookings</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(eventType.revenue)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
              <div className="space-y-3">
                {analyticsData.deviceBreakdown.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{device.device}</p>
                        <p className="text-xs text-gray-500">{device.users} users</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{formatPercentage(device.percentage)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
              <div className="space-y-3">
                {analyticsData.topSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{source.source}</p>
                        <p className="text-xs text-gray-500">{source.visitors} visitors</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{formatPercentage(source.percentage)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
