const { Contact } = require('../../models');

const addContact = async (req, res) => {
    const { _id: idUser } = req.user;
  
    const newContact = await Contact.create({ ...req.body, owner: idUser });
  
    res.status(201).json(newContact);
};

module.exports = addContact;
