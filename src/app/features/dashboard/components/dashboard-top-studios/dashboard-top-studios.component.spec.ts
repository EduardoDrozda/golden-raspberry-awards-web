import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTopStudiosComponent } from './dashboard-top-studios.component';
import { StudioWithWinnersModel } from '@features/dashboard/models';
import { By } from '@angular/platform-browser';

describe('DashboardTopStudiosComponent', () => {
  let component: DashboardTopStudiosComponent;
  let fixture: ComponentFixture<DashboardTopStudiosComponent>;

  const mockTopStudios: StudioWithWinnersModel = {
    studios: [
      { name: 'Studio A', winCount: 10 },
      { name: 'Studio B', winCount: 5 }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTopStudiosComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTopStudiosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('topStudios', mockTopStudios);
    fixture.componentRef.setInput('isLoading', false);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render top studios data', () => {
    fixture.componentRef.setInput('topStudios', mockTopStudios);
    fixture.componentRef.setInput('isLoading', false);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Studio A');
    expect(text).toContain('Studio B');
    expect(text).toContain('10');
    expect(text).toContain('5');
  });

  it('should show loader when isLoading is true', () => {
    fixture.componentRef.setInput('topStudios', mockTopStudios);
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('.loader'));
    expect(loader).toBeTruthy();
  });
});
