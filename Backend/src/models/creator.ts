
import * as mongoose from "mongoose";


const Schema = mongoose.Schema;

const creatorSchema = new Schema({
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


const Creator = mongoose.model<mongoose.Document>("creator", creatorSchema, "creator");
export { Creator };


