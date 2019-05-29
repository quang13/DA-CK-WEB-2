import { MatPaginatorIntl } from '@angular/material';

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 trong ${length}`; }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} trong ${length}`;
}
export function _PaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  
  paginatorIntl.itemsPerPageLabel = 'số dòng:';
  paginatorIntl.nextPageLabel = 'trang tiếp';
  paginatorIntl.previousPageLabel = 'trang trước';
  paginatorIntl.lastPageLabel = 'trang cuối';
  paginatorIntl.firstPageLabel = 'trang đầu';
  paginatorIntl.getRangeLabel = dutchRangeLabel;
  return paginatorIntl;
}