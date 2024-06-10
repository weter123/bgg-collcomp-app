import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionComparisonComponent } from './collection-comparison.component';

describe('CollectionComparisonComponent', () => {
  let component: CollectionComparisonComponent;
  let fixture: ComponentFixture<CollectionComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionComparisonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectionComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
