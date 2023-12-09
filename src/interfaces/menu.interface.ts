export interface Menu {
  id?: string;
  pid?: string | null;
  label?: string;
  name?: string;
  enLabel?: string;
  router?: string;
  icon?: string;
  type?: string;
  order?: number;
  category?: string;
  lang?: string;
  [property: string]: any;
}
