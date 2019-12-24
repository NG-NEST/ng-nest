import {
  Component,
  OnInit,
  OnChanges,
  ViewEncapsulation,
  HostBinding,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  ViewChild,
  SimpleChanges,
  ChangeDetectorRef
} from "@angular/core";
import { XButtonPrefix, XButtonType, XButtonInput } from "./button.type";
import { fillDefault, XDirection, XSize, XInputBoolean } from "@ng-nest/ui/core";

@Component({
  selector: `${XButtonPrefix}`,
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XButtonComponent implements OnInit, OnChanges {
  @Input() type?: XButtonType;
  @Input() label?: string;
  @Input() icon?: string;
  @Input() title?: string;
  @Input() @XInputBoolean() onlyIcon?: boolean;
  @Input() @XInputBoolean() activated?: boolean;
  @Input() @XInputBoolean() disabled?: boolean;
  @Input() @XInputBoolean() plain?: boolean;
  @Input() @XInputBoolean() round?: boolean;
  @Input() @XInputBoolean() circle?: boolean;
  @Input() direction?: XDirection;
  @Input() @XInputBoolean() loading?: boolean;
  @Input() size?: XSize;
  @ViewChild("buttonInner", { static: true }) buttonInner: ElementRef;
  @HostBinding("class.x-button-label") get getLabel() {
    return !this.icon && this.label;
  }
  @HostBinding("class.x-button-icon") get getIcon() {
    return !this.label && this.icon;
  }
  @HostBinding("class.x-button-only-icon") get getOnlyIcon() {
    return this.onlyIcon;
  }
  @HostBinding("class.x-button-activated") get getActivated() {
    return this.activated;
  }
  @HostBinding("class.x-button-disabled") get getDisabled() {
    return this.disabled;
  }
  @HostBinding("class.x-button-round") get getRound() {
    return this.round;
  }
  @HostBinding("class.x-button-circle") get getCircle() {
    return this.circle;
  }
  private _default: XButtonInput = {
    label: ""
  };
  constructor(private renderer: Renderer2, private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    this.renderer.addClass(this.elementRef.nativeElement, XButtonPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    if (this.title) this.renderer.setAttribute(this.elementRef.nativeElement, "title", this.title);
    if (this.type && !this.plain) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XButtonPrefix}-${this.type}`);
    }
    if (this.type && this.plain) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XButtonPrefix}-${this.type}-plain`);
    } else if (this.plain) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XButtonPrefix}-plain`);
    }
    if (this.direction) {
      this.renderer.addClass(this.buttonInner.nativeElement, `${XButtonPrefix}-inner-direction-${this.direction}`);
    }
    if (this.size) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XButtonPrefix}-${this.size}`);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    let loading = changes.loading;
    if (loading && loading.currentValue != loading.previousValue) {
      this.disabled = this.loading;
    }
    let disabled = changes.disabled;
    if (disabled && disabled.currentValue != disabled.previousValue) {
      this.cdr.markForCheck();
    }
    let label = changes.label;
    if (label && label.currentValue != label.previousValue) {
      this.cdr.markForCheck();
    }
  }
}
