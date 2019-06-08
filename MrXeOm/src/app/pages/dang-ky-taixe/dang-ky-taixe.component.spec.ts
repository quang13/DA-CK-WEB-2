import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterTXComponent } from './dang-ky-taixe.component';

describe('RegisterTXComponent', () => {
  let component: RegisterTXComponent;
  let fixture: ComponentFixture<RegisterTXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
