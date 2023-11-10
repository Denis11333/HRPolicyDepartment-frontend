import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVacancyModalComponent } from './my-vacancy-modal.component';

describe('MyVacancyModalComponent', () => {
  let component: MyVacancyModalComponent;
  let fixture: ComponentFixture<MyVacancyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyVacancyModalComponent]
    });
    fixture = TestBed.createComponent(MyVacancyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
