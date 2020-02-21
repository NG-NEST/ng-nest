import { XIconModule } from "@ng-nest/ui/icon";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XCommentComponent } from "./comment.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XFenceModule } from "@ng-nest/ui/fence";
import { XCommentModule } from "./comment.module";
import { FormsModule } from "@angular/forms";
import { XCommentPrefix, XCommentNode } from "./comment.type";
import { XButtonModule } from "@ng-nest/ui/button";
import { XContainerModule } from "@ng-nest/ui/container";
import { XData } from "@ng-nest/ui/core";
import { DatePipe } from "@angular/common";

describe(XCommentPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XCommentModule, XButtonModule, XContainerModule, XFenceModule, XIconModule],
      declarations: [TestXCommentComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXCommentComponent>;
    let comment: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCommentComponent);
      fixture.detectChanges();
      comment = fixture.debugElement.query(By.directive(XCommentComponent));
    });
    it("should create.", () => {
      expect(comment).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-comment [data]="data" (likeClick)="likeClick($event)" (sureClick)="sureClick($event)"></x-comment>
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [DatePipe]
})
class TestXCommentComponent {
  data: XCommentNode[] = [
    {
      value: 1,
      src: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      author: "张琪峰",
      datetime: "2019-10-01 09:24",
      content:
        "天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。",
      count: 66,
      likes: 88
    },
    {
      value: 3,
      parentValue: 2,
      author: "李七度",
      datetime: "2019-10-01 09:24",
      content:
        "天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。",
      likes: 88
    },
    {
      value: 2,
      parentValue: 1,
      author: "李八度",
      datetime: "2019-09-01 09:24",
      content:
        "天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。",
      likes: 77
    },
    {
      value: 4,
      src: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      author: "张琪峰",
      datetime: "2019-10-01 09:24",
      content:
        "天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。",
      count: 66,
      likes: 88
    },
    {
      value: 5,
      parentValue: 4,
      author: "李七度",
      replyAuthor: "李八度",
      datetime: "2019-10-01 09:24",
      content:
        "天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。",
      likes: 88
    },
    {
      value: 6,
      parentValue: 4,
      author: "李八度",
      datetime: "2019-09-01 09:24",
      content:
        "天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。",
      likes: 77
    }
  ];

  constructor(private cdr: ChangeDetectorRef, private datePipe: DatePipe) {}

  likeClick(node: XCommentNode) {
    node.likes++;
    this.cdr.detectChanges();
  }

  sureClick(node: XCommentNode) {
    let children: XCommentNode[] = [
      {
        value: 10,
        parentValue: node.value,
        author: "当前用户",
        datetime: new Date(),
        content: node.replyContent,
        children: []
      } as XCommentNode,
      ...node.children
    ];
    node.children = children;
    this.cdr.detectChanges();
  }
}
