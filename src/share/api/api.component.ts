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
  selector: "nm-api",
  templateUrl: "./api.component.html",
  styleUrls: ["./api.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmApiComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding("class.nm-api") className() {
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
