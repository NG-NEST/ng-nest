export interface XId {
  id: string | number;
}

export interface XResultList<Entity extends XId> {
  list?: Entity[];
  total?: number;
  query?: XQuery;
}

export interface XQuery {
  index?: number;
  size?: number;
  sort?: string[];
  filter?: XFilter[];
  group?: string;
}

export interface XFilter {
  field: string;
  value: string;
}
