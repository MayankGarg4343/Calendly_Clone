import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Video, Phone, MapPin, Clock, Save, X, Calendar, Search, Filter, MoreVertical, DollarSign, Clock2, Menu, Activity, Users, Eye, Settings, UserCheck, GitBranch, Puzzle, ArrowUp, BarChart3, Building, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import showToast from '../utils/toast';
// Mock API functions for demonstration
const mockCreateEventType = async (eventType) => {
  return { ...eventType, id: Date.now() };
};

const mockUpdateEventType = async (id, eventType) => {
  return { ...eventType, id };
};

const mockDeleteEventType = async (id) => {
  return Promise.resolve();
};

export const EventTypes = () => {
  const [eventTypes, setEventTypes] = useState([
    { id: 1, name: 'Event Type 1', description: 'Description 1', duration: 30, color: '#006BFF', location: 'videoCall', isActive: true, meetingUrl: '', phoneNumber: '', address: '', bufferBefore: 0, bufferAfter: 0, cancellationPolicy: '24_hours', paymentRequired: false, paymentAmount: 0 },
    { id: 2, name: 'Event Type 2', description: 'Description 2', duration: 60, color: '#FF0000', location: 'phoneCall', isActive: false, meetingUrl: '', phoneNumber: '', address: '', bufferBefore: 0, bufferAfter: 0, cancellationPolicy: '24_hours', paymentRequired: false, paymentAmount: 0 },
    { id: 3, name: 'Event Type 3', description: 'Description 3', duration: 90, color: '#00FF00', location: 'inPerson', isActive: true, meetingUrl: '', phoneNumber: '', address: '', bufferBefore: 0, bufferAfter: 0, cancellationPolicy: '24_hours', paymentRequired: false, paymentAmount: 0 },
  ]);
  const [editingEventType, setEditingEventType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 30,
    color: '#006BFF',
    location: 'videoCall',
    isActive: true,
    meetingUrl: '',
    phoneNumber: '',
    address: '',
    bufferBefore: 0,
    bufferAfter: 0,
    cancellationPolicy: '24_hours',
    paymentRequired: false,
    paymentAmount: 0
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEventType) {
        const updated = await mockUpdateEventType(editingEventType.id, formData);
        setEventTypes(eventTypes.map(type => 
          type.id === updated.id ? updated : type
        ));
        showToast.success('Event type updated successfully!');
      } else {
        const created = await mockCreateEventType(formData);
        setEventTypes([...eventTypes, created]);
        showToast.success('Event type created successfully!');
      }
      resetForm();
    } catch (error) {
      console.error('Error saving event type:', error);
      showToast.error('Error saving event type. Please try again.');
    }
  };

  const handleEdit = (eventType) => {
    setEditingEventType(eventType);
    setFormData({
      name: eventType.name,
      description: eventType.description,
      duration: eventType.duration,
      color: eventType.color,
      location: eventType.location,
      isActive: eventType.isActive,
      meetingUrl: eventType.meetingUrl || '',
      phoneNumber: eventType.phoneNumber || '',
      address: eventType.address || '',
      bufferBefore: eventType.bufferBefore || 0,
      bufferAfter: eventType.bufferAfter || 0,
      cancellationPolicy: eventType.cancellationPolicy || '24_hours',
      paymentRequired: eventType.paymentRequired || false,
      paymentAmount: eventType.paymentAmount || 0
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event type?')) {
      try {
        await mockDeleteEventType(id);
        setEventTypes(eventTypes.filter(type => type.id !== id));
        showToast.success('Event type deleted successfully!');
      } catch (error) {
        console.error('Error deleting event type:', error);
        showToast.error('Error deleting event type. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      duration: 30,
      color: '#006BFF',
      location: 'videoCall',
      isActive: true,
      meetingUrl: '',
      phoneNumber: '',
      address: '',
      bufferBefore: 0,
      bufferAfter: 0,
      cancellationPolicy: '24_hours',
      paymentRequired: false,
      paymentAmount: 0
    });
    setEditingEventType(null);
    setShowForm(false);
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
        return null;
    }
  };

  const getLocationText = (location) => {
    switch (location) {
      case 'videoCall':
        return 'Video Call';
      case 'phoneCall':
        return 'Phone Call';
      case 'inPerson':
        return 'In Person';
      default:
        return location;
    }
  };

  const filteredEventTypes = eventTypes.filter(eventType => {
    const matchesSearch = eventType.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         eventType.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && eventType.isActive) ||
                         (filterStatus === 'inactive' && !eventType.isActive);
    
    return matchesSearch && matchesFilter;
  });

  
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
              className="lg:hidden text-gray-400 hover:text-gray-600"
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
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white"
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
                  <h1 className="text-2xl font-bold text-gray-900">Event Types</h1>
                  <p className="text-gray-600 mt-1">Manage your meeting types and scheduling options</p>
                </div>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>New Event Type</span>
              </button>
            </div>
          </div>
        </div>

      {/* Filters */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search event types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              {filteredEventTypes.length} of {eventTypes.length} event types
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Type Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingEventType ? 'Edit Event Type' : 'Create Event Type'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 30 Minute Meeting"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration (minutes)
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={45}>45 minutes</option>
                        <option value={60}>60 minutes</option>
                        <option value={90}>90 minutes</option>
                        <option value={120}>120 minutes</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Describe what this meeting is about..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="videoCall">Video Call</option>
                        <option value="phoneCall">Phone Call</option>
                        <option value="inPerson">In Person</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="#006BFF"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location-specific fields */}
                  {formData.location === 'videoCall' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meeting URL
                      </label>
                      <input
                        type="url"
                        value={formData.meetingUrl}
                        onChange={(e) => setFormData({ ...formData, meetingUrl: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://zoom.us/j/123456789"
                      />
                    </div>
                  )}

                  {formData.location === 'phoneCall' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  )}

                  {formData.location === 'inPerson' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={2}
                        placeholder="123 Main St, City, State 12345"
                      />
                    </div>
                  )}

                  {/* Buffer Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buffer Time Before (minutes)
                      </label>
                      <select
                        value={formData.bufferBefore}
                        onChange={(e) => setFormData({ ...formData, bufferBefore: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={0}>No buffer</option>
                        <option value={5}>5 minutes</option>
                        <option value={10}>10 minutes</option>
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buffer Time After (minutes)
                      </label>
                      <select
                        value={formData.bufferAfter}
                        onChange={(e) => setFormData({ ...formData, bufferAfter: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={0}>No buffer</option>
                        <option value={5}>5 minutes</option>
                        <option value={10}>10 minutes</option>
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                      </select>
                    </div>
                  </div>

                  {/* Cancellation Policy */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cancellation Policy
                    </label>
                    <select
                      value={formData.cancellationPolicy}
                      onChange={(e) => setFormData({ ...formData, cancellationPolicy: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="flexible">Flexible (24 hours)</option>
                      <option value="24_hours">24 hours notice</option>
                      <option value="48_hours">48 hours notice</option>
                      <option value="72_hours">72 hours notice</option>
                      <option value="strict">Strict (no refunds)</option>
                    </select>
                  </div>

                  {/* Payment Options */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="paymentRequired"
                        checked={formData.paymentRequired}
                        onChange={(e) => setFormData({ ...formData, paymentRequired: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="paymentRequired" className="ml-2 text-sm text-gray-700">
                        Payment Required
                      </label>
                    </div>

                    {formData.paymentRequired && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Amount ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.paymentAmount}
                          onChange={(e) => setFormData({ ...formData, paymentAmount: parseFloat(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="50.00"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                      Active (available for booking)
                    </label>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>{editingEventType ? 'Update' : 'Create'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Event Types List */}
        {filteredEventTypes.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No event types found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterStatus !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Create your first event type to start accepting bookings'}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Create Event Type
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEventTypes.map((eventType) => (
              <div key={eventType.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: eventType.color }}
                    >
                      {getLocationIcon(eventType.location)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {eventType.name}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        eventType.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {eventType.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4">{eventType.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{eventType.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getLocationIcon(eventType.location)}
                      <span>{getLocationText(eventType.location)}</span>
                    </div>
                  </div>
                  
                  {(eventType.bufferBefore > 0 || eventType.bufferAfter > 0) && (
                    <div className="text-sm text-gray-500">
                      Buffer: {eventType.bufferBefore > 0 && `${eventType.bufferBefore}min before`}
                      {eventType.bufferBefore > 0 && eventType.bufferAfter > 0 && ' + '}
                      {eventType.bufferAfter > 0 && `${eventType.bufferAfter}min after`}
                    </div>
                  )}
                  
                  {eventType.paymentRequired && (
                    <div className="flex items-center space-x-1 text-sm font-medium text-green-600">
                      <DollarSign className="h-4 w-4" />
                      <span>${eventType.paymentAmount || 0} required</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(eventType)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(eventType.id)}
                    className="px-3 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
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
