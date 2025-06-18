import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET request', () => {
    const mockData = [{ id: 1, name: 'Test' }];
    const url = '/test';
    const params = { search: 'query', page: 1 };

    service.get(url, params).subscribe(data => {
      expect(data).toEqual(mockData)
    });

    const req = httpMock.expectOne(`https://challenge.outsera.tech/api${url}?search=query&page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
