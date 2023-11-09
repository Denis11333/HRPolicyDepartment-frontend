import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent {
  @Input() vacancy : any
}
