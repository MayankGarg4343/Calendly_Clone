import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Video, Phone, MapPin, Mail, Search, X, CheckCircle, XCircle, Menu, Activity, Eye, Settings, UserCheck, Phone as PhoneIcon, GitBranch, Puzzle, ArrowUp, BarChart3, Building, HelpCircle, MoreVertical, ChevronRight, Plus, Edit2, Trash2, Zap, Bell, MessageSquare, Calendar as CalendarIcon, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWorkflows, createWorkflow, updateWorkflow, deleteWorkflow } from '../services/api';
import showToast from '../utils/toast';

export const Workflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    trigger: 'meeting_booked',
    actions: ['send_email'],
    isActive: true
  });

  // Load workflows from API
  useEffect(() => {
    const loadWorkflows = async () => {
      try {
        const data = await getWorkflows();
        setWorkflows(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading workflows:', error);
        showToast.error('Failed to load workflows. Please try again.');
        setLoading(false);
      }
    };
    
    loadWorkflows();
  }, []);

  const handleAddWorkflow = async () => {
    try {
      const newWorkflow = await createWorkflow(formData);
      setWorkflows([...workflows, newWorkflow]);
      setShowForm(false);
      resetForm();
      showToast.success('Workflow created successfully!');
    } catch (error) {
      console.error('Error creating workflow:', error);
      showToast.error('Failed to create workflow. Please try again.');
    }
  };

  const handleEditWorkflow = (workflow) => {
    setEditingWorkflow(workflow);
    setFormData({
      name: workflow.name || '',
      description: workflow.description || '',
      trigger: workflow.trigger || 'meeting_booked',
      actions: workflow.actions || ['send_email'],
      isActive: workflow.isActive || true
    });
    setShowForm(true);
  };

  const handleUpdateWorkflow = async () => {
    try {
      const updatedWorkflow = await updateWorkflow(editingWorkflow.id, formData);
      setWorkflows(workflows.map(workflow => 
        workflow.id === updatedWorkflow.id ? updatedWorkflow : workflow
      ));
      setShowForm(false);
      resetForm();
      setEditingWorkflow(null);
      showToast.success('Workflow updated successfully!');
    } catch (error) {
      console.error('Error updating workflow:', error);
      showToast.error('Failed to update workflow. Please try again.');
    }
  };

  const handleDeleteWorkflow = async (id) => {
    if (window.confirm('Are you sure you want to delete this workflow?')) {
      try {
        await deleteWorkflow(id);
        setWorkflows(workflows.filter(workflow => workflow.id !== id));
        showToast.success('Workflow deleted successfully!');
      } catch (error) {
        console.error('Error deleting workflow:', error);
        showToast.error('Failed to delete workflow. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      trigger: 'meeting_booked',
      actions: ['send_email'],
      isActive: true
    });
    setEditingWorkflow(null);
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Mock data for demonstration
  const mockWorkflows = [
    {
      id: 1,
      name: 'Welcome Email',
      description: 'Send welcome email when someone books a meeting',
      trigger: 'meeting_booked',
      actions: ['send_email'],
      isActive: true,
      icon: Mail,
      color: 'blue',
      lastRun: '2024-12-14T10:30:00Z',
      totalRuns: 156
    },
    {
      id: 2,
      name: 'Meeting Reminder',
      description: 'Send reminder 24 hours before meeting',
      trigger: 'meeting_scheduled',
      actions: ['send_email', 'send_sms'],
      isActive: true,
      icon: Bell,
      color: 'green',
      lastRun: '2024-12-15T09:00:00Z',
      totalRuns: 89
    },
    {
      id: 3,
      name: 'Follow-up Message',
      description: 'Send follow-up message 1 hour after meeting',
      trigger: 'meeting_completed',
      actions: ['send_email'],
      isActive: false,
      icon: MessageSquare,
      color: 'purple',
      lastRun: '2024-12-10T16:30:00Z',
      totalRuns: 45
    },
    {
      id: 4,
      name: 'Calendar Sync',
      description: 'Sync meetings with Google Calendar',
      trigger: 'meeting_booked',
      actions: ['calendar_sync'],
      isActive: true,
      icon: CalendarIcon,
      color: 'orange',
      lastRun: '2024-12-15T14:15:00Z',
      totalRuns: 234
    },
    {
      id: 5,
      name: 'Client Onboarding',
      description: 'Start onboarding process for new clients',
      trigger: 'first_meeting_booked',
      actions: ['send_email', 'create_task', 'notify_team'],
      isActive: true,
      icon: User,
      color: 'red',
      lastRun: '2024-12-12T11:00:00Z',
      totalRuns: 28
    }
  ];

  const displayWorkflows = filteredWorkflows.length > 0 ? filteredWorkflows : mockWorkflows;

  const getStatusColor = (isActive) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getIconColor = (color) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'green':
        return 'bg-green-100 text-green-600';
      case 'purple':
        return 'bg-purple-100 text-purple-600';
      case 'orange':
        return 'bg-orange-100 text-orange-600';
      case 'red':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
                <PhoneIcon className="h-5 w-5" />
                <span>Contacts</span>
              </Link>
              <Link
                to="/admin/workflows"
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white"
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
                  <h1 className="text-2xl font-bold text-gray-900">Workflows</h1>
                  <p className="text-gray-600 mt-1">Automate your scheduling processes</p>
                </div>
              </div>
              <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                <Plus className="h-4 w-4" />
                <span>Create Workflow</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search workflows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="text-sm text-gray-600">
                {displayWorkflows.length} workflows
              </div>
            </div>
          </div>

          {/* Workflows Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayWorkflows.map((workflow) => (
              <div key={workflow.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                {/* Workflow Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${getIconColor(workflow.color)} rounded-lg flex items-center justify-center`}>
                    <workflow.icon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(workflow.isActive)}`}>
                      {workflow.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button className="p-1 text-gray-600 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Workflow Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{workflow.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{workflow.description}</p>

                {/* Workflow Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Last run: {formatDate(workflow.lastRun)}</span>
                  <span>Total runs: {workflow.totalRuns}</span>
                </div>

                {/* Workflow Actions */}
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleEditWorkflow(workflow)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm flex items-center justify-center space-x-1">
                    <Edit2 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm flex items-center space-x-1">
                    <Zap className="h-4 w-4" />
                    <span>Run</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {displayWorkflows.length === 0 && (
            <div className="text-center py-12">
              <GitBranch className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No workflows found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search' : 'Create your first workflow to automate your scheduling'}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 mx-auto">
                <Plus className="h-4 w-4" />
                <span>Create Workflow</span>
              </button>
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

        {/* Workflow Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowForm(false)}></div>
            <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingWorkflow ? 'Edit Workflow' : 'Create Workflow'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={editingWorkflow ? handleUpdateWorkflow : handleAddWorkflow} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Workflow Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="e.g., Welcome Email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    rows="3"
                    placeholder="Describe what this workflow does"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trigger *
                  </label>
                  <select
                    value={formData.trigger}
                    onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="meeting_booked">Meeting Booked</option>
                    <option value="meeting_scheduled">Meeting Scheduled</option>
                    <option value="meeting_completed">Meeting Completed</option>
                    <option value="meeting_cancelled">Meeting Cancelled</option>
                    <option value="first_meeting_booked">First Meeting Booked</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Actions *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.actions.includes('send_email')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, actions: [...formData.actions, 'send_email'] });
                          } else {
                            setFormData({ ...formData, actions: formData.actions.filter(a => a !== 'send_email') });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Send Email</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.actions.includes('send_sms')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, actions: [...formData.actions, 'send_sms'] });
                          } else {
                            setFormData({ ...formData, actions: formData.actions.filter(a => a !== 'send_sms') });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Send SMS</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.actions.includes('calendar_sync')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, actions: [...formData.actions, 'calendar_sync'] });
                          } else {
                            setFormData({ ...formData, actions: formData.actions.filter(a => a !== 'calendar_sync') });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Calendar Sync</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.actions.includes('create_task')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, actions: [...formData.actions, 'create_task'] });
                          } else {
                            setFormData({ ...formData, actions: formData.actions.filter(a => a !== 'create_task') });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Create Task</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.actions.includes('notify_team')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, actions: [...formData.actions, 'notify_team'] });
                          } else {
                            setFormData({ ...formData, actions: formData.actions.filter(a => a !== 'notify_team') });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Notify Team</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    {editingWorkflow ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
