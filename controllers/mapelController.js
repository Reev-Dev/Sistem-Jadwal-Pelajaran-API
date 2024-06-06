const generateToken = require('../config/generateToken');
const { comparePassword, hashPassword } = require('../config/bcrypt');
const { errorResponse, successResponse, internalErrorResponse, notFoundResponse } = require('../config/response');
const { subject } = require('../models');

async function addSubject(req, res) {
  try {
    const { mapel, guruPengampu, kodeGuru } = req.body;


    // Check if subject with the same name already exists
    const existingSubject = await subject.findOne({ where: { mapel } });
    if (existingSubject) {
      return errorResponse(res, 'Subject already exists', 400);
    }


    const hashedCode = await hashPassword(kodeGuru);


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


    return successResponse(res, 'Subject added successfully', subjectResponse, 201);
  } catch (error) {
    console.error(err);
    internalErrorResponse(res, err);
  }
}

async function getSubject(req, res) {
  try {
    const { kodeGuru, guruPengampu } = req.body;

    const teacher = await subject.findOne({ where: { guruPengampu } }); 
    if (!teacher) return notFoundResponse(res, "Teacher not found");

    // Validate code
    const validCode = await comparePassword(kodeGuru, teacher.kodeGuru);
    if (!validCode) return errorResponse(res, "Invalid code", 401);

 
    const subjects = await subject.findAll({ where: { guruPengampu }, attributes: ["id", "mapel", "guruPengampu"] });

    if (!subjects || subjects.length === 0) {
      return errorResponse(res, "Subjects not found", 404);
    }

    return successResponse(res, "Subjects fetched successfully", subjects, 200);
  } catch (err) {
    console.error("Error fetching subjects: ", err);
    return internalErrorResponse(res, err, 500);
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
    const { mapel, guruPengampu, kodeGuru } = req.body;

    try {
        const existingSubject = await subject.findOne({ where: { id } });

        if (!existingSubject) {
            return errorResponse(res, "Mata pelajaran tidak ditemukan", 404);
        }

        const updateFields = {};

        if (mapel) {
            updateFields.mapel = mapel;
        }
        if (guruPengampu) {
            updateFields.guruPengampu = guruPengampu;
        }
        if (kodeGuru) {
            // Hash kode guru baru jika ada
            const hashedCode = await hashPassword(kodeGuru);
            updateFields.kodeGuru = hashedCode;
        }

        if (Object.keys(updateFields).length > 0) {
            const updatedSubject = await subject.update(updateFields, { where: { id } });

            if (updatedSubject) {
                const subjectResponse = {
                    id,
                    mapel: mapel || existingSubject.mapel,
                    guruPengampu: guruPengampu || existingSubject.guruPengampu,
                    updatedAt: updatedSubject.updatedAt,
                };
                return successResponse(res, "Mata pelajaran berhasil diperbarui", subjectResponse, 200);
            } else {
                return errorResponse(res, "Gagal memperbarui mata pelajaran", 400);
            }
        } else {
            return successResponse(res, "Tidak ada perubahan yang perlu dilakukan", {}, 200);
        }
    } catch (err) {
        console.error(err);
        return internalErrorResponse(res, err, 500);
    }
};



const deleteSubject = async (req, res) => {
    const { id } = req.params

    try {
        const subjects = await subject.findOne({
            where: {
                id
            },
        });
        if (!subjects) {
            errorResponse(res, "Subject not found", 404);
        }

        const deletedSubject = await subject.destroy({
            where: {
                id
            },
        });

        if (!deletedSubject) {
            errorResponse(res, "Subject not deleted", 400);
        } else {
            successResponse(res, "Subject deleted successfully", subjects, 200);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

module.exports = {
    addSubject,
    getSubject,
    getAllSubjects,
    updateSubject,
    deleteSubject,
};