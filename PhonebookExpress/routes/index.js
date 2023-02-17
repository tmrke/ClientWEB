var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
    res.render("index", {title: "Phonebook"});
});

var contacts = [
    // {id: 0, name: "test", lastName: "test", phone: "+79000000000"}
];

var newContactId = 1;

router.get("/api/getContacts", function (req, res) {
    var term = (req.query.term || "").toUpperCase();

    var filteredContacts = term.length === 0
        ? contacts
        : contacts.filter(function (c) {
            return c.name.toUpperCase().includes(term)
                || c.lastName.toUpperCase().includes(term)
                || c.phone.toUpperCase().includes(term);
        });

    res.send(filteredContacts);
});

router.post("/api/deleteContact", function (req, res) {
    var id = req.body.id;

    contacts = contacts.filter(function (c) {
        return c.id !== id;
    });

    res.send({
        success: true,
        message: null,
        errorCode: 0
    });
});

router.post("/api/addContact", function (req, res) {
    var contact = req.body.contact;

    if (!contact.name) {
        res.send({
            success: false,
            message: "Не указано имя контакта"
        });

        return;
    }

    if (!contact.lastName) {
        res.send({
            success: false,
            message: "Не указана фамилия контакта"
        });

        return;
    }

    if (!contact.phone) {
        res.send({
            success: false,
            message: "Не указан номер телефона контакта"
        });

        return;
    }

    if (contacts.some(function (c) {
        return c.phone === contact.phone;
    })) {
        res.send({
            success: false,
            message: "Контакт с таким номером телефона уже существует",
            errorCode: 1
        });

        return;
    }

    contacts.push({
        id: newContactId,
        name: contact.name,
        lastName: contact.lastName,
        phone: contact.phone
    });

    newContactId++;

    res.send({
        success: true,
        message: null
    });
});

module.exports = router;
