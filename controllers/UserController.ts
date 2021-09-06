import express from 'express';
import {UserModel} from "../models/UserModel";
import {validationResult} from "express-validator";


class UserController {
    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                res.status(400).json({
                    status: 'error',
                    message: errors.array()[0].msg
                })
                return
            }
            const {email, password, userName} = req.body
            const candidateEmail = await UserModel.findOne({email})
            const candidateUserName = await UserModel.findOne({userName})
            if(candidateEmail || candidateUserName) {
                res.status(400).json({
                    status: 'error',
                    message: 'Возможно ваша почта или логин уже используются'
                })
                return
            }
            const data = {
                email: email,
                userName: userName,
                password: password
            }
            const user = await UserModel.create(data)
            res.status(201).json({
                status: 'success',
                data: user,
                message: 'Регистрация успешно завершена'
            })
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    }
}

export const UserCtrl = new UserController()