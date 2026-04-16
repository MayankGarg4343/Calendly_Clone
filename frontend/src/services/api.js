import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to handle CORS
api.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Event Types API
export const getEventTypes = async () => {
  const response = await api.get('/event-types');
  return response.data;
};

export const getEventType = async (id) => {
  const response = await api.get(`/event-types/${id}`);
  return response.data;
};

export const createEventType = async (eventType) => {
  const response = await api.post('/event-types', eventType);
  return response.data;
};

export const updateEventType = async (id, eventType) => {
  const response = await api.put(`/event-types/${id}`, eventType);
  return response.data;
};

export const deleteEventType = async (id) => {
  await api.delete(`/event-types/${id}`);
};

// Availability API
export const getAvailability = async () => {
  const response = await api.get('/availability');
  return response.data;
};

export const updateAvailability = async (availability) => {
  const response = await api.put('/availability', { availability });
  return response.data;
};

// Bookings API
export const getBookings = async () => {
  const response = await api.get('/bookings');
  return response.data;
};

export const createBooking = async (booking) => {
  const response = await api.post('/bookings', booking);
  return response.data;
};

export const updateBooking = async (id, booking) => {
  const response = await api.put(`/bookings/${id}`, booking);
  return response.data;
};

export const deleteBooking = async (id) => {
  await api.delete(`/bookings/${id}`);
};

export const getBooking = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

// Contacts API
export const getContacts = async () => {
  const response = await api.get('/contacts');
  return response.data;
};

export const createContact = async (contact) => {
  const response = await api.post('/contacts', contact);
  return response.data;
};

export const updateContact = async (id, contact) => {
  const response = await api.put(`/contacts/${id}`, contact);
  return response.data;
};

export const deleteContact = async (id) => {
  await api.delete(`/contacts/${id}`);
};

// Time Slots API
export const getAvailableTimeSlots = async (eventTypeId, date) => {
  const response = await api.get(`/time-slots/${eventTypeId}?date=${date}`);
  return response.data;
};

// Workflows API
export const getWorkflows = async () => {
  const response = await api.get('/workflows');
  return response.data;
};

export const createWorkflow = async (workflow) => {
  const response = await api.post('/workflows', workflow);
  return response.data;
};

export const updateWorkflow = async (id, workflow) => {
  const response = await api.put(`/workflows/${id}`, workflow);
  return response.data;
};

export const deleteWorkflow = async (id) => {
  await api.delete(`/workflows/${id}`);
};

// Integrations API
export const getIntegrations = async () => {
  const response = await api.get('/integrations');
  return response.data;
};

export const connectIntegration = async (id) => {
  const response = await api.post(`/integrations/${id}/connect`);
  return response.data;
};

export const disconnectIntegration = async (id) => {
  await api.delete(`/integrations/${id}/disconnect`);
};

export default api;
