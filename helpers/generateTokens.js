import jwt from 'jsonwebtoken';

export const generateToken = (uid) => {
  // en cuanto tiempo expirara el token
  const expiresIn = 1000 * 60 * 15; // 15 min
  //no enviar info privada en el payload, en este caso solo le pasamos el id del usuario
  const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
  return { token, expiresIn };
};

export const generateRefreshToken = (uid, res) => {
  const expiresIn = 1000 * 60 * 60 * 24 * 30; //30 dias
  const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: !(process.env.MODE === 'developer'),
    expires: new Date(Date.now() + expiresIn),
  });
};
