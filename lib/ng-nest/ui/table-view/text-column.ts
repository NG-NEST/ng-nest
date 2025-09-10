import { CdkTextColumn } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XTableColumnDef, XTableHeaderCellDef, XTableHeaderCell, XTableViewCellDef, XTableViewCell } from './cell';

@Component({
  selector: 'x-table-text-column',
  template: `
    <ng-container xTableColumnDef>
      <th x-table-header-cell *xTableHeaderCellDef [style.text-align]="justify">
        {{ headerText }}
      </th>
      <td x-table-cell *xTableCellDef="let data" [style.text-align]="justify">
        {{ dataAccessor(data, name) }}
      </td>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [XTableColumnDef, XTableHeaderCellDef, XTableHeaderCell, XTableViewCellDef, XTableViewCell]
})
export class XTableTextColumn<T> extends CdkTextColumn<T> {}
