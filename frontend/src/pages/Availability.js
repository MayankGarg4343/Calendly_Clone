import React, { useState, useEffect } from 'react';
import { Clock, Save, Menu, Activity, Calendar, Users, Eye, Settings, UserCheck, Phone, GitBranch, Puzzle, ArrowUp, BarChart3, Building, HelpCircle } from 'lucide-react';
import { getAvailability, updateAvailability } from '../services/api';
import { Link } from 'react-router-dom';

const DAYS_OF_WEEK = [
  { id: 1, name: 'Monday', short: 'Mon' },
  { id: 2, name: 'Tuesday', short: 'Tue' },
  { id: 3, name: 'Wednesday', short: 'Wed' },
  { id: 4, name: 'Thursday', short: 'Thu' },
  { id: 5, name: 'Friday', short: 'Fri' },
  { id: 6, name: 'Saturday', short: 'Sat' },
  { id: 0, name: 'Sunday', short: 'Sun' }
];

const TIME_SLOTS = [
  '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM', '3:00 AM', '3:30 AM',
  '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM',
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
];

export const Availability = () => {
  const [availability, setAvailability] = useState([
    { dayOfWeek: 1, isActive: true, startTime: '09:00 AM', endTime: '05:00 PM' },
    { dayOfWeek: 2, isActive: true, startTime: '09:00 AM', endTime: '05:00 PM' },
    { dayOfWeek: 3, isActive: true, startTime: '09:00 AM', endTime: '05:00 PM' },
    { dayOfWeek: 4, isActive: true, startTime: '09:00 AM', endTime: '05:00 PM' },
    { dayOfWeek: 5, isActive: true, startTime: '09:00 AM', endTime: '05:00 PM' },
    { dayOfWeek: 6, isActive: false, startTime: '09:00 AM', endTime: '05:00 PM' },
    { dayOfWeek: 0, isActive: false, startTime: '09:00 AM', endTime: '05:00 PM' }
  ]);
  const [saving, setSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDayToggle = (dayId) => {
    const existingIndex = availability.findIndex(a => a.dayOfWeek === dayId);
    
    if (existingIndex >= 0) {
      const updated = [...availability];
      updated[existingIndex] = {
        ...updated[existingIndex],
        isActive: !updated[existingIndex].isActive
      };
      setAvailability(updated);
    } else {
      setAvailability([...availability, {
        dayOfWeek: dayId,
        isActive: true,
        startTime: '09:00 AM',
        endTime: '05:00 PM'
      }]);
    }
  };

  const handleTimeChange = (dayId, field, value) => {
    const existingIndex = availability.findIndex(a => a.dayOfWeek === dayId);
    
    if (existingIndex >= 0) {
      const updated = [...availability];
      updated[existingIndex] = {
        ...updated[existingIndex],
        [field]: value
      };
      setAvailability(updated);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAvailability(availability);
    } catch (error) {
      console.error('Error saving availability:', error);
    } finally {
      setSaving(false);
    }
  };

  const getWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const getTimeSlotIndex = (time) => {
    return TIME_SLOTS.indexOf(time);
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
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white"
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
                  <h1 className="text-2xl font-bold text-gray-900">Availability</h1>
                  <p className="text-gray-600 mt-1">Set your working hours and availability</p>
                </div>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Weekly Calendar View */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Calendar Header */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Weekly Availability</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-sm font-medium text-gray-900">
                    {getWeekDates()[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {getWeekDates()[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Time Labels */}
                <div className="flex">
                  <div className="w-20 flex-shrink-0"></div>
                  <div className="flex-1 grid grid-cols-7 gap-0">
                    {DAYS_OF_WEEK.map((day) => (
                      <div key={day.id} className="text-center py-2 border-r border-gray-200 last:border-r-0">
                        <div className="text-xs font-medium text-gray-500">{day.short}</div>
                        <div className="text-sm text-gray-900">
                          {getWeekDates()[day.id === 0 ? 6 : day.id - 1]?.getDate()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="max-h-96 overflow-y-auto">
                  {TIME_SLOTS.slice(16, 44).map((time) => (
                    <div key={time} className="flex border-t border-gray-100">
                      <div className="w-20 flex-shrink-0 py-2 px-2 text-xs text-gray-500 text-right">
                        {time}
                      </div>
                      <div className="flex-1 grid grid-cols-7 gap-0">
                        {DAYS_OF_WEEK.map((day) => {
                          const dayAvailability = availability.find(a => a.dayOfWeek === day.id);
                          const isActive = dayAvailability?.isActive || false;
                          const startTimeIndex = getTimeSlotIndex(dayAvailability?.startTime || '09:00 AM');
                          const endTimeIndex = getTimeSlotIndex(dayAvailability?.endTime || '05:00 PM');
                          const currentTimeIndex = getTimeSlotIndex(time);
                          const isAvailable = isActive && currentTimeIndex >= startTimeIndex && currentTimeIndex < endTimeIndex;

                          return (
                            <div
                              key={`${day.id}-${time}`}
                              className={`h-8 border-r border-gray-200 last:border-r-0 cursor-pointer transition-colors ${
                                isAvailable ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-50'
                              }`}
                              onClick={() => handleDayToggle(day.id)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Day Settings */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Day Settings</h3>
            <div className="space-y-4">
              {DAYS_OF_WEEK.map((day) => {
                const dayAvailability = availability.find(a => a.dayOfWeek === day.id);
                const isActive = dayAvailability?.isActive || false;
                
                return (
                  <div key={day.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => handleDayToggle(day.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="font-medium text-gray-900">{day.name}</span>
                    </div>
                    
                    {isActive && (
                      <div className="flex items-center space-x-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
                          <select
                            value={dayAvailability?.startTime || '09:00 AM'}
                            onChange={(e) => handleTimeChange(day.id, 'startTime', e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {TIME_SLOTS.slice(16, 44).map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="text-gray-500">to</div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
                          <select
                            value={dayAvailability?.endTime || '05:00 PM'}
                            onChange={(e) => handleTimeChange(day.id, 'endTime', e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {TIME_SLOTS.slice(16, 44).map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
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
