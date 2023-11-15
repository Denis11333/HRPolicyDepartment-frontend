import { Component, Input } from '@angular/core';
import { Vacancy } from '../../models/vacancy/vacancy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { VacancyAnswerService } from '../../services/vacancy-answer.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss'],
})
export class VacancyComponent {
  @Input() vacancy: Vacancy;
  @Input() first = false;
  @Input() last = false;
  vacancyForm: FormGroup;

  constructor(private modalService: NgbModal,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private vacancyAnswerService: VacancyAnswerService) {
    this.vacancyForm = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(35)]],
      fullName: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(35)]],
    });

  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  dismissModal() {
    this.modalService.dismissAll();
  }

  confirm() {
    if (this.vacancyForm.invalid) {
      this.toastr.clear();

      this.displayErrorIfPresent('phone', 'required', 'Номер телефону - обов\'язкове поле');
      this.displayErrorIfPresent('phone', 'minlength', 'Номер телефону  має бути мінімум з 5 символів');
      this.displayErrorIfPresent('phone', 'maxlength', 'Номер телефону  має бути не більше 15 символів');

      this.displayErrorIfPresent('email', 'required', 'Електрона пошта - обов\'язкове поле');
      this.displayErrorIfPresent('email', 'minlength', 'Електрона пошта має бути мінімум з 10 символів');
      this.displayErrorIfPresent('email', 'maxlength', 'Електрона пошта має бути не більше 35 символів');

      this.displayErrorIfPresent('fullName', 'required', 'ПІБ - обов\'язкове поле');
      this.displayErrorIfPresent('fullName', 'minlength', 'ПІБ має бути мінімум з 10 символів');
      this.displayErrorIfPresent('fullName', 'maxlength', 'ПІБ має бути не більше 35 символів');

      return;
    }

    this.vacancyAnswerService.createAnswer({ ...this.vacancyForm.value, phone: '+' + String(this.vacancyForm.get('phone')?.value) , vacancyId: this.vacancy.id }).pipe(
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
    ).subscribe(
      () => {
        this.toastr.success('Відгук був відправлений.', 'Успіх');
        this.vacancyForm.reset();
        this.dismissModal();
      },
    );
  }

  private displayErrorIfPresent(controlName: string, errorType: string, errorMessage: string): void {
    const control = this.vacancyForm.get(controlName);

    if (control?.hasError(errorType)) {
      this.toastr.error(errorMessage, 'Помилка');
    }
  }

}
