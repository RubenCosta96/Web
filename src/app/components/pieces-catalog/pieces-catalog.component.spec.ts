import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesCatalogComponent } from './pieces-catalog.component';

describe('PiecesCatalogComponent', () => {
  let component: PiecesCatalogComponent;
  let fixture: ComponentFixture<PiecesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiecesCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PiecesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
