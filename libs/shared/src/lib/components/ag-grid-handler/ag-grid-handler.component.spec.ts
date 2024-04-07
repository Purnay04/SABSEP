import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridHandlerComponent } from './ag-grid-handler.component';

describe('AgGridHandlerComponent', () => {
  let component: AgGridHandlerComponent;
  let fixture: ComponentFixture<AgGridHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgGridHandlerComponent]
    });
    fixture = TestBed.createComponent(AgGridHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
