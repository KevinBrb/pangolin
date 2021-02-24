import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { PangolinsComponent } from './pangolins/pangolins.component';
import { AuthGuard } from './shared/auth.guard';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { PangolinProfileComponent } from './pangolin-profile/pangolin-profile.component';
import { PangolinProfileUpdateComponent } from './pangolin-profile-update/pangolin-profile-update.component';
import { PangolinDetailsComponent } from './pangolin-details/pangolin-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'pangolins', component: PangolinsComponent, canActivate: [AuthGuard] },
  { path: 'pangolins/:id', component: PangolinDetailsComponent, canActivate: [AuthGuard] },
  { path: 'my-account', component: PangolinProfileComponent, canActivate: [AuthGuard] },
  { path: 'my-account/update', component: PangolinProfileUpdateComponent, canActivate: [AuthGuard] }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
