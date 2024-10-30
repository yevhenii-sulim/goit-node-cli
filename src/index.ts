import { Command } from "commander";
import Contacts from "./contacts.js";
const program = new Command();

const contactsActions: Contacts = new Contacts();

interface Arg {
  action?: string;
  name?: string;
  email?: string;
  phone?: string;
  id?: string;
}

async function invokeAction({
  action,
  name,
  email,
  phone,
  id,
}: Arg): Promise<void> {
  switch (action) {
    case "list":
      const contactsAll = await contactsActions.listContacts();
      console.log(contactsAll);
      return;
    case "get":
      if (!id) {
        return;
      }
      const contact = await contactsActions.getContactById(id);
      console.log(contact);
      return;
    case "add":
      if (!name || !email || !phone) {
        return;
      }
      const contactsNew = await contactsActions.addContact(name, email, phone);
      console.log(contactsNew);
      return;
    case "remove":
      if (!id) {
        return;
      }
      const contactRemoved = await contactsActions.removeContact(id);
      console.log(contactRemoved);
      return;
  }
}

program
  .option("-a, --action, <type>")
  .option("-n, --name, <type>")
  .option("-e, --email, <type>")
  .option("-p, --phone, <type>")
  .option("-i, --id, <type>");
program.parse();
const options = program.opts();
invokeAction(options);
