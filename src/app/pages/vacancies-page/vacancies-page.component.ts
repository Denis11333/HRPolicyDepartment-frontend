import { Component } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies-page.component.html',
  styleUrls: ['./vacancies-page.component.scss'],
})
export class VacanciesPageComponent {
  isLoading = true;
  searchByStructureName  = ''

  constructor(public vacancyService: VacancyService,
              private toastr: ToastrService) {
    this.vacancyService.getVacancies().pipe(
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
    ).subscribe();

    this.isLoading = false;
  }

}
