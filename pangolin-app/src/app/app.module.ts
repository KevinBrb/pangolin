import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { PangolinsComponent } from './pangolins/pangolins.component';
import { AuthconfigInterceptor } from './shared/authconfig.interceptor';
import { SignupComponent } from './signup/signup.component';
import { PangolinProfileComponent } from './pangolin-profile/pangolin-profile.component';
import { PangolinProfileUpdateComponent } from './pangolin-profile-update/pangolin-profile-update.component';
import { PangolinDetailsComponent } from './pangolin-details/pangolin-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    PangolinsComponent,
    SignupComponent,
    PangolinProfileComponent,
    PangolinProfileUpdateComponent,
    PangolinDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthconfigInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
