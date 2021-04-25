import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookService } from '../services/book.service';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  data: BookService[];

  private wishlistItems = [];
  private wishlistItemCount = new BehaviorSubject(0);


  constructor() { }

  getBooks() {
    return this.data;
  }
 
  getWishlist() {
    return this.wishlistItems;
  }
 
  getWishlistItemCount() {
    return this.wishlistItemCount;
  }
 
  addBook(book) {
    let added = false;
    for (let w of this.wishlistItems) {
      if (w.id === book.id) {
        w.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      book.amount = 1;
      this.wishlistItems.push(book);
    }
    this.wishlistItemCount.next(this.wishlistItemCount.value + 1);
  }
 
  decreaseBook(book) {
    for (let [index, w] of this.wishlistItems.entries()) {
      if (w.id === book.id) {
        w.amount -= 1;
        if (w.amount == 0) {
          this.wishlistItems.splice(index, 1);
        }
      }
    }
    this.wishlistItemCount.next(this.wishlistItemCount.value - 1);
  }
 
  removeBook(book) {
    for (let [index, w] of this.wishlistItems.entries()) {
      if (w.id === book.id) {
        this.wishlistItemCount.next(this.wishlistItemCount.value - w.amount);
        this.wishlistItems.splice(index, 1);
      }
    }
  }
}