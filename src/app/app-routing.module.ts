import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {AboutPageComponent} from "./pages/about-page/about-page.component";
import {ContactsPageComponent} from "./pages/contacts-page/contacts-page.component";
import { VacanciesPageComponent } from './pages/vacancies-page/vacancies-page.component';
import { VacancyDetailsPageComponent } from './pages/vacancy-details-page/vacancy-details-page.component';
import { MyVacanciesPageComponent } from './pages/my-vacancies-page/my-vacancies-page.component';

const routes: Routes = [
  {path:'login', component: LoginPageComponent},
  {path:'registration', component: RegistrationPageComponent},
  {path:'my-vacancies', component: MyVacanciesPageComponent},
  {path:'vacancies', component: VacanciesPageComponent},
  {path:'about', component: AboutPageComponent},
  {path:'contacts', component: ContactsPageComponent},
  {path:'vacancy-details/:id', component: VacancyDetailsPageComponent},
  {path:'', component: MainPageComponent},
  {path:'**', component: MainPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
