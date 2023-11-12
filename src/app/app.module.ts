import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideAnimations, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SliderComponent } from './components/slider/slider.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CarouselModule } from '@coreui/angular';
import { NgOptimizedImage } from '@angular/common';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FooterComponent } from './components/footer/footer.component';
import { VacancyComponent } from './components/vacancy/vacancy.component';
import { VacanciesPageComponent } from './pages/vacancies-page/vacancies-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { VacancyDetailsPageComponent } from './pages/vacancy-details-page/vacancy-details-page.component';
import { MyVacanciesPageComponent } from './pages/my-vacancies-page/my-vacancies-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MyVacancyComponent } from './components/my-vacancy/my-vacancy.component';
import { VacancyWithAnswersComponent } from './components/vacancy-with-answers/vacancy-with-answers.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { UnauthorizedHandlerService } from './services/errors/unauthorized-handler.service';
import {
  ConfirmBoxConfigModule,
  DialogConfigModule,
  NgxAwesomePopupModule,
  ToastNotificationConfigModule,
} from '@costlydeveloper/ngx-awesome-popup';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    NavigationComponent,
    SliderComponent,
    MainPageComponent,
    AboutPageComponent,
    ContactsPageComponent,
    FooterComponent,
    VacancyComponent,
    VacanciesPageComponent,
    VacancyDetailsPageComponent,
    MyVacanciesPageComponent,
    MyVacancyComponent,
    VacancyWithAnswersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    CarouselModule,
    NgOptimizedImage,
    GoogleMapsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxAwesomePopupModule.forRoot({
      colorList: {
        success: '#3caea3', // optional
        info: '#2f8ee5', // optional
        warning: '#ffc107', // optional
        danger: '#e46464', // optional
        customOne: '#3ebb1a', // optional
        customTwo: '#bd47fa', // optional (up to custom five)
      },
    }),
    ConfirmBoxConfigModule.forRoot(),

    DialogConfigModule.forRoot(), // optional
    ToastNotificationConfigModule.forRoot(), // optional
  ],
  providers: [
    provideAnimations(),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      enableHtml: true,
    }),
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: ErrorHandler, useClass: UnauthorizedHandlerService}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
