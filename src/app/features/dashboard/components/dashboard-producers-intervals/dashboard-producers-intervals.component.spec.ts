import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProducersIntervalsComponent } from './dashboard-producers-intervals.component';

describe('DashboardProducersIntervalsComponent', () => {
  let component: DashboardProducersIntervalsComponent;
  let fixture: ComponentFixture<DashboardProducersIntervalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProducersIntervalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProducersIntervalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
