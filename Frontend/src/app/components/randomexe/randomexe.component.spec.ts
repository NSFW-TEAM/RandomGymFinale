import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomexeComponent } from './randomexe.component';

describe('RandomexeComponent', () => {
  let component: RandomexeComponent;
  let fixture: ComponentFixture<RandomexeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomexeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
