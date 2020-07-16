import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { X_CONFIG, XConfig } from '@ng-nest/ui/core';

const ngNestConfig: XConfig = {
  components: {
    button: { size: 'large', round: true },
    tag: { dark: true }
  },
  theme: {
    colors: { primary: '#4a19d2' }
  }
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    { provide: X_CONFIG, useValue: ngNestConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
