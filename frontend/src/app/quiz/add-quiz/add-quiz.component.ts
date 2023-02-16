import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { QuizService } from "src/app/Shared/Service/quiz.service";
import { SnacbarService } from "src/app/Shared/Service/snacbar.service";

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {
  title = "Nested FormArray Example Add Form Fields Dynamically";

  empForm: FormGroup;

  constructor(private fb: FormBuilder, private quizService: QuizService, private snackBar: SnacbarService,
    private router: Router,) {
    this.empForm = this.fb.group({
      quiz_title: new FormControl('', [Validators.required]),
      questions: this.fb.array([this.newQuestion()], [Validators.required])
    });
  }

  questions(): FormArray {
    return this.empForm.get("questions") as FormArray;
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      question: new FormControl('', [Validators.required]),
      options: this.fb.array([this.newOption()], [Validators.required])
    });
  }
  ngOnInit(): void {

  }

  addQuestion() {
    console.log("Adding a Question");
    this.questions().push(this.newQuestion());
  }

  removeQuestion(empIndex: number) {
    this.questions().removeAt(empIndex);
  }

  questionOptions(empIndex: number): FormArray {
    return this.questions()
      .at(empIndex)
      .get("options") as FormArray;
  }

  newOption(): FormGroup {
    return this.fb.group({
      text: new FormControl(),
      isCorrect: new FormControl(false),
    });
  }

  addQuestionOption(empIndex: number) {
    this.questionOptions(empIndex).push(this.newOption());
  }

  removeQuestionOption(empIndex: number, optionIndex: number) {
    this.questionOptions(empIndex).removeAt(optionIndex);
  }

  onSubmit() {
    console.log(this.empForm.value);
    if (this.empForm.valid) {
      this.quizService.addQuiz(this.empForm.value).subscribe((res) => {
        if (res.statusCode === 200) {
          this.router.navigate(['/quiz/list']);
          this.snackBar.open("Thank You for adding this quiz", 'X')
        }
      });
    } else {
      this.snackBar.open("Please fill all the details", 'X'
      );
    }


  }
  onLogout() {
    localStorage.clear()
    this.router.navigate([''])
  }
  isChecked: any = false;

  onChange($event: Event) {
    console.log($event);
    console.log("value changed");

  }
}

