import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieModel } from '@core/models';

import { TableComponent } from '@shared/components';

@Component({
  selector: 'app-dashboard-winner-by-year-list',
  imports: [TableComponent, ReactiveFormsModule],
  templateUrl: './dashboard-winner-by-year.component.html',
  styleUrl: './dashboard-winner-by-year.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardWinnerByYearComponent {
  isLoading = input<boolean>();
  movies = input<MovieModel[] | null>([]);

  yearEmitter = output<number>();
  private readonly formBuilder = inject(FormBuilder);
  formGroup!: FormGroup;

  constructor() {
    this.buildForm();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
    });
  }

  submitSeach() {
    const value = this.formGroup.value;

    if (this.formGroup.valid) {
      this.yearEmitter.emit(value.year);
    }
  }
}
