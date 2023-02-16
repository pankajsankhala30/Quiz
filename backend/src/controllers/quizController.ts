import { Creator } from "src/models/creator";
import Quiz from "../models/quiz";
import * as cryptoController from "./cryptoController";

export let getAllQuizes = (req: any, res: any) => {
    const accountId = req.headers.accountid;
    if (!accountId) {
        return res.status(400).send({ msg: 'Invalid accountid' });
    }
    const accountid = cryptoController.decrypt(accountId)

    Quiz.find({ accountid: accountid },{accountid:0}, (err: any, quizes: any) => {
        if (err) {
            res.send("Error!");
        } else {
            const responseBody = {
                data: quizes,
                message: "success",
                statusCode: 200
            }
            res.send(responseBody);
        }
    })
};
export let createAQuiz = (req: any, res: any) => {
    const encryptedaccountid = cryptoController.decrypt(req.headers.accountid);
    const quiz = new Quiz({
        accountid: encryptedaccountid,
        quiz_title: req.body.quiz_title,
        questions: req.body.questions
    });
    quiz.save((error) => {
        const responseBody ={
            "status": "success",
            "data": "quiz created Successfully",
            "statusCode":200
        }
        if (error) {
            return res.status(500).send(error);
        } else {
            return res.status(200).send(responseBody);
        }
    });
}
export let deleteAQuiz = (req: any, res: any) => {
    const quizId = req.body.id
    Quiz.deleteOne({ _id: quizId }, (err: any) => {
        const responseBody ={
            "status": "success",
            "data": "quiz deleted Successfully",
            "statusCode":200
        }
        if (err) {
            res.send("Error!");
        } else {
            res.status(200).send(responseBody);
        }
    })

}

export let deletemanyQuiz = (req: any, res: any) => {
    const quizIds = req.body.ids
    Quiz.deleteMany({ _id: { $in: quizIds } }, (err: any) => {
        const responseBody ={
            "status": "success",
            "data": "quizes deleted Successfully",
            "statusCode":200
        }
        if (err) {
            res.send("Error!");
        } else {
            res.status(200).send(responseBody);
        }
    })

}

export let updateQuiz = async (req: any, res: any) => {
    const quiz = await Quiz.findById(req.body.id);

    if (!quiz) {
        return {
            message: 'Quiz not found',
            success: false
        };
    }
    const newQuizData = new Quiz({
        quiz_title: req.body.quiz_title,
        questions: req.body.questions,
        updatedAt: Date.now()
    });
    quiz.set(newQuizData);
    const responseBody ={
        "status": "success",
        "data": "quiz updated Successfully",
        "statusCode":200
    }
    quiz.save((error, quiz) => {
        if (error) {
            return res.status(500).send(error);
        } else {
            return res.status(200).send(responseBody);
        }
    });

}



export const updateAQuiz = async (req: any, res: any) => {

    const quiz = await Quiz.findById(req.body.id);
    if (!quiz) {
        return {
            message: 'Quiz not found',
            success: false
        };
    }
    delete req.body.id
    req.body.updatedAt = new Date();
    quiz.set(req.body);
    const responseBody ={
        "status": "success",
        "data": "quiz updated Successfully",
        "statusCode":200
    }
    quiz.save((error, quiz) => {
        if (error) {
            return res.status(500).send(error);
        } else {
            return res.status(200).send(responseBody);
        }
    });
}


export let getAQuizById = (req: any, res: any) => {
    Quiz.findById(req.params.id, (err:any, quiz:any) => {
        const responseBody = {
            data: quiz,
            message: "success",
            statusCode: 200
        }
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(responseBody);
        }
      });

}

export let getAQuizByIdForQuestion =  async (req: any, res: any) => {
    Quiz.findById(req.params.id, { "questions.options.isCorrect": 0 }, async (err:any, quiz:any) => {
        const responseBody = {
            data:  quiz,
            message: "success",
            statusCode: 200
        }
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(responseBody);
        }
      });

}
