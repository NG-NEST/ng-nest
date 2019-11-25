import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  Inject
} from "@angular/core";
import { XTypographyPrefix } from "./typography.type";

@Component({
  selector: "x-typography",
  templateUrl: "./typography.component.html",
  styleUrls: ["./style/index.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTypographyComponent implements OnInit {
  @Input() font?: string = "Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif";
  @Input() text?: string;
  firstText: string;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, XTypographyPrefix);
  }

  ngOnInit() {
    if (this.font) this.renderer.setStyle(this.elementRef.nativeElement, "font-family", this.font);
    if (this.text.length > 0) this.firstText = this.text.slice(0, 1);
  }
}
