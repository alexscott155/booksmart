import { Injectable } from '@angular/core';
// import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterestType } from '../models/interest.model';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/operators';
import { BookType } from '../models/book.model';



@Injectable({
  providedIn: 'root'
})
export class BookService {
  currentBook:BookType = {
    uid: this.firebaseService.uid,
    imgurl:'',
    title:''
  };


  interestsArray:InterestType[] = [];
  private interest:any
  private bookshelfBook: Observable<BookType[]>;
  private interests: Observable<InterestType[]>;
  private interestCollection: AngularFirestoreCollection<InterestType>;
  private bookCollection: AngularFirestoreCollection<BookType>;
  uid = this.firebaseService.returnUserID()
  interestsLength:any;
  books: string;
  randomInterest:string;
  parsedBooks:any;
  book:any; 
  // currentBook:any;

  constructor ( 
    private http: HttpClient,
    private angularFirestore: AngularFirestore,
    public firebaseService: FirebaseService
    ) { 
    this.bookCollection = this.angularFirestore.collection<BookType>('books', ref=> ref.where('uid', "==", this.uid));
    // this.bookCollection = this.angularFirestore.collection<BookType>('books', ref=> ref.where('uid', "==", this.uid));
    this.interestCollection = this.angularFirestore.collection<InterestType>('interests', ref=> ref.where('uid', "==", this.uid));
    this.interests = this.interestCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(interest => {
          const data = interest.payload.doc.data();
          const id = interest.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  returnList(){
    return this.interests
  }

  setCurrentBook(book:any){
    this.currentBook.title = book.volumeInfo?.title;
    this.currentBook.imgurl = book.volumeInfo?.imageLinks.thumbnail;
    this.currentBook.uid = this.firebaseService.returnUserID();
  }
  // swipePageCall() {
  //   this.books ='';
    

   
  //   this.interests
  //   .subscribe( res => {
  //       this.interestsArray = res;
  //       console.log("INTERESTS ARRAY: ", this.interestsArray);
  //       // this.interestsLength = res.length;
  //       // this.interestIndex = Math.floor(Math.random() * this.interestsLength);
  //       // this.interest = res[interestIndex];
  //       // this.randomInterest= this.pickInterest()
  //       console.log("random interest inside subscribe", this.randomInterest)
  //       // this.book = this.prepRequest()
  //       console.log("Choosen interest: " + this.randomInterest)
  //       const dataUrl = "https://www.googleapis.com/books/v1/volumes?q="+this.randomInterest
        
  //       // return this.http.get(dataUrl);
  //       // .subscribe(
  //       this.http.get(dataUrl) 
  //       .toPromise().then(
  //         data => {
  //           this.books = JSON.stringify(data);
  //           console.log("BOOKS:");
  //           console.log(this.books);
  //           this.parsedBooks = JSON.parse(this.books).items;
  //           console.log("BOOKS IN THE THEN:");
  //           console.log(this.parsedBooks);
  //           return this.parsedBooks;
  //           // return this.parsedBooks
  //         }
  //       );
  //   //     .subscribe(
  //   //   //   data => {
  //   //   //   this.books = JSON.stringify(data);
  //   //   //   console.log("BOOKS:");
  //   //   //   console.log(this.books);
  //   //   //   this.parsedBooks = JSON.parse(this.books).items;
  //   //   //   console.log("BOOKS:");
  //   //   //   console.log(this.parsedBooks);
  //   //   // }
  //   // )

  //    })
  // }

  ionViewWillEnter() {
    
  }

  ngOnInit() {
    
  }


  prepRequest(interest:any) {
    const dataUrl = "https://www.googleapis.com/books/v1/volumes?q="+interest
    return this.http.get(dataUrl) 
  }

  pickInterest(interestList:any){
    let maxIndex = interestList.length - 1;
    console.log("max index:",maxIndex)
    let interestIndex = Math.floor(Math.random() * maxIndex);
    return interestList[interestIndex];
  }

  addToBookshelf(): Promise<DocumentReference>{
    // var interestObj = {
    //   interest: interest
    // }
    // console.log("UID:", this.uid)
    // let temp = Object.assign({}, interest);
    // this.userInterest.interest = '';
    return this.bookCollection.add(this.currentBook);
    
  }

  getBookshelf(uid: string): Observable<BookType[]>{
    // let user= this.fbAuthService.getCurrentUser();
    // let uid= this.fbAuthService.uid;

    // console.log("Current user:", uid);

    // this.bookCollection = this.angularFirestore.collection<OrderType>("orders", ref=> ref.where('uid', "==", uid));
    // this.orderCollection = this.angularFirestore.collection<OrderType>("orders");

    return this.bookshelfBook = this.bookCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(info => {
          const data = info.payload.doc.data();
          const id = info.payload.doc.id;
          // console.log("id: " + id)
          // console.log("data: " + data)
          return { id, ...data };
        });
      })
    )

  }

}