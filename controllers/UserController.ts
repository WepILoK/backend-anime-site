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
                    message: errors.array()
                })
                return
            }
            const data = {
                email: req.body.email,
                userName: req.body.userName,
                password: req.body.password
            }
            const user = await UserModel.create(data)
            res.status(201).json({
                status: 'success',
                data: user,
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