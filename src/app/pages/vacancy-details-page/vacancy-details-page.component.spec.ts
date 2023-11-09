import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyDetailsPageComponent } from './vacancy-details-page.component';

describe('VacancyDetailsPageComponent', () => {
  let component: VacancyDetailsPageComponent;
  let fixture: ComponentFixture<VacancyDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacancyDetailsPageComponent]
    });
    fixture = TestBed.createComponent(VacancyDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
