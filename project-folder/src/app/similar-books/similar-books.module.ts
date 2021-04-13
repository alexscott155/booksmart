import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimilarBooksPageRoutingModule } from './similar-books-routing.module';

import { SimilarBooksPage } from './similar-books.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimilarBooksPageRoutingModule
  ],
  declarations: [SimilarBooksPage]
})
export class SimilarBooksPageModule {}
