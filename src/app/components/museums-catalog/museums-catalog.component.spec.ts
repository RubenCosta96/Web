import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseumsCatalogComponent } from './museums-catalog.component';

describe('MuseumsCatalogComponent', () => {
  let component: MuseumsCatalogComponent;
  let fixture: ComponentFixture<MuseumsCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuseumsCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MuseumsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
