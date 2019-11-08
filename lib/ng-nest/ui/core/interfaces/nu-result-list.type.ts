export interface NuId {
  id: string | number;
}

export interface NuResultList<Entity extends NuId> {
  list?: Entity[];
  total?: number;
  query?: NuQuery;
}

export interface NuQuery {
  index?: number;
  size?: number;
  sort?: string[];
  filter?: NuFilter[];
  group?: string;
}

export interface NuFilter {
  field: string;
  value: string;
}
