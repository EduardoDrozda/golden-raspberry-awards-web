import { TestBed } from '@angular/core/testing';
import { DashboardService, DashboardSearchParams } from './dashboard.service';
import { HttpService } from '@core/services/http';
import { ProjectionParamEnum } from '@features/dashboard/enums';
import { of } from 'rxjs';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        DashboardService,
        { provide: HttpService, useValue: spy }
      ]
    });

    service = TestBed.inject(DashboardService);
    httpSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpService.get with YEARS_WITH_MULTIPLE_WINNERS', () => {
    const params: DashboardSearchParams = {
      projection: ProjectionParamEnum.YEARS_WITH_MULTIPLE_WINNERS
    };

    httpSpy.get.and.returnValue(of([]));

    service.getDataByParams(params).subscribe();
    expect(httpSpy.get).toHaveBeenCalledWith('/movies', params);
  });

  it('should call httpService.get with STUDIOS_WITH_WIN_COUNTS', () => {
    const params: DashboardSearchParams = {
      projection: ProjectionParamEnum.STUDIOS_WITH_WIN_COUNTS
    };

    httpSpy.get.and.returnValue(of([]));

    service.getDataByParams(params).subscribe();
    expect(httpSpy.get).toHaveBeenCalledWith('/movies', params);
  });

  it('should call httpService.get with MAX_MIX_WIN_INTERVAL_FOR_PRODUCERS', () => {
    const params: DashboardSearchParams = {
      projection: ProjectionParamEnum.MAX_MIX_WIN_INTERVAL_FOR_PRODUCERS
    };

    httpSpy.get.and.returnValue(of([]));

    service.getDataByParams(params).subscribe();
    expect(httpSpy.get).toHaveBeenCalledWith('/movies', params);
  });

  it('should call httpService.get with year and winner params', () => {
    const params: DashboardSearchParams = {
      year: 1999,
      winner: true
    };

    httpSpy.get.and.returnValue(of([]));

    service.getDataByParams(params).subscribe();
    expect(httpSpy.get).toHaveBeenCalledWith('/movies', params);
  });
});
