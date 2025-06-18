import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardProducersIntervalsComponent } from './dashboard-producers-intervals.component';
import { ProducerMaxWinIntervalModel } from '@features/dashboard/models';
import { By } from '@angular/platform-browser';

describe('DashboardProducersIntervalsComponent', () => {
  let component: DashboardProducersIntervalsComponent;
  let fixture: ComponentFixture<DashboardProducersIntervalsComponent>;

  const mockProducers: ProducerMaxWinIntervalModel = {
    max: [
      {
        producer: 'Producer A',
        interval: 10,
        previousWin: 1990,
        followingWin: 2000
      }
    ],
    min: [
      {
        producer: 'Producer B',
        interval: 1,
        previousWin: 2010,
        followingWin: 2011
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProducersIntervalsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardProducersIntervalsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('maxMinWinIntervalForProducers', mockProducers);
    fixture.componentRef.setInput('isLoading', false);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render max and min producers', () => {
    fixture.componentRef.setInput('maxMinWinIntervalForProducers', mockProducers);
    fixture.componentRef.setInput('isLoading', false);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Producer A');
    expect(text).toContain('Producer B');
    expect(text).toContain('1990');
    expect(text).toContain('2011');
  });

  it('should show loader when isLoading is true', () => {
    fixture.componentRef.setInput('maxMinWinIntervalForProducers', mockProducers);
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('.loader'));
    expect(loader).toBeTruthy();
  });
});
