import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordianBodyElementComponent } from './accordian-body-element.component';

describe('AccordianBodyElementComponent', () => {
  let component: AccordianBodyElementComponent;
  let fixture: ComponentFixture<AccordianBodyElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordianBodyElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccordianBodyElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
