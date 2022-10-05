import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcamComponent } from './newcam.component';

describe('NewcamComponent', () => {
  let component: NewcamComponent;
  let fixture: ComponentFixture<NewcamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
