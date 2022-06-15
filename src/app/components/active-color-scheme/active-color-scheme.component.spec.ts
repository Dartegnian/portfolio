import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveColorSchemeComponent } from './active-color-scheme.component';

describe('ActiveColorSchemeComponent', () => {
  let component: ActiveColorSchemeComponent;
  let fixture: ComponentFixture<ActiveColorSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveColorSchemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveColorSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
