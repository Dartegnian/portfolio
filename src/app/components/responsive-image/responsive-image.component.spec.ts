import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveImageComponent } from '@components/responsive-image.component';

describe('ResponsiveImageComponent', () => {
  let component: ResponsiveImageComponent;
  let fixture: ComponentFixture<ResponsiveImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ResponsiveImageComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ResponsiveImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
