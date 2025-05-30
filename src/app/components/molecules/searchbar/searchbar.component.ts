import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {

  searchIcon = faSearch;

  @Input() control!: FormControl;
  @Input() placeholder!: string;
}
