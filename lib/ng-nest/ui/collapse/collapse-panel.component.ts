import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  Host,
  Optional
} from '@angular/core';
import { XCollapsePanelPrefix } from './collapse.type';
import { XInputBoolean, XDropAnimation, XIsString } from '@ng-nest/ui/core';
import { XCollapseComponent } from './collapse.component';

@Component({
  selector: `${XCollapsePanelPrefix}`,
  templateUrl: './collapse-panel.component.html',
  styleUrls: ['./collapse-panel.component.scss'],
  animations: [XDropAnimation],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCollapsePanelComponent implements OnInit {
  @Input() label?: string | TemplateRef<any>;
  @Input() @XInputBoolean() active = false;
  index?: number;
  labelString?: string;
  labelTemp?: TemplateRef<any>;

  constructor(
    @Optional() @Host() public collapseComponent: XCollapseComponent,
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.index = this.collapseComponent.start;
    this.collapseComponent.start++;
    this.collapseComponent.panelChanges = [
      ...this.collapseComponent.panelChanges,
      () => {
        this.headerClick();
      }
    ];
    if (XIsString(this.label)) {
      this.labelString = this.label as string;
    } else {
      this.labelTemp = this.label as TemplateRef<any>;
    }
    if (this.active) this.collapseComponent.change(this.index);
  }

  headerClick() {
    this.active = !this.active;
    if (this.active) this.collapseComponent.change(this.index);
    else this.collapseComponent.change(this.index, false);
    this.cdr.detectChanges();
  }
}
