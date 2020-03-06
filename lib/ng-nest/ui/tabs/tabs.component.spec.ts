import { BehaviorSubject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XTabsComponent } from './tabs.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTabsModule } from './tabs.module';
import { TabsPrefix, XTabsNode, XTabsLayoutType } from './tabs.type';
import { XData } from '@ng-nest/ui/core';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XCarouselModule } from '@ng-nest/ui/carousel';

describe(TabsPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XTabsModule, XFenceModule, XCarouselModule],
      declarations: [TestXTabsComponent, TestEventXTabsComponent, TestDataXTabsComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTabsComponent>;
    let testComponent: TestXTabsComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTabsComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XTabsComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
    it('should className.', () => {
      fixture.detectChanges();
      expect(element.classList).toContain(TabsPrefix);
    });
    it('should layout top.', () => {
      testComponent.layout = 'top';
      fixture.detectChanges();
      expect(element.classList).toContain(`${TabsPrefix}-top`);
    });
    it('should layout right.', () => {
      testComponent.layout = 'right';
      fixture.detectChanges();
      expect(element.classList).toContain(`${TabsPrefix}-right`);
    });
    it('should layout bottom.', () => {
      testComponent.layout = 'bottom';
      fixture.detectChanges();
      expect(element.classList).toContain(`${TabsPrefix}-bottom`);
    });
    it('should layout left.', () => {
      testComponent.layout = 'left';
      fixture.detectChanges();
      expect(element.classList).toContain(`${TabsPrefix}-left`);
    });
    it('should activatedIndex 1.', () => {
      testComponent.activatedIndex = 1;
      fixture.detectChanges();
      expect(element.classList).toContain(TabsPrefix);
    });
  });
});

const testXTabsNode: XTabsNode[] = [
  { id: 1, label: 'Home' },
  { id: 2, label: 'Docs' },
  { id: 3, label: 'Examples' },
  { id: 4, label: 'Api' }
];

@Component({
  selector: 'test-x-tabs',
  template: `
    <x-tabs [layout]="layout" [activatedIndex]="activatedIndex">
      <x-tab [label]="'Home'">
        <div class="row">
          <x-carousel height="12rem">
            <x-carousel-panel *ngFor="let item of list">
              <h3>{{ item }}</h3>
            </x-carousel-panel>
          </x-carousel>
        </div>
      </x-tab>
      <x-tab [label]="'Docs'">
        <x-tabs [layout]="'left'">
          <x-tab [label]="'Home'">
            <div class="row">
              <x-carousel height="12rem">
                <x-carousel-panel *ngFor="let item of list">
                  <h3>{{ item }}</h3>
                </x-carousel-panel>
              </x-carousel>
            </div>
          </x-tab>
          <x-tab [label]="'Docs'">doc </x-tab>
          <x-tab [label]="'Examples'">examples </x-tab>
          <x-tab [label]="'Api'">api </x-tab>
        </x-tabs>
      </x-tab>
      <x-tab [label]="'Examples'">examples </x-tab>
      <x-tab [label]="'Api'">api </x-tab>
    </x-tabs>
  `,
  styles: [
    `
      .row {
        width: 24rem;
        padding: 1.625rem 1rem;
        background-color: white;
      }
      .row:not(:first-child) {
        margin-top: 2rem;
      }
      .row x-carousel-panel:nth-child(odd) {
        background-color: var(--x-info-800);
      }
      .row x-carousel-panel:nth-child(even) {
        background-color: var(--x-info-600);
      }
      .row x-carousel-panel h3 {
        text-align: center;
        line-height: 12rem;
        margin: 0;
        color: var(--x-text-500);
      }
    `
  ]
})
class TestXTabsComponent {
  list = [1, 2, 3, 4, 5];
  layout: XTabsLayoutType;
  position: XTabsLayoutType;
  activatedIndex: number = 0;
}

@Component({
  selector: 'test-event-x-tabs',
  template: `
    <x-tabs [data]="data" (indexChange)="activatedChange($event)"></x-tabs>
  `
})
class TestEventXTabsComponent {
  data: XData<XTabsNode[]> = testXTabsNode;
  activatedChange() {}
}

@Component({
  selector: 'test-data-x-tabs',
  template: `
    <x-tabs [data]="data"></x-tabs>
  `
})
class TestDataXTabsComponent {
  data: XData<XTabsNode[]> = new BehaviorSubject([]);
}
