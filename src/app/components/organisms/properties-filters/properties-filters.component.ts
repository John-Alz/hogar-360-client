import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-properties-filters',
  templateUrl: './properties-filters.component.html',
  styleUrls: ['./properties-filters.component.scss']
})
export class PropertiesFiltersComponent {

  @Output()
  filtersChanged = new EventEmitter<any>();

  category = '';

  updateFilters() {

    const filters = {
      category: this.category
    }

    this.filtersChanged.emit(filters);

  }

}
