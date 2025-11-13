import { CommonModule } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'ds-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
 
  cardContent = input.required<TemplateRef<any>>();
}
