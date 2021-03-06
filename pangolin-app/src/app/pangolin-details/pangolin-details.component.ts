import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-pangolin-details',
  templateUrl: './pangolin-details.component.html',
  styleUrls: ['./pangolin-details.component.scss']
})
export class PangolinDetailsComponent implements OnInit {
  
  retrievedAccountInfos: any;
  currentProfile: any = {
    login: '',
    description: '',
    age: '',
    food: '',
    race: '',
    species: '',
    friends: ''
  };
  id: any;
  friendAdded = false;
  login: any;

  constructor(
    public authService: AuthService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.retrievedAccountInfos = JSON.parse(localStorage.getItem('currentUser')!);
    this.checkIfFriend();
    this.updateLocalStorage();
  }

  ngOnInit(): void {
    this.getDetails();
    this.checkIfFriend();
  }

  getDetails(): void {
    this.authService.getAccount(this.route.snapshot.params.id).subscribe(
      data => {
        this.currentProfile = data;
        this.currentProfile.friends = this.currentProfile.friends.length;
      },
      error => {
        console.log(error);
    });
  }

  checkIfFriend(): void {
    setTimeout(() => {
      for (const friend of this.retrievedAccountInfos.friends){
        if(friend.id === this.route.snapshot.url[1].path) {
          this.friendAdded = true;
        }
      } 
    }, 100)
  }

  updateLocalStorage(): void {
    this.authService.getUserProfile(this.retrievedAccountInfos._id).subscribe((res) => {
      localStorage.setItem('currentUser', JSON.stringify(res));
    });
  }

  addFriend(): void {
    this.currentProfile.idAccount = this.retrievedAccountInfos._id;
    this.authService.updateFriend(this.currentProfile).subscribe((res) => {
      if (res) {
        this.updateLocalStorage();
        this.router.navigate(['/pangolins']);
      }
    });
  }

  deleteFriend(): void {
    this.currentProfile.idAccount = this.retrievedAccountInfos._id;
    this.authService.deleteFriend(this.currentProfile).subscribe((res) => {
      if (res) {
        this.updateLocalStorage();
        this.router.navigate(['/pangolins']);
      }
    });
  }
}
