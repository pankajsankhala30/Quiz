import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  store(key: string, data: any) {
    localStorage.setItem(key, data);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
