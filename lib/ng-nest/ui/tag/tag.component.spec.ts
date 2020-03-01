import { XIconModule } from "@ng-nest/ui/icon";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XTagComponent } from "./tag.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XFenceModule } from "@ng-nest/ui/fence";
import { XTagModule } from "./tag.module";
import { FormsModule } from "@angular/forms";
import { XTagPrefix } from "./tag.type";
import { XButtonModule } from "@ng-nest/ui/button";
import { XContainerModule } from "@ng-nest/ui/container";

describe(XTagPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        XTagModule,
        XButtonModule,
        XContainerModule,
        XFenceModule,
        XIconModule
      ],
      declarations: [TestXTagComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTagComponent>;
    let tag: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTagComponent);
      fixture.detectChanges();
      tag = fixture.debugElement.query(By.directive(XTagComponent));
    });
    it("should create.", () => {
      expect(tag).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-tag label="标签"></x-tag>
      <x-tag label="标签" type="primary"></x-tag>
      <x-tag label="标签" type="success"></x-tag>
      <x-tag label="标签" type="warning"></x-tag>
      <x-tag label="标签" type="danger"></x-tag>
      <x-tag label="标签" type="info"></x-tag>
    </div>
    <div class="row">
      <x-tag label="标签" dark></x-tag>
      <x-tag label="标签" type="primary" dark></x-tag>
      <x-tag label="标签" type="success" dark></x-tag>
      <x-tag label="标签" type="warning" dark></x-tag>
      <x-tag label="标签" type="danger" dark></x-tag>
      <x-tag label="标签" type="info" dark></x-tag>
    </div>

    <div class="row">
      <x-tag label="标签" size="large"></x-tag>
      <x-tag label="标签" size="medium"></x-tag>
      <x-tag label="标签"></x-tag>
      <x-tag label="标签" size="small"></x-tag>
      <x-tag label="标签" size="mini"></x-tag>
    </div>
    <div class="row">
      <x-tag label="标签" closeable></x-tag>
      <x-tag label="标签" type="primary" closeable></x-tag>
      <x-tag label="标签" type="success" closeable></x-tag>
      <x-tag label="标签" type="warning" closeable></x-tag>
      <x-tag label="标签" type="danger" closeable></x-tag>
      <x-tag label="标签" type="info" closeable></x-tag>
    </div>
    <div class="row">
      <x-tag label="标签" dark closeable></x-tag>
      <x-tag label="标签" type="primary" dark closeable></x-tag>
      <x-tag label="标签" type="success" dark closeable></x-tag>
      <x-tag label="标签" type="warning" dark closeable></x-tag>
      <x-tag label="标签" type="danger" dark closeable></x-tag>
      <x-tag label="标签" type="info" dark closeable></x-tag>
    </div>
    <div class="row">
      <x-tag label="标签" size="large" closeable></x-tag>
      <x-tag label="标签" size="medium" closeable></x-tag>
      <x-tag label="标签" closeable></x-tag>
      <x-tag label="标签" size="small" closeable></x-tag>
      <x-tag label="标签" size="mini" closeable></x-tag>
    </div>
    <div class="row">
      <x-tag
        *ngFor="let tag of tags"
        [label]="tag"
        type="primary"
        closeable
        (close)="close(tag)"
      ></x-tag>
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .row x-tag:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestXTagComponent {
  tags = ["标签一", "标签二", "标签三", "标签四", "标签五"];
  constructor(private cdr: ChangeDetectorRef) {}
  close(tag) {
    this.tags.splice(this.tags.indexOf(tag), 1);
    this.cdr.detectChanges();
  }
}
