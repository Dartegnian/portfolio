import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingCircleComponent } from './loading-circle.component';

describe('LoadingCircleComponent', () => {
  let component: LoadingCircleComponent;
  let fixture: ComponentFixture<LoadingCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingCircleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
