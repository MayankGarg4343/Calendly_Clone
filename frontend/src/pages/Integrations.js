import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Video, Phone, MapPin, Mail, Search, X, CheckCircle, XCircle, Menu, Activity, Eye, Settings, UserCheck, Phone as PhoneIcon, GitBranch, Puzzle, ArrowUp, BarChart3, Building, HelpCircle, MoreVertical, ChevronRight, Plus, ExternalLink, Check, MessageSquare, CreditCard, DollarSign, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getIntegrations, connectIntegration, disconnectIntegration } from '../services/api';
import showToast from '../utils/toast';

export const Integrations = () => {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load integrations from API
  useEffect(() => {
    const loadIntegrations = async () => {
      try {
        const data = await getIntegrations();
        setIntegrations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading integrations:', error);
        showToast.error('Failed to load integrations. Please try again.');
        setLoading(false);
      }
    };
    
    loadIntegrations();
  }, []);

  const handleConnectIntegration = async (id) => {
    try {
      const updatedIntegration = await connectIntegration(id);
      setIntegrations(integrations.map(integration => 
        integration.id === id ? { ...updatedIntegration, isConnected: true } : integration
      ));
      showToast.success('Integration connected successfully!');
    } catch (error) {
      console.error('Error connecting integration:', error);
      showToast.error('Failed to connect integration. Please try again.');
    }
  };

  const handleDisconnectIntegration = async (id) => {
    try {
      await disconnectIntegration(id);
      setIntegrations(integrations.map(integration => 
        integration.id === id ? { ...integration, isConnected: false } : integration
      ));
      showToast.success('Integration disconnected successfully!');
    } catch (error) {
      console.error('Error disconnecting integration:', error);
      showToast.error('Failed to disconnect integration. Please try again.');
    }
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Mock data for demonstration
  const mockIntegrations = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Google Calendar',
      description: 'Sync your meetings with Google Calendar',
      category: 'Calendar',
      icon: 'google',
      isConnected: true,
      color: 'blue',
      features: ['Two-way sync', 'Real-time updates', 'Multiple calendars']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Microsoft Outlook',
      description: 'Connect with Microsoft Outlook Calendar',
      category: 'Calendar',
      icon: 'microsoft',
      isConnected: false,
      color: 'blue',
      features: ['Calendar sync', 'Meeting invites', 'Event updates']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Zoom',
      description: 'Generate Zoom meeting links automatically',
      category: 'Video',
      icon: 'zoom',
      isConnected: true,
      color: 'blue',
      features: ['Auto-generated links', 'Meeting settings', 'Recording options']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      name: 'Microsoft Teams',
      description: 'Create Teams meetings for your bookings',
      category: 'Video',
      icon: 'microsoft',
      isConnected: false,
      color: 'purple',
      features: ['Teams meetings', 'Channel integration', 'Chat features']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440005',
      name: 'Slack',
      description: 'Get notifications in Slack channels',
      category: 'Communication',
      icon: 'slack',
      isConnected: true,
      color: 'purple',
      features: ['Channel notifications', 'DM alerts', 'Custom messages']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440006',
      name: 'Microsoft Teams',
      description: 'Chat and notifications in Teams',
      category: 'Communication',
      icon: 'microsoft',
      isConnected: false,
      color: 'blue',
      features: ['Team notifications', 'Chat integration', 'File sharing']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440007',
      name: 'HubSpot',
      description: 'Sync contacts with HubSpot CRM',
      category: 'CRM',
      icon: 'hubspot',
      isConnected: true,
      color: 'orange',
      features: ['Contact sync', 'Deal tracking', 'Activity logging']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440008',
      name: 'Salesforce',
      description: 'Connect with Salesforce CRM',
      category: 'CRM',
      icon: 'salesforce',
      color: 'blue',
      features: ['Lead capture', 'Contact management', 'Opportunity tracking']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440009',
      name: 'Stripe',
      description: 'Process payments for paid meetings',
      category: 'Payment',
      icon: 'stripe',
      isConnected: false,
      color: 'purple',
      features: ['Payment processing', 'Refunds', 'Subscription management']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440010',
      name: 'PayPal',
      description: 'Accept PayPal payments',
      category: 'Payment',
      icon: 'paypal',
      isConnected: false,
      color: 'blue',
      features: ['PayPal checkout', 'Invoice payments', 'Recurring billing']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440011',
      name: 'Zapier',
      description: 'Connect with 3000+ apps via Zapier',
      category: 'Automation',
      icon: 'zapier',
      isConnected: true,
      color: 'orange',
      features: ['3000+ apps', 'Custom workflows', 'Real-time triggers']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440012',
      name: 'Make (Integromat)',
      description: 'Visual automation platform',
      category: 'Automation',
      icon: 'make',
      isConnected: false,
      color: 'blue',
      features: ['Visual builder', 'Advanced logic', 'Multi-step workflows']
    }
  ];

  const displayIntegrations = filteredIntegrations.length > 0 ? filteredIntegrations : mockIntegrations;

  const getStatusColor = (isConnected) => {
    return isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getIconColor = (icon) => {
    switch (icon) {
      case 'google':
        return 'bg-blue-100 text-blue-600';
      case 'microsoft':
        return 'bg-blue-100 text-blue-600';
      case 'zoom':
        return 'bg-blue-100 text-blue-600';
      case 'slack':
        return 'bg-purple-100 text-purple-600';
      case 'hubspot':
        return 'bg-orange-100 text-orange-600';
      case 'salesforce':
        return 'bg-blue-100 text-blue-600';
      case 'stripe':
        return 'bg-purple-100 text-purple-600';
      case 'paypal':
        return 'bg-blue-100 text-blue-600';
      case 'zapier':
        return 'bg-orange-100 text-orange-600';
      case 'make':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getIconComponent = (icon) => {
    switch (icon) {
      case 'google':
        return <span className="text-xl font-bold"><img src='https://assets.calendly.com/mfe/mf-publisher/frontend/media/google-calendar-9d502e45f709b07b91a1.svg'></img></span>;
      case 'microsoft':
        return <span className="text-xl font-bold"><img src='https://assets.calendly.com/mfe/mf-publisher/frontend/media/outlook_extension-3dcb55a85151d4783bf9.svg'></img></span>;
      case 'zoom':
        return <span className="text-xl font-bold"><img src='https://assets.calendly.com/mfe/mf-publisher/frontend/media/zoom-42d3876ae6a77cd0927f.svg'></img></span>;
      case 'slack':
        return <span className="text-xl font-bold"><img src='https://assets.calendly.com/mfe/mf-publisher/frontend/media/slack-4cc01e8ecd1ab0101193.svg'></img></span>;
      case 'hubspot':
        return <span className="text-xl font-bold"><img src='https://assets.calendly.com/mfe/mf-publisher/frontend/media/hubspot-947b620ac8ce8d1c8fb4.svg'></img></span>;
      case 'salesforce':
       return <span className="text-xl font-bold"><img src='https://assets.calendly.com/mfe/mf-publisher/frontend/media/salesforce-pardot-09dabde1d4b36f63611c.svg'></img></span>;
      case 'stripe':
        return <span className="text-xl font-bold"><img src='https://assets.calendly.com/mfe/mf-publisher/frontend/media/stripe-4b6a6cc4ce4b269bbe04.svg'></img></span>;
      case 'paypal':
        return <span className="text-xl font-bold"><img src='https://assets.calendly.com/mfe/mf-publisher/frontend/media/pay-pal-23e8d5edeb8ce0250bf8.svg'></img></span>;
      case 'zapier':
        return <span className="text-xl font-bold"><img src='https://assets.calendly.com/mfe/mf-publisher/frontend/media/zapier-e8e0b1a3b21f207102e2.svg'></img></span>;
      case 'make':
        return <span className="text-xl font-bold"><img src='https://assets.calendly.com/mfe/mf-publisher/frontend/media/marketo-5c2970cb5941e26bb17a.svg'></img></span>;
      default:
        return <Puzzle className="h-6 w-6" />;
    }
  };

  const categories = ['All', 'Calendar', 'Video', 'Communication', 'CRM', 'Payment', 'Automation'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredByCategory = selectedCategory === 'All' 
    ? displayIntegrations 
    : displayIntegrations.filter(integration => integration.category === selectedCategory);

  
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
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
              >
                <GitBranch className="h-5 w-5" />
                <span>Workflows</span>
              </Link>
              <Link
                to="/admin/integrations"
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white"
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
                  <h1 className="text-2xl font-bold text-gray-900">Integrations & apps</h1>
                  <p className="text-gray-600 mt-1">Connect your favorite tools and services</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredByCategory.map((integration) => (
              <div key={integration.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                {/* Integration Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${getIconColor(integration.icon)} rounded-lg flex items-center justify-center`}>
                    {getIconComponent(integration.icon)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(integration.isConnected)}`}>
                      {integration.isConnected ? 'Connected' : 'Not connected'}
                    </span>
                    <button className="p-1 text-gray-600 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Integration Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{integration.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">Features:</p>
                  <div className="space-y-1">
                    {integration.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                        <Check className="h-3 w-3 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => integration.isConnected 
                    ? handleDisconnectIntegration(integration.id) 
                    : handleConnectIntegration(integration.id)
                  }
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  integration.isConnected 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  {integration.isConnected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredByCategory.length === 0 && (
            <div className="text-center py-12">
              <Puzzle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedCategory !== 'All' 
                  ? 'Try adjusting your search or filters' 
                  : 'Browse our available integrations'}
              </p>
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
