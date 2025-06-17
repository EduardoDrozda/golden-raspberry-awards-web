import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWinnerByYearComponent } from './dashboard-winner-by-year.component';

describe('DashboardWinnerByYearComponent', () => {
  let component: DashboardWinnerByYearComponent;
  let fixture: ComponentFixture<DashboardWinnerByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardWinnerByYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardWinnerByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
