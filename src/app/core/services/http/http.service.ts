import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly baseUrl = environment.apiUrl;

  private readonly httpClient = inject(HttpClient);

  get<T>(url: string, options?: Record<string, string | number | boolean>): Observable<T> {
    if (options) {
      const params = this.buildQueryString(options);
      return this.httpClient.get<T>(`${this.baseUrl}${url}`, { params });
    }

    return this.httpClient.get<T>(`${this.baseUrl}${url}`);
  }

  private buildQueryString(options: Record<string, string | number | boolean>): HttpParams {
    let queryParams = new HttpParams();

    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        const value = options[key];
        if (value !== null && value !== undefined) {
          queryParams = queryParams.append(key, String(value));
        }
      }
    }

    return queryParams;
  }
}
