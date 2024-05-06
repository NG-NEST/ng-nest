import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ElementRef,
  Renderer2,
  inject,
  OnDestroy,
  AfterViewInit,
  computed,
  contentChildren,
  viewChild
} from '@angular/core';
import { XTabsPrefix, XTabsNode, XTabsProperty } from './tabs.property';
import { XIsEmpty, XConfigService, XResize, XResizeObserver } from '@ng-nest/ui/core';
import { Subject, takeUntil, filter, startWith, delay } from 'rxjs';
import { XSliderComponent } from '@ng-nest/ui/slider';
import { XTabComponent } from './tab.component';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { XTabContentComponent } from './tab-content.component';

@Component({
  selector: `${XTabsPrefix}`,
  standalone: true,
  imports: [NgClass, XSliderComponent, XTabContentComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTabsComponent extends XTabsProperty implements OnDestroy, AfterViewInit {
  sliderLayout = computed(() => (['top', 'bottom'].indexOf(this.layout()) !== -1 ? 'row' : 'column'));
  private unSubject = new Subject<void>();
  private resizeObserver!: XResizeObserver;
  listTabs = contentChildren(XTabComponent, { read: XTabComponent });

  tabs = computed(() => {
    let data = this.data();
    if (XIsEmpty(data)) {
      const listTabs = this.listTabs();
      if (!XIsEmpty(listTabs)) {
        let _data: XTabsNode[] = [];
        listTabs.forEach((x, index) => {
          const label = x.linkTemplateDirective()?.templateRef || x.label();
          const id = x.label() || index;
          _data = [..._data, { id: id, label: label, disabled: x.disabled() }];
        });
        data = _data;
      }
    }
    return data;
  });

  slider = viewChild(XSliderComponent, { read: XSliderComponent });
  actionsRef = viewChild('actionsRef', { read: ElementRef<HTMLElement> });

  private renderer = inject(Renderer2);
  private router = inject(Router, { optional: true });
  configService = inject(XConfigService);

  classMapSignal = computed(() => ({
    [`${XTabsPrefix}-${this.layout()}`]: !XIsEmpty(this.layout()),
    [`${XTabsPrefix}-${this.type()}`]: !XIsEmpty(this.type()),
    [`${XTabsPrefix}-is-first`]: this.activatedIndex() === 0,
    [`${XTabsPrefix}-is-last`]: this.activatedIndex() === this.tabs().length - 1
  }));

  nodeJustifySignal = computed(() =>
    this.nodeJustify()
      ? this.nodeJustify()
      : this.layout() === 'left'
        ? 'end'
        : this.layout() === 'right'
          ? 'start'
          : 'center'
  );

  sliderHiddenSignal = computed(() => {
    const sliderHidden = this.sliderHidden();
    if (!sliderHidden && !this.actionTpl()) {
      return this.tabs().length <= 1;
    }
    return sliderHidden;
  });

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.unsubscribe();
    this.resizeObserver?.disconnect();
  }

  ngAfterViewInit() {
    this.setSliderWidth();
    Promise.resolve().then(() => {
      this.setRouter();
    });
  }

  setSliderWidth() {
    if (this.slider() && this.actionsRef()) {
      XResize(this.actionsRef()?.nativeElement)
        .pipe(takeUntil(this.unSubject))
        .subscribe((x) => {
          this.resizeObserver = x.resizeObserver;
          this.renderer.setStyle(
            this.slider()?.elementRef.nativeElement,
            'width',
            `calc(100% - ${this.actionsRef()?.nativeElement.clientWidth}px)`
          );
        });
    }
  }

  setRouter() {
    if (!this.linkRouter) return;
    if (!this.router) {
      console.warn(`${XTabsPrefix}: you should import 'RouterModule' if you want to use 'linkRouter'!`);
      return;
    }
    this.router.events
      .pipe(
        filter((x) => x instanceof NavigationEnd),
        startWith(true),
        delay(0),
        takeUntil(this.unSubject)
      )
      .subscribe(() => {
        this.updateRouterActive();
      });
  }

  updateRouterActive() {
    if (!this.router?.navigated) return;
    const index = this.findShouldActiveTabIndex();
    if (index !== -1 && index !== this.activatedIndex()) {
      this.activatedIndex.set(index);
    }
  }

  findShouldActiveTabIndex(): number {
    const tabs = this.listTabs();
    const isActive = this.isLinkActive(this.router!);

    return tabs.findIndex((tab) => {
      const c = tab.linkDirective();
      return c ? isActive(c.routerLink) || isActive(c.routerLinkWithHref) : false;
    });
  }

  isLinkActive(router: Router): (link?: RouterLink | RouterLink) => boolean {
    return (link?: RouterLink | RouterLink) => {
      router.isActive;
      return link
        ? router.isActive(
            link.urlTree!,
            this.linkExact()
              ? {
                  paths: 'exact',
                  queryParams: 'exact',
                  fragment: 'ignored',
                  matrixParams: 'ignored'
                }
              : {
                  paths: 'subset',
                  queryParams: 'subset',
                  fragment: 'ignored',
                  matrixParams: 'ignored'
                }
          )
        : false;
    };
  }

  activatedChange(index: number) {
    this.activatedIndex.set(index);
    this.indexChange.emit({
      activatedIndex: index,
      activatedTab: this.tabs()[index]
    });
  }
}
