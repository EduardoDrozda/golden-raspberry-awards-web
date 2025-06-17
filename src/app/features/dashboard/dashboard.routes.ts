import { Routes } from "@angular/router";
import { RoutesEnum } from "@core/enums";

export const dashboardRoutes: Routes = [
  {
    path: RoutesEnum.DASHBOARD,
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
  }
];
