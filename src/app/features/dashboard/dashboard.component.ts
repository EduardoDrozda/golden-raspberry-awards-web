import { Component, inject } from '@angular/core';
import { DashboardService } from './services/dashboard';
import { LoadingService } from '@core/services/loading';
import { finalize, map, Observable } from 'rxjs';
import { ProducerMaxWinIntervalModel, StudioWithWinnersModel, WinnersByYearModel } from './models';
import { ProjectionParamEnum } from './enums';
import { DashboardProducersIntervalsComponent, DashboardTopStudiosComponent, DashboardWinnerByYearComponent, DashboardYearsMultipleComponent } from './components';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardProducersIntervalsComponent,
    DashboardTopStudiosComponent,
    DashboardWinnerByYearComponent,
    DashboardYearsMultipleComponent,
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);
  readonly loadingService = inject(LoadingService);

  winnersByYear$!: Observable<WinnersByYearModel>;
  topStudios$!: Observable<StudioWithWinnersModel>;
  maxMinWinIntervalForProducers$!: Observable<ProducerMaxWinIntervalModel>;

  projectionParamEnum = ProjectionParamEnum;

  ngOnInit(): void {
    this.fetchListYearsWithMultipleWinners();
    this.fetchTopStudiosWithWiners();
    this.fetchMaxMinWinIntervalForProducers();
  }

  private fetchListYearsWithMultipleWinners() {
    this.loadingService.start(this.projectionParamEnum.YEARS_WITH_MULTIPLE_WINNERS);

    this.winnersByYear$ = this
      .dashboardService
      .getDataByParams<WinnersByYearModel>({ projection: this.projectionParamEnum.YEARS_WITH_MULTIPLE_WINNERS })
      .pipe(finalize(() => this.loadingService.stop(this.projectionParamEnum.YEARS_WITH_MULTIPLE_WINNERS)));

  }

  private fetchTopStudiosWithWiners() {
    this.loadingService.start(this.projectionParamEnum.STUDIOS_WITH_WIN_COUNTS);
    this.topStudios$ = this
      .dashboardService
      .getDataByParams<StudioWithWinnersModel>({ projection: this.projectionParamEnum.STUDIOS_WITH_WIN_COUNTS })
      .pipe(
        map(data => (this.getTopThreeStudios(data))),
        finalize(() => this.loadingService.stop(this.projectionParamEnum.STUDIOS_WITH_WIN_COUNTS),
        ));
  }

  private getTopThreeStudios(data: StudioWithWinnersModel): StudioWithWinnersModel {
    if (data?.studios.length) {
      return {
        studios: [...data.studios.slice(0, 3)]
      };
    }
    return data;
  }

  private fetchMaxMinWinIntervalForProducers() {
    this.loadingService.start(this.projectionParamEnum.MAX_MIX_WIN_INTERVAL_FOR_PRODUCERS);
    this.maxMinWinIntervalForProducers$ = this
      .dashboardService
      .getDataByParams<ProducerMaxWinIntervalModel>({ projection: this.projectionParamEnum.MAX_MIX_WIN_INTERVAL_FOR_PRODUCERS })
      .pipe(finalize(() => this.loadingService.stop(this.projectionParamEnum.MAX_MIX_WIN_INTERVAL_FOR_PRODUCERS)));
  }

  private fetchWinnerByYear(year: number, winner: boolean) {
    this.dashboardService.getDataByParams({ projection: ProjectionParamEnum.YEARS_WITH_MULTIPLE_WINNERS, year, winner }).subscribe({
      next: (data) => console.log(`Winner by year ${year} (${winner ? 'yes' : 'no'}):`, data),
    });
  }
}
