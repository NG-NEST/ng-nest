import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { XUploadNode, XUploadPortalPrefix } from './upload.property';

@Component({
  selector: `${XUploadPortalPrefix}`,
  templateUrl: './upload-portal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XUploadPortalComponent {
  file: XUploadNode;
  closePortal: Function;
  destroyPortal: Function;

  ngOnInit() {

  }
}
