import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookType } from '../models/book.model';
import { BookService } from '../services/book.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.page.html',
  styleUrls: ['./bookshelf.page.scss'],
})
export class BookshelfPage implements OnInit {
  public books: Observable<BookType[]>;
  constructor(
    public bookService: BookService,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.books = this.bookService.getBookshelf(this.firebaseService.returnUserID());
    console.log(this.books)
  }

}
