import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { XCheckboxPrefix, XCheckboxNode, XCheckboxProperty } from './checkbox.property';
import { Subject } from 'rxjs';
import { XIsChange, XSetData, XClearClass, XConfigService, XBoolean, XJustify, XAlign, XDirection } from '@ng-nest/ui/core';
import { XValueAccessor } from '@ng-nest/ui/base-form';

@Component({
  selector: `${XCheckboxPrefix}`,
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XCheckboxComponent)]
})
export class XCheckboxComponent extends XCheckboxProperty implements OnChanges {
  @ViewChild('checkbox', { static: true }) checkbox!: ElementRef<HTMLElement>;
  checkboxType: 'initial' | 'button' | 'icon' | 'tag' = 'initial';

  override writeValue(value: boolean | Array<any>) {
    this.value = value;
    this.cdr.detectChanges();
  }

  get beforeIsTemplate() {
    return this.before instanceof TemplateRef;
  }

  get afterIsTemplate() {
    return this.after instanceof TemplateRef;
  }

  getDisabled(disabled?: boolean) {
    return (this.disabled || disabled) as XBoolean;
  }

  nodes: XCheckboxNode[] = [];
  single: boolean = false;
  private _unSubject = new Subject<void>();
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public override cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setFlex(this.checkbox.nativeElement, this.renderer, this.justify as XJustify, this.align as XAlign, this.direction as XDirection);
    this.setClassMap();
    this.setCheckboxType();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  setCheckboxType() {
    if (this.button) {
      this.checkboxType = 'button';
      return;
    }
    if (this.icon) {
      this.checkboxType = 'icon';
      return;
    }
    if (this.tag) {
      this.checkboxType = 'tag';
      return;
    }
  }

  checkboxClick(event: Event, node: XCheckboxNode) {
    event.preventDefault();
    if (this.disabled || node.disabled) return;
    this.formControlValidator();
    if (this.single) {
      this.value = !this.value;
    } else {
      this.value = (this.value as Array<any>) || [];
      let index = this.value.indexOf(node.id);
      if (index >= 0) {
        this.value.splice(index, 1);
        this.value = [...this.value];
      } else this.value = [...this.value, node.id];
    }
    this.cdr.detectChanges();
    if (this.onChange) this.onChange(this.value);
  }

  getChecked(id: any): boolean {
    if (this.single) return this.value as boolean;
    else return Array.isArray(this.value) && this.value.includes(id);
  }

  private setData() {
    XSetData<XCheckboxNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.single = this.nodes.length === 1;
      this.cdr.detectChanges();
    });
  }

  trackByItem(_index: number, item: XCheckboxNode) {
    return item.id;
  }

  formControlChanges() {
    this.setData();
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}
