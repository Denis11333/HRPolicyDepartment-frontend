import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {RegistrationPageComponent} from './pages/registration-page/registration-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {provideToastr, ToastrModule} from "ngx-toastr";
import {provideAnimations, BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavigationComponent} from './components/navigation/navigation.component';
import {SliderComponent} from './components/slider/slider.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {CarouselModule} from '@coreui/angular';
import {NgOptimizedImage} from "@angular/common";
import {AboutPageComponent} from './pages/about-page/about-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FooterComponent } from './components/footer/footer.component';
import { VacancyComponent } from './components/vacancy/vacancy.component';
import { VacanciesPageComponent } from './pages/vacancies-page/vacancies-page.component'
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { VacancyDetailsPageComponent } from './pages/vacancy-details-page/vacancy-details-page.component';
import { VacancyDetailsComponent } from './components/vacancy-details/vacancy-details.component';
import { MyVacanciesPageComponent } from './pages/my-vacancies-page/my-vacancies-page.component';
import { HttpClientModule } from '@angular/common/http';


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
    VacancyDetailsComponent,
    MyVacanciesPageComponent,
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
  ],
  providers: [
    provideAnimations(),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      enableHtml: true
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
