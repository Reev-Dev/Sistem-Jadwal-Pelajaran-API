const generateToken = require('../config/generateToken');
const { comparePassword, hashPassword } = require('../config/bcrypt');
const { errorResponse, successResponse, internalErrorResponse, notFoundResponse } = require('../config/response');
const { subject } = require('../models');

async function addSubject(req, res) {
    try {
        const { mapel, guruPengampu, kodeGuru } = req.body;

        // Check if subject already exists
        const existingSubject = await subject.findOne({ where: { mapel } });
        if (existingSubject) {
            errorResponse(res, 'Subject already exists', 400);
        } else {
            // Hash the code
            const hashedCode = await hashPassword(kodeGuru);

            // Create new subject
            const newSubject = await subject.create({
                mapel,
                guruPengampu,
                kodeGuru: hashedCode
            });

            const subjectResponse = {
                id: newSubject.id,
                mapel: newSubject.mapel,
                guruPengampu: newSubject.guruPengampu,
                createdAt: newSubject.createdAt
            };

            successResponse(res, 'Subject created successfully', subjectResponse, 201);
        }
    } catch (err) {
        console.error(err);
        internalErrorResponse(res, err);
    }
}

async function loginTeacher(req, res) {
    try {
        const { guruPengampu, kodeGuru } = req.body;

        // Check if teacher is exist
        const teacher = await subject.findOne({ where: { guruPengampu } });
        if (!teacher) notFoundResponse(res, 'Teacher not found');

        // validate code
        const validCode = await comparePassword(kodeGuru, teacher.kodeGuru);
        if (!validCode) errorResponse(res, 'Invalid code', 401);

        const teacherResponse = {
            id: teacher.id,
            guruPengampu: teacher.guruPengampu,
            mapel: teacher.mapel,
        };

        const token = generateToken(teacher);
        successResponse(res, 'Hello, Sir/Madam', {
            teacher: teacherResponse,
            token
        }, 200);
    } catch (err) {
        console.error('Error logging teacher', err);
        internalErrorResponse(res, err);
    }
};

async function getSubject(req, res) {
    try {
        const subjects = await subject.findByPk(req.user.id, {
            attributes: ['id', 'mapel', 'guruPengampu']
        });
        if (!subjects) errorResponse(res, 'Subjects not found', 404);

        successResponse(res, 'Fetched succesfully', subjects, 200);
    } catch (err) {
        console.error('Error fetching subjects: ', err);
<<<<<<< HEAD
        internalErrorResponse(res, err, 500);
    }
}

async function getAllSubjects(req, res) {
    try {
        const subjects = await subject.findAll({
            attributes: ['id', 'mapel', 'guruPengampu']
        });

        if (!subjects || subjects.length === 0) {
            errorResponse(res, 'Subjects not found', 404);
        }

        successResponse(res, 'Fetched Succesfully', subjects, 200);
    } catch (err) {
        console.error('Error fetching subjects: ', err);
=======
>>>>>>> 44c37f8 (Penambahan fungsi updateSubject)
        internalErrorResponse(res, err, 500);
    }
}

async function getAllSubjects(req, res) {
    try {
        const subjects = await subject.findAll({
            attributes: ['id', 'mapel', 'guruPengampu']
        });

        if (!subjects || subjects.length === 0) {
            errorResponse(res, 'Subjects not found', 404);
        }

        successResponse(res, 'Fetched Succesfully', subjects, 200);
    } catch (err) {
        console.error('Error fetching subjects: ', err);
        internalErrorResponse(res, err, 500);
    }
}

const updateSubject = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { mapel, guruPengampu, kodeGuru } = req.body;
  
    try {
      const subjects = await subject.findOne({
        where: {
          id,
          userId
        }
      });
  
      if (!subjects) {
        errorResponse(res, 'subject not found', 404);
      }
      const updatedsubject = await subject.update({
        mapel, guruPengampu, kodeGuru
      }, {
        where: {
          id,
          userId
        }
      });
  
      const subjectReponse = {
        id: subject.id,
        mapel: subject.mapel,
        guruPengampu: subject.guruPengampu,
        kodeGuru: subject.kodeGuru
      }
  
      if (!updatedsubject) {
        errorResponse(res, 'subject not updated', 400);
      } else {
        successResponse(res, 'subject updated successfully', subjectReponse, 200);
      }
    } catch (err) {
      console.error(err);
      internalErrorResponse(res, err, 500);
    }
  }


module.exports = {
    addSubject,
    loginTeacher,
    getSubject,
<<<<<<< HEAD
    getAllSubjects
=======
    getAllSubjects,
    updateSubject
>>>>>>> 44c37f8 (Penambahan fungsi updateSubject)
};
