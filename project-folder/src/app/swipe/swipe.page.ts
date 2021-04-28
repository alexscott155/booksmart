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
  parsedBooks:any;
  interest:any
  constructor(
    private menu: MenuController,
    public bookService: BookService, private wishlistService: WishlistService, private modalCtrl: ModalController
    ) {
   
    }

  ngOnInit() {
    this.itemsList = this.bookService.returnList();
    this.itemsList.subscribe(async res=>{
      this.interest = await this.pickInterest(res)
      console.log(this.interest.interest)
      this.bookService.prepRequest(this.interest?.interest).toPromise().then(res=>{
        let randomBook = Math.floor(Math.random() * 10);
        this.parsedBooks = (res["items"][randomBook])
        console.log(this.parsedBooks)
      })
    })
  }


  pickInterest(interestList:any){
    let maxIndex = interestList.length
    console.log("max index:",maxIndex)
    let interestIndex = Math.floor(Math.random() * maxIndex);
    return interestList[interestIndex];
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
    //     this.parsedBooks = JSON.parse(this.books).items;
    //     console.log("BOOKS:");
    //     console.log(this.parsedBooks);
    //   }
    // )
    this.wishlist = this.wishlistService.getWishlist();
    this.wishlistItemCount = this.wishlistService.getWishlistItemCount();
  }


  

}