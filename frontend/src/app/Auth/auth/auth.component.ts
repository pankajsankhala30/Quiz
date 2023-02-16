import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CREATOR_SIGNUP } from 'src/app/Shared/modal/creator.modal';
import { CreatorService } from 'src/app/Shared/Service/creator.service';
import { SnacbarService } from 'src/app/Shared/Service/snacbar.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  formGroup: FormGroup;
  isLoading: Boolean = false;

  constructor(public route: Router,
    private creatorService: CreatorService,
    private snackBar: SnacbarService) { }

  ngOnInit(): void {
    this.initReactiveForm();
  }

  get form() {
    return this.formGroup.controls;
  }

  initReactiveForm() {
    this.formGroup = new FormGroup({
      'firstname': new FormControl('', [Validators.required]),
      'lastname': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      'password': new FormControl('', [Validators.required])
    })
  }

  submitForm() {
    if (this.formGroup.valid) {
      const creatorData: CREATOR_SIGNUP = {
        firstname: this.form.firstname.value,
        lastname: this.form.lastname.value,
        password: this.form.password.value,
        email: this.form.email.value
      }
      this.isLoading = true;
      this.creatorService.createCreator(creatorData).subscribe((res) => {
        if (res.statusCode === 200) {
          this.snackBar.open("account created successfully");
          this.route.navigate(['/auth/login']);
          this.isLoading = false;
        } 
        else if(res.statusCode === 409){
          this.snackBar.open("email already exists");
        }
        
        else {
          this.snackBar.open("error", 'X'
          );
        }
      });
    }
    else {
      this.snackBar.open("Please fill all the details", 'X')
    }

  }

}
