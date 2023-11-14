import { Component, OnInit } from '@angular/core';
import { VacancyAnswerService } from '../../services/vacancy-answer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
              private router: Router,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.vacancyId = this.route.snapshot.paramMap.get('id')

    if(this.vacancyId !== null) {
      this.vacancyAnswerService.getVacancyWithAnswers(this.vacancyId).pipe(
        catchError((error) => {
          this.toastr.clear()

          const errorMessages = Array.isArray(error.error.message)
            ? error.error.message
            : [error.error.message];

          errorMessages.forEach((message: string) => {
            this.toastr.error(message);
          });
          return throwError(error);
        }),
      ).subscribe()
    }else{
      this.router.navigate(['/my-vacancies'])
    }
  }
}
