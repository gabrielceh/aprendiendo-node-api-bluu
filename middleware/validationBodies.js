import { body } from 'express-validator';

export const validationBodyLogin = [
  body('email', 'Formato email incorrecto').trim().isEmail().normalizeEmail(),
  body('password', 'La contraseña debe tener minimo 6 caracteres').trim().isLength({ min: 6 }),
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
];
