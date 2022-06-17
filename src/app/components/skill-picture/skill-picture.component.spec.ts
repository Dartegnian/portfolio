import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillPictureComponent } from './skill-picture.component';

describe('SkillPictureComponent', () => {
  let component: SkillPictureComponent;
  let fixture: ComponentFixture<SkillPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillPictureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
