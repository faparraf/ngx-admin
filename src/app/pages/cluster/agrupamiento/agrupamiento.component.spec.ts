import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupamientoComponent } from './agrupamiento.component';

describe('AgrupamientoComponent', () => {
  let component: AgrupamientoComponent;
  let fixture: ComponentFixture<AgrupamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrupamientoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrupamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
