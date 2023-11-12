import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VacancyService } from '../../services/vacancy.service';

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
      structure: ['', [Validators.required, Validators.minLength(5)]],
      position: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.vacancyService.getMyVacancies();

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
      if (this.vacancyCreateForm.get('structure')?.hasError('required')) {
        this.toastr.error('Вказувати структуру - обов\'язково', 'Помилка');
      }

      if (this.vacancyCreateForm.get('structure')?.hasError('minlength')) {
        this.toastr.error('Структура має бути мінімум з 5 символів', 'Помилка');
      }

      if (this.vacancyCreateForm.get('position')?.hasError('required')) {
        this.toastr.error('Вакансія - обов\'язкове поле', 'Помилка');
      }

      if (this.vacancyCreateForm.get('position')?.hasError('minlength')) {
        this.toastr.error('Назва вакансії має бути мінімум з 6 символів', 'Помилка');
      }

      return;
    }

    console.log(this.vacancyCreateForm.get('structure')?.value,
      this.vacancyCreateForm.get('position')?.value);

    this.vacancyService.createVacancy({
        structureName: this.vacancyCreateForm.get('structure')?.value,
        position: this.vacancyCreateForm.get('position')?.value,
      },
    );

    this.vacancyCreateForm.get('structure')?.setValue('');
    this.vacancyCreateForm.get('position')?.setValue('');

    this.dismissModal();
  }
}
