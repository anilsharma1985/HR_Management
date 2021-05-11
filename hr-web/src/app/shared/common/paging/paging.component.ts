import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css'],
})
export class PagingComponent implements OnChanges {
  @Input() totalRecords = 0;
  pageSizeArray: number[] = [2, 4, 6, 8, 10];
  recordsPerPage = 0;
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();

  public pages: number[] = [];
  activePage: number;
  pageModel: any = { page: 1, itemsPerPage: 2 };
  pagesize: number = 2;

  constructor() {
    this.recordsPerPage = 2;
  }
  ngOnChanges(): any {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    this.activePage = 1;
    this.onPageChange.emit(this.pageModel);
    this.pageModel.page = 1;
  }

  private getPageCount(): number {
    let totalPage = 0;
    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);
      totalPage =
        roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }
    return totalPage;
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray = [];
    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }

  onClickPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.activePage = pageNumber;
      this.pageModel.page = pageNumber;
      this.onPageChange.emit(this.pageModel);
    }
  }

  onClickFirstPage(pageNumber: number) {
    this.activePage = pageNumber;
    this.pageModel.page = pageNumber;
    this.onPageChange.emit(this.pageModel);
  }

  onClickLastPage(pageNumber: number) {
    this.activePage = pageNumber;
    this.pageModel.page = pageNumber;
    this.onPageChange.emit(this.pageModel);
  }

  onPageSizeSelected(perPage: any) {
    this.pageModel.page = 1;
    this.activePage = 1;
    this.pageModel.itemsPerPage = +perPage.target.value;
    this.recordsPerPage = this.pageModel.itemsPerPage;
    this.onPageChange.emit(this.pageModel);
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
  }
}
