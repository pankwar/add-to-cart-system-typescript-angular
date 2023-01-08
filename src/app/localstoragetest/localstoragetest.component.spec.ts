import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalstoragetestComponent } from './localstoragetest.component';

describe('LocalstoragetestComponent', () => {
  let component: LocalstoragetestComponent;
  let fixture: ComponentFixture<LocalstoragetestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalstoragetestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalstoragetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
