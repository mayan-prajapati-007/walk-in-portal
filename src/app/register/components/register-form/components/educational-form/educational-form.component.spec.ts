import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalFormComponent } from './educational-form.component';

describe('EducationalFormComponent', () => {
  let component: EducationalFormComponent;
  let fixture: ComponentFixture<EducationalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EducationalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
