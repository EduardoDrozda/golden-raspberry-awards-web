import { Component, input } from '@angular/core';
import { TableColumn } from './models';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T = any> {
  data = input<T[]>([]);

  columns = input<TableColumn<T>[]>([]);
  isLoading = input<boolean | undefined>(false);
}
