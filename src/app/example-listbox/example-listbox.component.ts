import { Component, OnInit } from '@angular/core';
import { HighlightDirective } from "../listbox/highlight.directive";
import { ListboxDirective } from "../listbox/listbox.directive";
import { ListboxOptionDirective} from "../listbox/listbox-option.directive";

@Component({
  selector: 'app-example-listbox',
  templateUrl: './example-listbox.component.html',
  styleUrls: ['./example-listbox.component.css']
})
export class ExampleListboxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
