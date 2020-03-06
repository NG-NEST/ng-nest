import { BehaviorSubject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XCrumbComponent } from './crumb.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCrumbModule } from './crumb.module';
import { CrumbPrefix, XCrumbNode } from './crumb.type';
import { XData } from '@ng-nest/ui/core';

describe(CrumbPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XCrumbModule],
      declarations: [TestXCrumbComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXCrumbComponent>;
    let testComponent: TestXCrumbComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCrumbComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XCrumbComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
    it('should className.', () => {
      fixture.detectChanges();
      expect(element.classList).toContain(CrumbPrefix);
    });
  });
});

const testXCrumbNode: XCrumbNode[] = [
  { id: 1, label: 'Home' },
  { id: 2, label: 'Docs' },
  { id: 3, label: 'Examples' },
  { id: 4, label: 'Api' }
];

@Component({
  selector: 'test-x-crumb',
  template: `
    <x-crumb [data]="data" (nodeClick)="nodeClick($event)"></x-crumb>
  `
})
class TestXCrumbComponent {
  data: XData<XCrumbNode[]> = testXCrumbNode;
  nodeClick(option) {}
}
