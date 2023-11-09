import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVacanciesPageComponent } from './my-vacancies-page.component';

describe('MyVacanciesPageComponent', () => {
  let component: MyVacanciesPageComponent;
  let fixture: ComponentFixture<MyVacanciesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyVacanciesPageComponent]
    });
    fixture = TestBed.createComponent(MyVacanciesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
