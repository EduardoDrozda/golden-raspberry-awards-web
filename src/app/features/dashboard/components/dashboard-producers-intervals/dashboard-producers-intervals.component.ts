import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProducerMaxWinIntervalModel } from '@features/dashboard/models';
import { TableComponent } from '@shared/components';

@Component({
  selector: 'app-dashboard-producers-intervals-list',
  imports: [TableComponent],
  templateUrl: './dashboard-producers-intervals.component.html',
  styleUrl: './dashboard-producers-intervals.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardProducersIntervalsComponent {
  maxMinWinIntervalForProducers = input.required<ProducerMaxWinIntervalModel | null>();
  isLoading = input<boolean>();

}
