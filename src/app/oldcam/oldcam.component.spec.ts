import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldcamComponent } from './oldcam.component';

describe('OldcamComponent', () => {
  let component: OldcamComponent;
  let fixture: ComponentFixture<OldcamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldcamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
