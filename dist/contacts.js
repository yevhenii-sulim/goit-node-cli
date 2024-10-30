var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
const contactsPath = path.join(process.cwd(), "db", "contacts.json");
export default class Contacts {
    listContacts() {
        return __awaiter(this, void 0, void 0, function* () {
            const contactList = yield fs.readFile(`${contactsPath}`);
            return JSON.parse(contactList.toString());
        });
    }
    getContactById(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield this.listContacts();
            const foundContactById = contact.find((item) => item.id === contactId);
            return foundContactById || null;
        });
    }
    removeContact(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactRemoving = yield this.getContactById(contactId);
            if (!contactRemoving) {
                return null;
            }
            const contactList = yield this.listContacts();
            const filteredContacts = contactList.filter((contact) => contact.id !== contactId);
            yield fs.writeFile(`${contactsPath}`, JSON.stringify(filteredContacts, null, 2));
            return contactRemoving;
        });
    }
    addContact(name, email, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const contacts = yield this.listContacts();
            const newContact = { id: nanoid(), name, email, phone };
            contacts.push(newContact);
            yield fs.writeFile(`${contactsPath}`, JSON.stringify(contacts, null, 2));
            return newContact;
        });
    }
}
