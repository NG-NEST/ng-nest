import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges,
  TemplateRef,
  Output,
  EventEmitter
} from "@angular/core";
import { XCommentPrefix, XCommentNode } from "./comment.type";
import {
  XInputBoolean,
  XSize,
  XInputNumber,
  XIsNumber,
  XDataConvert,
  XData,
  XIsObservable,
  XToDataConvert,
  XIsEmpty
} from "@ng-nest/ui/core";
import { Subscription, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: `${XCommentPrefix}`,
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCommentComponent implements OnInit, OnChanges {
  @Input() @XDataConvert() data?: XData<XCommentNode[]>;
  @Input() @XInputNumber() contentMax = 512;
  @Output() likeClick = new EventEmitter();
  @Output() commentClick = new EventEmitter();
  @Output() replyClick = new EventEmitter();
  @Output() sureClick = new EventEmitter();
  @Output() moreClick = new EventEmitter();
  @ViewChild("comment", { static: true }) comment: ElementRef;
  nodes: XCommentNode[] = [];
  private data$: Subscription | null = null;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    let dataChange = changes.data;
    if (dataChange && dataChange.currentValue !== dataChange.previousValue) {
      this.setData();
    }
  }

  likeOnClick(node: XCommentNode) {
    this.likeClick.emit(node);
  }

  commentOnClick(node: XCommentNode) {
    node.commentShow = !node.commentShow;
    this.commentClick.emit(node);
    this.cdr.detectChanges();
  }

  replyOnClick(node: XCommentNode) {
    node.commentShow = !node.commentShow;
    this.replyClick.emit(node);
    this.cdr.detectChanges();
  }

  sureOnClick(content: string, node: XCommentNode) {
    node.replyContent = content;
    this.sureClick.emit(node);
  }

  moreOnClick(node: XCommentNode) {
    this.moreClick.emit(node);
  }

  private setData() {
    if (typeof this.data === "undefined") return;
    if (XIsObservable(this.data)) {
      this.data$ && this.data$.unsubscribe();
      this.data$ = (this.data as Observable<any>).pipe(map(x => XToDataConvert(x))).subscribe(x => {
        this.setDataChange(x);
      });
    } else {
      this.setDataChange(this.data as XCommentNode[]);
    }
  }

  private setDataChange(value: XCommentNode[]) {
    let getChildren = (node: XCommentNode, level: number) => {
      node.level = level;
      node.hasChild = node.children.length > 0;
      return node;
    };
    this.nodes = value.filter(x => XIsEmpty(x.parentValue)).map(x => getChildren(x, 0));
  }
}
