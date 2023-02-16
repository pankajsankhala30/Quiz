import { Component, OnInit, HostBinding } from '@angular/core';
import { QuizService } from '../Shared/Service/quiz.service';
import { DomSanitizer } from '@angular/platform-browser';
import { QuestionModal } from '../Shared/modal/question.modal';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  selectedAnswer: number = null;
  isLoading: Boolean = false;

  constructor(public quizService: QuizService, public sanitizer: DomSanitizer, public router: Router) { }

  ngOnInit(): void {
   
    // this.quizService.addData({ answer: 0, imageName: " ", options: ["True", "False"], question: "Is 'undefined' a data type in javascript?" });
  }

  onLogout() {
localStorage.clear()
this.router.navigate([''])
  }
}
