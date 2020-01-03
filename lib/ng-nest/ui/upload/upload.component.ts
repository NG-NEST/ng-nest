import { state } from "@angular/animations";
import { HttpClient, HttpEventType, HttpResponse, HttpRequest, HttpEvent } from "@angular/common/http";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { XUploadPrefix, XUploadNode } from "./upload.type";
import { Subscription } from "rxjs";
import { XData, XValueAccessor, XControlValueAccessor, XInputBoolean, XHttpService } from "@ng-nest/ui/core";
import { filter, map } from "rxjs/operators";

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
  @Output() removeEmit = new EventEmitter<{ file: XUploadNode; index: number }>();
  @ViewChild("upload", { static: true }) upload: ElementRef;
  @ViewChild("file", { static: true }) file: ElementRef;
  files: XUploadNode[] = [];
  showUpload = false;

  writeValue(value: XUploadNode[]) {
    this.value = value;
    this.cdr.detectChanges();
  }

  uploadNodes: XUploadNode[] = [];
  private data$: Subscription | null = null;
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public http: HttpClient,
    public cdr: ChangeDetectorRef
  ) {
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
    let files: XUploadNode[] = [];
    for (let i = 0; i < input.files.length; i++) {
      let file: XUploadNode = input.files.item(i);
      file.state = "ready";
      files = [...files, file];
    }
    if (files.length > 0) this.showUpload = true;
    this.files = files;
    this.uploading();
    this.cdr.detectChanges();
  }

  remove(file: XUploadNode, index: number) {
    this.files.splice(index, 1);
    this.showUpload = this.files.find(x => x.state === "ready") != null;
    this.removeEmit.emit({ file: file, index: index });
    this.cdr.detectChanges();
  }

  uploadClick() {
    if (this.disabled) return;
    this.file.nativeElement.click();
  }

  uploading() {
    if (!this.action) return;
    let readyFiles = this.files.filter(x => x.state === "ready");
    readyFiles.forEach(x => {
      let formData = new FormData();
      formData.append("file", x);
      const req = new HttpRequest("POST", this.action, formData, {
        reportProgress: true,
        responseType: "arraybuffer"
      });
      this.http
        .request(req)
        .pipe(
          map(event =>
            this.getEventMessage(event, x, body => {
              let blob = new Blob([body]);
              let reader = new FileReader();
              reader.readAsText(blob, "utf-8");
              reader.onload = () => {
                x.url = JSON.parse(reader.result as string)[0];
                this.cdr.detectChanges();
              };
            })
          )
        )
        .subscribe(
          y => {
            this.showUpload = this.files.find(y => y.state === "ready") != null;
            this.cdr.detectChanges();
          },
          error => {
            x.state = "error";
            this.cdr.detectChanges();
          }
        );
    });
  }

  getEventMessage(event: HttpEvent<any>, file: XUploadNode, fun: Function) {
    switch (event.type) {
      case HttpEventType.Sent:
        file.state = "ready";
        return `开始上传文件`;
      case HttpEventType.UploadProgress:
        file.state = "uploading";
        file.percent = Math.round((100 * event.loaded) / event.total);
        return `上传中`;
      case HttpEventType.Response:
        file.state = "success";
        fun(event.body);
        return `文件上传完毕`;
    }
  }

  ngOnDestroy(): void {
    this.data$ && this.data$.unsubscribe();
  }
}
