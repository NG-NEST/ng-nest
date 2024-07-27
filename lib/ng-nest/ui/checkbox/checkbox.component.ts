import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  OnDestroy,
  computed,
  viewChild,
  signal,
  effect
} from '@angular/core';
import { XCheckboxPrefix, XCheckboxNode, XCheckboxProperty } from './checkbox.property';
import { Subject } from 'rxjs';
import { XIsChange, XSetData } from '@ng-nest/ui/core';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XTagComponent } from '@ng-nest/ui/tag';
import { FormsModule } from '@angular/forms';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgClass } from '@angular/common';

@Component({
  selector: `${XCheckboxPrefix}`,
  standalone: true,
  imports: [NgClass, FormsModule, XButtonComponent, XButtonsComponent, XTagComponent, XOutletDirective],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XCheckboxComponent)]
})
export class XCheckboxComponent extends XCheckboxProperty implements OnChanges, OnDestroy {
  checkbox = viewChild.required('checkbox', { read: ElementRef<HTMLElement> });

  beforeIsTemplate = computed(() => this.before() instanceof TemplateRef);
  afterIsTemplate = computed(() => this.after() instanceof TemplateRef);

  nodes = signal<XCheckboxNode[]>([]);
  private unSubject = new Subject<void>();

  classMap = computed(() => ({
    [`x-justify-${this.justify()}`]: !!this.justify(),
    [`x-align-${this.align()}`]: !!this.align(),
    [`x-direction-${this.direction()}`]: !!this.direction()
  }));
  labelMapSignal = computed(() => ({
    [`x-text-align-${this.labelAlign()}`]: !!this.labelAlign()
  }));
  checkboxType = computed(() => {
    if (this.button()) {
      return 'button';
    } else if (this.icon()) {
      return 'icon';
    } else if (this.tag()) {
      return 'tag';
    } else {
      return 'initial';
    }
  });

  constructor() {
    super();
    effect(
      () => {
        this.value();
        this.setChecked();
      },
      { allowSignalWrites: true }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
  }

  checkboxClick(event: Event, node: XCheckboxNode) {
    event.preventDefault();
    if (this.disabledComputed() || node.disabled) return;
    this.formControlValidator();
    if (this.single()) {
      this.value.update((x) => !x);
    } else {
      this.value.set((this.value() as Array<any>) || []);
      let index = this.value().indexOf(node.id);
      if (index >= 0) {
        this.value().splice(index, 1);
        this.value.set([...this.value()]);
      } else this.value.set([...this.value(), node.id]);
    }
    if (this.onChange) this.onChange(this.value());
  }

  isChecked(id: any): boolean {
    if (this.single()) return this.value() as boolean;
    else return Array.isArray(this.value()) && this.value().includes(id);
  }

  setChecked() {
    this.nodes.update((x) => {
      x.forEach((y) => {
        y.checked = this.isChecked(y.id);
      });
      return [...x];
    });
  }

  private setData() {
    XSetData<XCheckboxNode>(this.data(), this.unSubject).subscribe((x) => {
      this.nodes.set(x);
    });
  }
}
