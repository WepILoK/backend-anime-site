import {body} from 'express-validator'

export const registerValidations = [
    body('email', 'Введите почту')
        .isEmail()
        .withMessage('Неверная почта')
        .isLength({min: 7, max: 40})
        .withMessage('Допустимое кол-во символов в почте от 7 до 40.'),
    body('userName', 'Введите логин')
        .isString()
        .isLength({min: 4, max: 40})
        .withMessage('Допустимое кол-во символов в логине от 4 до 40.'),
    body('password', 'Введите пароль')
        .isString()
        .isLength({
            min: 6,
        })
        .withMessage('Минимальная длина пароля 6 символов')
        .custom((value, { req }) => {
            if (value !== req.body.password2) {
                throw new Error('Пароли не совпадают');
            } else {
                return value;
            }
        }),
]

