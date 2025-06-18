import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardWinnerByYearComponent } from './dashboard-winner-by-year.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieModel } from '@core/models';

describe('DashboardWinnerByYearComponent', () => {
  let component: DashboardWinnerByYearComponent;
  let fixture: ComponentFixture<DashboardWinnerByYearComponent>;

  const mockMovies: MovieModel[] = [
    {
      id: 1,
      title: 'Movie A',
      year: 2000,
      winner: true,
      studios: ['Studio A'],
      producers: ['Producer A']
    },
    {
      id: 2,
      title: 'Movie B',
      year: 2010,
      winner: false,
      studios: ['Studio B'],
      producers: ['Producer B']
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardWinnerByYearComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardWinnerByYearComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the submit button when form is invalid', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type="button"]')).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  it('should emit year when form is valid and submitted', () => {
    const year = new Date().getFullYear();
    const spy = spyOn(component.yearEmitter, 'emit');

    component.formGroup.setValue({ year });
    fixture.detectChanges();

    component.submitSeach();

    expect(component.formGroup.valid).toBeTrue();
    expect(spy).toHaveBeenCalledWith(year);
  });

  it('should not emit if form is invalid', () => {
    const spy = spyOn(component.yearEmitter, 'emit');

    component.formGroup.setValue({ year: 1800 }); // inválido
    fixture.detectChanges();

    component.submitSeach();

    expect(component.formGroup.valid).toBeFalse();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should render movie rows in table', () => {
    fixture.componentRef.setInput('movies', mockMovies);
    fixture.componentRef.setInput('isLoading', false);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Movie A');
    expect(text).toContain('Movie B');
    expect(text).toContain('2000');
    expect(text).toContain('2010');
  });

  it('should show loader when isLoading is true', () => {
    fixture.componentRef.setInput('movies', mockMovies);
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('.loader'));
    expect(loader).toBeTruthy();
  });
});
