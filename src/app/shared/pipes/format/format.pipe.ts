import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {
  transform(value: any): string | number {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    return value;
  }

}
