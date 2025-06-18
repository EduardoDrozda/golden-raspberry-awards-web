import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loading to true when start is called', () => {
    service.start('movies');
    expect(service.isLoading('movies')).toBeTrue();
    expect(service.loadings()['movies']).toBeTrue();
  });

  it('should set loading to false when stop is called', () => {
    service.start('movies');
    service.stop('movies');
    expect(service.isLoading('movies')).toBeFalse();
    expect(service.loadings()['movies']).toBeFalse();
  });

  it('should return false for unknown key', () => {
    expect(service.isLoading('unknown')).toBeFalse();
  });

  it('should handle multiple keys independently', () => {
    service.start('movies');
    service.start('dashboard');
    service.stop('movies');

    expect(service.isLoading('movies')).toBeFalse();
    expect(service.isLoading('dashboard')).toBeTrue();
  });
});
