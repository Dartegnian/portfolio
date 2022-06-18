import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeAtAGlanceComponent } from './life-at-a-glance.component';

describe('LifeAtAGlanceComponent', () => {
  let component: LifeAtAGlanceComponent;
  let fixture: ComponentFixture<LifeAtAGlanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeAtAGlanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeAtAGlanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
