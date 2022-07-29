// npm i bcryptjs cookie-parser cors dotenv express express-validator jsonwebtoken mongoose
/*
 *express: para levantar el servidor y el manejo de rutas
 *express-validator: valida todas las solicitudes del cliente
 *mongoose: ODM para hacer las consultas a la db
 *jsonwebtoken: tokens de seguridad para que el frontend gestione el token y sepamos que el usuario esta autorizado
 *dotenv: para trabajar con variables de entorno
 *cors: nos ayudan a configurar que los servidores del front y backend se comuniquen correctamente
 *cookie-parser:
 *bcryptjs: para hashear la contraseña en la db y hacer comrprobaciones
 *nanoid: genera id de forma aleatoria
 *axios: aqui nos ayudara a verificar si la url existe en la web
 */

// Para usar import, en el package.json, añadir "type":"module"
import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

import './database/connectdb.js';
// rutas
import authRouter from './routes/auth.route.js';
import linkRouter from './routes/link.route.js';

const app = express();
// Le indicamos a express que reciba  req json
app.use(express.json());
// le indicamos a express que a partir de ahora puede usar cookies
app.use(cookieParser());

// Llamamos a las rutas
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/links', linkRouter);

// Esta variable de entorno ya esta configurada en heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('🔥🔥🔥 ' + `${process.env.PORT || 'http://localhost:5000'}`));
