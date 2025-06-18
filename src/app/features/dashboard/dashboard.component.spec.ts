import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './services/dashboard';
import { LoadingService } from '@core/services/loading';
import { of } from 'rxjs';
import { ProjectionParamEnum } from './enums';
import {
  ProducerMaxWinIntervalModel,
  StudioWithWinnersModel,
  WinnersByYearModel
} from './models';
import { MovieModel } from '@core/models';
import { HttpService } from '@core/services/http';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardServiceSpy: jasmine.SpyObj<DashboardService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    const dashboardSpy = jasmine.createSpyObj('DashboardService', ['getDataByParams']);
    const loadingSpy = jasmine.createSpyObj('LoadingService', ['start', 'stop', 'isLoading'], {
      loadings: () => ({})
    });


    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: DashboardService, useValue: dashboardSpy },
        { provide: LoadingService, useValue: loadingSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dashboardServiceSpy = TestBed.inject(DashboardService) as jasmine.SpyObj<DashboardService>;
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all dashboard data on init', () => {
    dashboardServiceSpy.getDataByParams.and.returnValue(of({}));

    fixture.detectChanges();

    expect(loadingServiceSpy.start).toHaveBeenCalledWith(ProjectionParamEnum.YEARS_WITH_MULTIPLE_WINNERS);
    expect(loadingServiceSpy.start).toHaveBeenCalledWith(ProjectionParamEnum.STUDIOS_WITH_WIN_COUNTS);
    expect(loadingServiceSpy.start).toHaveBeenCalledWith(ProjectionParamEnum.MAX_MIX_WIN_INTERVAL_FOR_PRODUCERS);

    expect(dashboardServiceSpy.getDataByParams).toHaveBeenCalledWith({
      projection: ProjectionParamEnum.YEARS_WITH_MULTIPLE_WINNERS
    });
    expect(dashboardServiceSpy.getDataByParams).toHaveBeenCalledWith({
      projection: ProjectionParamEnum.STUDIOS_WITH_WIN_COUNTS
    });
    expect(dashboardServiceSpy.getDataByParams).toHaveBeenCalledWith({
      projection: ProjectionParamEnum.MAX_MIX_WIN_INTERVAL_FOR_PRODUCERS
    });
  });

  it('should call fetchWinnerByYear and update movies$', () => {
    const mockMovies: MovieModel[] = [
      { id: 1, title: 'Movie 1', year: 2001, winner: true, studios: [], producers: [] }
    ];

    dashboardServiceSpy.getDataByParams.and.returnValue(of(mockMovies));

    component.fetchWinnerByYear(2001);

    expect(loadingServiceSpy.start).toHaveBeenCalledWith('winnerByYear');
    expect(dashboardServiceSpy.getDataByParams).toHaveBeenCalledWith({
      year: 2001,
      winner: true
    });
  });
});
