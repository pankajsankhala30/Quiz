import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { secure_api_routes } from '../configs/apiConfig';
import { CREATOR_LOGIN, CREATOR_SIGNUP, CREATOR_SIGNUP_RESPONSE } from '../modal/creator.modal';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {

  constructor(private http: HttpClient,) { }
  createCreator(data: CREATOR_SIGNUP) {
    return this.http.post<CREATOR_SIGNUP_RESPONSE>(
      secure_api_routes.CREATOR_SIGN_UP,
      data
    );
  }
  loginCreator(data: CREATOR_LOGIN) {
    return this.http.post<CREATOR_SIGNUP_RESPONSE>(
      secure_api_routes.CREATOR_LOGIN,
      data
    );
  }
}
