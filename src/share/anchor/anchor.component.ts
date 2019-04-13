import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  ElementRef,
  HostBinding,
  Renderer2,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { map } from "rxjs/operators";
import { Location } from "@angular/common";

@Component({
  selector: "[nm-anchor]",
  templateUrl: "./anchor.component.html",
  styleUrls: ["./anchor.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmAnchorComponent implements OnInit, AfterViewInit {
  @HostBinding("class.nm-anchor") className() {
    return true;
  }
  list: NmAnchorNode[];
  constructor(
    private ele: ElementRef,
    private render: Renderer2,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const hList = this.ele.nativeElement.querySelectorAll("h1, h2, h3, h4, h5");
    if (hList.length > 0) {
      this.render.addClass(this.ele.nativeElement, "nm-anchor-open");
      let _list: NmAnchorNode[] = [];
      hList.forEach((x: HTMLElement, i: number) => {
        this.render.setAttribute(x, "id", `link-${i}`);
        _list = [
          ..._list,
          {
            id: `${i}`,
            title: x.innerText,
            href: `${this.location.path()}#link-${i}`
          }
        ];
      });
      this.list = _list;
      this.cdr.detectChanges();
    }
  }
}

export interface NmAnchorNode {
  id?: number | string;
  href?: string;
  title?: string;
}
