import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutinfoComponent } from './nutinfo.component';

describe('NutinfoComponent', () => {
  let component: NutinfoComponent;
  let fixture: ComponentFixture<NutinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
