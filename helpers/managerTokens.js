import jwt from 'jsonwebtoken';

export const generateToken = (uid) => {
  // en cuanto tiempo expirara el token
  const expiresIn = 60 * 15; // 15 min
  try {
    //no enviar info privada en el payload, en este caso solo le pasamos el id del usuario
    // el primer parametro es el payload que va en forma de objeto
    // El segundo es la palabra secreta
    // le podemos pasar la expiracion
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30; //30 dias
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn });
    // configuramos la cookie para acceder desde el backend sin tener que colocarla en el frontend
    // para enviar el token desde el front, en las opciones de la peticion fetch, se debe añadir credentials: 'include'
    // reibe el nombre de la cookie y el valor de la cookie
    res.cookie('refreshToken', refreshToken, {
      // Para que la cookie no sea accedida desde el front
      httpOnly: true,
      // Para que sea https, pero como es una api rest en modo desarrollo, si se coloca en true, falla
      secure: !(process.env.MODE === 'developer'),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.log(error);
  }
};
