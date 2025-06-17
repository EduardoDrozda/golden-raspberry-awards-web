import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WinnersByYearModel } from '@features/dashboard/models';
import { TableComponent } from '@shared/components';

@Component({
  selector: 'app-dashboard-years-multiple-list',
  imports: [TableComponent],
  templateUrl: './dashboard-years-multiple.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardYearsMultipleComponent {
  winnersByYear = input.required<WinnersByYearModel | null>();
  isLoading = input<boolean>(false);
}
