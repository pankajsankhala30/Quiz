"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const quizController = require("./controllers/quizController");
const database = require("./database");
const databases = database;
const app = express();
app.use(express.json());
app.use(cors());
app.set("port", process.env.PORT || 3000);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get("/quizes", quizController.getAllQuizes);
app.post("/quiz", quizController.createAQuiz);
const server = app.listen(app.get("port"), () => {
    console.log("App is running on http://localhost:%d", app.get("port"));
});
//# sourceMappingURL=server.js.map