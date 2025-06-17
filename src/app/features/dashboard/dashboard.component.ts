import { Component, inject } from '@angular/core';
import { DashboardService } from './services/dashboard';
import { LoadingService } from '@core/services/loading';
import { finalize, map, Observable } from 'rxjs';
import { MovieModel, ProducerMaxWinIntervalModel, StudioWithWinnersModel, WinnersByYearModel } from './models';
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

  projectionYearsWithMultipleWinners = ProjectionParamEnum.YEARS_WITH_MULTIPLE_WINNERS;
  projectionStudiosWithWinCounts = ProjectionParamEnum.STUDIOS_WITH_WIN_COUNTS;
  projectionMaxMinWinIntervalForProducers = ProjectionParamEnum.MAX_MIX_WIN_INTERVAL_FOR_PRODUCERS;
  winnerByYearLoader = 'winnerByYear';

  movies$!: Observable<MovieModel[]>;

  ngOnInit(): void {
    this.fetchListYearsWithMultipleWinners();
    this.fetchTopStudiosWithWiners();
    this.fetchMaxMinWinIntervalForProducers();
  }

  private fetchListYearsWithMultipleWinners() {
    this.loadingService.start(this.projectionYearsWithMultipleWinners);

    this.winnersByYear$ = this
      .dashboardService
      .getDataByParams<WinnersByYearModel>({ projection: this.projectionYearsWithMultipleWinners })
      .pipe(finalize(() => this.loadingService.stop(this.projectionYearsWithMultipleWinners)));

  }

  private fetchTopStudiosWithWiners() {
    this.loadingService.start(this.projectionStudiosWithWinCounts);
    this.topStudios$ = this
      .dashboardService
      .getDataByParams<StudioWithWinnersModel>({ projection: this.projectionStudiosWithWinCounts })
      .pipe(
        map(data => (this.getTopThreeStudios(data))),
        finalize(() => this.loadingService.stop(this.projectionStudiosWithWinCounts),
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
    this.loadingService.start(this.projectionMaxMinWinIntervalForProducers);
    this.maxMinWinIntervalForProducers$ = this
      .dashboardService
      .getDataByParams<ProducerMaxWinIntervalModel>({ projection: this.projectionMaxMinWinIntervalForProducers })
      .pipe(finalize(() => this.loadingService.stop(this.projectionMaxMinWinIntervalForProducers)));
  }

  fetchWinnerByYear(year: number) {
    this.loadingService.start(this.winnerByYearLoader);
    this.movies$ = this
      .dashboardService
      .getDataByParams<MovieModel[]>({ year, winner: true })
      .pipe(finalize(() => this.loadingService.stop(this.winnerByYearLoader)));
  }
}
