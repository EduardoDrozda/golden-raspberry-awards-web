import { inject, Injectable } from '@angular/core';
import { MovieModel, PaginationModel } from '@core/models';
import { HttpService } from '@core/services/http';

export type MovieSearchParams = {
  page?: number;
  size?: number;
  winner?: boolean;
  year?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = '/movies';

  private readonly httpService = inject(HttpService);

  getMoviesByParams(params: MovieSearchParams) {
    return this.httpService.get<PaginationModel<MovieModel>>(this.baseUrl, params as Record<string, string | number | boolean>);
  }
}
