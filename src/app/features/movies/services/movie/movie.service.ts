import { inject, Injectable } from '@angular/core';
import { MovieModel, PaginationModel } from '@core/models';
import { HttpService } from '@core/services/http';

export type MovieSearchParams = {
  page: number;
  size: number;
  totalPages?: number;
  year?: string;
  winner?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = '/movies';

  private readonly httpService = inject(HttpService);

  getMoviesByParams(params: MovieSearchParams) {

    const query = {
      page: params.page,
      size: params.size,
      year: params.year,
      winner: params.winner
    }

    return this.httpService.get<PaginationModel<MovieModel>>(this.baseUrl, query as Record<string, string | number | boolean>);
  }
}
