const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const { favoriteSchema } = require('../../models');
const { changeSubscription, getCurrent } = require('../../controllers/users');
const { ctrlWrapper } = require('../../utils');

const usersRouter = express.Router();

usersRouter.patch('/', authenticate, validateBody(favoriteSchema), ctrlWrapper(changeSubscription));

usersRouter.get('/current', authenticate, ctrlWrapper(getCurrent));

module.exports = usersRouter;
