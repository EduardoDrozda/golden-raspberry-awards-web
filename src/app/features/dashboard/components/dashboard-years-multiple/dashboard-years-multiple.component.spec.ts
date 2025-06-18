import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardYearsMultipleComponent } from './dashboard-years-multiple.component';
import { WinnersByYearModel } from '@features/dashboard/models';
import { By } from '@angular/platform-browser';

describe('DashboardYearsMultipleComponent', () => {
  let component: DashboardYearsMultipleComponent;
  let fixture: ComponentFixture<DashboardYearsMultipleComponent>;

  const mockWinners: WinnersByYearModel = {
    years: [
      { year: 1986, winnerCount: 2 },
      { year: 1991, winnerCount: 3 }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardYearsMultipleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardYearsMultipleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('winnersByYear', mockWinners);
    fixture.componentRef.setInput('isLoading', false);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render list of years with winner counts', () => {
    fixture.componentRef.setInput('winnersByYear', mockWinners);
    fixture.componentRef.setInput('isLoading', false);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('1986');
    expect(text).toContain('1991');
    expect(text).toContain('2');
    expect(text).toContain('3');
  });

  it('should show loader when isLoading is true', () => {
    fixture.componentRef.setInput('winnersByYear', mockWinners);
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('.loader'));
    expect(loader).toBeTruthy();
  });
});
