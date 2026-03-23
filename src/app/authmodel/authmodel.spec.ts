import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Authmodel } from './authmodel';

describe('Authmodel', () => {
  let component: Authmodel;
  let fixture: ComponentFixture<Authmodel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Authmodel],
    }).compileComponents();

    fixture = TestBed.createComponent(Authmodel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
