import { Injectable } from '@angular/core';
import { XRepositoryService, XHttpService } from '@ng-nest/ui/core';
import { XTreeNode } from '@ng-nest/ui/tree';

export interface Organization extends XTreeNode {
  label?: string;
  type?: string;
  icon?: string;
  pid?: string;
  path?: string;
}

@Injectable()
export class OrganizationService extends XRepositoryService<Organization> {
  constructor(public http: XHttpService) {
    super(http, { api: 'http://localhost:3000/', controller: { name: 'organization' } });
  }
}
