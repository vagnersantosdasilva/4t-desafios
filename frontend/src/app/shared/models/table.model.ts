import { Plano } from "../../model/api.model";

export interface TableColumn {
  header: string;
  field: string;
  width?: string;
  isSortable?: boolean;
  format?: string; // e.g., date format or currency format
  pipe?: string; // e.g., custom pipe name
}

//TODO:Decidir se deixo qualquer chave/valor o retorno tipado
export interface TableDataRow {
  [key: string]: any ;
}

export interface TableModel {
  headers: TableColumn[];
  data: TableDataRow[];
}

export interface SelectOption {
  id: number | string | null;
  value: string | number;
  label: string;
  selected?: boolean;
  disabled?: boolean;
}
