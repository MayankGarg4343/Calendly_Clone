import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, MapPin, Mail, Search, X, Menu, Activity, Settings, UserCheck, Phone as PhoneIcon, Puzzle, ArrowUp, BarChart3, Building, HelpCircle, MoreVertical, UserPlus, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getContacts, createContact, updateContact, deleteContact } from '../services/api';
import showToast from '../utils/toast';

export const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    location: '',
    status: 'active',
    lastMeeting: '',
    totalMeetings: '',
    notes: ''
  });

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      console.log('Fetching contacts from database...');
      const data = await getContacts();
      console.log('Contacts fetched from database:', data);
      setContacts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading contacts:', error);
      showToast.error('Failed to load contacts. Please try again.');
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleAddContact = async () => {
    try {
      console.log('Adding contact to database:', newContact);
      const newContactData = await createContact(newContact);
      console.log('Contact created in database:', newContactData);
      setContacts([...contacts, newContactData]);
      resetForm();
      setShowForm(false);
      showToast.success('Contact added successfully!');
    } catch (error) {
      console.error('Error adding contact:', error);
      showToast.error('Failed to add contact. Please try again.');
    }
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setNewContact({
      name: contact.name || '',
      email: contact.email || '',
      phone: contact.phone || '',
      company: contact.company || '',
      position: contact.position || '',
      location: contact.location || '',
      status: contact.status || 'active',
      lastMeeting: contact.lastMeeting || '',
      totalMeetings: contact.totalMeetings || '',
      notes: contact.notes || ''
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdateContact = async () => {
    try {
      console.log('Updating contact in database:', selectedContact.id, newContact);
      const updatedContact = await updateContact(selectedContact.id, newContact);
      console.log('Contact updated in database:', updatedContact);
      setContacts(contacts.map(contact => 
        contact.id === updatedContact.id ? updatedContact : contact
      ));
      resetForm();
      setSelectedContact(null);
      setIsEditing(false);
      setShowForm(false);
      showToast.success('Contact updated successfully!');
    } catch (error) {
      console.error('Error updating contact:', error);
      showToast.error('Failed to update contact. Please try again.');
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        console.log('Deleting contact from database:', id);
        await deleteContact(id);
        console.log('Contact deleted from database:', id);
        setContacts(contacts.filter(contact => contact.id !== id));
        showToast.success('Contact deleted successfully!');
      } catch (error) {
        console.error('Error deleting contact:', error);
        showToast.error('Failed to delete contact. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setNewContact({
      name: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      location: '',
      status: 'active',
      lastMeeting: '',
      totalMeetings: '',
      notes: ''
    });
    setSelectedContact(null);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
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
                    className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Contacts</span>
                  </Link>
                  <Link
                    to="/admin/workflows"
                    className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                  >
                    <Puzzle className="h-5 w-5" />
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

                <div className="border-t border-gray-200"></div>

                <div className="space-y-1">
                  <Link
                    to="/admin/help"
                    className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-black hover:bg-gray-100"
                  >
                    <HelpCircle className="h-5 w-5" />
                    <span>Help</span>
                  </Link>
                </div>

                <div className="border-t border-gray-200"></div>
              </div>
            </nav>

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
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
                  <p className="text-gray-600 mt-1">Manage your contact list and client information</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Add Contact</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {filteredContacts.length} contacts
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {contacts.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No contacts found</h3>
                      <p className="text-gray-600">
                        {searchTerm ? 'Try adjusting your search' : 'Your contacts will appear here'}
                      </p>
                      <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium mt-4"
                      >
                        Create Your First Contact
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {filteredContacts.map((contact) => (
                        <div key={contact.id} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">
                                  {contact.name?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                              </div>

                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                  <div className="flex items-center space-x-1">
                                    <Mail className="h-4 w-4" />
                                    <span>{contact.email}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Phone className="h-4 w-4" />
                                    <span>{contact.phone}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Building className="h-4 w-4" />
                                    <span>{contact.company}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{contact.location}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                  <span>Position: {contact.position}</span>
                                  <span>Status: {contact.status}</span>
                                  <span>Meetings: {contact.totalMeetings}</span>
                                  <span>Last meeting: {formatDate(contact.lastMeeting)}</span>
                                </div>
                                {contact.notes && (
                                  <p className="text-sm text-gray-500 italic mt-2">{contact.notes}</p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handleEditContact(contact)}
                                className="p-2 text-gray-600 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteContact(contact.id)}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-600 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <MoreVertical className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
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

      {/* Contact Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isEditing ? 'Edit Contact' : 'Add New Contact'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="text-gray-600 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <form onSubmit={isEditing ? handleUpdateContact : handleAddContact} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={newContact.company}
                    onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={newContact.position}
                    onChange={(e) => setNewContact({ ...newContact, position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newContact.location}
                    onChange={(e) => setNewContact({ ...newContact, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={newContact.status}
                    onChange={(e) => setNewContact({ ...newContact, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="prospect">Prospect</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Meetings
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newContact.totalMeetings}
                    onChange={(e) => setNewContact({ ...newContact, totalMeetings: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    rows="3"
                    value={newContact.notes}
                    onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                  {isEditing ? 'Update Contact' : 'Add Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
