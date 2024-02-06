import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkInListingComponent } from './walk-in-listing.component';

describe('WalkInListingComponent', () => {
  let component: WalkInListingComponent;
  let fixture: ComponentFixture<WalkInListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalkInListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalkInListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
