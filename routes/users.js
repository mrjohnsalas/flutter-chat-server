// path: api/users

const { Router } = require('express');

const { jwtValidations } = require('../middlewares/jwt-validations');
const { getUsers } = require('../controllers/users');

const router = Router();

router.get('/', jwtValidations, getUsers);

module.exports = router;