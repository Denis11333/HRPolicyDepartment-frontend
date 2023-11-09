import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanciesPageComponent } from './vacancies-page.component';

describe('VacanciesComponent', () => {
  let component: VacanciesPageComponent;
  let fixture: ComponentFixture<VacanciesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacanciesPageComponent]
    });
    fixture = TestBed.createComponent(VacanciesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
