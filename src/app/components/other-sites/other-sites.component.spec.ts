import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuiltWebsitesComponent } from './other-sites.component';

describe('BuiltWebsitesComponent', () => {
  let component: BuiltWebsitesComponent;
  let fixture: ComponentFixture<BuiltWebsitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuiltWebsitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuiltWebsitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
