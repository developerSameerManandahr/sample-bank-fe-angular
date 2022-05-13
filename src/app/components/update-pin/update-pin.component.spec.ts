import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePinComponent } from './update-pin.component';

describe('UpdatePinComponent', () => {
  let component: UpdatePinComponent;
  let fixture: ComponentFixture<UpdatePinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
