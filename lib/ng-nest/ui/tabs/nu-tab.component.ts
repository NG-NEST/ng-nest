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
  selector: "nu-tab",
  templateUrl: "./nu-tab.component.html",
  // Todo: 使用 ShadowDom 模式后，模板中使用 ng-content 里面的内容无法显示
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuTabComponent implements OnInit {
  @Input() nuLabel: string;
  @ViewChild(TemplateRef, { static: false }) content: TemplateRef<void>;
  constructor() {}

  ngOnInit() {}
}
