import { Component, inject, input, OnDestroy, OnInit, output } from '@angular/core';
import { TableColumn, TableField } from './models';
import { FormatPipe } from '@shared/pipes/format';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-table',
  imports: [FormatPipe, ReactiveFormsModule],
  templateUrl: './table.component.html'
})
export class TableComponent<T> implements OnInit, OnDestroy {
  data = input<T[]>();
  columns = input<TableColumn<T>[]>([]);

  showPagination = input<boolean>(false);
  page = input<number>(1);
  totalPages = input<number>(1);
  visibleRange = input<number>(5);

  isLoading = input<boolean | undefined>(false);

  fieldSearchEmitter = output<TableField<T>[]>();
  pageChangeEmitter = output<number>();

  formGroup!: FormGroup;
  filterableColumns: TableColumn<T>[] = [];
  destroyRef$ = new Subject<void>();

  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.buildFormByColumns();
  }

  private buildFormByColumns() {
    this.filterableColumns = this.columns().filter(column => column.filterable || column.selectable);

    if (!this.filterableColumns.length) {
      return;
    }

    const formControls = this
      .filterableColumns
      .reduce((acc, column) => {
        acc[column.key as string] = [''];
        return acc;
      }, {} as Record<string, any>);

    this
      .formGroup = this
        .formBuilder
        .group(formControls)

    this
      .formGroup
      .valueChanges
      .pipe(
        takeUntil(this.destroyRef$),
        debounceTime(500)
      )
      .subscribe((values: any) => {

        const fields: TableField<T>[] = this
          .filterableColumns
          .map(column => ({
            key: column.key,
            value: values[column.key as string]
          }));
        this.fieldSearchEmitter.emit(fields);
      });
  }

  get pages(): number[] {
    const rangePagination = this.visibleRange();

    const startPagination = Math.max(1, this.page() - Math.floor(rangePagination / 2));
    const endPagination = Math.min(this.totalPages(), startPagination + rangePagination - 1);

    return Array.from({ length: endPagination - startPagination + 1 }, (_, i) => startPagination + i);
  }

  goTo(page: number) {
    if (page >= 1 && page <= this.totalPages() && page !== this.page()) {
      this.pageChangeEmitter.emit(page);
    }
  }

  ngOnDestroy(): void {
    this.destroyRef$.next();
    this.destroyRef$.complete();
  }
}
