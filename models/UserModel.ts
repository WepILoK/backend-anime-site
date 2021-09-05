import {Schema, model} from "mongoose";


const UserSchema = new Schema(
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

export const UserModel = model('User', UserSchema);