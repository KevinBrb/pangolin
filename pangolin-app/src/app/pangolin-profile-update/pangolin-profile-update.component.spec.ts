import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PangolinProfileUpdateComponent } from './pangolin-profile-update.component';

describe('PangolinProfileUpdateComponent', () => {
  let component: PangolinProfileUpdateComponent;
  let fixture: ComponentFixture<PangolinProfileUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PangolinProfileUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PangolinProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
