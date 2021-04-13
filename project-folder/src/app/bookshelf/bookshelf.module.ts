import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookshelfPageRoutingModule } from './bookshelf-routing.module';

import { BookshelfPage } from './bookshelf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookshelfPageRoutingModule
  ],
  declarations: [BookshelfPage]
})
export class BookshelfPageModule {}
