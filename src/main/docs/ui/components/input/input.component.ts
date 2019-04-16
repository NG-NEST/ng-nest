import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "ns-input",
  templateUrl: "./input.component.html",
  encapsulation: ViewEncapsulation.None
})
export class InputComponent {
  typescriptCode: string = `
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "ns-news",
    templateUrl: "./news.component.html",
    styleUrls: ["./news.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}`;
  htmlCode: string = `
<section class="main">
  <h1 i18n="@@developing">开发中</h1>
  <p class="text" i18n="@@developing.text">抱歉，这个页面正在设计开发中</p>
  <p class="link">
    <a (click)="push()" i18n="@@home">首页</a>
    <a (click)="back()" i18n="@@back">返回</a>
  </p>
</section>`;
  scssCode: string = `
  @import "src/styles/index";

  ns-index {
    > section {
      > .row {
        display: flex;
        justify-content: flex-start;
        padding: 2rem 0;
        border-bottom: 1px solid $divider-color;
        > .content {
        }
        &:nth-of-type(1) {
          padding-top: 0;
        }
      }
    }
  }`;
}
