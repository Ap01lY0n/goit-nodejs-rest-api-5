const { Contact } = require('../../models');
const { HttpError } = require('../../utils');

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const { _id: idUser } = req.user;
  
    const contact = await Contact.findOne({ _id: contactId, owner: idUser }, '-createdAt -updatedAt').populate(
        'owner',
        'name email'
    );
  
    if (!contact) {
        throw HttpError(404, 'Contact not found');
    }
  
    res.json(contact);
};

module.exports = getContactById;
