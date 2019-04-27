import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostBinding,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "nm-panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmPanelComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding("class.nm-panel") className() {
    return true;
  }

  constructor(private ele: ElementRef, private render: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setElements();
  }

  ngOnDestroy(): void {

  }

  setElements() {

  }
}
