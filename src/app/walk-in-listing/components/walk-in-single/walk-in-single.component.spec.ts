import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkInSingleComponent } from './walk-in-single.component';

describe('WalkInSingleComponent', () => {
  let component: WalkInSingleComponent;
  let fixture: ComponentFixture<WalkInSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalkInSingleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalkInSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
