import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StudioWithWinnersModel } from '@features/dashboard/models';
import { TableComponent } from '@shared/components';

@Component({
  selector: 'app-dashboard-top-studios-list',
  imports: [TableComponent],
  templateUrl: './dashboard-top-studios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardTopStudiosComponent {
  topStudios = input.required<StudioWithWinnersModel | null>();
  isLoading = input<boolean>(false);
}
