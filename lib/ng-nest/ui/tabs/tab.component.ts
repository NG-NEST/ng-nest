import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { XTemplate } from '@ng-nest/ui/core';

@Component({
  selector: 'x-tab',
  templateUrl: './tab.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTabComponent implements OnInit {
  @Input() label: XTemplate;
  @ViewChild(TemplateRef, { static: true }) content: TemplateRef<void>;
  constructor() {}

  ngOnInit() {}
}
