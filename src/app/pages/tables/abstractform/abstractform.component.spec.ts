import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractformComponent } from './abstractform.component';

describe('AbstractformComponent', () => {
  let component: AbstractformComponent;
  let fixture: ComponentFixture<AbstractformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractformComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
