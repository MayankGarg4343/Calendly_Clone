import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Mail, MessageSquare, Video, Phone, MapPin } from 'lucide-react';
import { getEventTypes, getEventType, getAvailableTimeSlots, createBooking } from '../services/api';

export const PublicBooking = () => {
  const { eventTypeId } = useParams();
  const navigate = useNavigate();
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Select Event Type, 2: Select Date/Time, 3: Enter Details, 4: Confirmation

  useEffect(() => {
    loadEventTypes();
    if (eventTypeId) {
      loadEventType(eventTypeId);
    }
  }, [eventTypeId]);

  const loadEventTypes = async () => {
    try {
      const types = await getEventTypes();
      setEventTypes(types.filter(type => type.isActive));
    } catch (error) {
      console.error('Error loading event types:', error);
    }
  };

  const loadEventType = async (id) => {
    try {
      const eventType = await getEventType(id);
      setSelectedEventType(eventType);
      setStep(2);
    } catch (error) {
      console.error('Error loading event type:', error);
    }
  };

  const handleEventTypeSelect = (eventType) => {
    setSelectedEventType(eventType);
    setStep(2);
  };

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    if (selectedEventType) {
      try {
        const slots = await getAvailableTimeSlots(selectedEventType.id, date);
        setTimeSlots(slots.filter(slot => slot.available));
      } catch (error) {
        console.error('Error loading time slots:', error);
      }
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEventType || !selectedDate || !selectedTime) return;

    setLoading(true);
    try {
      const booking = await createBooking({
        eventTypeId: selectedEventType.id,
        date: selectedDate,
        startTime: selectedTime,
        ...bookingForm
      });
      navigate(`/confirmation/${booking.id}`);
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setLoading(false);
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

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Progress Steps */}
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-center p-6">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      step >= stepNumber
                        ? 'bg-calendly-blue text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-12 h-1 ${
                        step > stepNumber ? 'bg-calendly-blue' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Step 1: Select Event Type */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Event Type</h2>
              <div className="grid gap-4">
                {eventTypes.map((eventType) => (
                  <div
                    key={eventType.id}
                    onClick={() => handleEventTypeSelect(eventType)}
                    className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-calendly-blue hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {eventType.name}
                        </h3>
                        <p className="text-gray-600 mb-4">{eventType.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{eventType.duration} minutes</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {getLocationIcon(eventType.location)}
                            <span>{getLocationText(eventType.location)}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="w-4 h-4 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: eventType.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date and Time */}
          {step === 2 && selectedEventType && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Date & Time</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Select Date</h3>
                  <input
                    type="date"
                    min={getMinDate()}
                    max={getMaxDate()}
                    value={selectedDate}
                    onChange={(e) => handleDateSelect(e.target.value)}
                    className="calendly-input w-full"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Available Times</h3>
                  {selectedDate && (
                    <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                      {timeSlots.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => handleTimeSelect(slot.startTime)}
                          className="calendly-button text-sm py-2 px-3"
                        >
                          {slot.startTime}
                        </button>
                      ))}
                    </div>
                  )}
                  {!selectedDate && (
                    <p className="text-gray-500">Please select a date first</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Enter Details */}
          {step === 3 && selectedEventType && selectedDate && selectedTime && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Enter Your Details</h2>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Meeting Summary</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Event:</strong> {selectedEventType.name}</p>
                  <p><strong>Duration:</strong> {selectedEventType.duration} minutes</p>
                  <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Location:</strong> {getLocationText(selectedEventType.location)}</p>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="calendly-input w-full"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="calendly-input w-full"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="inline h-4 w-4 mr-1" />
                    Notes (optional)
                  </label>
                  <textarea
                    value={bookingForm.notes || ''}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="calendly-input w-full"
                    rows={4}
                    placeholder="Any additional information for the meeting..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="calendly-button flex-1"
                  >
                    {loading ? 'Scheduling...' : 'Schedule Meeting'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
