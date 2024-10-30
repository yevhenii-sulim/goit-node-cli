import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath: string = path.join(process.cwd(), "db", "contacts.json");

interface ContactType {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

export default class Contacts {
  async listContacts(): Promise<ContactType[]> {
    const contactList = await fs.readFile(`${contactsPath}`);
    return JSON.parse(contactList.toString());
  }

  async getContactById(contactId: string): Promise<ContactType | null> {
    const contact: ContactType[] = await this.listContacts();
    const foundContactById: ContactType | undefined = contact.find(
      (item) => item.id === contactId
    );
    return foundContactById || null;
  }

  async removeContact(contactId: string): Promise<ContactType | null> {
    const contactRemoving: ContactType | null = await this.getContactById(
      contactId
    );

    if (!contactRemoving) {
      return null;
    }

    const contactList: ContactType[] = await this.listContacts();
    const filteredContacts: ContactType[] = contactList.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(
      `${contactsPath}`,
      JSON.stringify(filteredContacts, null, 2)
    );
    return contactRemoving;
  }

  async addContact(
    name: string,
    email: string,
    phone: string
  ): Promise<ContactType> {
    const contacts: ContactType[] = await this.listContacts();
    const newContact: ContactType = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(`${contactsPath}`, JSON.stringify(contacts, null, 2));
    return newContact;
  }
}
