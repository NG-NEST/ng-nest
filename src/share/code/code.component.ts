import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  HostBinding,
  Renderer2,
  ChangeDetectionStrategy,
  Input
} from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "nm-code",
  templateUrl: "./code.component.html",
  styleUrls: ["./code.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmCodeComponent implements OnInit {
  @HostBinding("class.nm-anchor") className() {
    return true;
  }
  @Input("nmCode") code: string;
  @Input("nmCodeType") codeType: NmCodeType;
  safeCode: SafeHtml;
  constructor(
      ) {}

  ngOnInit() {
    this.setCode();
  }

  setCode() {
    // 去除首尾的换行和空格
    this.safeCode = this.code.replace(/(^\s*)|(\s*$)/g, "");
  }
}

export enum NmCodeType {
  TypeScript = "ts",
  HTML = "html",
  SCSS = "scss"
}
