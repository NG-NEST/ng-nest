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
import { reqAnimFrame } from "../core/animation";

@Component({
  selector: "nm-example",
  templateUrl: "./example.component.html",
  styleUrls: ["./example.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmExampleComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding("class.nm-example") className() {
    return true;
  }
  ulMenus: HTMLElement;
  menus: HTMLElement[];
  contents: HTMLElement;
  contentRows: HTMLElement[];
  menuHighlight: HTMLElement;
  menusClickSub = [];
  activeMenu: HTMLElement;
  activeContent: HTMLElement;
  constructor(private ele: ElementRef, private render: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setElements();
  }

  ngOnDestroy(): void {
    if (this.menus) {
    }
  }

  setElements() {
    this.ulMenus = this.ele.nativeElement.querySelector("ul.menus");
    if (this.ulMenus) {
      this.menuHighlight = document.createElement("li");
      this.menus = this.ele.nativeElement.querySelectorAll("ul.menus>li");
      this.menus.forEach((menu, index) => {
        // toDo: unlisten click
        const click = this.render.listen(menu, "click", () => {
          this.menuClick(menu, index);
        });
        if (index === 0) {
          this.render.addClass(menu, "active");
          this.activeMenu = menu;
        }
        this.menusClickSub.push(click);
      });
      this.render.addClass(this.menuHighlight, "menu-highlight");
      this.render.appendChild(this.ulMenus, this.menuHighlight);
    }

    this.contents = this.ele.nativeElement.querySelector("div.contents");
    this.contentRows = this.ele.nativeElement.querySelectorAll("div.contents>div.row");

    this.contentRows.forEach((content, index) => {
      if (index === 0) {
        this.render.addClass(content, "active");
        this.activeContent = content;
      }
    });
  }

  menuClick(menu: HTMLElement, index: number) {
    this.render.removeClass(this.activeMenu, "active");
    this.render.addClass(menu, "active");
    this.activeMenu = menu;
    this.render.removeClass(this.activeContent, "active");
    this.render.addClass(this.contentRows[index], "active");
    this.activeContent = this.contentRows[index];
    if (this.menuHighlight)
      this.topTo(this.menuHighlight, this.menuHighlight.clientHeight * index, 150);
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
}
