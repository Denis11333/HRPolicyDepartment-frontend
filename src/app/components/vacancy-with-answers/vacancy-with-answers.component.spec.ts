import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyWithAnswersComponent } from './vacancy-with-answers.component';

describe('VacancyAnswerComponent', () => {
  let component: VacancyWithAnswersComponent;
  let fixture: ComponentFixture<VacancyWithAnswersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacancyWithAnswersComponent]
    });
    fixture = TestBed.createComponent(VacancyWithAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
