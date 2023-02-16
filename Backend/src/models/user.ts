
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    accountid: {
        type: Number,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false, omitUndefined: true });

const User = mongoose.model<mongoose.Document>("user", userSchema, "user");
export default User;


