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
import { catchError, throwError } from 'rxjs';

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
      structureName: [this.vacancy.structureName, [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      position: [this.vacancy.position, [Validators.required, Validators.minLength(5), Validators.maxLength(45)]],
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
      this.toastr.clear()

      this.displayErrorIfPresent('structureName', 'required', 'Структура - обов\'язкове поле')
      this.displayErrorIfPresent('structureName', 'minlength', 'Назва структури має бути мінімум з 5 символів')
      this.displayErrorIfPresent('structureName', 'maxlength', 'Назва структури має бути не більше 35 символів')

      this.displayErrorIfPresent('position', 'required', 'Посада - обов\'язкове поле')
      this.displayErrorIfPresent('position', 'minlength', 'Назва вакансії має бути мінімум з 5 символів')
      this.displayErrorIfPresent('position', 'maxlength', 'Назва посади має бути не більше 45 символів')

      return;
    }

    this.vacancyService.editMyVacancy(this.vacancy.id, this.vacancyForm.value).pipe(
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
    ).subscribe(() => this.toastr.info('Вакансія була змінена.'));

    this.dismissModal();
  }

  private displayErrorIfPresent(controlName: string, errorType: string, errorMessage: string): void {
    const control = this.vacancyForm.get(controlName);

    if (control?.hasError(errorType)) {
      this.toastr.error(errorMessage, 'Помилка');
    }
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
        this.vacancyService.deleteMyVacancy(this.vacancy.id).pipe(
          catchError((error) => {
            this.toastr.error(error.error.message);
            return throwError(error);
          }),
        ).subscribe(() => this.toastr.success('Вакансія була видалена.', 'Успіх'));
      }
    });
  }
}
