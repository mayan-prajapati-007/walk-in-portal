import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkInSuccessComponent } from './walk-in-success.component';

describe('WalkInSuccessComponent', () => {
  let component: WalkInSuccessComponent;
  let fixture: ComponentFixture<WalkInSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalkInSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalkInSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
