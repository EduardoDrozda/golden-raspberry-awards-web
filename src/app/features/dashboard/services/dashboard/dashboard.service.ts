import { inject, Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { ProjectionParamEnum } from '@features/dashboard/enums';

export type DashboardDataParams = {
  projection?: ProjectionParamEnum;
  year?: number;
  winner?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = '/movies';

  private readonly httpService = inject(HttpService);

  getDataByParams<T>(params: DashboardDataParams) {
    return this.httpService.get<T>(this.baseUrl, params as Record<string, string | number | boolean>);
  }
}
