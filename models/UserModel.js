import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

// interceptamos la peticion a la db para hashear la contraseña
userSchema.pre('save', async function (next) {
  const user = this;

  //en caso de modificar informacion del usuario para no volver a hashear la contraseña
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    throw new Error('Falló hash de contraseña');
    console.log(error);
  }
});

// Creamos el metodo comparePassword en el userSchema
userSchema.methods.comparePassword = async function (candidatePass) {
  // retornara si el hash de la contraseña que le pasemos, es similar a la contraseña guardada
  return await bcrypt.compare(candidatePass, this.password);
};

export const User = model('User', userSchema);
