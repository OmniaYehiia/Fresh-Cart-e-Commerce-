import { Component, input, InputSignal } from '@angular/core';
import { ICategory } from '../../../core/models/ICategory/icategory.interface';

@Component({
  selector: 'app-ctaegory-card',
  imports: [],
  templateUrl: './ctaegory-card.component.html',
  styleUrl: './ctaegory-card.component.css',
})
export class CtaegoryCardComponent {
  categoryData: InputSignal<ICategory> = input.required<ICategory>();
}
