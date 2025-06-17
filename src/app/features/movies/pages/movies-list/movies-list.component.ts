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
  movies: PaginationModel<MovieModel> | null = null;

  moviesPagination: MovieSearchParams = {
    page: 0,
    size: 15
  }

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies(params?: TableField<MovieModel>) {
    this.loadingService.start(this.moviesListLoading);

    if (params) {
      this.moviesPagination = {
        ...this.moviesPagination,
        [params.key]: params.value
      };
    }

    this.movieService
      .getMoviesByParams(this.moviesPagination)
      .pipe(finalize(() => this.loadingService.stop(this.moviesListLoading)))
      .subscribe({
        next: (response) => (this.movies = response),
      });
  }
}
