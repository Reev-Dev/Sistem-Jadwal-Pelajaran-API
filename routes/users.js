const express = require('express');
const router = express.Router();

const { addSubject, loginTeacher, getSubject } = require('../controllers/mapelController');
const authentication = require('../middleware/authentication');

/* GET mapel listing. */
router.post('/add', addSubject);
router.post('/login', loginTeacher);
router.get('/get', authentication, getSubject);


module.exports = router;
