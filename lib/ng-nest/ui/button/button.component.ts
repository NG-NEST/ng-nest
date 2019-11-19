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
  SimpleChanges
} from "@angular/core";
import { ButtonPrefix, XButtonType, XButtonOption } from "./button.type";
import { fillDefault, XDirection, XSize } from "@ng-nest/ui/core";

@Component({
  selector: "x-button",
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
  @Input() activated?: boolean | string;
  @Input() disabled?: boolean | string;
  @Input() plain?: boolean | string;
  @Input() round?: boolean | string;
  @Input() circle?: boolean | string;
  @Input() direction?: XDirection;
  @Input() loading?: boolean | string;
  @Input() size?: XSize;
  @ViewChild("buttonInner", { static: true }) buttonInner: ElementRef;
  @HostBinding("class.x-button-label") get getLabel() {
    return !this.icon && this.label;
  }
  @HostBinding("class.x-button-icon") get getIcon() {
    return !this.label && this.icon;
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
  private _default: XButtonOption = {
    label: ""
  };
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, ButtonPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.stringToBoolean();
    if (this.title) this.renderer.setAttribute(this.elementRef.nativeElement, "title", this.title);
    if (this.type && !this.plain) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ButtonPrefix}-${this.type}`);
    }
    if (this.type && this.plain) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ButtonPrefix}-${this.type}-plain`);
    } else if (this.plain) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ButtonPrefix}-plain`);
    }
    if (this.direction) {
      this.renderer.addClass(this.buttonInner.nativeElement, `${ButtonPrefix}-inner-direction-${this.direction}`);
    }
    if (this.size) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ButtonPrefix}-${this.size}`);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    let loading = changes.loading;
    if (loading && loading.currentValue != loading.previousValue) {
      this.disabled = this.loading;
    }
  }

  stringToBoolean() {
    this.plain = this.plain || this.plain === "" ? true : false;
    this.disabled = this.disabled || this.disabled === "" ? true : false;
    this.activated = this.activated || this.activated === "" ? true : false;
    this.circle = this.circle || this.circle === "" ? true : false;
    this.round = this.round || this.round === "" ? true : false;
    this.loading = this.loading || this.loading === "" ? true : false;
  }
}
