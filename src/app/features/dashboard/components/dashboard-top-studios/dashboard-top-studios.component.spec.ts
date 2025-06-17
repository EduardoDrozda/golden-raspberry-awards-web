import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopStudiosComponent } from './dashboard-top-studios.component';

describe('DashboardTopStudiosComponent', () => {
  let component: DashboardTopStudiosComponent;
  let fixture: ComponentFixture<DashboardTopStudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTopStudiosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTopStudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
