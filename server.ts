import dotenv from 'dotenv'

dotenv.config()
import './core/db';

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import {registerValidations} from "./validations/register";
import {passport} from "./core/passport";
import {UserCtrl} from "./controllers/UserController";



const app = express()
const PORT = process.env.PORT || 8888

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(passport.initialize())


app.get('/users/:id', UserCtrl.show);
app.post('/registration', registerValidations, UserCtrl.create)
app.post('/login', passport.authenticate('local'), UserCtrl.afterLogin)

app.listen(PORT, (): void => {
    console.log('Сервер запущен.');
})