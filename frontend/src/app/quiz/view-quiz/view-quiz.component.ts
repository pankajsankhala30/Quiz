import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/Shared/Service/quiz.service';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent implements OnInit {
  quizData:any=[];
  questionsData:any=[];
  constructor(private quizService: QuizService,private route: ActivatedRoute,private router: Router,) { }

  ngOnInit(): void {
this.getQuizById(this.route.snapshot.params['id'])
  }
  getQuizById(id:string) {
    this.quizService.getAQuizById(id).subscribe((res) => {
      if (res.statusCode === 200) {
        this.quizData = res.data;
        this.questionsData = res.data.questions
      }
    });
  }
  onLogout(){
    localStorage.clear()
this.router.navigate([''])
  }
}
