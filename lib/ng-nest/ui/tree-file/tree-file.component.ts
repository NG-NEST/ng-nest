import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SecurityContext
} from '@angular/core';
import { XTreeFilePrefix, XTreeFileProperty, XTreeFileNode } from './tree-file.property';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: `${XTreeFilePrefix}`,
  templateUrl: './tree-file.component.html',
  styleUrls: ['./tree-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTreeFileComponent extends XTreeFileProperty implements OnInit {
  activatedNode: XTreeFileNode;

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef, public http: HttpClient) {
    super();
  }

  ngOnInit() {
    // this.setClassMap();
  }

  setClassMap() {
    // this.classMap[`${XTreeFilePrefix}-${this.shadow}`] = !XIsEmpty(this.shadow);
  }

  catalogChange(node: XTreeFileNode) {
    if (node.leaf) return;
    this.activatedNode = node;
    if (node.url && !node.contentLoaded) {
      this.http.get(node.url, { responseType: 'text' }).subscribe((x) => {
        node.content = x;
        node.contentLoaded = true;
        this.cdr.detectChanges();
      });
    } else {
      this.cdr.detectChanges();
    }
  }
}
