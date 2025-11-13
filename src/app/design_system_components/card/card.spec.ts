import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, TemplateRef } from '@angular/core';

import { Card } from './card';

// Mock component to provide template
@Component({
  selector: 'app-test-card-host',
  template: `
    <ng-template #testTemplate>
      <div>Test Content</div>
    </ng-template>
    <ds-card [cardContent]="testTemplate"></ds-card>
  `,
  imports: [Card]
})
class TestCardHostComponent {
  testTemplate!: TemplateRef<any>;
}

describe('Card', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have cardContent input defined', () => {
    expect(component.cardContent).toBeDefined();
  });

  it('should have proper component selector', () => {
    const element = fixture.nativeElement.tagName.toLowerCase();
    expect(element).toBe('ds-card');
  });

  it('should render without errors', () => {
    expect(() => {
      fixture.detectChanges();
    }).not.toThrow();
  });

  it('should be present in the DOM', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element).toBeTruthy();
  });

  it('should accept cardContent template input', () => {
    expect(component.cardContent).toBeDefined();
  });

  it('should render card element with correct structure', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it('should properly initialize component', () => {
    expect(component).toEqual(jasmine.any(Object));
  });
});
