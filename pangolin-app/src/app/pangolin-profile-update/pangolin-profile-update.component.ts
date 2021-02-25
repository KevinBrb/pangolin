import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pangolin-profile-update',
  templateUrl: './pangolin-profile-update.component.html',
  styleUrls: ['./pangolin-profile-update.component.scss']
})
export class PangolinProfileUpdateComponent implements OnInit {

  updateForm: FormGroup;
  id: any;
  retrievedInfos: any;
  currentProfile: any = {
    login: '',
    description: '',
    age: '',
    food: '',
    race: '',
    species: '',
    friends: ''
  };

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.updateForm = this.fb.group({
      login: [''],
      description: [''],
      food: [''],
      email: [''],
      age: [],
    });
    this.retrievedInfos = JSON.parse(localStorage.getItem('currentUser')!);
    this.id = this.retrievedInfos._id;
    this.getMyAccount();
  }

  ngOnInit(): void {
  }

  updatePangolin() {
    this.authService.update(this.id, this.updateForm.value).subscribe((res) => {
      if (res) {
        this.router.navigate([`my-account`], { queryParams: { id: this.id } });
      }
    })
  }
  
  getMyAccount(): void {
    this.authService.getMyAccount(this.id).subscribe(
      data => {
        console.log(data.body)
        this.currentProfile = data.body;
      },
      error => {
        console.log(error);
      });
  }

}
