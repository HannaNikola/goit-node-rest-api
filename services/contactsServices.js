
import Contact from "../models/contactModels.js";




async function listContacts() {

const data = await Contact.find();
  return data;
  
}
listContacts();

async function getContactById(contactId) {

  const allContacts = await listContacts();
  const contact = await Contact.findById(contactId);
  return contact;

}

async function removeContact(id) {
 
  const data = await Contact.findByIdAndDelete(id, { new: true });
  return data; 
}


async function addContact({ name, email, phone, favorite }) {
  const data = await Contact.create({ name, email, phone, favorite });
  return data;
}


async function updateContact(id, body) {

 const data = await Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
 return data;
}


async function updateStatus(id, body) {
  const data = await Contact.findOneAndUpdate({ _id: id }, body, { new: true });
  return data;
}
  
 
const contactsService = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
};

export default contactsService;






