import { Injectable } from '@angular/core';
// import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterestType } from '../models/interest.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class BookService {
  interestsArray:InterestType[] = [];
  private interest:any
  private interests: Observable<InterestType[]>;
  private interestCollection: AngularFirestoreCollection<InterestType>;
  uid = this.firebaseService.returnUserID()
  interestsLength:any;
  books: string;
  randomInterest:string;
  parsedBooks:any;
  book:any; 

  constructor( private http: HttpClient,
    private angularFirestore: AngularFirestore,
    public firebaseService: FirebaseService) { 
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
    const dataUrl = "https://www.googleapis.com/books/v1/volumes?q=subject:"+interest
    return this.http.get(dataUrl) 
  }

  pickInterest(interestList:any){
    let maxIndex = interestList.length - 1;
    console.log("max index:",maxIndex)
    let interestIndex = Math.floor(Math.random() * maxIndex);
    return interestList[interestIndex];
  }

}