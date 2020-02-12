import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild
} from "@angular/core";
import { XAvatarPrefix, XAvatarShape, XAvatarFit } from "./avatar.type";
import { XInputBoolean, XSize } from "@ng-nest/ui/core";

@Component({
  selector: `${XAvatarPrefix}`,
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAvatarComponent implements OnInit {
  @Input() label?: string;
  @Input() size?: XSize;
  @Input() icon?: string;
  @Input() shape?: XAvatarShape = "circle";
  @Input() src?: string;
  @Input() fit?: XAvatarFit = "cover";
  @ViewChild("avatar", { static: true }) avatar: ElementRef;
  isImgError: boolean = false;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setShape();
    this.setSize();
  }

  setShape() {
    if (this.shape) {
      this.renderer.addClass(this.avatar.nativeElement, `${XAvatarPrefix}-${this.shape}`);
    }
  }

  setSize() {
    if (this.size) {
      this.renderer.addClass(this.avatar.nativeElement, `${XAvatarPrefix}-${this.size}`);
    }
  }

  imgError(event: Event) {
    this.isImgError = true;
    this.cdr.detectChanges();
  }
}
