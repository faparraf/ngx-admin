import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionInicioComponent } from './seleccion-inicio.component';

describe('SeleccionInicioComponent', () => {
  let component: SeleccionInicioComponent;
  let fixture: ComponentFixture<SeleccionInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionInicioComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
