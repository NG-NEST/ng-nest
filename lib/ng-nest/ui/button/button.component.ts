import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostBinding,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  ViewChild
} from "@angular/core";
import { ButtonPrefix, XButtonType, XButtonOption } from "./button.type";
import { fillDefault, XJustify, XDirection } from "@ng-nest/ui/core";

@Component({
  selector: "x-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XButtonComponent implements OnInit {
  @Input() type?: XButtonType;
  @Input() label?: string;
  @Input() icon?: string;
  @Input() title?: string;
  @Input() activated?: boolean;
  @Input() disabled?: boolean;
  @Input() plain?: boolean;
  @Input() round?: boolean;
  @Input() circle?: boolean;
  @Input() direction?: XDirection;
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
  }
}
