import { Component, Input } from '@angular/core';
import { Vacancy } from '../../models/vacancy/vacancy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { VacancyAnswerService } from '../../services/vacancy-answer.service';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent {
  @Input() vacancy : Vacancy
  vacancyForm: FormGroup;

  constructor(private modalService: NgbModal,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private vacancyAnswerService: VacancyAnswerService) {
    this.vacancyForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required, Validators.minLength(6)]],
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
      if (this.vacancyForm.get('structure')?.hasError('required')) {
        this.toastr.error('Вказувати структуру - обов\'язково', 'Помилка');
      }

      if (this.vacancyForm.get('structure')?.hasError('minlength')) {
        this.toastr.error('Структура має бути мінімум з 5 символів', 'Помилка');
      }

      if (this.vacancyForm.get('position')?.hasError('required')) {
        this.toastr.error('Вакансія - обов\'язкове поле', 'Помилка');
      }

      if (this.vacancyForm.get('position')?.hasError('minlength')) {
        this.toastr.error('Назва вакансії має бути мінімум з 6 символів', 'Помилка');
      }

      return;
    }

    this.vacancyAnswerService.createAnswer({...this.vacancyForm.value,vacancyId: this.vacancy.id})

    this.dismissModal();
  }
}
