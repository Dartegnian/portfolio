import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfaceTestComponent } from './surface-test.component';

describe('SurfaceTestComponent', () => {
  let component: SurfaceTestComponent;
  let fixture: ComponentFixture<SurfaceTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurfaceTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurfaceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
