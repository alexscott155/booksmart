import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

import { MenuController } from '@ionic/angular';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';
import { WishlistService } from './../services/wishlist.service';
import { WishlistPage } from '../wishlist/wishlist.page';
import { BehaviorSubject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { InterestType } from '../models/interest.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.page.html',
  styleUrls: ['./swipe.page.scss'],
})
export class SwipePage implements OnInit {
  wishlist = [];
  wishlistItemCount: BehaviorSubject<number>;
  itemsList: Observable<InterestType[]>;
@ViewChild('wishlist', {static: false, read: ElementRef})fab: ElementRef;

  books:string;
  parsedBook:any;
  interest:any;
  prevBookId:any;
  bookIndex:any;
  noInterests:boolean;
  constructor(
    private router: Router,
    private menu: MenuController,
    public bookService: BookService, private wishlistService: WishlistService, private modalCtrl: ModalController
    ) {
   
    }

  ngOnInit() {
    this.prevBookId = '';
    this.newBook()
  }

  

  newBook(){
    if(this.parsedBook?.id != undefined){
      this.prevBookId = this.parsedBook?.id;
      console.log("prev book id:", this.prevBookId)
    }
   
    this.itemsList = this.bookService.returnList();
    this.itemsList.subscribe(async res=>{
      this.interest = await this.pickInterest(res)
      console.log(this.interest?.interest)
      this.bookService.prepRequest(this.interest?.interest).toPromise().then(res=>{
        this.chooseBookIndex();
        console.log("bookIndex: " + this.bookIndex)
        console.log("all books: ", res["items"])
        this.parsedBook = (res["items"][this.bookIndex])
        this.bookService.setCurrentBook(this.parsedBook);
        console.log(this.parsedBook)
        while(this.parsedBook?.id == this.prevBookId || this.parsedBook?.volumeInfo.language != "en"){
          this.chooseBookIndex();
          this.parsedBook = (res["items"][this.bookIndex])
          this.bookService.setCurrentBook(this.parsedBook);
        }
      })
    
      
    })
  }

  chooseBookIndex(){
    this.bookIndex = Math.floor(Math.random() * 10);
  }

  pickInterest(interestList:any){
    let maxIndex = interestList.length
    if(maxIndex==0){
      this.noInterests = true;
    }
    console.log("max index:",maxIndex)
    let interestIndex = Math.floor(Math.random() * maxIndex);
    return interestList[interestIndex];
  }

  GoBookDetail(book:any){
    this.router.navigate(['/tabs/book-detail',book])
  }

  similarBooks(category:any){
    this.router.navigate(['/similar-books',category])
  }

  authorPage(author:any, currentBook:any){
    this.router.navigate(['/author',{author:author[0],currentBookID:currentBook}])
  }

  addToWishlist(book:any) {
    this.wishlistService.addBook(book);
  }

  ionViewWillEnter() {
    this.wishlist = this.wishlistService.getWishlist();
    this.wishlistItemCount = this.wishlistService.getWishlistItemCount();
  }


  

}