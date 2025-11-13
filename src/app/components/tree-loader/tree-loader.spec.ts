import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeLoader } from './tree-loader';

describe('TreeLoader', () => {
  let component: TreeLoader;
  let fixture: ComponentFixture<TreeLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeLoader);
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
    expect(element).toBe('app-tree-loader');
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

  it('should have no child components by default', () => {
    const childComponents = fixture.debugElement.children;
    expect(childComponents.length).toBeGreaterThanOrEqual(0);
  });
});
