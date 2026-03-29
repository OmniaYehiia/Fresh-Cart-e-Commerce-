import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaegoryCardComponent } from './ctaegory-card.component';

describe('CtaegoryCardComponent', () => {
  let component: CtaegoryCardComponent;
  let fixture: ComponentFixture<CtaegoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaegoryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CtaegoryCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
