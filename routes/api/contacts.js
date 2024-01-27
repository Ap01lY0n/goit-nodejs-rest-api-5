const express = require('express');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { contactAddSchema, contactFavoriteSchema } = require('../../models');
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateContactFavorite,
} = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../utils');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(listContacts))

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(getContactById));

router.post('/', authenticate, validateBody(contactAddSchema), ctrlWrapper(addContact));

router.put('/:contactId', authenticate, isValidId, validateBody(contactAddSchema), ctrlWrapper(updateContact));

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(contactFavoriteSchema, 'missing field favorite'),
  ctrlWrapper(updateContactFavorite)
);

router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(removeContact));

module.exports = router;
