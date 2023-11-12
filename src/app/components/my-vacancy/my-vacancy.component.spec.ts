import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVacancyComponent } from './my-vacancy.component';

describe('MyVacancyComponent', () => {
  let component: MyVacancyComponent;
  let fixture: ComponentFixture<MyVacancyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyVacancyComponent]
    });
    fixture = TestBed.createComponent(MyVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
