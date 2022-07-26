import { validationResult } from 'express-validator';

export const validationResultExpress = (req, res, next) => {
  // Capturamos los errores de express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
