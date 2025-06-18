import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component';
import { MovieService } from '@features/movies/services/movie';
import { LoadingService } from '@core/services/loading';
import { of } from 'rxjs';
import { MovieModel, PaginationModel } from '@core/models';
import { TableField } from '@shared/components/table/models';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  const mockPaginationResponse: PaginationModel<MovieModel> = {
    content: [
      {
        id: 1,
        title: 'The Matrix',
        year: 1999,
        winner: true,
        studios: ['Warner Bros'],
        producers: ['Lana Wachowski', 'Lilly Wachowski']
      }
    ],
    pageable: {
      sort: { sorted: false, unsorted: true, empty: true },
      offset: 0,
      pageSize: 15,
      pageNumber: 0,
      paged: true,
      unpaged: false
    },
    totalPages: 3,
    totalElements: 45,
    last: false,
    size: 15,
    number: 0,
    sort: { sorted: false, unsorted: true, empty: true },
    numberOfElements: 1,
    first: true,
    empty: false
  };

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMoviesByParams']);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['start', 'stop', 'isLoading']);

    await TestBed.configureTestingModule({
      imports: [MoviesListComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    movieServiceSpy.getMoviesByParams.and.returnValue(of(mockPaginationResponse));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fetch movies on init', () => {
    movieServiceSpy.getMoviesByParams.and.returnValue(of(mockPaginationResponse));
    fixture.detectChanges();

    expect(loadingServiceSpy.start).toHaveBeenCalledWith('moviesListLoading');
    expect(movieServiceSpy.getMoviesByParams).toHaveBeenCalledWith({ page: 0, size: 15 });
    expect(component.movies.length).toBe(1);
    expect(component.moviesPagination.totalPages).toBe(3);
    expect(component.moviesPagination.page).toBe(1);
  });

  it('should fetch movies by filter', () => {
    movieServiceSpy.getMoviesByParams.and.returnValue(of(mockPaginationResponse));

    const filters: TableField<MovieModel>[] = [
      { key: 'year', value: '1999' },
      { key: 'winner', value: true }
    ];

    component.fetchMoviesByFilter(filters);

    expect(movieServiceSpy.getMoviesByParams).toHaveBeenCalledWith({
      page: 0,
      size: 15,
      year: '1999',
      winner: true
    });
  });

  it('should fetch movies with new page', () => {
    movieServiceSpy.getMoviesByParams.and.returnValue(of(mockPaginationResponse));

    component.fetchMoviesWithPage(2);

    expect(movieServiceSpy.getMoviesByParams).toHaveBeenCalledWith({
      page: 1,
      size: 15
    });
  });
});
