import { body, param, validationResult } from 'express-validator';
import axios from 'axios';

const validationResultExpress = (req, res, next) => {
  // Capturamos los errores de express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const validationBodyLogin = [
  body('email', 'Formato email incorrecto').trim().isEmail().normalizeEmail(),
  body('password', 'La contraseña debe tener minimo 6 caracteres').trim().isLength({ min: 6 }),
  validationResultExpress,
];

export const validationBodyRegister = [
  body('email', 'Formato email incorrecto').trim().isEmail().normalizeEmail(),
  body('password', 'La contraseña debe tener minimo 6 caracteres')
    .trim()
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error('No coinciden las contraseñas');
      }
      return value;
    }),
  validationResultExpress,
];

export const bodyLinkValidator = [
  body('original_link', 'Formato url no valido')
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        const urlPatron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
        if (!urlPatron.test(value)) {
          throw new Error('URL no valida');
        }
        await axios.get(value);
        return value;
      } catch (error) {
        throw new Error('URL no existe');
      }
    }),
  validationResultExpress,
];

export const paramsLinkValidator = [
  // escape() reemplaza las caracteres (< / >) html por
  param('id', 'Formato de params no valido').trim().notEmpty().escape(),
  validationResultExpress,
];
