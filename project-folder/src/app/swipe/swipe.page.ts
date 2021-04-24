import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { MenuController } from '@ionic/angular';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';
@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.page.html',
  styleUrls: ['./swipe.page.scss'],
})
export class SwipePage implements OnInit {
  books:string;
  parsedBooks:any;
  private wishes: Observable<InterestType[]>;
  private wishesCollection: AngularFirestoreCollection<InterestType>;
  constructor(
    private menu: MenuController,
    public bookService: BookService
    ) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
      }
    });
  }

  ngOnInit() {
    this.bookService.prepRequest()
      .subscribe(
        data => {
          this.books = JSON.stringify(data);
          console.log("BOOKS:");
          console.log(this.books);
          this.parsedBooks = JSON.parse(this.books).items;
          console.log("BOOKS:");
          console.log(this.parsedBooks);
        }
      )
  }

  ionViewWillEnter() {
    
  }


  

}
