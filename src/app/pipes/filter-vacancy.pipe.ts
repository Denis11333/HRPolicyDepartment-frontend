import { Pipe, PipeTransform } from '@angular/core';
import { Vacancy } from '../models/vacancy/vacancy';

@Pipe({
  name: 'filterVacancy'
})
export class FilterVacancyPipe implements PipeTransform {

  transform(vacancies: Vacancy[], structureName: string): Vacancy[] {
    if(structureName.length === 0) return vacancies
    return vacancies.filter(vacancy => vacancy.structureName.toLowerCase().includes(structureName.toLowerCase()));
  }

}
