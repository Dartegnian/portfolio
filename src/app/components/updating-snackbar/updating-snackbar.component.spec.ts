import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatingSnackbarComponent } from './updating-snackbar.component';

describe('UpdatingSnackbarComponent', () => {
  let component: UpdatingSnackbarComponent;
  let fixture: ComponentFixture<UpdatingSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatingSnackbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatingSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
