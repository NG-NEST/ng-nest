import { Component, ViewEncapsulation, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { XTreeFilePrefix, XTreeFileProperty, XTreeFileNode, XTreeFileImgs } from './tree-file.property';
import { HttpClient } from '@angular/common/http';
import { XIsEmpty, XComputedStyle, XToCssPx } from '@ng-nest/ui/core';
import { XCrumbComponent, XCrumbNode } from '@ng-nest/ui/crumb';
import { delay, finalize } from 'rxjs/operators';
import { XHighlightComponent, XHighlightLines } from '@ng-nest/ui/highlight';
import { DOCUMENT, NgClass } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XTreeComponent } from '@ng-nest/ui/tree';

@Component({
  selector: `${XTreeFilePrefix}`,
  standalone: true,
  imports: [
    NgClass,
    XTreeComponent,
    XLinkComponent,
    XCrumbComponent,
    XIconComponent,
    XLoadingComponent,
    XHighlightComponent
  ],
  templateUrl: './tree-file.component.html',
  styleUrls: ['./tree-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTreeFileComponent extends XTreeFileProperty {
  activatedNode = signal<XTreeFileNode | null>(null);
  loading = signal(false);
  time!: number;
  timeout: number = 200;
  private document = inject(DOCUMENT);
  private fontSize = computed(() => parseFloat(XComputedStyle(this.document.documentElement, 'font-size')));

  codeHeight = computed(() => {
    return XToCssPx(this.maxHeight(), this.fontSize()) - (this.showCrumb() ? 1.5 : 0) * this.fontSize();
  });

  crumbData = computed(() => {
    return this.activatedNode()?.crumbData as XCrumbNode[];
  });

  highlightLines = computed(() => {
    return this.activatedNode()?.highlightLines as XHighlightLines;
  });

  private http = inject(HttpClient, { optional: true })!;

  ngOnInit() {
    if (!this.http) {
      throw new Error(
        `${XTreeFilePrefix}: Not found 'HttpClient', You can import 'HttpClientModule' in your root module.`
      );
    }
    if (!this.showTree && this.activatedId) {
      this.catalogChange((this.data() as XTreeFileNode[]).find((x) => x.id == this.activatedId()) as XTreeFileNode);
    }
  }

  catalogChange(node: XTreeFileNode) {
    if (!node?.leaf && this.showTree()) return;
    if (node.url && !node.contentLoaded) {
      this.time = new Date().getTime();
      this.loading.set(true);
      this.activatedNode.set(node);
      this.setNode(node);
      node.url = node.url?.indexOf(this.domain()) === 0 ? node.url : `${this.domain()}/${node.url}`;
      switch (node.fileType) {
        case 'code':
          this.http
            .get(node.url, { responseType: 'text' })
            .pipe(
              delay(
                new Date().getTime() - this.time > this.timeout ? 0 : this.timeout - new Date().getTime() + this.time
              ),
              finalize(() => {
                this.loading.set(false);
              })
            )
            .subscribe((x) => {
              node.content = x;
              node.contentLoaded = true;
              this.loading.set(false);
            });
          break;
        case 'img':
          break;
      }
    } else {
      this.activatedNode.set(node);
      this.setNode(this.activatedNode()!);
    }
  }

  setNode(node: XTreeFileNode) {
    if (!node.type) {
      node.type = 'bash';
    }
    if (!node.fileType) {
      node.fileType = XTreeFileImgs.indexOf((node.type as string).toLowerCase()) !== -1 ? 'img' : 'code';
    }
    if (!node.crumbData) {
      node.crumbData = this.setCurmbData(node);
    }
  }

  imgOnload() {
    this.loading.set(false);
  }

  setCurmbData(node: XTreeFileNode) {
    let crumbData: XCrumbNode[] = [{ id: node.id, label: node.label }];
    const getParent = (child: XTreeFileNode) => {
      if (XIsEmpty(child.pid)) return;
      const parent = (this.data() as XTreeFileNode[]).find((x) => x.id === child.pid) as XTreeFileNode;
      if (!XIsEmpty(parent)) {
        crumbData = [{ id: parent.id, label: parent.label }, ...crumbData];
        getParent(parent);
      }
    };
    getParent(node);

    return crumbData;
  }

  menuToggle() {
    this.toggle.update((x) => !x);
  }
}
