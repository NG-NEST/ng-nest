import { Directive, Input, ContentChild } from '@angular/core';
import { XCellDef, XHeaderCellDef } from './cell';

@Directive({
  selector: '[xColumnDef]'
})
export class XColumnDef {
  @Input('xColumnDef') name!: string;

  @ContentChild(XCellDef, { static: true }) cell!: XCellDef;
  @ContentChild(XHeaderCellDef, { static: true }) header!: XHeaderCellDef;
}
