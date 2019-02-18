import Joi from 'joi';

const validate = {

  create(req, res, next) {
    const schema = {
      firstname: Joi.string().trim().required(),
      lastname: Joi.string().trim().required(),
      othername: Joi.string().trim().required(),
      email: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
      phoneNumber: Joi.string().trim().required(),
      passportUrl: Joi.string().trim().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message,
      });
    }
    return next();
  },
};

export default validate;
