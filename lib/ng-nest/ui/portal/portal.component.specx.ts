import { BehaviorSubject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XPortalComponent } from './portal.component';
import { Component, DebugElement, TemplateRef, ViewContainerRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPortalModule } from './portal.module';
import { PortalPrefix } from './portal.type';
import { XData } from '@ng-nest/ui/core';
import { XPortalService } from './portal.service';
import { Overlay } from '@angular/cdk/overlay';

describe(PortalPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XPortalModule],
      declarations: [TestXPortalComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXPortalComponent>;
    let testComponent: TestXPortalComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXPortalComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XPortalComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-portal',
  template: `
    <x-portal></x-portal>
    <button (click)="showPortal()">打开模板</button>
    <ng-template #temp let-text="text">{{ text }}模板内容</ng-template>
  `
})
class TestXPortalComponent {
  @ViewChild('temp', { static: false }) temp: TemplateRef<any>;
  constructor(private portal: XPortalService, private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}
  showPortal() {
    // this.portal.create({
    //   content: this.temp,
    //   viewContainerRef: this.viewContainerRef,
    //   context: { text: "名字" },
    //   overlayConfig: {
    //     positionStrategy: this.overlay
    //       .position()
    //       .global()
    //       .centerHorizontally()
    //       .centerVertically()
    //   }
    // });
  }
}
