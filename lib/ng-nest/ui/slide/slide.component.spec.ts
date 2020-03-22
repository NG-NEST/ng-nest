import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XSlideComponent } from './slide.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSlideModule } from './slide.module';
import { XSlidePrefix, XSlideNode } from './slide.type';
import { XData } from '@ng-nest/ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(XSlidePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XSlideModule, BrowserAnimationsModule],
      declarations: [TestXSlideComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXSlideComponent>;
    let slide: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSlideComponent);
      fixture.detectChanges();
      slide = fixture.debugElement.query(By.directive(XSlideComponent));
    });
    it('should create.', () => {
      expect(slide).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-slide [data]="data" activatedIndex="6"> </x-slide>
    </div>
    <!-- <div class="row">
      <x-slide [data]="data" activatedIndex="1" layout="column"> </x-slide>
    </div> -->
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXSlideComponent {
  data: XData<XSlideNode[]> = ['用户管理', '配置管理', '角色管理', '任务', '工作', '消息', '流程', '新闻'];
}
