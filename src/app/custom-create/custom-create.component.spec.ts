import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCreateComponent } from './custom-create.component';

describe('CustomCreateComponent', () => {
  let component: CustomCreateComponent;
  let fixture: ComponentFixture<CustomCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
