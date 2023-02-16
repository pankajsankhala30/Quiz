import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultComponent } from '../result/result.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizComponent } from './quiz.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { ViewQuizComponent } from './view-quiz/view-quiz.component';


const routes: Routes = [
  {
    path: '',
    component: QuizComponent
  },
  {
    path: 'list',
    component: QuizComponent
  },
  {
    path: 'add',
    component: AddQuizComponent,
  },
  {
    path: 'view/:id',
    component: ViewQuizComponent,
  },
  {
    path: 'fill/:id',
    component: TakeQuizComponent,
  },
  {
    path: 'result/:id',
    component: ResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
