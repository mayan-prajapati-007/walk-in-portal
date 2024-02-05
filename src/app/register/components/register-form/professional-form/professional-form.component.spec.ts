import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalFormComponent } from './professional-form.component';

describe('ProfessionalFormComponent', () => {
  let component: ProfessionalFormComponent;
  let fixture: ComponentFixture<ProfessionalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
