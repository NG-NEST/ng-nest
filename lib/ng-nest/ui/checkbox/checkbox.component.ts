import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { XCheckboxPrefix, XCheckboxNode, XCheckboxProperty } from './checkbox.property';
import { Subject } from 'rxjs';
import { XValueAccessor, XIsChange, XSetData } from '@ng-nest/ui/core';

@Component({
  selector: `${XCheckboxPrefix}`,
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XCheckboxComponent)]
})
export class XCheckboxComponent extends XCheckboxProperty implements OnChanges {
  writeValue(value: any[]) {
    this.value = value;
    this.cdr.detectChanges();
  }

  nodes: XCheckboxNode[] = [];
  private _unSubject = new Subject<void>();
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super(renderer);
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.data) && this.setData();
  }

  checkboxClick(event: Event, node: XCheckboxNode) {
    event.preventDefault();
    if (this.disabled || node.disabled) return;
    if (typeof this.value === 'undefined') this.value = [];
    let index = this.value.indexOf(node.id);
    if (index >= 0) {
      this.value.splice(index, 1);
      this.value = [...this.value];
    } else this.value = [...this.value, node.id];
    this.cdr.detectChanges();
    if (this.onChange) this.onChange(this.value);
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  private setData() {
    XSetData<XCheckboxNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.cdr.detectChanges();
    });
  }
}
