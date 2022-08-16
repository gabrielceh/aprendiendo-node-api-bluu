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
import 'dotenv/config'; // siempre arriba del todo
//DB
import './database/connectdb.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// rutas
import authRouter from './routes/auth.route.js';
import linkRouter from './routes/link.route.js';
import redirectRouter from './routes/redirect.route.js';

const app = express();

//Todos los sitios que tienen permitido el acces al backend
const whiteList = [process.env.ORIGIN_1, process.env.ORIGIN_2];

//CORS: si lo dejamos de esta manera TODOS los sitios web tendran acceso al backend
// app.use(cors())
app.use(
  cors({
    origin: function (origin, callback) {
      console.log(whiteList);
      console.log(whiteList.includes(origin));
      // origin es las paginas admitidas. si origin es undefined, es porque origin es el server donde esta alojada la api, por ende debe ser falso
      if (!origin || whiteList.includes(origin)) {
        // en caso que sea cierto, al callback le pasamos el error en null
        return callback(null, origin);
      }
      return callback(`Error de CORS - origin: "${origin}" No autorizado`);
    },
    credentials: true,
  })
);

// Le indicamos a express que reciba  req json
app.use(express.json());
// le indicamos a express que a partir de ahora puede usar cookies
app.use(cookieParser());

// Llamamos a las rutas
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/links', linkRouter);
app.use('/', redirectRouter); //Opcional: ruta de ejemplo si el front tienen el mismo dominio que el backend

// Esta variable de entorno ya esta configurada en heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('🔥🔥🔥 ' + `${process.env.PORT || 'http://localhost:5000'}`));
