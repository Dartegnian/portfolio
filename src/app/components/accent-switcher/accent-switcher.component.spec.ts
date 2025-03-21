import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccentSwitcherComponent } from '@components/accent-switcher.component';

describe('AccentSwitcherComponent', () => {
  let component: AccentSwitcherComponent;
  let fixture: ComponentFixture<AccentSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AccentSwitcherComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(AccentSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
