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
  constructor(
    private router: Router,
    private menu: MenuController,
    public bookService: BookService, private wishlistService: WishlistService, private modalCtrl: ModalController
    ) {
   
    }

  ngOnInit() {
    this.prevBookId = '';
    this.newBook()
    
    // this.itemsList = this.bookService.returnList();
    // this.itemsList.subscribe(async res=>{
    //   this.interest = await this.pickInterest(res)
    //   console.log(this.interest.interest)
    //   this.bookService.prepRequest(this.interest?.interest).toPromise().then(res=>{
    //     var totalBooks = 10;
    //     let bookIndex = Math.floor(Math.random() * totalBooks-1);
    //     this.parsedBook = (res["items"][bookIndex])
    //     console.log(this.parsedBook)
    //   })
    // })
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
        this.parsedBook = (res["items"][this.bookIndex])
        console.log(this.parsedBook)
        while(this.parsedBook?.id == this.prevBookId || this.parsedBook?.volumeInfo.language != "en"){
          this.chooseBookIndex();
          this.parsedBook = (res["items"][this.bookIndex])
        }
      })
    })
  }

  chooseBookIndex(){
    var totalBooks = 10;
    this.bookIndex = Math.floor(Math.random() * totalBooks);
  }

  pickInterest(interestList:any){
    let maxIndex = interestList.length
    console.log("max index:",maxIndex)
    let interestIndex = Math.floor(Math.random() * maxIndex);
    return interestList[interestIndex];
  }

  GoBookDetail(book:any){
    this.router.navigate(['/book-detail',book])
  }

  similarBooks(category:any){
    this.router.navigate(['/similar-books',category])
  }

  



  addToWishlist(book) {
    this.wishlistService.addBook(book);
    this.animateCSS('tada');
  }
 
  async openWishlist() {
    this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalCtrl.create({
      component: WishlistPage,
      cssClass: 'wishlist'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }
 
  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }

  ionViewWillEnter() {

    // var interest = this.booksService.pickInterest()
    // book = this.bookService.book;
    // this.bookService.prepRequest()
    // .subscribe(
    //   data => {
    //     this.books = JSON.stringify(data);
    //     console.log("BOOKS:");
    //     console.log(this.books);
    //     this.parsedBook = JSON.parse(this.books).items;
    //     console.log("BOOKS:");
    //     console.log(this.parsedBook);
    //   }
    // )
    this.wishlist = this.wishlistService.getWishlist();
    this.wishlistItemCount = this.wishlistService.getWishlistItemCount();
  }


  

}