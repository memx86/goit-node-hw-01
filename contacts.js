const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const contactsPath = path.resolve("db/contacts.json");

async function getContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function writeContacts(newContacts) {
  try {
    const contacts = JSON.stringify(newContacts, null, 2);
    await fs.writeFile(contactsPath, contacts, "utf-8");
  } catch (error) {
    return error;
  }
}

async function listContacts() {
  const contacts = await getContacts();
  console.table(contacts);
}

async function getContactById(contactId) {
  const contacts = await getContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    console.log(`Contact with id#${contactId} was not found`);
    return null;
  }
  console.log(contact);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await getContacts();
  const deletedContact = contacts.find((contact) => contact.id === contactId);

  if (!deletedContact) {
    console.log(`Contact with id#${contactId} not found`);
    return null;
  }

  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  try {
    await writeContacts(newContacts);
    console.log(`Contact with id#${contactId} was succesfully removed`);
    return deletedContact;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  const contacts = await getContacts();
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const newContacts = [...contacts, newContact];
  try {
    await writeContacts(newContacts);
    console.log(`Contact was succesfully added, id#${id}`);
    return newContact;
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
