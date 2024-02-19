import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "path";
import crypto from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  console.table(data);
  return JSON.parse(data);
}
listContacts();
async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return undefined;
  }

  const deleteContact = allContacts[index];
  allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deleteContact;
}


async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

 
const contactsService = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

export default contactsService;