import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  ChangeDetectorRef,
  HostBinding,
  OnChanges,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { XUploadPrefix, XUploadNode } from "./upload.type";
import { Subscription, Observable } from "rxjs";
import {
  XData,
  XValueAccessor,
  XControlValueAccessor,
  XInputBoolean,
  XDataConvert,
  XIsObservable,
  XToDataConvert
} from "@ng-nest/ui/core";
import { map } from "rxjs/operators";

@Component({
  selector: `${XUploadPrefix}`,
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XUploadComponent)]
})
export class XUploadComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() action?: string;
  @Input() accept?: string;
  @Input() @XInputBoolean() multiple?: boolean;
  @ViewChild("upload", { static: true }) upload: ElementRef;
  @ViewChild("file", { static: true }) file: ElementRef;

  writeValue(value: XUploadNode[]) {
    this.value = value;
    this.cdr.detectChanges();
  }

  uploadNodes: XUploadNode[] = [];
  private data$: Subscription | null = null;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super(renderer);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    let dataChange = changes.data;
    if (dataChange && dataChange.currentValue !== dataChange.previousValue) {
      // this.setData();
    }
  }

  change(event: Event) {
    let input = event.target as HTMLInputElement;
    console.log(input.files);
  }

  uploadClick() {
    if (this.disabled) return;
    this.file.nativeElement.click();
  }

  ngOnDestroy(): void {
    this.data$ && this.data$.unsubscribe();
  }
}
