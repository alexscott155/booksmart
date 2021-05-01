import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookService } from '../services/book.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  data: BookService[];
  uid:any
  private interests: Observable<any[]>;
  private interestCollection: AngularFirestoreCollection<any>;
  private wishlistItems = [];
  private wishlistItemCount = new BehaviorSubject(0);


  constructor(private auth: AngularFireAuth
    ,private db: AngularFirestore
  ) {this.auth.user.subscribe(user =>{
      this.uid =  user.uid
    }) }

  getBooks() {
    return this.data;
  }
 
  getWishlist() {
    return this.wishlistItems;
  }
 
  getWishlistItemCount() {
    return this.wishlistItemCount;
  }
 
  async addBook(book:any) {
    let addData = {}
    addData['book'] = book
    let uid = await this.uid
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
    return await this.db.collection("users/"+uid+"/wishlist").add(addData)
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