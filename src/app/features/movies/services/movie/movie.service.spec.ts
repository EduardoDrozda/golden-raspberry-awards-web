import { TestBed } from '@angular/core/testing';
import { MovieService, MovieSearchParams } from './movie.service';
import { HttpService } from '@core/services/http';
import { of } from 'rxjs';
import { MovieModel, PaginationModel } from '@core/models';

describe('MovieService', () => {
  let service: MovieService;
  let httpSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        MovieService,
        { provide: HttpService, useValue: spy }
      ]
    });

    service = TestBed.inject(MovieService);
    httpSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpService.get with all params when provided', () => {
    const params: MovieSearchParams = {
      page: 1,
      size: 10,
      year: '1995',
      winner: true
    };

    const mockResponse: PaginationModel<MovieModel> = {
      content: [
        {
          id: 1,
          title: 'Braveheart',
          year: 1995,
          winner: true,
          studios: ['Icon Productions'],
          producers: ['Mel Gibson']
        }
      ],
      pageable: {
        sort: { sorted: true, unsorted: false, empty: false },
        offset: 0,
        pageSize: 10,
        pageNumber: 1,
        paged: true,
        unpaged: false
      },
      totalPages: 1,
      totalElements: 1,
      last: true,
      size: 10,
      number: 1,
      sort: { sorted: true, unsorted: false, empty: false },
      numberOfElements: 1,
      first: true,
      empty: false
    };

    httpSpy.get.and.returnValue(of(mockResponse));

    service.getMoviesByParams(params).subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });

    expect(httpSpy.get).toHaveBeenCalledWith('/movies', {
      page: 1,
      size: 10,
      year: '1995',
      winner: true
    });
  });
});
