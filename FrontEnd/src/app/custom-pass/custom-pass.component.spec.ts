import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPassComponent } from './custom-pass.component';

describe('CustomPassComponent', () => {
  let component: CustomPassComponent;
  let fixture: ComponentFixture<CustomPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
