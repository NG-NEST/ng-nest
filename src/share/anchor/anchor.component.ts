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
  ViewChild,
  OnDestroy
} from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { LayoutService } from "src/main/layout/layout.service";
import { Subscription } from "rxjs";
import { reqAnimFrame } from "../core/animation";

@Component({
  selector: "[nm-anchor]",
  templateUrl: "./anchor.component.html",
  styleUrls: ["./anchor.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmAnchorComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding("class.nm-anchor") className() {
    return true;
  }
  @ViewChild("highlight") highlight: ElementRef;
  hList: HTMLElement[];
  list: NmAnchorNode[];
  active: number = 0;
  scrollSub: Subscription;
  isAnimation: boolean = false;
  constructor(
    private ele: ElementRef,
    private render: Renderer2,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private layout: LayoutService
  ) {}

  ngOnInit() {
    this.subject();
  }

  ngAfterViewInit() {
    this.setList();
  }

  ngOnDestroy(): void {
    if (this.scrollSub) this.scrollSub.unsubscribe();
  }

  subject() {
    let timeout;
    this.scrollSub = this.layout.contentScrolling.subscribe(x => {
      if (!this.isAnimation) {
        const scrollTop = this.layout.contentRef.nativeElement.scrollTop;
        let now = 0;
        this.hList.forEach((item, index) => {
          if (scrollTop >= item.offsetTop - 16) {
            now = index;
            return;
          }
        });
        this.active = now;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.topTo(
            this.highlight.nativeElement,
            this.highlight.nativeElement.clientHeight * this.active,
            100
          );
        }, 100);
        this.cdr.detectChanges();
      }
    });
  }

  setList() {
    this.hList = this.ele.nativeElement.querySelectorAll("h1, h2, h3, h4, h5");
    if (this.hList.length > 0) {
      this.render.addClass(this.ele.nativeElement, "nm-anchor-open");
      let _list: NmAnchorNode[] = [];
      this.hList.forEach((x: HTMLElement, i: number) => {
        const link = `link-${i}`;
        const left = this.setLeft(x);
        this.render.setAttribute(x, "id", link);
        _list = [
          ..._list,
          {
            id: i,
            title: x.innerText,
            left: left,
            icon: left > 1 ? "cicle" : "corners",
            router: `${this.location.path()}`,
            link: link
          }
        ];
      });
      this.list = _list;
      this.cdr.detectChanges();
    }
  }

  setLeft(element: HTMLElement): number {
    const eles = ["H1", "H2", "H3", "H4", "H5"];
    const index = eles.indexOf(element.tagName);
    return index + 1;
  }

  nav(item: NmAnchorNode, index: number) {
    this.isAnimation = true;
    this.active = index;
    this.router.navigate([item.router], { fragment: item.link });
    const offsetTop = this.hList[index].offsetTop - 16;
    const scrollH =
      this.layout.contentRef.nativeElement.scrollHeight -
      this.layout.contentRef.nativeElement.clientHeight;
    this.scrollTo(
      this.layout.contentRef.nativeElement,
      offsetTop <= scrollH ? offsetTop : scrollH,
      150
    );
    this.topTo(
      this.highlight.nativeElement,
      this.highlight.nativeElement.clientHeight * this.active,
      150
    );
    setTimeout(() => {
      this.isAnimation = false;
    }, 300);
  }

  topTo(element: HTMLElement, to: number, duration: number): void {
    if (duration <= 0) {
      this.render.setStyle(element, "top", `${to}px`);
      return;
    }
    const difference = to - element.offsetTop;
    const perTick = (difference / duration) * 10;

    reqAnimFrame(() => {
      this.render.setStyle(element, "top", `${element.offsetTop + perTick}px`);
      if (element.offsetTop === to) {
        return;
      }
      this.topTo(element, to, duration - 10);
    });
  }

  scrollTo(element: HTMLElement, to: number, duration: number): void {
    if (duration <= 0) {
      element.scrollTop = to;
      return;
    }
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;

    reqAnimFrame(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) {
        return;
      }
      this.scrollTo(element, to, duration - 10);
    });
  }
}

export interface NmAnchorNode {
  id?: number | string;
  router?: string;
  link?: string;
  left?: number;
  title?: string;
  icon?: string;
}
