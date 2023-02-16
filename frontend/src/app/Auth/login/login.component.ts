import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CREATOR_LOGIN, CREATOR_SIGNUP } from 'src/app/Shared/modal/creator.modal';
import { CreatorService } from 'src/app/Shared/Service/creator.service';
import { LocalstorageService } from 'src/app/Shared/Service/localstorage.service';
import { QuizService } from 'src/app/Shared/Service/quiz.service';
import { SnacbarService } from 'src/app/Shared/Service/snacbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  isLoading: Boolean = false;

  constructor(private quizService: QuizService, public route: Router,
    private creatorService: CreatorService,
    private localstorageService: LocalstorageService,
    private snackBar: SnacbarService,
  ) { }

  ngOnInit(): void {
    this.initReactiveForm();
  }

  get form() {
    return this.formGroup.controls;
  }

  initReactiveForm() {
    this.formGroup = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      'password': new FormControl('', [Validators.required])
    })
  }

  submitForm() {
    if (this.formGroup.valid) {
      const creatorData: CREATOR_LOGIN = {
        password: this.form.password.value,
        email: this.form.email.value
      }
      this.isLoading = true;
      this.creatorService.loginCreator(creatorData).subscribe((res) => {
        if (res.statusCode === 200) {
          this.localstorageService.store("accountid", res.accountid)
          this.route.navigate(['/quiz']);
          this.isLoading = false;
        } else {
          this.snackBar.open("error", 'X'
          );
        }
      });
    }
    else {
      this.snackBar.open("Please fill all the details", 'X'
      );
    }

  }
}
