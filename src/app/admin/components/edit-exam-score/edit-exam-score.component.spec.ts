import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExamScoreComponent } from './edit-exam-score.component';

describe('EditExamScoreComponent', () => {
  let component: EditExamScoreComponent;
  let fixture: ComponentFixture<EditExamScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditExamScoreComponent]
    });
    fixture = TestBed.createComponent(EditExamScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
