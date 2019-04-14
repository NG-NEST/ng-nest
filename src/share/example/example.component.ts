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
import { Subscribable } from "rxjs";

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
  menus: HTMLElement[];
  contents: HTMLElement[];
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
    this.menus = this.ele.nativeElement.querySelectorAll("ul.menus>li");
    this.contents = this.ele.nativeElement.querySelectorAll("div.contents>div");
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
    this.contents.forEach((content, index) => {
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
    this.render.addClass(this.contents[index], "active");
    this.activeContent = this.contents[index];
  }
}
