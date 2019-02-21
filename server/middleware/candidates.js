import Joi from 'joi';
import jwt from 'jsonwebtoken';
import db from '../db/runner';

const verifyToken = async (token, requireAdmin) => {
  if (!token) {
    return {
      status: false,
      message: 'Token is not provided',
    };
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    const text = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(text, [decoded.userId]);
    if (!rows[0]) {
      return {
        status: false,
        message: 'The token you provided is invalid',
      };
    }
    if (requireAdmin) {
      if (!rows[0].isadmin) {
        return {
          status: false,
          message: 'Not allowed, admin only',
        };
      }
    }
    return {
      status: true,
      data: rows[0],
    };
  } catch (error) {
    return {
      status: false,
      message: 'The token you provided is invalid',
    };
  }
};

const authenticate = async (req, res, next, requireAdmin) => {
  const token = req.headers['user-token'];
  const verifiedToken = await verifyToken(token, requireAdmin);
  if (!verifiedToken.status) {
    return res.status(400).json({
      status: 400,
      error: verifiedToken.message,
    });
  }
  return next();
};

const validate = {
  async register(req, res, next) {
    const schema = {
      candidate: Joi.number().required(),
      party: Joi.number().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    const requireAdmin = true;
    return authenticate(req, res, next, requireAdmin);
  },
};

export default validate;
