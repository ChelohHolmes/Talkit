import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceRoomComponent } from './voice-room.component';

describe('VoiceRoomComponent', () => {
  let component: VoiceRoomComponent;
  let fixture: ComponentFixture<VoiceRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiceRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
