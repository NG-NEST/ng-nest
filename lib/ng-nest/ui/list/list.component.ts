import { Subject } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { XListPrefix, XListNode, XListProperty } from './list.property';
import { XValueAccessor, XIsChange, XSetData, XConfigService } from '@ng-nest/ui/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: `${XListPrefix}`,
  templateUrl: './list.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XListComponent)]
})
export class XListComponent extends XListProperty implements OnInit, OnChanges {
  nodes: XListNode[] = [];
  selectedNodes: XListNode[] = [];

  writeValue(value: any): void {
    this.value = value;
    this.setSelected();
    this.cdr.detectChanges();
  }

  private _unSubject = new Subject<void>();

  constructor(public renderer: Renderer2, private cdr: ChangeDetectorRef, public configService: XConfigService) {
    super();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  private setData() {
    XSetData<XListNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.setSelected();
      this.cdr.detectChanges();
    });
  }

  setSelected() {
    if (this.nodes.length > 0) {
      let valArry: any[] = [];
      if (this.value instanceof Array) {
        valArry = this.value;
      } else {
        valArry = [this.value];
      }
      this.nodes
        .filter((x) => x.selected)
        .map((x) => {
          x.selected = false;
        });
      this.selectedNodes = this.nodes
        .filter((x) => valArry.indexOf(x.id) > -1)
        .map((x) => {
          x.selected = true;
          return x;
        });
    }
  }

  onNodeClick(event: Event, node: XListNode) {
    if (node.disabled) {
      event.stopPropagation();
      return;
    }
    if (node.disabled || (node.selected && this.multiple === 1)) return;
    const selected = !node.selected;
    if (selected) {
      if (this.selectedNodes.length < this.multiple || this.multiple === 0) {
        node.selected = selected;
        this.selectedNodes = [...this.selectedNodes, node];
      } else if (this.multiple === 1 && this.selectedNodes.length === 1) {
        node.selected = selected;
        this.selectedNodes[0].selected = false;
        this.selectedNodes[0] = node;
      } else {
        return;
      }
    } else {
      node.selected = selected;
      this.selectedNodes.splice(
        this.selectedNodes.findIndex((x) => x.id == node.id),
        1
      );
    }
    if (this.multiple === 1 && this.selectedNodes.length === 1) {
      this.value = this.selectedNodes[0].id;
    } else {
      this.value = this.selectedNodes.map((x) => x.id);
    }
    if (this.onChange) this.onChange(this.value);
    node.event = event;
    this.nodeClick.emit(node);
  }

  onMouseenter(event: Event, node: XListNode) {
    if (node.disabled) {
      event.stopPropagation();
      return;
    }
    node.event = event;
    this.nodeMouseenter.emit(node);
  }

  onMouseleave(event: Event, node: XListNode) {
    if (node.disabled) {
      event.stopPropagation();
      return;
    }
    node.event = event;
    this.nodeMouseleave.emit(node);
  }

  dropCdk(event: CdkDragDrop<XListNode[]>) {
    moveItemInArray(this.nodes, event.previousIndex, event.currentIndex);
    this.cdr.detectChanges();
  }
}
