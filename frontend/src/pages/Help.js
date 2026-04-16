import React, { useState } from 'react';
import { Search, Book, Video, MessageCircle, HeadphonesIcon as Headphones, FileText, ChevronRight, ArrowLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('getting-started');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: Book },
    { id: 'booking', name: 'Booking & Meetings', icon: Video },
    { id: 'integrations', name: 'Integrations', icon: MessageCircle },
    { id: 'account', name: 'Account & Billing', icon: Headphones },
    { id: 'documentation', name: 'Documentation', icon: FileText },
  ];

  const articles = {
    'getting-started': [
      { id: 1, title: 'How to create your first event type', description: 'Learn how to set up your first meeting type and start scheduling.' },
      { id: 2, title: 'Setting up your availability', description: 'Configure your working hours and availability preferences.' },
      { id: 3, title: 'Customizing your scheduling page', description: 'Personalize your booking page with your brand colors and logo.' },
      { id: 4, title: 'Inviting team members', description: 'Add team members to your account and manage permissions.' },
    ],
    'booking': [
      { id: 5, title: 'How to book a meeting', description: 'Step-by-step guide for booking meetings through the platform.' },
      { id: 6, title: 'Managing your calendar', description: 'Sync your calendars and manage existing bookings.' },
      { id: 7, title: 'Rescheduling and cancellations', description: 'How to reschedule or cancel meetings.' },
      { id: 8, title: 'Meeting reminders', description: 'Configure email and SMS reminders for your meetings.' },
    ],
    'integrations': [
      { id: 9, title: 'Connecting Google Calendar', description: 'Sync your Google Calendar with the platform.' },
      { id: 10, title: 'Connecting Outlook Calendar', description: 'Sync your Outlook Calendar with the platform.' },
      { id: 11, title: 'Zoom integration', description: 'Set up Zoom for your video meetings.' },
      { id: 12, title: 'Other integrations', description: 'Explore other available integrations.' },
    ],
    'account': [
      { id: 13, title: 'Managing your profile', description: 'Update your personal information and profile settings.' },
      { id: 14, title: 'Billing and payments', description: 'Manage your subscription and payment methods.' },
      { id: 15, title: 'Security settings', description: 'Configure two-factor authentication and password settings.' },
      { id: 16, title: 'Team management', description: 'Manage team members and their permissions.' },
    ],
    'documentation': [
      { id: 17, title: 'API documentation', description: 'Developer documentation for the platform API.' },
      { id: 18, title: 'Embeddable widgets', description: 'How to embed booking widgets on your website.' },
      { id: 19, title: 'Webhooks', description: 'Set up webhooks for real-time notifications.' },
      { id: 20, title: 'Best practices', description: 'Tips and best practices for using the platform.' },
    ],
  };

  const filteredArticles = articles[selectedCategory].filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleBack = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-6 hidden lg:block">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Help Center</h2>
          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSelectedArticle(null);
                }}
                className={`flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to articles</span>
            </button>

            <div className="bg-white rounded-lg shadow p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedArticle.title}</h1>
              <div className="prose max-w-none text-gray-700">
                <p className="text-lg mb-4">{selectedArticle.description}</p>
                <div className="bg-gray-50 rounded-lg p-4 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Article Content</h3>
                  <p className="text-sm text-gray-600">
                    This is a placeholder for the full article content. In a real application, this would contain
                    detailed instructions, screenshots, and step-by-step guides to help users with their specific issue.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Was this helpful?</h3>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Yes, it helped
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    No, I need more help
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6 hidden lg:block">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Help Center</h2>
        <nav className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <category.icon className="h-5 w-5" />
              <span>{category.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Support</h3>
          <a
            href="mailto:support@calendlyclone.com"
            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <MessageCircle className="h-4 w-4" />
            <span>support@calendlyclone.com</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
            <p className="text-gray-600">Find answers to your questions and get help with the platform.</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="bg-white rounded-lg shadow p-6 text-left hover:shadow-md transition-shadow"
              >
                <category.icon className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{articles[category.id].length} articles</p>
              </button>
            ))}
          </div>

          {/* Articles List */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => handleArticleClick(article)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-900">{article.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{article.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  No articles found matching your search.
                </div>
              )}
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <Headphones className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Still need help?</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Our support team is available 24/7 to help you with any questions or issues.
                </p>
                <a
                  href="mailto:support@calendlyclone.com"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <span>Contact Support</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
