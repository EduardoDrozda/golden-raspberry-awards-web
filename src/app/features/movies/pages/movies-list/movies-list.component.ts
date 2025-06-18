import { Component, inject, OnInit } from '@angular/core';
import { MovieModel, PaginationModel } from '@core/models';
import { LoadingService } from '@core/services/loading';
import { MovieSearchParams, MovieService } from '@features/movies/services/movie';
import { TableComponent } from '@shared/components';
import { TableColumn, TableField } from '@shared/components/table/models';
import { finalize, map } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  imports: [TableComponent],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent implements OnInit {
  private readonly movieService = inject(MovieService);
  readonly loadingService = inject(LoadingService);

  columns: TableColumn<MovieModel>[] = [
    { key: 'id', label: 'Id' },
    { key: 'year', label: 'Year', filterable: true },
    { key: 'title', label: 'Title' },
    {
      key: 'winner',
      label: 'Winner',
      selectable: true,
      options: [
        { value: '', label: 'Yes/No' },
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]
    }
  ]

  moviesListLoading = 'moviesListLoading';
  movies: MovieModel[] = [];

  moviesPagination: MovieSearchParams = {
    page: 0,
    size: 15,
  }

  ngOnInit() {
    this.fetchMovies(this.moviesPagination);
  }

  fetchMovies(params: MovieSearchParams) {
    this.loadingService.start(this.moviesListLoading);

    // let paginationParams: MovieSearchParams = {
    //   page: this.moviesPagination.page! - 1,
    //   size: this.moviesPagination.size,
    // }

    // this.moviesPagination = {
    //   ...this.moviesPagination,
    //   page: paginationParams.page! + 1
    // }

    // if (params) {
    //   paginationParams = {
    //     ...paginationParams,
    //     [params.key]: params.value
    //   }
    // }

    this.movieService
      .getMoviesByParams(params)
      .pipe(finalize(() => this.loadingService.stop(this.moviesListLoading)))
      .subscribe({
        next: (response) => {
          this.movies = response.content;
          this.moviesPagination = {
            ...this.moviesPagination,
            totalPages: response.totalPages,
            page: response.number + 1,
          }
        },
      });
  }

  fetchMoviesByFilter(field: TableField<MovieModel>[]) {
    const filterParams = field
      .reduce((acc, item) => {
      acc[item.key as string] = item.value;
      return acc;
    }, {} as Record<string, any>);

    this.moviesPagination = {
      ...this.moviesPagination,
      ...filterParams,
    };

    let paginationParams: MovieSearchParams = {
      ...this.moviesPagination,
      page: 0,
    }

    this.fetchMovies(paginationParams);
  }

  fetchMoviesWithPage(page: number) {
    this.moviesPagination = {
      ...this.moviesPagination,
      page: page - 1,
    };

    this.fetchMovies(this.moviesPagination);
  }
}
