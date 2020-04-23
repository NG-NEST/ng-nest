import { Component, ViewEncapsulation, Renderer2, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { XTreeFilePrefix, XTreeFileProperty, XTreeFileNode } from './tree-file.property';
import { HttpClient } from '@angular/common/http';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XCrumbNode } from '@ng-nest/ui/crumb';

@Component({
  selector: `${XTreeFilePrefix}`,
  templateUrl: './tree-file.component.html',
  styleUrls: ['./tree-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTreeFileComponent extends XTreeFileProperty {
  activatedNode: XTreeFileNode;

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef, public http: HttpClient) {
    super();
  }

  ngOnInit() {
    if (this.hiddenTree && this.activatedId) {
      this.catalogChange((this.data as XTreeFileNode[]).find((x) => x.id == this.activatedId) as XTreeFileNode);
    }
  }

  catalogChange(node: XTreeFileNode) {
    if (node?.leaf) return;
    this.activatedNode = node;
    if (node.url && !node.contentLoaded) {
      this.http.get(node.url, { responseType: 'text' }).subscribe((x) => {
        node.content = x;
        node.crumbData = this.setCurmbData(node);
        node.contentLoaded = true;
        this.cdr.detectChanges();
      });
    } else {
      this.cdr.detectChanges();
    }
  }

  setCurmbData(node: XTreeFileNode) {
    let crumbData: XCrumbNode[] = [{ id: node.id, label: node.label }];
    const getParent = (child: XTreeFileNode) => {
      if (XIsEmpty(child.pid)) return;
      const parent = (this.data as XTreeFileNode[]).find((x) => x.id === child.pid) as XTreeFileNode;
      if (!XIsEmpty(parent)) {
        crumbData = [{ id: parent.id, label: parent.label }, ...crumbData];
        getParent(parent);
      }
    };
    getParent(node);

    return crumbData;
  }
}
