const express = require('express');
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactsController');

const router = express.Router();

// GET /api/contacts - Get all contacts
router.get('/', getContacts);

// GET /api/contacts/:id - Get single contact
router.get('/:id', getContact);

// POST /api/contacts - Create contact
router.post('/', createContact);

// PUT /api/contacts/:id - Update contact
router.put('/:id', updateContact);

// DELETE /api/contacts/:id - Delete contact
router.delete('/:id', deleteContact);

module.exports = router;
