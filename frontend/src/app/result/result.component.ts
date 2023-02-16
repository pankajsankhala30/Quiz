import { Component, OnInit } from '@angular/core';
import { QuizService } from '../Shared/Service/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  results=[];
  quizId:string;
  dataSource = new MatTableDataSource();

  constructor(public quizService: QuizService, private router: Router,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['id'];
this.getResult(this.quizId);
  }
  getResult(id:string){
    this.quizService.getResult(id).subscribe((res) => {
      if (res.statusCode === 200) {
        this.results = res.data;
        console.log(this.results)
this.dataSource =  new MatTableDataSource(this.results);

      }
    });
  }

  displayedColumns = ['username', 'email',  'score', 'answeredAt'];
  onLogout(){
    localStorage.clear()
this.router.navigate([''])
  }
}


