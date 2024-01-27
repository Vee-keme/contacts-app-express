const Contact = require("../models/contactModel");
//express async handler is a replacement for try-catch blocks to check for errors in async operations
const asyncHandler = require("express-async-handler");

//@desc Get all Contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  // res.status(200).json({ message: "get all contacts" });
  res.status(200).json(contacts);
});

//@desc Create New Contacts
//@route POST /api/contacts/:id
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log("the request body is:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  // res.status(201).json({ message: "create contact" });
  res.status(201).json(contact);
});

//@desc  Get a single Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // res.status(200).json({ message: `get contact for ${req.params.id}` });
  res.status(200).json(contact);
});

//@desc  Update a single Contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // check if the user id coming in matches the user id created by middleware
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contact!");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  // res.status(200).json({ message: `update contact for ${req.params.id}` });
  res.status(200).json(updateContact);
});

//@desc  Delete a single Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // check if the user id coming in matches the user id created by middleware
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete other user contact!");
  }

  await Contact.deleteOne({ _id: req.params.id });
  // res.status(200).json({ message: `delete contact for ${req.params.id}` });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
