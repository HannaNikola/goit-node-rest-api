
import Contact from "../models/contactModels.js";




async function listContacts(owner, query = {}) {
  const { page = 1, limit = 2 } = query;
  const skip = (page - 1) * limit;
  const data = await Contact.find({ owner }).skip(skip).limit(limit);
  return data;
}
listContacts();


async function getContactById(contactId, owner) {
  const contact = await Contact.findOne({ _id: contactId, owner });
  return contact;
}



// async function removeContact(id, owner) {
 
//   const contact = await Contact.findOne({ _id: id, owner });
//   if (!contact) {
//     return null;
//   }
//   const data = await Contact.findByIdAndDelete(id, { new: true });
//   return data;
// }

async function removeContact(id, owner) {
  
  const contact = await Contact.findOne({ _id: id, owner });
  if (!contact) {
    return null;
  }

  const deletedContact = await Contact.findOneAndDelete({ _id: id, owner });
  return deletedContact;
}


async function addContact({ name, email, phone, favorite, owner }) {
  const data = await Contact.create({ name, email, phone, favorite, owner});
  return data;
}


async function updateContact(id, body, owner) {
const contact = await Contact.findOne({ _id: id, owner });
if (!contact) {
  return null;
}
 const data = await Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
 return data;
}


async function updateStatus(id, body, owner) {
  const contact = await Contact.findOne({ _id: id, owner });
  if (!contact) {
    return null;
  }
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






