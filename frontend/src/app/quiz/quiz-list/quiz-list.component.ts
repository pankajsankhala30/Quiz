import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/Shared/Service/quiz.service';
import { environment } from "../../../environments/environment";
@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  quizesList = []
  constructor(private quizService: QuizService,public route: Router) { }

  ngOnInit(): void {
    this.getAllQuizes();
  }

  getAllQuizes() {
    this.quizService.getAllQuizes().subscribe((res) => {
      if (res.statusCode === 200) {
        this.quizesList = res.data
      }
    });
  }
  checkResult(id:string){
    this.route.navigate(['/quiz/result', id]);

  }

  deleteQuiz(id: string) {
    const ids: any = {
      ids: [id]
    }
    this.quizService.deleteQuiz(ids).subscribe((res) => {
      if (res.statusCode === 200) {
        this.getAllQuizes();

      }
    });
  }

  viewQuiz(id: string) {
    this.route.navigate(['/quiz/view', id]);

  }
  copyLink(id:string){
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = `${environment.urlDomain}/fill/${id}`;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
  }
}
