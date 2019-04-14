import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  ElementRef,
  HostBinding,
  Renderer2,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild
} from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ScrollDispatcher, CdkScrollable } from "@angular/cdk/scrolling";

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
  @ViewChild("scrolling") scrollingRef: ElementRef;
  list: NmAnchorNode[];
  active: number = 0;
  constructor(
    private ele: ElementRef,
    private render: Renderer2,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const hList = this.ele.nativeElement.querySelectorAll("h1, h2, h3, h4, h5");
    if (hList.length > 0) {
      this.render.addClass(this.ele.nativeElement, "nm-anchor-open");
      let _list: NmAnchorNode[] = [];
      hList.forEach((x: HTMLElement, i: number) => {
        const link = `link-${i}`;
        this.render.setAttribute(x, "id", link);
        _list = [
          ..._list,
          {
            id: `${i}`,
            title: x.innerText,
            left: this.setLeft(x),
            router: `${this.location.path()}`,
            link: link
          }
        ];
      });
      this.list = _list;
      this.cdr.detectChanges();
    }
    this.scrollDispatcher
      .ancestorScrolled(this.scrollingRef)
      .subscribe((scrollable: CdkScrollable) => {
        if (scrollable) {
          console.log("祖先发生scroll了，來源于：");
          console.log(scrollable.getElementRef().nativeElement);
        }
      });
  }

  setLeft(element: HTMLElement): number {
    const eles = ["H1", "H2", "H3", "H4", "H5"];
    const index = eles.indexOf(element.tagName);
    return index + 1;
  }

  nav(item: NmAnchorNode, index: number) {
    this.active = index;
    this.router.navigate([item.router], { fragment: item.link });
  }
}

export interface NmAnchorNode {
  id?: number | string;
  router?: string;
  link?: string;
  left?: number;
  title?: string;
}
