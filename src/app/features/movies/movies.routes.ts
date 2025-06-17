import { Routes } from "@angular/router";
import { RoutesEnum } from "@core/enums";

export const moviesRoutes: Routes = [{
  path: RoutesEnum.MOVIES,
  loadComponent: () => import('./pages/movies-list/movies-list.component').then(m => m.MoviesListComponent),
}];
