import * as mongoose from "mongoose";
const uri: string = "mongodb://127.0.0.1:27017/fibr";
const uri2 = `mongodb+srv://pankaj:pankaj@cluster0.tebc4.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri2, (err: any) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Successfully Connected!");
    }
});