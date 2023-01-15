import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Host,
  Optional
} from '@angular/core';
import { XCollapsePanelPrefix, XCollapsePanelProperty } from './collapse.property';
import { XDropAnimation } from '@ng-nest/ui/core';
import { XCollapseComponent } from './collapse.component';

@Component({
  selector: `${XCollapsePanelPrefix}`,
  templateUrl: './collapse-panel.component.html',
  styleUrls: ['./collapse-panel.component.scss'],
  animations: [XDropAnimation],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCollapsePanelComponent extends XCollapsePanelProperty implements OnInit {
  index!: number;

  constructor(
    @Optional() @Host() public collapseComponent: XCollapseComponent,
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.index = this.collapseComponent.start;
    this.collapseComponent.start++;
    this.collapseComponent.panelChanges = [
      ...this.collapseComponent.panelChanges,
      () => {
        this.headerClick();
      }
    ];
    if (this.active) this.collapseComponent.change(this.index);
  }

  headerClick() {
    this.active = !this.active;
    if (this.active) this.collapseComponent.change(this.index);
    else this.collapseComponent.change(this.index, false);
    this.cdr.detectChanges();
  }
}
