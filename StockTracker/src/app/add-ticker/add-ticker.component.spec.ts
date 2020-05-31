import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTickerComponent } from './add-ticker.component';

describe('AddTickerComponent', () => {
  let component: AddTickerComponent;
  let fixture: ComponentFixture<AddTickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
