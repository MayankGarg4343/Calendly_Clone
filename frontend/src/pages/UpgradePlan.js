import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, Phone, MapPin, Mail, Search, X, CheckCircle, XCircle, Menu, Activity, Eye, Settings, UserCheck, Phone as PhoneIcon, GitBranch, Puzzle, ArrowUp, BarChart3, Building, HelpCircle, MoreVertical, ChevronRight, Check, Star, Zap, Shield, Users2, Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import showToast from '../utils/toast';

export const UpgradePlan = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const plans = [
    {
      name: 'Basic',
      price: billingCycle === 'monthly' ? 8 : 6,
      yearlyPrice: 6,
      description: 'Perfect for individuals getting started',
      features: [
        '1 calendar connection',
        'Unlimited events',
        'Basic customization',
        'Email support',
        'Mobile app access'
      ],
      excludedFeatures: [
        'Team members',
        'Advanced analytics',
        'Custom branding',
        'API access'
      ],
      color: 'gray',
      popular: false
    },
    {
      name: 'Teams',
      price: billingCycle === 'monthly' ? 16 : 12,
      yearlyPrice: 12,
      description: 'Great for small teams and businesses',
      features: [
        '5 calendar connections',
        'Unlimited events',
        'Advanced customization',
        'Priority email support',
        'Mobile app access',
        '5 team members',
        'Team scheduling links',
        'Basic analytics',
        'Custom branding'
      ],
      excludedFeatures: [
        'Advanced analytics',
        'API access',
        'Dedicated support'
      ],
      color: 'blue',
      popular: true
    },
    {
      name: 'Business',
      price: billingCycle === 'monthly' ? 32 : 24,
      yearlyPrice: 24,
      description: 'Complete solution for growing businesses',
      features: [
        'Unlimited calendar connections',
        'Unlimited events',
        'Full customization',
        'Priority support',
        'Mobile app access',
        'Unlimited team members',
        'Team scheduling links',
        'Advanced analytics',
        'Custom branding',
        'API access',
        'Dedicated account manager',
        'Custom integrations'
      ],
      excludedFeatures: [],
      color: 'purple',
      popular: false
    }
  ];

  const getPlanColor = (color) => {
    switch (color) {
      case 'gray':
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-900',
          button: 'bg-gray-600 hover:bg-gray-700',
          popular: 'bg-gray-100 text-gray-800'
        };
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-900',
          button: 'bg-blue-600 hover:bg-blue-700',
          popular: 'bg-blue-100 text-blue-800'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-900',
          button: 'bg-purple-600 hover:bg-purple-700',
          popular: 'bg-purple-100 text-purple-800'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-900',
          button: 'bg-gray-600 hover:bg-gray-700',
          popular: 'bg-gray-100 text-gray-800'
        };
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
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white"
                >
                  <ArrowUp className="h-5 w-5" />
                  <span>Upgrade plan</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Secondary Navigation */}
              <div className="space-y-1">
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
                  <h1 className="text-2xl font-bold text-gray-900">Upgrade Plan</h1>
                  <p className="text-gray-600 mt-1">Choose the perfect plan for your needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 inline-flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly billing
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Save 25%</span>
              </button>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const colors = getPlanColor(plan.color);
              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-xl shadow-sm border-2 ${colors.border} p-6 ${
                    plan.popular ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${colors.popular} px-3 py-1 rounded-full text-xs font-medium`}>
                      Most popular
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3 className={`text-xl font-bold ${colors.text}`}>{plan.name}</h3>
                    <p className="text-gray-600 mt-1 text-sm">{plan.description}</p>
                    <div className="mt-4">
                      <span className={`text-4xl font-bold ${colors.text}`}>${plan.price}</span>
                      <span className="text-gray-600 text-sm">/month</span>
                      {billingCycle === 'yearly' && (
                        <div className="text-green-600 text-sm font-medium mt-1">
                          ${plan.yearlyPrice}/month billed annually
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.excludedFeatures.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3 opacity-50">
                        <X className="h-5 w-5 text-gray-600 flex-shrink-0" />
                        <span className="text-gray-500 text-sm line-through">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      if (plan.name === 'Basic') {
                        showToast.success('Basic plan selected! Welcome aboard!');
                      } else {
                        showToast.success(`Upgraded to ${plan.name} plan successfully!`);
                      }
                    }}
                    className={`w-full ${colors.button} text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2`}
                  >
                    {plan.name === 'Basic' ? 'Get started' : 'Upgrade now'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Enterprise Section */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Crown className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                For large organizations with advanced needs. Get custom solutions, dedicated support, and enterprise-grade security.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Enterprise Security</h4>
                  <p className="text-gray-600 text-sm">SOC 2 Type II certified with advanced security controls</p>
                </div>
                <div className="text-center">
                  <Users2 className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Dedicated Support</h4>
                  <p className="text-gray-600 text-sm">24/7 dedicated support team with SLA guarantees</p>
                </div>
                <div className="text-center">
                  <Zap className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Custom Solutions</h4>
                  <p className="text-gray-600 text-sm">Tailored features and integrations for your workflow</p>
                </div>
              </div>
              <button
                onClick={() => showToast.info('Sales team contact information sent to your email!')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Can I change plans anytime?</h4>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-3">What payment methods do you accept?</h4>
                <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Is there a free trial?</h4>
                <p className="text-gray-600">Yes, all paid plans come with a 14-day free trial. No credit card required to start.</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Can I cancel anytime?</h4>
                <p className="text-gray-600">Absolutely. You can cancel your subscription at any time with no cancellation fees.</p>
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
