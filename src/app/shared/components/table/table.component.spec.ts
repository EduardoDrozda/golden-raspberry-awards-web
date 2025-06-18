import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatPipe } from '@shared/pipes/format';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
  let component: TableComponent<any>;
  let fixture: ComponentFixture<TableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, ReactiveFormsModule, FormatPipe]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render headers with filter inputs and selects', () => {
    fixture.componentRef.setInput('columns', [
      { key: 'name', label: 'Name', filterable: true },
      {
        key: 'status',
        label: 'Status',
        selectable: true,
        options: [
          { value: true, label: 'Yes' },
          { value: false, label: 'No' }
        ]
      }
    ]);
    fixture.detectChanges();

    const headers = fixture.debugElement.queryAll(By.css('th'));
    expect(headers.length).toBe(2);

    const input = fixture.debugElement.query(By.css('input'));
    const select = fixture.debugElement.query(By.css('select'));

    expect(input).toBeTruthy();
    expect(select).toBeTruthy();
  });

  it('should emit fieldSearchEmitter on input value change', (done) => {
    fixture.componentRef.setInput('columns', [
      { key: 'name', label: 'Name', filterable: true }
    ]);
    fixture.detectChanges();

    spyOn(component.fieldSearchEmitter, 'emit');

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Test';
    input.dispatchEvent(new Event('input'));

    setTimeout(() => {
      expect(component.fieldSearchEmitter.emit).toHaveBeenCalledWith([
        { key: 'name', value: 'Test' }
      ]);
      done();
    }, 600); // debounce time
  });

  it('should show loader when isLoading is true', () => {
    fixture.componentRef.setInput('columns', [{ key: 'name', label: 'Name' }]);
    fixture.componentRef.setInput('data', []);
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('.loader'));
    expect(loader).toBeTruthy();
  });

  it('should render rows of data', () => {
    fixture.componentRef.setInput('columns', [{ key: 'name', label: 'Name' }]);
    fixture.componentRef.setInput('data', [{ name: 'Alice' }, { name: 'Bob' }]);
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
    expect(rows[0].nativeElement.textContent).toContain('Alice');
    expect(rows[1].nativeElement.textContent).toContain('Bob');
  });

  it('should show "No data available" when data is empty', () => {
    fixture.componentRef.setInput('columns', [{ key: 'name', label: 'Name' }]);
    fixture.componentRef.setInput('data', []);
    fixture.componentRef.setInput('isLoading', false);
    fixture.detectChanges();

    const noData = fixture.debugElement.query(By.css('.table__no-data td'));
    expect(noData.nativeElement.textContent).toContain('No data available.');
  });

  it('should emit pageChangeEmitter when pagination button is clicked', () => {
    fixture.componentRef.setInput('columns', [{ key: 'name', label: 'Name' }]);
    fixture.componentRef.setInput('data', [{ name: 'Test' }]);
    fixture.componentRef.setInput('showPagination', true);
    fixture.componentRef.setInput('page', 1);
    fixture.componentRef.setInput('totalPages', 3);
    fixture.componentRef.setInput('visibleRange', 5);

    spyOn(component.pageChangeEmitter, 'emit');
    fixture.detectChanges();

    const nextBtn = fixture.debugElement.queryAll(By.css('.table__pagination button'))
      .find(btn => btn.nativeElement.querySelector('.fa-chevron-right'));

    nextBtn?.nativeElement.click();

    expect(component.pageChangeEmitter.emit).toHaveBeenCalledWith(2);
  });
});
