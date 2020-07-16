import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainRoutesModule } from 'src/main/routes.module';

import { X_CONFIG, XConfig } from '@ng-nest/ui/core';

const ngNestConfig: XConfig = {
  components: {
    icon: {
      href: 'http://localhost:8081/icons/'
    }
  }
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MainRoutesModule],
  providers: [{ provide: X_CONFIG, useValue: ngNestConfig }],
  bootstrap: [AppComponent]
})
export class AppModule {}
