import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookshelfPage } from './bookshelf.page';

const routes: Routes = [
  {
    path: '',
    component: BookshelfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookshelfPageRoutingModule {}
