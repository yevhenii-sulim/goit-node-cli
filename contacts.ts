var fs = require("fs/promises");
var path = require("path");
var { nanoid } = require("nanoid");

const contactsPath: string = path.join(__dirname, "db", "contacts.json");

interface ContactType {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

async function listContacts(): Promise<ContactType[]> {
  const contactList = await fs.readFile(`${contactsPath}`);
  return JSON.parse(contactList);
}

async function getContactById(contactId: string): Promise<ContactType | null> {
  const contact: ContactType[] = await listContacts();
  const foundContactById: ContactType | undefined = contact.find(
    (item) => item.id === contactId
  );
  return foundContactById || null;
}

async function removeContact(contactId: string): Promise<ContactType | null> {
  const contactRemoving: ContactType | null = await getContactById(contactId);

  if (!contactRemoving) {
    return null;
  }

  const contactList: ContactType[] = await listContacts();
  const filteredContacts: ContactType[] = contactList.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(
    `${contactsPath}`,
    JSON.stringify(filteredContacts, null, 2)
  );
  return contactRemoving;
}

async function addContact(
  name: string,
  email: string,
  phone: string
): Promise<ContactType> {
  const contacts: ContactType[] = await listContacts();
  const newContact: ContactType = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(`${contactsPath}`, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
