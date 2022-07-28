export const errorsToken = (message) => {
  const errors = {
    ['jwt malformed']: 'formato de token valido',
    ['invalid token']: 'token no valido',
    ['jwt expired']: 'token expirado',
    ['invalid signature']: 'La firma del token no valida',
    ['No Bearer']: 'Utiliza el formato Bearer',
    ['No token']: 'No se envió token',
  };

  return errors[message]
    ? errors[message]
    : 'Ocurrió un error inesperado en la validacion del token';
};
