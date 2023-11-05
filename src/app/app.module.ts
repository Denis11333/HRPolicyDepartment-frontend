import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {provideToastr, ToastrModule} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    provideAnimations(),
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      enableHtml: true
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
