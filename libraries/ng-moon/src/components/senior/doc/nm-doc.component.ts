import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef} from "@angular/core";
import { DocPrefix } from "./nm-doc.type";

@Component({
  selector: "nm-doc",
  templateUrl: "./nm-doc.component.html",
  styleUrls: ["./style/index.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmDocComponent implements OnInit {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, DocPrefix);
  }

  ngOnInit() {}
}
