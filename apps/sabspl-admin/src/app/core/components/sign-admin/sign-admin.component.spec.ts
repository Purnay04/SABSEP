import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignAdminComponent } from './sign-admin.component';


describe('SignUserComponent', () => {
  let component: SignAdminComponent;
  let fixture: ComponentFixture<SignAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUserComponent]
    });
    fixture = TestBed.createComponent(SignUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
