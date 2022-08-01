import { User } from '../models/UserModel.js';
import { generateRefreshToken, generateToken } from '../helpers/managerTokens.js';
import { errorsToken } from '../helpers/errorsToken.js';

// Registar usuario
export const register = async (req, res) => {
  // res.json({ ok: 'register' });
  console.log(req.body);
  const { email, password } = req.body;
  try {
    // Alternativa haciendo consulta a la db
    let user = await User.findOne({ email });

    if (user) throw { code: 11000 };

    user = new User({ email, password });

    await user.save();
    // jwt token
    const { token, expiresIn } = generateToken(user._id, res);
    generateRefreshToken(user._id, res);
    // status 201: creado
    return res.status(201).json({
      isRegister: true,
      token,
      expiresIn,
      email,
    });
  } catch (error) {
    console.log(error);
    // alternativa por defecto mongoose
    if (error.code === 11000) {
      return res.status(400).json({ error: 'El email ya esta registrado' });
    }
    return res.status(500).json({ Error: 'error de servidor' });
  }
};

// Iniciar sesion
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: 'Email o password incorrecto' });
    // llamamos al metodo comparePassword que creamos en el modelo

    const resPass = await user.comparePassword(password);

    if (!resPass) return res.status(403).json({ error: 'Email o password incorrecto' });

    //generar token JWT
    //no enviar info privada en el payload
    // const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET);
    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);

    return res.json({ ok: 'login', token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: 'error de servidor' });
  }
};

export const userInfo = async (req, res) => {
  try {
    //req.uid viene del middleware donde se validó si era un token valido
    const user = await User.findById(req.uid).lean();

    return res.json({
      user: {
        email: user.email,
        uid: user._id,
      },
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ Error: 'error de servidor' });
  }
};

// Tiene que leer la cookie para acceder al refreshToken
// El refreshToken se enviará y hará la comprobacion
// Si es correcto todo, este enviará el verdadero token para hacer la solicitud
export const refreshToken = (req, res) => {
  try {
    //deberamos un nuevo token y lo devolvemos a la vista

    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ ok: 'login', token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: errorsToken(error.message) });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('refreshToken');
    res.json({ logout: true });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: errorsToken(error.message) });
  }
};
