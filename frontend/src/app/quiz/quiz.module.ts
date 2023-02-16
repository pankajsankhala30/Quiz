import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { MaterialModule } from '../material.module';
import { ViewQuizComponent } from './view-quiz/view-quiz.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ViewQuizComponent, TakeQuizComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class QuizModule { }
