import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, TemplateRef, ViewContainerRef, ViewChild } from '@angular/core';
import { XPortalModule } from '@ng-nest/ui/portal';
import { PortalPrefix } from './portal.property';
import { XPortalService } from './portal.service';
import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(PortalPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, XPortalModule],
      declarations: [TestXPortalComponent]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXPortalComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXPortalComponent);
      fixture.detectChanges();
    });
    it('should create.', () => {
      expect(true).toBe(true);
    });
  });
});

@Component({
  selector: 'test-x-portal',
  template: `
    <button (click)="showPortal()">打开模板</button>
    <ng-template #temp let-text="text">{{ text }}模板内容</ng-template>
  `
})
class TestXPortalComponent {
  @ViewChild('temp') temp!: TemplateRef<any>;
  constructor(private portal: XPortalService, private viewContainerRef: ViewContainerRef, private overlay: Overlay) {}
  showPortal() {
    this.portal.attach({
      content: this.temp,
      viewContainerRef: this.viewContainerRef,
      context: { text: '名字' },
      overlayConfig: {
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
      }
    });
  }
}
