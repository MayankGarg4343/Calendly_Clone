import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Video, Phone, MapPin, Mail, User, ArrowLeft } from 'lucide-react';
import { getBooking } from '../services/api';

export const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bookingId) {
      loadBooking(bookingId);
    }
  }, [bookingId]);

  const loadBooking = async (id) => {
    try {
      const data = await getBooking(id);
      setBooking(data);
    } catch (err) {
      setError('Booking not found');
      console.error('Error loading booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const getLocationIcon = (location) => {
    switch (location) {
      case 'videoCall':
        return <Video className="h-5 w-5" />;
      case 'phoneCall':
        return <Phone className="h-5 w-5" />;
      case 'inPerson':
        return <MapPin className="h-5 w-5" />;
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

  const addToCalendar = () => {
    if (!booking) return;
    
    const startDate = new Date(`${booking.date} ${booking.startTime}`);
    const endDate = new Date(`${booking.date} ${booking.endTime}`);
    
    const formatDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    };
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(booking.eventType.name)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(`Meeting with ${booking.name}${booking.notes ? '\n\nNotes: ' + booking.notes : ''}`)}&location=${encodeURIComponent(getLocationText(booking.eventType.location))}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calendly-blue"></div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="calendly-card text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the booking you're looking for.</p>
          <Link to="/" className="calendly-button">
            Book Another Meeting
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="calendly-card">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">You're all set!</h1>
          <p className="text-lg text-gray-600">
            Your meeting has been successfully scheduled
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Meeting Details</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Date</p>
                <p className="text-gray-600">
                  {new Date(booking.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Time</p>
                <p className="text-gray-600">
                  {booking.startTime} - {booking.endTime} ({booking.eventType.duration} minutes)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              {getLocationIcon(booking.eventType.location)}
              <div>
                <p className="font-medium text-gray-900">Location</p>
                <p className="text-gray-600">{getLocationText(booking.eventType.location)}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Event Type</p>
                <p className="text-gray-600">{booking.eventType.name}</p>
              </div>
            </div>

            {booking.notes && (
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Notes</p>
                  <p className="text-gray-600">{booking.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={addToCalendar}
            className="calendly-button flex items-center justify-center space-x-2 flex-1"
          >
            <Calendar className="h-4 w-4" />
            <span>Add to Calendar</span>
          </button>
          
          <Link
            to="/"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-center flex items-center justify-center space-x-2 flex-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Book Another Meeting</span>
          </Link>
        </div>

        {/* Confirmation Email Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Confirmation sent</h3>
              <p className="text-sm text-blue-800">
                A confirmation email has been sent to <strong>{booking.email}</strong> 
                with all the meeting details and calendar links.
              </p>
            </div>
          </div>
        </div>

        {/* Reschedule/Cancel Info */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Need to make changes? Contact us or check your email for reschedule options.</p>
        </div>
      </div>
    </div>
  );
};
