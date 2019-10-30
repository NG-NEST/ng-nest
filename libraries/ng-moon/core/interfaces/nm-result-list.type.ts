export interface NmId {
  id: string | number;
}

export interface NmResultList<Entity extends NmId> {
  list?: Entity[];
  total?: number;
  query?: NmQuery;
}

export interface NmQuery {
  index?: number;
  size?: number;
  sort?: string[];
  filter?: NmFilter[];
  group?: string;
}

export interface NmFilter {
  field: string;
  value: string;
}
