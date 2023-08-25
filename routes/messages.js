// path: api/messages

const { Router } = require('express');

const { jwtValidations } = require('../middlewares/jwt-validations');
const { getChat } = require('../controllers/messages');

const router = Router();

router.get('/:from', jwtValidations, getChat);

module.exports = router;