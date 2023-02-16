import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnacbarService {
  constructor(
    private snackBar: MatSnackBar,
  ) { }
  open(
    message: string,
    action: string = 'x',
    duration: number = 10000,  // for 10 seconds 
  ) {
    this.snackBar.open(message, action, {
      duration,
    });
  }
}