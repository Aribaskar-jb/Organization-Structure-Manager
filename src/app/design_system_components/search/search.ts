import { Component, ElementRef, input, output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounce } from 'lodash';

@Component({
  selector: 'ds-search',
  imports: [ CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  @ViewChild('searchInput') searchInputElement!: ElementRef<HTMLInputElement>;
  searchValue = signal<string>('');
  onSeachEvent = output<string>();
  placeholderText = input.required<string>();

  // create a debounced emitter once so repeated typing doesn't create many timers
  private debouncedEmit = debounce((val: string) => {
    this.onSeachEvent.emit(val);
  }, 500);

  onSearch() {
    const val = this.searchInputElement?.nativeElement.value || '';
    this.searchValue.set(val);
    this.debouncedEmit(val);
  }

  clearSearch() {
    this.searchValue.set('');
    this.onSeachEvent.emit(this.searchValue());
  }
}
