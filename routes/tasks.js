const express = require('express');
const router = express.Router();

const { addClass, addSchedule, getScheduleByClassAndDay, getAllSchedules } = require('../controllers/jadwalController');
const authentication = require('../middleware/authentication');

/* GET schedule listing. */
router.post('/add/class', authentication, addClass);
router.post('/add/schedule', addSchedule);
router.get('/get/:classId/:day', getScheduleByClassAndDay);
router.get('/get/all', getAllSchedules)


module.exports = router;
