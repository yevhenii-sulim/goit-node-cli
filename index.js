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
var contactsActions = require("./contacts");
var { program } = require("commander");
function invokeAction(_a) {
    return __awaiter(this, arguments, void 0, function* ({ action, name, email, phone, id, }) {
        switch (action) {
            case "list":
                const contactsAll = yield contactsActions.listContacts();
                console.log(contactsAll);
                return;
            case "get":
                const contact = yield contactsActions.getContactById(id);
                console.log(contact);
                return;
            case "add":
                const contactsNew = yield contactsActions.addContact(name, email, phone);
                console.log(contactsNew);
                return;
            case "remove":
                const contactRemoved = yield contactsActions.removeContact(id);
                console.log(contactRemoved);
                return;
        }
    });
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
