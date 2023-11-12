import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Vacancy } from '../models/vacancy/vacancy';
import { VacancyAnswer } from '../models/vacancy-answer/vacancy-answer';
import { VacancyAnswerCreateDto } from '../models/vacancy-answer/vacancy-answer-create.dto';


@Injectable({
  providedIn: 'root',
})
export class VacancyAnswerService {
  vacancy: Vacancy;

  constructor(private http: HttpClient) {
  }

  createAnswer(answer: VacancyAnswerCreateDto) {
    return this.http.post<VacancyAnswer>(`${environment.apiUrl}/vacancy-answer`, answer).pipe(
      tap(answer => this.vacancy.answers.push(answer)),
    ).subscribe();
  }

  deleteVacancy(answerId: number) {
    return this.http.delete(`${environment.apiUrl}/vacancy-answer/${answerId}`).pipe(
      tap(() => {
        const answerIndex = this.vacancy.answers.findIndex(answer =>  answer.id === answerId)
        this.vacancy.answers.splice(answerIndex, 1)
      })).subscribe();
  }

  getVacancyWithAnswers(vacancyId: string) {
    return this.http.get<Vacancy>(`${environment.apiUrl}/vacancies/${vacancyId}`).pipe(
      tap(vacancy => this.vacancy = vacancy),
    ).subscribe();
  }
}
