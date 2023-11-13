import { Component } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies-page.component.html',
  styleUrls: ['./vacancies-page.component.scss'],
})
export class VacanciesPageComponent {
  isLoading = true;
  searchByStructureName  = ''

  constructor(public vacancyService: VacancyService) {
    this.vacancyService.getVacancies();

    this.isLoading = false;
  }

}
