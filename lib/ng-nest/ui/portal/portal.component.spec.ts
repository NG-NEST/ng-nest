import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, TemplateRef, ViewContainerRef, viewChild } from '@angular/core';
import { XPortalPrefix } from './portal.property';
import { XPortalService } from './portal.service';
import { Overlay } from '@angular/cdk/overlay';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XPortalPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXPortalComponent],
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
  temp = viewChild.required<TemplateRef<any>>('temp');
  constructor(
    private portal: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay
  ) {}
  showPortal() {
    this.portal.attach({
      content: this.temp(),
      viewContainerRef: this.viewContainerRef,
      context: { text: '名字' },
      overlayConfig: {
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
      }
    });
  }
}
