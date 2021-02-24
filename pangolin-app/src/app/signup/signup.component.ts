import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      login: [''],
      description: [''],
      food: [''],
      species: [''],
      race: [''],
      email: [''],
      age: [],
      password: [''],
      passwordConfirm: ['']
    })
  }

  ngOnInit() { }

  registerPangolin() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res) {
        this.signupForm.reset()
        this.router.navigate(['signin']);
      }
    })
  }

}
