import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSkeletonComponent } from '@ng-nest/ui/skeleton';
import { XSwitchComponent } from '@ng-nest/ui/switch';

@Component({
  selector: 'ex-loading',
  standalone: true,
  imports: [FormsModule, XSwitchComponent, XSkeletonComponent],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class ExLoadingComponent {
  loading = signal(false);
}
