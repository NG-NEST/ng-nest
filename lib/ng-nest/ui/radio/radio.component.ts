import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  OnDestroy,
  viewChild,
  signal,
  computed
} from '@angular/core';
import { XRadioPrefix, XRadioNode, XRadioProperty } from './radio.property';
import { Subject } from 'rxjs';
import { XIsChange, XSetData } from '@ng-nest/ui/core';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XTagComponent } from '@ng-nest/ui/tag';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XRadioPrefix}`,
  standalone: true,
  imports: [NgClass, FormsModule, XButtonComponent, XButtonsComponent, XTagComponent, XOutletDirective],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XRadioComponent)]
})
export class XRadioComponent extends XRadioProperty implements OnChanges, OnDestroy {
  radio = viewChild.required('radio', { read: ElementRef<HTMLElement> });
  nodes = signal<XRadioNode[]>([]);
  private unSubject = new Subject<void>();

  beforeIsTemplate = computed(() => this.before() instanceof TemplateRef);
  afterIsTemplate = computed(() => this.after() instanceof TemplateRef);

  classMap = computed(() => ({
    [`x-justify-${this.justify()}`]: !!this.justify(),
    [`x-align-${this.align()}`]: !!this.align(),
    [`x-direction-${this.direction()}`]: !!this.direction()
  }));
  labelMapSignal = computed(() => ({
    [`x-text-align-${this.labelAlign()}`]: !!this.labelAlign()
  }));
  radioType = computed(() => {
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

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
  }

  radioClick(event: Event, node: XRadioNode) {
    event.preventDefault();
    if (this.disabledComputed() || node.disabled || (!this.allowCancel() && node.id === this.value())) return;
    this.formControlValidator();
    if (this.allowCancel() && node.id === this.value()) {
      this.value.set(null);
    } else {
      this.value.set(node.id);
    }
    if (this.onChange) this.onChange(this.value());
  }

  private setData() {
    XSetData<XRadioNode>(this.data(), this.unSubject).subscribe((x) => {
      this.nodes.set(x);
    });
  }
}
