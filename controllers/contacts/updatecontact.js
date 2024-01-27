const { Contact } = require('../../models');
const { HttpError } = require('../../utils');

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const { _id: idUser } = req.user;
  
    const updatedContact = await Contact.findOneAndUpdate(
        { _id: contactId, owner: idUser },
        { ...req.body },
        { new: true }
    );
  
    if (!updatedContact) {
        throw HttpError(404, 'Contact not found');
    }
  
    res.json(updatedContact);
};

module.exports = updateContact;