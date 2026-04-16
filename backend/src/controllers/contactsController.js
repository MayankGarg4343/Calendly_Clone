const Contact = require('../models/Contact');

// Get all contacts
const getContacts = async (req, res) => {
  try {
    console.log('GET /api/contacts - Fetching all contacts');
    const contacts = await Contact.getAll();
    console.log(`Found ${contacts.length} contacts`);
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get single contact
const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.getById(id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create contact
const createContact = async (req, res) => {
  try {
    console.log('POST /api/contacts - Creating contact:', req.body);
    const { name, email, phone, company, position, location, status, lastMeeting, totalMeetings, notes } = req.body;
    
    if (!name || !email) {
      console.log('Validation failed: Name and email are required');
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      position,
      location,
      status,
      lastMeeting,
      totalMeetings,
      notes
    });
    
    console.log('Contact created successfully:', contact.id);
    res.status(201).json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, company, position, location, status, lastMeeting, totalMeetings, notes } = req.body;
    
    const contact = await Contact.update(id, {
      name,
      email,
      phone,
      company,
      position,
      location,
      status,
      lastMeeting,
      totalMeetings,
      notes
    });
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('DELETE /api/contacts/:id - Deleting contact:', id);
    const contact = await Contact.delete(id);
    
    if (!contact) {
      console.log('Contact not found:', id);
      return res.status(404).json({ error: 'Contact not found' });
    }

    console.log('Contact deleted successfully:', id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
};
