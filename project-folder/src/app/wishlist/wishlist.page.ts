import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { BookService } from '../services/book.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  wishlists:Observable<any[]>
  private wish: Observable<any[]>;
  uid:any
  private wishlistCollection:AngularFirestoreCollection<any>;
  wishlist: BookService[] = [];

  constructor(firebaseService:FirebaseService,private auth: AngularFireAuth,private db: AngularFirestore,private wishlistService: WishlistService, private modalCtrl: ModalController, private alertCtrl: AlertController, private router: Router) {
    
    this.wishlistCollection = this.db.collection<any>('users/'+firebaseService.returnUserID()+'/wishlist');
    this.wishlists = this.wishlistCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id:any = a.payload.doc.id;
          console.log(data)
          return {id, ...data}
        })
      }))
          
    
  }

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
  GoBookDetail(book:any){
    this.router.navigate(['/tabs/book-detail',book])
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

