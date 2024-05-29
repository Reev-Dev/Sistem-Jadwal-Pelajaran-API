// const generateToken = require('../config/generateToken');
// const { comparePassword, hashPassword } = require('../config/bcrypt');
const { errorResponse, successResponse, internalErrorResponse, notFoundResponse } = require('../config/response');
const { subject, classes, schedules } = require('../models');

async function addClass(req, res) {
    try {
        const { className } = req.body;

        if (!className) {
            return errorResponse(res, 'Class name is required', 400);
        }
        const existingClass = await classes.findOne({ where: { className } });
        if (existingClass) {
            errorResponse(res, 'Class already exists', 400);
        } else {
            const newClass = await classes.create({ className });
            return successResponse(res, 'Class created successfully', newClass, 201);
        }
    } catch (err) {
        console.error('Error creating class', err);
        return internalErrorResponse(res, err);
    }

}

async function addSchedule(req, res) {
    try {
        const { classId, day, time, subjectId } = req.body;

        const existingClass = await classes.findByPk(classId);
        const existingSubject = await subject.findByPk(subjectId);

        if (!classId || !day || !time || !subjectId) {
            return errorResponse(res, 'All fields are required', 400);
        }

        if (!existingClass) {
            return notFoundResponse(res, 'Class not found');
        }
        if (!existingSubject) {
            return notFoundResponse(res, 'Subject not found');
        }

        const newSchedule = await schedules.create({
            classId,
            day,
            time,
            subjectId
        });

        return successResponse(res, 'Schedule added successfully', newSchedule, 201);
    } catch (err) {
        console.error('Error created schedule', err);
        return internalErrorResponse(res, err);
    }
}

async function getScheduleByClassAndDay(req, res) {
    try {
        const { classId, day } = req.params;

        const schedule = await schedules.findAll({
            where: {
                classId,
                day
            },
            include: [
                {
                    model: subject,
                    attributes: ['mapel', 'guruPengampu']
                }
            ]
        });

        if (!schedule || schedule.length === 0) {
            return notFoundResponse(res, 'Schedule not found for this class and day');
        }

        return successResponse(res, 'Schedule fetched successfully', schedule, 201);
    } catch (err) {
        console.error('Error fetching schedules', err);
        return internalErrorResponse(res, err);
    }
}

async function getAllSchedules(req, res) {
    try {
        // const allSchedule = await schedules.findAll({
        //     include: [
        //         {
        //             model: classes,
        //             attributes: ['id', 'className']
        //         },
        //         {
        //             model: subject,
        //             attributes: ['id', 'mapel', 'guruPengampu']
        //         }
        //     ]
        // });
        // if (!allSchedule || allSchedule.length === 0) {
        //     return notFoundResponse(res, 'No schedules found')
        // }
        // // Kelompokkan jadwal berdasarkan kelas dan hari
        // const groupedSchedules = allSchedule.reduce((acc, allSchedule) => {
        //     const classNames = allSchedule.classes.className;
        //     const day = allSchedule.day;

        //     if (!acc[classNames]) {
        //         acc[classNames] = {};
        //     }
        //     if (!acc[classNames][day]) {
        //         acc[classNames][day] = [];
        //     }
        //     acc[classNames][day].push({
        //         time: allSchedule.time,
        //         subject: allSchedule.subject
        //     });

        //     return acc;
        // }, {});
        // return successResponse(res, 'Schedules fetched succesfully', groupedSchedules, 201);
        const classAll = await classes.findAll({
            include: {
                model: schedules,
                include: {
                    model: subject,
                    attributes: ['id', 'mapel', 'guruPengampu']
                }
            },
            order: [
                ['schedules', 'day', 'DESC'],
                ['schedules', 'time', 'ASC']
            ]
        });

        let scheduleData = {};

        classAll.forEach(cls => {
            let classSchedule = {};
            cls.schedules.forEach(schedules => {
                if(!classSchedule[schedules.day]) {
                    classSchedule[schedules.day] = [];
                }
                classSchedule[schedules.day].push({
                    time: schedules.time,
                    subjects: schedules.subject
                });
            });
            scheduleData[cls.className] = classSchedule;
        });

        return successResponse(res, 'Schedules fetched succesfully', scheduleData, 201);
    } catch (err) {
        console.error('Error fetching schedules', err);
        return internalErrorResponse(res, err);
    }

}

module.exports = {
    addClass,
    addSchedule,
    getScheduleByClassAndDay,
    getAllSchedules
};
