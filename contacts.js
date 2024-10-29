"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var fs = require("fs/promises");
var path = require("path");
var { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db", "contacts.json");
function listContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        const contactList = yield fs.readFile(`${contactsPath}`);
        return JSON.parse(contactList);
    });
}
function getContactById(contactId) {
    return __awaiter(this, void 0, void 0, function* () {
        const contact = yield listContacts();
        const foundContactById = contact.find((item) => item.id === contactId);
        return foundContactById || null;
    });
}
function removeContact(contactId) {
    return __awaiter(this, void 0, void 0, function* () {
        const contactRemoving = yield getContactById(contactId);
        if (!contactRemoving) {
            return null;
        }
        const contactList = yield listContacts();
        const filteredContacts = contactList.filter((contact) => contact.id !== contactId);
        yield fs.writeFile(`${contactsPath}`, JSON.stringify(filteredContacts, null, 2));
        return contactRemoving;
    });
}
function addContact(name, email, phone) {
    return __awaiter(this, void 0, void 0, function* () {
        const contacts = yield listContacts();
        const newContact = { id: nanoid(), name, email, phone };
        contacts.push(newContact);
        yield fs.writeFile(`${contactsPath}`, JSON.stringify(contacts, null, 2));
        return newContact;
    });
}
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
