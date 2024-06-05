const express = require('express');
const router = express.Router();

const { addSubject, getSubject, getAllSubjects, updateSubject, deleteSubject } = require('../controllers/mapelController');
const authentication = require('../middleware/authentication');

/* GET mapel listing. */
router.post('/add', authentication, addSubject);
router.get('/get', getSubject);
router.get('/all', authentication, getAllSubjects);
router.put('/:id/update', authentication, updateSubject);
router.delete('/:id/delete',authentication,deleteSubject);

module.exports = router;