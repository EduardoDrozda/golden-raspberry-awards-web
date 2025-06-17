export type TableColumn<T> = {
  key: keyof T;
  label: string;
  filterable?: boolean;
  selectable?: boolean;
  options?: {
    value: string | number | boolean;
    label: string;
  }[];
}

export type TableField<T> = {
  key: keyof T;
  value: any;
}
