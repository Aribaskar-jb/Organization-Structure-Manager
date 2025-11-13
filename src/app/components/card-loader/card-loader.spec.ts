import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLoader } from './card-loader';

describe('CardLoader', () => {
  let component: CardLoader;
  let fixture: ComponentFixture<CardLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be rendered with proper DOM element', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it('should have proper component selector', () => {
    const element = fixture.nativeElement.tagName.toLowerCase();
    expect(element).toBe('app-card-loader');
  });

  it('should initialize component properties', () => {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should render without errors on detect changes', () => {
    expect(() => {
      fixture.detectChanges();
    }).not.toThrow();
  });

  it('should be present in the DOM', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element).toBeTruthy();
  });
});
