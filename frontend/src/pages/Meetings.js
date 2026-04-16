import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Video, Phone, MapPin, Mail, Search, X, CheckCircle, XCircle, Menu, Activity, Eye, Settings, UserCheck, Phone as PhoneIcon, GitBranch, Puzzle, ArrowUp, BarChart3, Building, HelpCircle, MoreVertical, ChevronRight } from 'lucide-react';
import { getBookings, deleteBooking } from '../services/api';
import { Link } from 'react-router-dom';
import showToast from '../utils/toast';

export const Meetings = () => {
  const [bookings, setBookings] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', eventType: { name: '30 Minute Meeting', duration: 30, location: 'videoCall' }, startTime: '2024-12-15T10:00:00Z', endTime: '2024-12-15T10:30:00Z', status: 'confirmed', notes: 'Discuss project requirements' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', eventType: { name: '1 Hour Consultation', duration: 60, location: 'phoneCall' }, startTime: '2024-12-15T14:00:00Z', endTime: '2024-12-15T15:00:00Z', status: 'pending', notes: 'Initial consultation call' },
    { id: 3, name: 'Mike Davis', email: 'mike.davis@example.com', eventType: { name: '15 Minute Quick Chat', duration: 15, location: 'inPerson' }, startTime: '2024-12-14T16:30:00Z', endTime: '2024-12-14T16:45:00Z', status: 'completed', notes: 'Quick follow-up meeting' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDeleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to cancel this meeting?')) {
      try {
        await deleteBooking(id);
        setBookings(bookings.filter(booking => booking.id !== id));
        showToast.success('Meeting cancelled successfully!');
      } catch (error) {
        console.error('Error cancelling booking:', error);
        showToast.error('Error cancelling meeting. Please try again.');
      }
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.eventType?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLocationIcon = (location) => {
    switch (location) {
      case 'videoCall':
        return <Video className="h-4 w-4" />;
      case 'phoneCall':
        return <Phone className="h-4 w-4" />;
      case 'inPerson':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'No date set';
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Mock data for demonstration
  const mockBookings = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      eventType: { name: '30 Minute Meeting', duration: 30, location: 'videoCall' },
      startTime: '2024-12-15T10:00:00Z',
      endTime: '2024-12-15T10:30:00Z',
      status: 'confirmed',
      notes: 'Discuss project requirements'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      eventType: { name: '1 Hour Consultation', duration: 60, location: 'phoneCall' },
      startTime: '2024-12-15T14:00:00Z',
      endTime: '2024-12-15T15:00:00Z',
      status: 'pending',
      notes: 'Initial consultation call'
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@example.com',
      eventType: { name: '15 Minute Quick Chat', duration: 15, location: 'inPerson' },
      startTime: '2024-12-14T16:30:00Z',
      endTime: '2024-12-14T16:45:00Z',
      status: 'completed',
      notes: 'Quick follow-up meeting'
    },
    {
      id: 4,
      name: 'Emily Wilson',
      email: 'emily.w@example.com',
      eventType: { name: '45 Minute Strategy Session', duration: 45, location: 'videoCall' },
      startTime: '2024-12-16T11:00:00Z',
      endTime: '2024-12-16T11:45:00Z',
      status: 'confirmed',
      notes: 'Strategy planning discussion'
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert.b@example.com',
      eventType: { name: '30 Minute Meeting', duration: 30, location: 'videoCall' },
      startTime: '2024-12-13T09:00:00Z',
      endTime: '2024-12-13T09:30:00Z',
      status: 'cancelled',
      notes: 'Cancelled by client'
    }
  ];

  const displayBookings = filteredBookings.length > 0 ? filteredBookings : mockBookings;

  
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
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white"
              >
                <Users className="h-5 w-5" />
                <span>Meetings</span>
              </Link>
              <Link
                to="/admin/contacts"
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
              >
                <PhoneIcon className="h-5 w-5" />
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
                to="/admin/analytics"
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
              >
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
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
                  <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
                  <p className="text-gray-600 mt-1">Manage your scheduled meetings and appointments</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                  <input
                    type="text"
                    placeholder="Search meetings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="text-sm text-gray-600">
                {displayBookings.length} meetings
              </div>
            </div>
          </div>

          {/* Meetings List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {displayBookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Your scheduled meetings will appear here'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {displayBookings.map((booking) => (
                  <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* User Avatar */}
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {booking.name?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        
                        {/* Meeting Info */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{booking.name}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Mail className="h-4 w-4" />
                              <span>{booking.email}</span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDateTime(booking.startTime)}</span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              {getLocationIcon(booking.eventType?.location)}
                              <span>{booking.eventType?.name}</span>
                            </div>
                          </div>
                          
                          {booking.notes && (
                            <p className="text-sm text-gray-500 mt-2">{booking.notes}</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
