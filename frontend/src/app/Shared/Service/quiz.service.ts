import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { secure_api_routes } from '../configs/apiConfig';
import { QuestionModal } from '../modal/question.modal';
import { ADD_QUIZ, BULK_QUIZ_DELETE, SUBMIT_QUIZ } from '../modal/quiz.modal';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  questionData: QuestionModal[] = [];


  constructor(private http: HttpClient, public router: Router) {
  }


  getAllQuizes() {
    return this.http.get<any>(
      secure_api_routes.GET_ALL_QUIZES
    );
  }

  getAQuizById(id:string) {
    const url = `${secure_api_routes.GET_QUIZ_BY_ID}/${id}`;
    //const url =`${this.secure_api_routes.GET_TEAMS}/?id=${teamid}`
    return this.http.get<any>(url);
  }
  getAQuestionById(id:string) {
    const url = `${secure_api_routes.GET_QUESTIONS_BY_ID}/${id}`;
    //const url =`${this.secure_api_routes.GET_TEAMS}/?id=${teamid}`
    return this.http.get<any>(url);
  }


  addQuiz(data: ADD_QUIZ) {
    return this.http.post<any>(
      secure_api_routes.ADD_QUIZ,
      data
    );
  }
  submitQuiz(data: SUBMIT_QUIZ) {
    return this.http.post<any>(
      secure_api_routes.SUBMIT_QUIZ,
      data
    );
  }

  deleteQuiz(data: BULK_QUIZ_DELETE) {
    return this.http.patch<any>(
      secure_api_routes.DELETE_QUIZ,
      data
    );
  }

  getResult(id:string) {
    const url = `${secure_api_routes.GET_RESULT}/${id}`;
    //const url =`${this.secure_api_routes.GET_TEAMS}/?id=${teamid}`
    return this.http.get<any>(url);
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
