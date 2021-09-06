import {Schema, model, Document} from "mongoose";

export interface IUserModel {
    _id?: string
    email: string
    userName: string
    password: string
    name?: string
    surname?: string
    age?: number
    country?: string
    city?: string
    avatar?: string
    vk?: string
    facebook?: string
    twitter?: string
}

export type IUserModelDocument = IUserModel & Document;

const UserSchema = new Schema<IUserModel>(
    {
        email: {
            unique: true,
            required: true,
            type: String,
        },
        userName: {
            unique: true,
            required: true,
            type: String,
        },
        password: {
            required: true,
            type: String,
        },
        name: String,
        surname: String,
        age: Number,
        country: String,
        city: String,
        avatar: String,
        vk: String,
        facebook: String,
        twitter: String,
    }
)

UserSchema.set('toJSON', {
    transform: function (_, obj) {
        delete obj.password;
        return obj;
    },
});

export const UserModel = model<IUserModelDocument>('User', UserSchema);