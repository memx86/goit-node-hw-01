const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.resolve("db/contacts.json");

// TODO: задокументировать каждую функцию
async function getContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}
async function writeContacts(newContacts) {
  try {
    const contacts = JSON.stringify(newContacts);
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
  console.log(contact);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await getContacts();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  try {
    await writeContacts(newContacts);
    console.log(`Contact with id#${contactId} was succesfully removed`);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  const contacts = await getContacts();
  const id = String(Number(contacts.at(-1).id) + 1);
  const newContacts = [...contacts, { id, name, email, phone }];
  try {
    await writeContacts(newContacts);
    console.log(`Contact was succesfully added, id#${id}`);
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
