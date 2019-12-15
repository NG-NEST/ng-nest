import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  Renderer2,
  ElementRef,
  Input
} from "@angular/core";
import { XControlOption } from "./form.type";
import { fillDefault, removeNgTag } from "@ng-nest/ui/core";

@Component({
  selector: "x-control",
  templateUrl: "./control.component.html",
  styleUrls: ["./control.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XControlComponent implements OnInit, OnChanges {
  @Input() option: any | XControlOption;

  private _default: any | XControlOption = {};

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {
    fillDefault(this.option, this._default);
    removeNgTag(this.elementRef.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    this.removeListen();
  }

  private removeListen() {}
}
