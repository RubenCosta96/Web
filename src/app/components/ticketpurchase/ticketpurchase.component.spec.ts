import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketpurchaseComponent } from './ticketpurchase.component';

describe('TicketpurchaseComponent', () => {
  let component: TicketpurchaseComponent;
  let fixture: ComponentFixture<TicketpurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketpurchaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketpurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
