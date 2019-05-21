import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild
} from "@angular/core";

@Component({
  selector: "nm-tab",
  templateUrl: "./nm-tab.component.html",
  // Todo: 使用 ShadowDom 模式后，模板中使用 ng-content 里面的内容无法显示
  // encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmTabComponent implements OnInit {
  @ViewChild(TemplateRef) content: TemplateRef<void>;
  constructor() {}

  ngOnInit() {}
}
