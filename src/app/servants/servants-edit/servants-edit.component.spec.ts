import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServantsEditComponent } from './servants-edit.component';

describe('ServantsEditComponent', () => {
  let component: ServantsEditComponent;
  let fixture: ComponentFixture<ServantsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServantsEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServantsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
