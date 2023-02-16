import Quiz from "../models/quiz";
import Answer from "../models/answer";

export let answerAQuiz =  (req: any, res: any) => {
   Quiz.findById(req.body.quizId, (err:any, quiz:any) => {
     const result =  checkAnswers(quiz.questions,req.body.questions);
    if(quiz){
        const answer =  new Answer({
            email: req.body.email,
            username: req.body.username,
            quizId: req.body.quizId,
            questions: req.body.questions,
            score:  result
        });
     
        answer.save((error, answer) => {
          const responseBody ={
            "status": "success",
            "data": "quiz submitted",
            "statusCode":200
        }
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).send(responseBody);
            }
        });
    }
      });

   
}

export let checkAnswers =(questions: any[], userAnswers: any[]): number=> {
    let score = 0;
    userAnswers.forEach((userAnswer) => {
      const question = questions.find((q) => q._id.toString() === userAnswer._id.toString());
      if (!question) return; // userAnswer references non-existent question, skip
      let isCorrect = true;
      question.options.forEach((option:any) => {
        let userOption = userAnswer.options.find((o:any) => o.text === option.text);
        if(userOption === undefined){
          userOption = false;
        }

        if (!userOption) {
          isCorrect = false;
          return; // option not found in userAnswer, skip
        }
        if (option.isCorrect && !userOption.answer) {
          isCorrect = false;
          return; // correct option not selected by user, skip
        }
        if (!option.isCorrect && userOption.answer) {
          isCorrect = false;
          return; // incorrect option selected by user, skip
        }
      });
      if (isCorrect) {
        score++;}
    });
    return score;
  }
  export let getResult = (req: any, res: any) => {
    Answer.find({ quizId: req.params.id }, { email: 1,username: 1,score: 1,answeredAt: 1,_id:0},(err: any, results: any) => {
        if (err) {
            res.send("Error!");
        } else {
            const responseBody = {
                data: results,
                message: "success",
                statusCode: 200
            }
            res.send(responseBody);
        }
    })
};