import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillInfoComponent } from './skill-info.component';

describe('SkillInfoComponent', () => {
  let component: SkillInfoComponent;
  let fixture: ComponentFixture<SkillInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
