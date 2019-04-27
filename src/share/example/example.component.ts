import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostBinding,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Input
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
  @Input() nmLayoutType: "row" | "column" = "row";
  @HostBinding("class.nm-example") className() {
    return true;
  }
  @HostBinding("class.nm-example-column") get row() {
    return this.nmLayoutType === "column";
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
          this.nmLayoutType === "column" &&
            this.render.setStyle(this.menuHighlight, "width", `${menu.clientWidth}px`);
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
    if (!this.menuHighlight) return;
    if (this.nmLayoutType === "column") {
      this.render.setStyle(this.menuHighlight, "width", `${this.activeMenu.clientWidth}px`);
      this.render.setStyle(this.menuHighlight, "left", `${this.activeMenu.offsetLeft}px`);
    } else {
      this.render.setStyle(this.menuHighlight, "top", `${this.activeMenu.offsetTop}px`);
    }
  }

  animation(type: "left" | "top", element: HTMLElement, to: number, duration: number) {
    if (duration <= 0) {
      this.render.setStyle(element, type, `${to}px`);
      return;
    }
    const value = this.getTypeValue(type, element);
    const difference = to - value;
    const perTick = (difference / duration) * 10;
    reqAnimFrame(() => {
      this.render.setStyle(element, type, `${value + perTick}px`);
      if (value === to) {
        return;
      }
      this.animation(type, element, to, duration - 10);
    });
  }

  getTypeValue(type: "left" | "top" | "width", element: HTMLElement) {
    if (type === "left") return element.offsetLeft;
    else if (type === "top") return element.offsetTop;
    else if (type === "width") return element.clientHeight;
  }
}
