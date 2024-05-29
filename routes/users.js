const express = require('express');
const router = express.Router();

const { addSubject, loginTeacher, getSubject, getAllSubjects, updateSubject, deleteSubject } = require('../controllers/mapelController');
const authentication = require('../middleware/authentication');

/* GET mapel listing. */
router.post('/add', addSubject);
router.post('/login', loginTeacher);
router.get('/get', authentication, getSubject);
router.get('/all', authentication, getAllSubjects);
router.put('/:id/update', authentication, updateSubject);
router.delete('/:id/delete',authentication,deleteSubject);


module.exports = router;