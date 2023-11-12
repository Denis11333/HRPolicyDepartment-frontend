import { Component, OnInit } from '@angular/core';
import { VacancyAnswerService } from '../../services/vacancy-answer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vacancy-details-page',
  templateUrl: './vacancy-details-page.component.html',
  styleUrls: ['./vacancy-details-page.component.scss'],
})
export class VacancyDetailsPageComponent implements OnInit {
  vacancyId: string | null
  isLoading = true

  constructor(public vacancyAnswerService : VacancyAnswerService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.vacancyId = this.route.snapshot.paramMap.get('id')

    if(this.vacancyId !== null) {
      this.vacancyAnswerService.getVacancyWithAnswers(this.vacancyId)
    }else{
      this.router.navigate(['/my-vacancies'])
    }
  }
}
