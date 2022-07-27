import { User } from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import { generateToken } from '../helpers/generateTokens.js';

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

    // status 201: creado
    return res.status(201).json({
      isRegister: true,
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

    return res.json({ ok: 'login', token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: 'error de servidor' });
  }
};
