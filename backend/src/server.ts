import * as express from "express";
import * as cors from "cors"
import * as quizController from "./controllers/quizController";
import * as creatorController from "./controllers/createrController";
import * as userController from "./controllers/userController";
import * as answerController from "./controllers/answerController";
import * as database from "./database";


// Our Express APP config

// API Endpoints

const databases = database

// Our Express APP config
const app = express();
app.use(express.json());

app.use(cors());
app.set("port", process.env.PORT || 3000);
// API Endpoints
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get("/quiz/all", quizController.getAllQuizes);
app.get("/quiz/:id", quizController.getAQuizById);
app.get("/quiz/question/:id", quizController.getAQuizByIdForQuestion);
app.post("/quiz/create", quizController.createAQuiz);
app.put("/quiz/update", quizController.updateAQuiz);
app.delete("/quiz/delete", quizController.deleteAQuiz);
app.get("/quiz/result/:id", answerController.getResult);
app.patch("/quiz/delete/bulk", quizController.deletemanyQuiz);
app.post("/creator/signup", creatorController.createACreator);
app.post("/user/signup", userController.createAUser);
app.post("/quiz/answer", answerController.answerAQuiz);
app.post("/creator/login", creatorController.login);
app.post("/user/login", userController.login);

const server = app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});
