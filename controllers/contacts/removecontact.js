const { Contact } = require('../../models');
const { HttpError } = require('../../utils');

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const { _id: idUser } = req.user;
  
    const removedContact = await Contact.findOneAndRemove({ _id: contactId, owner: idUser });
  
    if (!removedContact) {
        throw HttpError(404, 'Contact not found');
    }
  
    res.status(204).json({});
};

module.exports = removeContact;
