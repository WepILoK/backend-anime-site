import dotenv from 'dotenv'
dotenv.config()
import './core/db';
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import {UserCtrl} from "./controllers/UserController";
import {registerValidations} from "./validations/register";


const app = express()
const PORT = process.env.PORT || 9999

app.use(bodyParser.json())
app.use(cors())




app.post('/registration', registerValidations, UserCtrl.create)


app.listen(PORT, (): void => {
    console.log('Сервер запущен.');
})