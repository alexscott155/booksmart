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
  wish: Observable<any[]>;
  
  wishlistCollection:AngularFirestoreCollection<any>;
  uid:any
  constructor(firebaseService:FirebaseService,private auth: FirebaseService,private db: AngularFirestore,private wishlistService: WishlistService, private modalCtrl: ModalController, private alertCtrl: AlertController, private router: Router) {
    this.wishlistCollection = this.db.collection<any>('users/'+this.auth.uid+'/wishlist');
    this.wish = this.wishlistCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id:any = a.payload.doc.id;
          console.log(data)
          return {id, ...data}
        })
      }))
    this.wishlists = this.wish;
    console.log(this.wishlists)
  }

  ngOnInit() 
  {
    console.log("hello")
    
  }
 
  decreaseWishlistItem(book) {
    this.wishlistService.decreaseBook(book);
  }
 
  increaseWishlistItem(book) {
    this.wishlistService.addBook(book);
  }
 
  removeWishlistItem(id:any) {
    this.wishlistService.removeBook(id);
  } 
  GoBookDetail(book:any){
    this.router.navigate(['/tabs/book-detail',book])
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
 
  async exit() {
 
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

