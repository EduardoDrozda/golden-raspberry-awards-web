import { Component, input } from '@angular/core';
import { WinnersByYearModel } from '@features/dashboard/models';

@Component({
  selector: 'app-dashboard-years-multiple-list',
  imports: [],
  templateUrl: './dashboard-years-multiple.component.html',
  styleUrl: './dashboard-years-multiple.component.scss'
})
export class DashboardYearsMultipleComponent {
  winnersByYear = input.required<WinnersByYearModel | null>();
  isLoading = input<boolean>(false);

}
