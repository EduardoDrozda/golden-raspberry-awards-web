import { Routes } from '@angular/router';
import { dashboardRoutes } from '@features/dashboard/dashboard.routes';
import { moviesRoutes } from '@features/movies/movies.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  ...dashboardRoutes,
  ...moviesRoutes
];
