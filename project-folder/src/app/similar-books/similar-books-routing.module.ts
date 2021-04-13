import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimilarBooksPage } from './similar-books.page';

const routes: Routes = [
  {
    path: '',
    component: SimilarBooksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimilarBooksPageRoutingModule {}
