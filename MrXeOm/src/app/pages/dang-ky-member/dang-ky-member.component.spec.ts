import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterKHComponent } from './dang-ky-member.component';

describe('RegisterTXComponent', () => {
  let component: RegisterKHComponent;
  let fixture: ComponentFixture<RegisterKHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterKHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterKHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
