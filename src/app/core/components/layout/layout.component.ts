import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarOptionsModel } from './models';
import { RoutesEnum } from '@core/enums';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  sidebarOptions: SidebarOptionsModel[] = [
    {
      title: 'Dashboard',
      route: RoutesEnum.DASHBOARD,
      icon: 'fa-solid fa-tachometer-alt'
    },
    {
      title: 'Movies',
      route: RoutesEnum.MOVIES,
      icon: 'fa-solid fa-film'
    }
  ];
}
