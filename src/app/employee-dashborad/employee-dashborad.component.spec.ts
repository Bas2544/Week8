import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDashboradComponent } from './employee-dashborad.component';

describe('EmployeeDashboradComponent', () => {
  let component: EmployeeDashboradComponent;
  let fixture: ComponentFixture<EmployeeDashboradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDashboradComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
