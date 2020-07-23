import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainRoutesModule } from 'src/main/routes.module';
import { X_CONFIG } from '@ng-nest/ui/core';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MainRoutesModule],
  providers: [
    {
      provide: X_CONFIG,
      useValue: {
        components: {
          button: {
            size: 'large'
          },
          icon: {
            href: 'http://locahost:3000/'
          }
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
