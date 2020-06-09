import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListboxDirective } from './listbox/listbox.directive';
import { ListboxOptionDirective } from './listbox/listbox-option.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExampleListboxComponent } from './example-listbox/example-listbox.component';
import { HighlightDirective } from './listbox/highlight.directive';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ListboxDirective,
    ListboxOptionDirective,
    ExampleListboxComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
