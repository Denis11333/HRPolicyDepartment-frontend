import { Component, Input } from '@angular/core';
import { Vacancy } from '../../models/vacancy/vacancy';
import { VacancyAnswerService } from '../../services/vacancy-answer.service';
import {
  AppearanceAnimation,
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
} from '@costlydeveloper/ngx-awesome-popup';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vacancy-with-answer',
  templateUrl: './vacancy-with-answers.component.html',
  styleUrls: ['./vacancy-with-answers.component.scss'],
})
export class VacancyWithAnswersComponent {
  @Input() vacancy: Vacancy;

  constructor(
    private vacancyAnswersService: VacancyAnswerService,
    private toastr: ToastrService,
  ) {
  }

  deleteAnswer(answerId: number) {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setMessage('Чи дійсно ви хоче видалити даний відгук на вакансію?');

    newConfirmBox.setButtonLabels('Так', 'Ні');

    newConfirmBox.setConfig({
      layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
      animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    });

    // Simply open the popup
    newConfirmBox.openConfirmBox$().subscribe((result) => {
      if (result.success) {
        this.vacancyAnswersService.deleteAnswer(answerId).pipe(
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
        ).subscribe(() => this.toastr.success('Відгук видалено.', 'Успіх'));
      }
    });
  }
}
