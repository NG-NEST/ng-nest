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
import { XData, XAddMinutes, XAddHours } from "@ng-nest/ui/core";
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
      <x-comment
        [data]="data"
        (likeClick)="likeClick($event)"
        (sureClick)="sureClick($event)"
        (moreClick)="moreClick($event)"
      ></x-comment>
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
  now = new Date();
  src = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
  content =
    "天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。";
  data: XCommentNode[] = [
    {
      value: "1",
      src: this.src,
      author: "张琪峰",
      datetime: XAddMinutes(this.now, -40),
      content: this.content,
      count: 23,
      likes: 88,
      children: [
        {
          value: "1-1",
          parentValue: "1",
          src: this.src,
          author: "刘三",
          datetime: XAddMinutes(this.now, -30),
          content: this.content,
          likes: 2
        },
        {
          value: "1-2",
          parentValue: "1",
          src: this.src,
          author: "刘四",
          datetime: XAddMinutes(this.now, -35),
          content: this.content,
          likes: 0
        },
        {
          value: "1-2",
          parentValue: "1",
          src: this.src,
          author: "刘五",
          datetime: XAddMinutes(this.now, -38),
          content: this.content,
          likes: 0
        }
      ]
    },
    {
      value: "2",
      src: this.src,
      author: "李牧云",
      datetime: XAddMinutes(this.now, -50),
      content: this.content,
      count: 2,
      likes: 88,
      children: [
        {
          value: "1-1",
          parentValue: "1",
          src: this.src,
          author: "刘三",
          datetime: XAddMinutes(this.now, -30),
          content: this.content,
          likes: 2
        },
        {
          value: "1-2",
          parentValue: "1",
          src: this.src,
          author: "刘四",
          datetime: XAddMinutes(this.now, -35),
          content: this.content,
          likes: 0
        }
      ]
    },
    {
      value: "3",
      src: this.src,
      author: "刘芸",
      datetime: XAddHours(this.now, -5),
      content: this.content,
      count: 0,
      likes: 10,
      children: []
    }
  ];

  constructor(private cdr: ChangeDetectorRef, private datePipe: DatePipe) {}

  createNode(parentValue, content, index = 0) {
    return {
      value: `${parentValue}-${Math.floor(Math.random() * 100)}`,
      parentValue: parentValue,
      author: `用户${index}`,
      datetime: XAddMinutes(new Date(), index),
      content: content,
      children: []
    } as XCommentNode;
  }

  likeClick(node: XCommentNode) {
    node.likes++;
    this.cdr.detectChanges();
  }

  sureClick(node: XCommentNode) {
    let children: XCommentNode[] = [this.createNode(node.parentValue, node.replyContent), ...node.children];
    node.children = children;
    this.cdr.detectChanges();
  }

  moreClick(node: XCommentNode) {
    let nodes: XCommentNode[] = [];
    for (let i = 1; i <= 10; i++) {
      nodes = [...nodes, this.createNode(node.value, node.content, -i)];
    }
    node.children = [...node.children, ...nodes];
    this.cdr.detectChanges();
  }
}
