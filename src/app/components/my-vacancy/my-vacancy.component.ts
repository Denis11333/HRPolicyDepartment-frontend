import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Vacancy } from '../../models/vacancy/vacancy';
import { VacancyService } from '../../services/vacancy.service';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation,
} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-my-vacancy',
  templateUrl: './my-vacancy.component.html',
  styleUrls: ['./my-vacancy.component.scss'],
})
export class MyVacancyComponent implements OnInit {
  @Input() vacancy: Vacancy;
  @Input() first = false;
  @Input() last = false;
  vacancyForm: FormGroup;

  constructor(private modalService: NgbModal,
              private toastr: ToastrService,
              private fb: FormBuilder,
              public vacancyService: VacancyService) {
  }

  ngOnInit() {
    this.vacancyForm = this.fb.group({
      structureName: [this.vacancy.structureName, [Validators.required, Validators.minLength(5)]],
      position: [this.vacancy.position, [Validators.required, Validators.minLength(6)]],
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
      if (this.vacancyForm.get('structureName')?.hasError('required')) {
        this.toastr.error('Вказувати структуру - обов\'язково', 'Помилка');
      }

      if (this.vacancyForm.get('structureName')?.hasError('minlength')) {
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

    this.vacancyService.editMyVacancy(this.vacancy.id, this.vacancyForm.value);

    this.dismissModal();
  }

  deleteMyVacancy() {
    this.openConfirmBox();
  }

  openConfirmBox() {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setMessage('Чи дійсно ви хоче видалити дану вакансію та зупинити пошук кандидатів?');

    newConfirmBox.setButtonLabels('Так', 'Ні')

    newConfirmBox.setConfig({
      layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
      animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    });

    // Simply open the popup
    newConfirmBox.openConfirmBox$().subscribe((result) => {
      if (result.success) {
        this.vacancyService.deleteMyVacancy(this.vacancy.id);
      }
    });
  }
}
