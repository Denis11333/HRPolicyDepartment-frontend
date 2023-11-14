import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VacancyService } from '../../services/vacancy.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-my-vacancies-page',
  templateUrl: './my-vacancies-page.component.html',
  styleUrls: ['./my-vacancies-page.component.scss'],
})
export class MyVacanciesPageComponent {
  vacancyCreateForm: FormGroup;
  isLoading = true;

  constructor(private modalService: NgbModal,
              private toastr: ToastrService,
              private fb: FormBuilder,
              public vacancyService: VacancyService) {
    this.vacancyCreateForm = this.fb.group({
      structureName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      position: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(45)]],
    });

    this.vacancyService.getMyVacancies().pipe(
      catchError((error) => {
        this.toastr.error(error.error.message);
        return throwError(error);
      }),
    ).subscribe();

    this.isLoading = false;
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  dismissModal() {
    this.modalService.dismissAll();
  }

  confirm() {
    if (this.vacancyCreateForm.invalid) {
      this.toastr.clear()

      this.displayErrorIfPresent('structureName', 'required', 'Структура - обов\'язкове поле')
      this.displayErrorIfPresent('structureName', 'minlength', 'Назва структури має бути мінімум з 5 символів')
      this.displayErrorIfPresent('structureName', 'maxlength', 'Назва структури має бути не більше 35 символів')

      this.displayErrorIfPresent('position', 'required', 'Посада - обов\'язкове поле')
      this.displayErrorIfPresent('position', 'minlength', 'Назва вакансії має бути мінімум з 5 символів')
      this.displayErrorIfPresent('position', 'maxlength', 'Назва посади має бути не більше 45 символів')

      return;
    }

    this.vacancyService.createVacancy(this.vacancyCreateForm.value).pipe(
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
    ).subscribe(() => this.toastr.success('Вакансія створена.', 'Успіх'));

    this.vacancyCreateForm.reset()

    this.dismissModal();
  }

  private displayErrorIfPresent(controlName: string, errorType: string, errorMessage: string): void {
    const control = this.vacancyCreateForm.get(controlName);

    if (control?.hasError(errorType)) {
      this.toastr.error(errorMessage, 'Помилка');
    }
  }
}
