import { FormatPipe } from './format.pipe';

describe('FormatPipe', () => {
  let pipe: FormatPipe;

  beforeEach(() => {
    pipe = new FormatPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform true to "Yes"', () => {
    expect(pipe.transform(true)).toBe('Yes');
  });

  it('should transform false to "No"', () => {
    expect(pipe.transform(false)).toBe('No');
  });

  it('should return string as is', () => {
    expect(pipe.transform('hello')).toBe('hello');
  });

  it('should return number as is', () => {
    expect(pipe.transform(123)).toBe(123);
  });

  it('should return null as is', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('should return undefined as is', () => {
    expect(pipe.transform(undefined)).toBeUndefined();
  });
});
