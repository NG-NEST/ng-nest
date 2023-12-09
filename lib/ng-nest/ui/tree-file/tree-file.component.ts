import { Component, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy, inject } from '@angular/core';
import { XTreeFilePrefix, XTreeFileProperty, XTreeFileNode, XTreeFileImgs } from './tree-file.property';
import { HttpClient } from '@angular/common/http';
import { XIsEmpty, XConfigService } from '@ng-nest/ui/core';
import { XCrumbComponent, XCrumbNode } from '@ng-nest/ui/crumb';
import { delay, finalize } from 'rxjs/operators';
import { XHighlightComponent, XHighlightLines } from '@ng-nest/ui/highlight';
import { CommonModule } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XTreeComponent } from '@ng-nest/ui/tree';

@Component({
  selector: `${XTreeFilePrefix}`,
  standalone: true,
  imports: [
    CommonModule,
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
  activatedNode?: XTreeFileNode;
  loading: boolean = false;
  time!: number;
  timeout: number = 200;

  get catalogHeight() {
    return Number(this.maxHeight);
  }

  get codeHeight() {
    return Number(this.maxHeight) - (Boolean(this.showCrumb) ? 1.5 : 0);
  }

  get getCrumbData() {
    return this.activatedNode?.crumbData as XCrumbNode[];
  }

  get getHighlightLines() {
    return this.activatedNode?.highlightLines as XHighlightLines;
  }

  private cdr = inject(ChangeDetectorRef);
  private http = inject(HttpClient, { optional: true })!;
  configService = inject(XConfigService);

  ngOnInit() {
    if (!this.http) {
      throw new Error(
        `${XTreeFilePrefix}: Not found 'HttpClient', You can import 'HttpClientModule' in your root module.`
      );
    }
    if (!this.showTree && this.activatedId) {
      this.catalogChange((this.data as XTreeFileNode[]).find((x) => x.id == this.activatedId) as XTreeFileNode);
    }
  }

  catalogChange(node: XTreeFileNode) {
    if (!node?.leaf && this.showTree) return;
    if (node.url && !node.contentLoaded) {
      this.time = new Date().getTime();
      this.loading = true;
      this.cdr.detectChanges();
      this.activatedNode = node;
      this.setNode(node);
      node.url = node.url?.indexOf(this.domain) === 0 ? node.url : `${this.domain}/${node.url}`;
      switch (node.fileType) {
        case 'code':
          this.http
            .get(node.url, { responseType: 'text' })
            .pipe(
              delay(
                new Date().getTime() - this.time > this.timeout ? 0 : this.timeout - new Date().getTime() + this.time
              ),
              finalize(() => {
                this.loading = false;
                this.cdr.detectChanges();
              })
            )
            .subscribe((x) => {
              node.content = x;
              node.contentLoaded = true;
              this.loading = false;
              this.cdr.detectChanges();
            });
          break;
        case 'img':
          this.cdr.detectChanges();
          break;
      }
    } else {
      this.activatedNode = node;
      this.setNode(this.activatedNode);
      this.cdr.detectChanges();
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
    this.loading = false;
    this.cdr.detectChanges();
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

  menuToggle() {
    this.toggle = !this.toggle;
    this.cdr.detectChanges();
  }
}
