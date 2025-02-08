import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuiltWebsitesComponent } from '@components/other-sites.component';

describe('BuiltWebsitesComponent', () => {
  let component: BuiltWebsitesComponent;
  let fixture: ComponentFixture<BuiltWebsitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BuiltWebsitesComponent]
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
