import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/Shared/Service/quiz.service';
import { SnacbarService } from 'src/app/Shared/Service/snacbar.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.scss']
})
export class TakeQuizComponent implements OnInit {
  quizData:any=[];
  questionsData:any=[];
  currentQuestionSet:any;
  currentIndex:number = 0;
  quizId:string;
  email:string;
  username:string;
  constructor(private fb: FormBuilder,private quizService: QuizService,private route: ActivatedRoute,
    private router: Router, private snackBar: SnacbarService,) { 
    //Creating summy questions Json dta
   this.quizId = this.route.snapshot.params['id'];
  }

 
  ngOnInit(): void {
this.getQuizById(this.route.snapshot.params['id'])
  }
  getQuizById(id:string) {
    this.quizService.getAQuestionById(id).subscribe((res) => {
      if (res.statusCode === 200) {
        this.quizData = res.data;
        this.questionsData = res.data.questions
        this.currentIndex= 0;
        this.currentQuestionSet= this.questionsData[this.currentIndex]
      }
      else{
        this.snackBar.open("Please Refresh again", 'X')
      }
    });
  }


  
  submit(){
    const payload={
      email:this.email,
      username:this.username,
      quizId:this.quizId,
      questions:this.questionsData
    }
    if(payload.email && payload.username){
      this.quizService.submitQuiz(payload).subscribe((res) => {
        if (res.statusCode === 200) {
          this.router.navigate(['/auth']);
          this.snackBar.open("Thank You You submitted this quiz", 'X')

        }
      });
    }else{
      this.snackBar.open("Please fill all the details", 'X')

    }
  
    
    
    }  
  previous(){
  this.currentIndex = this.currentIndex-1;
  this.currentQuestionSet= this.questionsData[this.currentIndex]
  }
  next(){
    this.currentIndex = this.currentIndex+1;
    this.currentQuestionSet= this.questionsData[this.currentIndex];
  }
   showOptions(event:MatCheckboxChange,questionId,text){
    this.markCorrect(questionId,text,event.checked)
  }
  markCorrect(_id: string, text: boolean,answer:boolean): void {
    
    const question = this.questionsData.find(q => q._id === _id);
    if (question) {
      question.options.forEach(opt => {
        opt.answer = false;
        if (opt.text === text &&answer ) {
          opt.answer = true;
        }
        else if(opt.text === text && !answer){
          opt.answer = false;
        }
      });
    }
  }
  
}