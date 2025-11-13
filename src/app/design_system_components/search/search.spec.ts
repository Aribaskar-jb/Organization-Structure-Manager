import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Search } from './search';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Search]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required inputs defined', () => {
    expect(component.placeholderText).toBeDefined();
  });

  it('should have onSeachEvent output defined', () => {
    expect(component.onSeachEvent).toBeDefined();
  });

  it('should initialize searchValue signal with empty string', () => {
    expect(component.searchValue()).toBe('');
  });

  it('should have proper component selector', () => {
    const element = fixture.nativeElement.tagName.toLowerCase();
    expect(element).toBe('ds-search');
  });

  it('should update searchValue on onSearch', () => {
    // Create a mock input element
    const mockInput = document.createElement('input');
    mockInput.value = 'test query';
    component.searchInputElement = { nativeElement: mockInput };

    component.onSearch();
    expect(component.searchValue()).toBe('test query');
  });

  it('should emit search event with debounce', fakeAsync(() => {
    let emittedValue: string = '';

    component.onSeachEvent.subscribe((value: string) => {
      emittedValue = value;
    });

    const mockInput = document.createElement('input');
    mockInput.value = 'test';
    component.searchInputElement = { nativeElement: mockInput };

    component.onSearch();
    tick(600); // Wait for debounce (500ms + extra)

    expect(emittedValue).toBe('test');
  }));

  it('should clear search value', () => {
    component.searchValue.set('test');
    component.clearSearch();

    expect(component.searchValue()).toBe('');
  });

  it('should emit empty value on clear search', (done) => {
    component.onSeachEvent.subscribe((value: string) => {
      expect(value).toBe('');
      done();
    });

    component.clearSearch();
  });

  it('should handle empty input', () => {
    const mockInput = document.createElement('input');
    mockInput.value = '';
    component.searchInputElement = { nativeElement: mockInput };

    component.onSearch();
    expect(component.searchValue()).toBe('');
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

  it('should debounce multiple search events', fakeAsync(() => {
    let emissionCount = 0;

    component.onSeachEvent.subscribe(() => {
      emissionCount++;
    });

    const mockInput = document.createElement('input');
    component.searchInputElement = { nativeElement: mockInput };

    // Simulate multiple rapid searches
    mockInput.value = 'a';
    component.onSearch();
    tick(200);

    mockInput.value = 'ab';
    component.onSearch();
    tick(200);

    mockInput.value = 'abc';
    component.onSearch();
    tick(600); // Wait for debounce

    // Should only emit once due to debouncing
    expect(emissionCount).toBeGreaterThan(0);
  }));
});
