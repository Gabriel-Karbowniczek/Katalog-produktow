import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

export class MatPaginatorIntlPolski extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Wierszów na stronie';  
  override nextPageLabel = 'Następna strona';         
  override previousPageLabel = 'Poprzednia strona';   
  override firstPageLabel = 'Pierwsza strona';        
  override lastPageLabel = 'Ostatnia strona';         
  
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex > length ? length : endIndex} z ${length}`;
  };
}