import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Vacancy } from '../models/vacancy/vacancy';
import { VacancyCreateDto } from '../models/vacancy/vacancy-create.dto';
import { VacancyUpdateDto } from '../models/vacancy/vacancy-update.dto';


@Injectable({
  providedIn: 'root',
})
export class VacancyService {
  vacancies: Vacancy[] = [];
  myVacancies: Vacancy[] = [];

  constructor(private http: HttpClient) {
  }

  createVacancy(vacancy: VacancyCreateDto) {
    return this.http.post<Vacancy>(`${environment.apiUrl}/vacancies`, vacancy).pipe(
      tap(myVacancy => this.myVacancies.push(myVacancy)),
    );
  }

  getVacancies() {
    return this.http.get<Vacancy[]>(`${environment.apiUrl}/vacancies`).pipe(
      tap(vacancies => this.vacancies = vacancies),
    );
  }

  getMyVacancies() {
    return this.http.get<Vacancy[]>(`${environment.apiUrl}/vacancies/my`).pipe(
      tap(myVacancies => this.myVacancies = myVacancies),
    );
  }

  editMyVacancy(id: number, vacancyUpdateDto: VacancyUpdateDto) {
    return this.http.patch(`${environment.apiUrl}/vacancies/${id}`, { ...vacancyUpdateDto }).pipe(
      tap(() => {
        {
          const indexVacancy = this.myVacancies.findIndex(vacancy => vacancy.id === id);
          this.myVacancies[indexVacancy] = { id, ...vacancyUpdateDto } as Vacancy;
        }
      }),
    );
  }

  deleteMyVacancy(id: number){
    return this.http.delete(`${environment.apiUrl}/vacancies/${id}`).pipe(
      tap(() => {
        {
          const indexVacancy = this.myVacancies.findIndex(vacancy => vacancy.id === id);
          this.myVacancies.splice(indexVacancy, 1)
        }
      }),
    )
  }
}
