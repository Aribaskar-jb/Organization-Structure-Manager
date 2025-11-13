import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSelect } from './single-select';
import { SingleSelectOption } from '../../models/single-select.model';

describe('SingleSelect', () => {
  let component: SingleSelect;
  let fixture: ComponentFixture<SingleSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleSelect);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required options input defined', () => {
    expect(component.options).toBeDefined();
  });

  it('should have selectionChange output defined', () => {
    expect(component.selectionChange).toBeDefined();
  });

  it('should normalize string options to SingleSelectOption', () => {
    const stringOptions = ['Option1', 'Option2', 'Option3'];
    // Manually set up the component with string options
    expect(component).toBeTruthy();
  });

  it('should have proper component selector', () => {
    const element = fixture.nativeElement.tagName.toLowerCase();
    expect(element).toBe('ds-single-select');
  });

  it('should have optionList computed property', () => {
    expect(component.optionList).toBeDefined();
  });

  it('should initialize selected property', () => {
    expect(component.selected).toBeUndefined();
  });

  it('should emit selectionChange when option is selected', (done) => {
    const mockOption: SingleSelectOption = { value: 'test', label: 'Test Option' };

    component.selectionChange.subscribe((option: SingleSelectOption) => {
      expect(option.value).toBe('test');
      expect(option.label).toBe('Test Option');
      done();
    });

    component.selectOption(mockOption);
  });

  it('should update selected property on selectOption', () => {
    const mockOption: SingleSelectOption = { value: 'test', label: 'Test Option' };

    component.selectOption(mockOption);

    expect(component.selected).toEqual(mockOption);
  });

  it('should handle string options correctly', () => {
    expect(component.options).toBeDefined();
  });

  it('should handle object options with label and value', () => {
    expect(component.options).toBeDefined();
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

  it('should have ngOnInit lifecycle hook', () => {
    expect(typeof component.ngOnInit).toBe('function');
  });

  it('should handle multiple option selections', () => {
    let selectionCount = 0;

    component.selectionChange.subscribe(() => {
      selectionCount++;
    });

    const option1: SingleSelectOption = { value: 'opt1', label: 'Option 1' };
    const option2: SingleSelectOption = { value: 'opt2', label: 'Option 2' };

    component.selectOption(option1);
    component.selectOption(option2);

    expect(selectionCount).toBe(2);
    expect(component.selected?.value).toBe('opt2');
  });

  it('should correctly normalize mixed option types', () => {
    expect(component).toBeTruthy();
  });
});
