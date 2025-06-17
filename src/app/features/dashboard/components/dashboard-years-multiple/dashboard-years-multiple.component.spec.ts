import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardYearsMultipleComponent } from './dashboard-years-multiple.component';

describe('DashboardYearsMultipleComponent', () => {
  let component: DashboardYearsMultipleComponent;
  let fixture: ComponentFixture<DashboardYearsMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardYearsMultipleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardYearsMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
