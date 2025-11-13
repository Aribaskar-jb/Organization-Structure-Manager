import { Component, OnInit, effect, input, output, signal, computed, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SingleSelectOption } from '../../models/single-select.model';


@Component({
  selector: 'ds-single-select',
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './single-select.html',
  styleUrl: './single-select.scss',
})
export class SingleSelect implements OnInit {
  /**
   * Accepts either an array of strings (simple) or an array of objects
   * Example inputs:
   *  - ['One', 'Two']
   *  - [{ value: 'one', label: 'One' }, { value: 'two' }]
   */
  options = input.required<Array<string | SingleSelectOption>>();
  selectionChange = output<SingleSelectOption>();
  optionList = computed(() => this.normalizeOptions());
  selected?: SingleSelectOption;

  constructor(private injector: Injector) {
    // Watch for changes in options and auto-select first option
    effect(
      () => {
        if (this.optionList().length > 0 && !this.selected) {
          this.selectOption(this.optionList().at(0)!);
        }
      },
      { injector: this.injector }
    );
  }

  ngOnInit(): void {
    // Initial selection if not already set
    if (!this.selected && this.optionList().length > 0) {
      this.selectOption(this.optionList().at(0)!);
    }
  }

  private normalizeOptions(): SingleSelectOption[] {
    return this.options().map((option) =>
      typeof option === 'string'
        ? { value: option, label: option }
        : { value: option.value, label: option.label || option.value }
    );
  }

  selectOption(opt: SingleSelectOption) {
    this.selected = opt;
    this.selectionChange.emit(opt);
  }
}
