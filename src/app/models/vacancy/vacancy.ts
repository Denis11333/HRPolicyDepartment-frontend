import { VacancyAnswer } from '../vacancy-answer/vacancy-answer';

export interface Vacancy {
  id: number;
  structureName: string;
  position: string,
  answers: VacancyAnswer[]
}

