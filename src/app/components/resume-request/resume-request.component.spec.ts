import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCtaComponent } from './resume-request.component';

describe('EmailCtaComponent', () => {
  let component: EmailCtaComponent;
  let fixture: ComponentFixture<EmailCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailCtaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
