import { Component, inject, input, output } from '@angular/core';
import { TableColumn, TableField } from './models';
import { FormatPipe } from '@shared/pipes/format';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [FormatPipe, FormsModule],
  templateUrl: './table.component.html'
})
export class TableComponent<T = any> {
  data = input<T[]>();

  columns = input<TableColumn<T>[]>([]);
  isLoading = input<boolean | undefined>(false);

  fieldSearchEmitter = output<TableField<T>>();

  onFilter(field: TableField<T>) {
    const value = (field.value.target as HTMLInputElement).value;

    const payload: TableField<T> = {
      key: field.key,
      value: value
    }

    this.fieldSearchEmitter.emit(payload);
  }
}
