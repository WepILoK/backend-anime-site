import express from 'express';
import jwt from 'jsonwebtoken';

import {IUserModelDocument, UserModel} from "../models/UserModel";
import {validationResult} from "express-validator";
import {isValidObjectId} from "mongoose";
import {generateMD5} from "../utils/generateMD5";


class UserController {
    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({
                    status: 'error',
                    message: errors.array()[0].msg
                })
                return
            }
            const {email, password, userName} = req.body
            const candidateEmail = await UserModel.findOne({ $or: [{ email }, { userName }] })

            if (candidateEmail) {
                res.status(400).json({
                    status: 'error',
                    message: 'Возможно ваша почта или логин уже используются'
                })
                return
            }
            const data = {
                email: email,
                userName: userName,
                password: generateMD5(password + process.env.KEY)
            }
            const user = await UserModel.create(data)
            res.status(201).json({
                status: 'success',
                data: user,
                message: 'Регистрация прошла успешно!'
            })
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    }
    async show(req: express.Request, res: express.Response): Promise<void> {
        try {
            const userId = req.params.id
            if (!isValidObjectId(userId)) {
                res.status(400).send()
                return
            }
            const user = await UserModel.findById(userId).exec()
            if (!user) {
                res.status(404).send();
                return;
            }
            res.status(200).json({
                status: 'success',
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    }
    async afterLogin(req: express.Request, res: express.Response): Promise<void> {
        try {
            const user = req.user ? (req.user as IUserModelDocument).toJSON() : undefined;
            res.status(200).json({
                status: 'success',
                message: 'Авторизация прошла успешно',
                data: {
                    ...user,
                    token: jwt.sign({ data: req.user }, process.env.KEY || '123', {
                        expiresIn: '30 days',
                    })
                }
            })
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            })
        }
    }
    async getUserData(req: express.Request, res: express.Response): Promise<void> {
        try {
            const user = req.user ? (req.user as IUserModelDocument).toJSON() : undefined;
            res.status(200).json({
                status: 'success',
                message: 'Авторизация прошла успешно',
                data: user
            })
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            })
        }
    }
}

export const UserCtrl = new UserController()