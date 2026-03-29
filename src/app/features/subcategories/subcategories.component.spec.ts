import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesComponent } from './subcategories.component';

describe('SubcategoriesComponent', () => {
  let component: SubcategoriesComponent;
  let fixture: ComponentFixture<SubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubcategoriesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
