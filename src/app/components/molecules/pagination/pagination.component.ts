import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  prev = faChevronLeft;
  next = faChevronRight;

  @Input() page!: number;
  @Input() totalPages!: number;
  @Input() pages: number[] = [];
  @Input() getFunction!: () => void;

  @Output() pageChange = new EventEmitter<number>();

  goPage(pageNumber: number): void {
    this.pageChange.emit(pageNumber); // Notifica al padre
    this.getFunction();
  }

  prevPage(): void {
    if (this.page > 0) {
      this.pageChange.emit(this.page - 1);
      this.getFunction();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.pageChange.emit(this.page + 1);
      this.getFunction();
    }
  }
}
