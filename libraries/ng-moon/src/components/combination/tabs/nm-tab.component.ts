import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input,
  ViewEncapsulation
} from "@angular/core";

@Component({
  selector: "nm-tab",
  templateUrl: "./nm-tab.component.html",
  // Todo: 使用 ShadowDom 模式后，模板中使用 ng-content 里面的内容无法显示
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmTabComponent implements OnInit {
  @Input() nmLabel: string;
  @ViewChild(TemplateRef, { static: false }) content: TemplateRef<void>;
  constructor() {}

  ngOnInit() {}
}
