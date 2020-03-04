import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XTreeComponent } from "./tree.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XTreeModule } from "./tree.module";
import { XTreePrefix, XTreeNode } from "./tree.type";
import { XFenceModule } from "@ng-nest/ui/fence";

describe(XTreePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XTreeModule, XFenceModule],
      declarations: [TestXTreeComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTreeComponent>;
    let tree: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTreeComponent);
      fixture.detectChanges();
      tree = fixture.debugElement.query(By.directive(XTreeComponent));
    });
    it("should create.", () => {
      expect(tree).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-row space="1">
      <x-col span="8">
        <x-tree [data]="data"> </x-tree>
      </x-col>
      <x-col span="8">
        <x-tree [data]="data" checkbox> </x-tree>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXTreeComponent {
  data: XTreeNode[] = [
    { value: 1, label: "一级 1" },
    { value: 2, label: "一级 2" },
    { value: 3, label: "一级 3" },
    { value: 4, label: "一级 4" },
    { value: 5, label: "二级 1-1", parentValue: 1 },
    { value: 6, label: "二级 1-2", parentValue: 1 },
    { value: 7, label: "二级 1-3", parentValue: 1 },
    { value: 8, label: "二级 1-4", parentValue: 1 },
    { value: 9, label: "二级 2-1", parentValue: 2 },
    { value: 10, label: "二级 2-2", parentValue: 2 },
    { value: 11, label: "二级 2-3", parentValue: 2 },
    { value: 12, label: "二级 2-4", parentValue: 2 },
    { value: 13, label: "二级 3-1", parentValue: 3 },
    { value: 14, label: "二级 3-2", parentValue: 3 },
    { value: 15, label: "二级 3-3", parentValue: 3 },
    { value: 16, label: "二级 3-4", parentValue: 3 },
    { value: 17, label: "二级 4-1", parentValue: 4 },
    { value: 18, label: "二级 4-2", parentValue: 4 },
    { value: 19, label: "二级 4-3", parentValue: 4 },
    { value: 20, label: "二级 4-4", parentValue: 4 },
    { value: 21, label: "三级 1-1-1", parentValue: 5 },
    { value: 22, label: "三级 1-1-2", parentValue: 5 },
    { value: 23, label: "三级 1-1-3", parentValue: 5 },
    { value: 24, label: "三级 1-1-4", parentValue: 5 },
    { value: 25, label: "三级 1-2-1", parentValue: 6 },
    { value: 26, label: "三级 1-2-2", parentValue: 6 },
    { value: 27, label: "三级 1-2-3", parentValue: 6 },
    { value: 28, label: "三级 1-2-4", parentValue: 6 },
    { value: 29, label: "三级 1-3-1", parentValue: 7 },
    { value: 30, label: "三级 1-3-2", parentValue: 7 },
    { value: 31, label: "三级 1-3-3", parentValue: 7 },
    { value: 32, label: "三级 1-3-4", parentValue: 7 },
    { value: 33, label: "三级 1-4-1", parentValue: 8 },
    { value: 34, label: "三级 1-4-2", parentValue: 8 },
    { value: 35, label: "三级 1-4-3", parentValue: 8 },
    { value: 36, label: "三级 1-4-4", parentValue: 8 }
  ];
}
