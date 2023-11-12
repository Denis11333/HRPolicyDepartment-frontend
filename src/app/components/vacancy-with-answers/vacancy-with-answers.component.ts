import { Component, Input } from '@angular/core';
import { Vacancy } from '../../models/vacancy/vacancy';
import { VacancyAnswerService } from '../../services/vacancy-answer.service';

@Component({
  selector: 'app-vacancy-with-answer',
  templateUrl: './vacancy-with-answers.component.html',
  styleUrls: ['./vacancy-with-answers.component.scss']
})
export class VacancyWithAnswersComponent {
  @Input() vacancy: Vacancy

  constructor(
    private vacancyAnswersService : VacancyAnswerService
  ) {
  }

  deleteAnswer(answerId: number){
    this.vacancyAnswersService.deleteVacancy(answerId)
  }
}
