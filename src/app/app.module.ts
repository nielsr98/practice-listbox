import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListboxDirective } from './listbox/listbox.directive';
import { ListboxOptionDirective } from './listbox/listbox-option.directive';

@NgModule({
  declarations: [
    AppComponent,
    ListboxDirective,
    ListboxOptionDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
