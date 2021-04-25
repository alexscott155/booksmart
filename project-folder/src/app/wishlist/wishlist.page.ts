import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { BookService } from '../services/book.service';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  wishlist: BookService[] = [];

  constructor(private wishlistService: WishlistService, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() 
  {
    this.wishlist = this.wishlistService.getWishlist();
  }
 
  decreaseWishlistItem(book) {
    this.wishlistService.decreaseBook(book);
  }
 
  increaseWishlistItem(book) {
    this.wishlistService.addBook(book);
  }
 
  removeWishlistItem(book) {
    this.wishlistService.removeBook(book);
  } 
 
  close() {
    this.modalCtrl.dismiss();
  }
 
  async exit() {
    // closeout
 
    let alert = await this.alertCtrl.create({
      header: 'Added to Wishlist',
      message: 'HAPPY READING',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }

}

