import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import {NativeError} from "mongoose";

import {IUserModel, UserModel} from "../models/UserModel";
import {generateMD5} from "../utils/generateMD5";


passport.serializeUser<any, any>((_, user, done) => {
    done(null, user)
})

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err: NativeError, user: IUserModel) => {
        done(err, user)
    })
})
const selectParams = "+name +surname +age +country +city +vk +facebook +twitter +notifications +chats +friends"

passport.use(new LocalStrategy({usernameField: "email"},
    async (email, password, done): Promise<void> => {
        try {
            const user = await UserModel.findOne({email}).select(selectParams).exec()
            if (!user) {
                return done(null, false)
            }
            if (user.password === generateMD5(password + process.env.KEY)) {
                done(null, user)
            } else {
                done(null, false)
            }
        } catch (error) {
            done(error, false)
        }
    })
)

passport.use(
    new JWTStrategy(
        {
            secretOrKey: process.env.KEY || '123',
            jwtFromRequest: ExtractJwt.fromHeader('token'),
        },
        async (payload: { data: IUserModel }, done): Promise<void> => {
            try {
                const user = await UserModel.findById(payload.data._id).select(selectParams).exec()
                if (user) {
                    return done(null, user)
                }
                done(null, false)
            } catch (error) {
                done(error, false)
            }
        }
    )
)

export {passport}