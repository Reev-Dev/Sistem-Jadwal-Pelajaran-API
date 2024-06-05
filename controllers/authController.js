const generateToken = require('../config/generateToken');
const { comparePassword, hashPassword } = require('../config/bcrypt');
const { errorResponse, successResponse, internalErrorResponse, notFoundResponse } = require('../config/response');
const { admin } = require('../models');


async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUser = await admin.findOne({ where: { email } });
    if (existingUser) {
      errorResponse(res, 'User already exists', 400);
    }

    const hashedPassword = await hashPassword(password);

    const newAdmin = await admin.create({
      username,
      email,
      password: hashedPassword
    });

    const adminResponse = {
      id: newAdmin.id,
      username: newAdmin.username,
      email: newAdmin.email,
      createdAt: newAdmin.createdAt,
      updatedAt: newAdmin.updatedAt
    };

    successResponse(res, 'Admin registered successfully', adminResponse, 201);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const admins = await admin.findOne({ where: { email } });
    if (!admins) {
      return notFoundResponse(res, 'Admin not found');
    }

    const validPassword = await comparePassword(password, admins.password);  // Ensure this references the correct variable (admins.password)
    if (!validPassword) {
      return errorResponse(res, 'Invalid password', 401);
    }

    const adminResponse = {
      id: admins.id,
      username: admins.username,
      email: admins.email,
    };

    const token = generateToken(admins);
    return successResponse(res, 'Logged in successfully', {
      admins: adminResponse,
      token
    }, 200);
  } catch (error) {
    console.error('Error logging in admin:', error);
    return internalErrorResponse(res, error);
  }
}


async function me(req, res) {
  try {
    const admins = await admin.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email']
    });
    if (!admins) {
      errorResponse(res, 'Admin not found', 404);
    }
    successResponse(res, 'Admin fetched successfully', admins, 200);
  } catch (error) {
    console.error('Error fetching user:', error);
    internalErrorResponse(res, error);
  }
};

async function logout(req, res) {
  try {
    successResponse(res, 'Logged out successfully', null, 200);
  } catch (error) {
    console.error('Error logging out admin:', error);
    internalErrorResponse(res, error);
  }
};

module.exports = {
  register,
  login,
  me,
  logout,
}