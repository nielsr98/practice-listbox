import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleListboxComponent } from './example-listbox.component';

describe('ExampleListboxComponent', () => {
  let component: ExampleListboxComponent;
  let fixture: ComponentFixture<ExampleListboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleListboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleListboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
