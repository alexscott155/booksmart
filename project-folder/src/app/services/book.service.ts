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
  uid = this.firebaseService.uid
  interestsLength:any;
  books: string;
  randomInterest:string;
  parsedBooks:any;
  book:any; 

  constructor( private http: HttpClient,
    private angularFirestore: AngularFirestore,
    public firebaseService: FirebaseService) { 


  }

  swipePageCall() {
    this.books ='';
    this.interestCollection = this.angularFirestore.collection<InterestType>('interests', ref=> ref.where('uid', "==", this.uid));
    console.log(this.interestCollection)
    // this.orderCollection =    this.angularFirestore.collection<OrderType>("orders", ref=> ref.where('uid', "==", uid));
    this.interests = this.interestCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(interest => {
          const data = interest.payload.doc.data();
          const id = interest.payload.doc.id;
          return { id, ...data };
        });
      })
    )

   
    this.interests
    .subscribe( res => {
        this.interestsArray = res;
        console.log("INTERESTS ARRAY: ", this.interestsArray);
        // this.interestsLength = res.length;
        // this.interestIndex = Math.floor(Math.random() * this.interestsLength);
        // this.interest = res[interestIndex];
        this.randomInterest= this.pickInterest()
        console.log("random interest inside subscribe", this.randomInterest)
        // this.book = this.prepRequest()
        console.log("Choosen interest: " + this.randomInterest)
        const dataUrl = "https://www.googleapis.com/books/v1/volumes?q="+this.randomInterest
        
        // return this.http.get(dataUrl);
        // .subscribe(
        this.http.get(dataUrl) 
        .toPromise().then(
          data => {
            this.books = JSON.stringify(data);
            console.log("BOOKS:");
            console.log(this.books);
            this.parsedBooks = JSON.parse(this.books).items;
            console.log("BOOKS IN THE THEN:");
            console.log(this.parsedBooks);
            return this.parsedBooks;
            // return this.parsedBooks
          }
        )
        ;
    //     .subscribe(
    //   //   data => {
    //   //   this.books = JSON.stringify(data);
    //   //   console.log("BOOKS:");
    //   //   console.log(this.books);
    //   //   this.parsedBooks = JSON.parse(this.books).items;
    //   //   console.log("BOOKS:");
    //   //   console.log(this.parsedBooks);
    //   // }
    // )

     })
    //  console.log("this.book in swipe call function:",this.book)
    //  return this.book;
  }

  ionViewWillEnter() {
    
  }

  ngOnInit() {
    
  }


  public prepRequest(): Observable<object> {
    // this.interest
    // console.log(interest)
    // this.pickBook(this.interests);
    // const dataUrl = "https://www.googleapis.com/books/v1/volumes?q=subject:"+this.interest.interest
    // var randomInterest = this.pickInterest()

      
    // )
    // .toPromise(
    //   data => {
    //     this.books = JSON.stringify(data);
    //     console.log("BOOKS:");
    //     console.log(this.books);
    //     this.parsedBooks = JSON.parse(this.books).items;
    //     console.log("BOOKS:");
    //     console.log(this.parsedBooks);
    //     // return this.parsedBooks
    //   }
    // )
    // console.log(this.)
    return this.parsedBooks
  }

  pickInterest(){
    // console.log(this.interestsLength)
    var maxIndex = this.interestsArray.length - 1;
    console.log("max index:",maxIndex)
    var interestIndex = Math.floor(Math.random() * maxIndex);
    // var bookIndex = Math.floor(Math.random() * 10);
    console.log("interest array inside pick interest:",this.interestsArray)
    console.log("interest length inside pick interest:",this.interestsArray.length)

    console.log("Interest Index: ", interestIndex)
    console.log(this.interestsArray[interestIndex].interest);
    return this.interestsArray[interestIndex].interest;

    // var interestInfo:any = this.getOpportunityByIndex(interestIndex);
  //  var test = await this.getOpportunityByIndex(interestIndex)
  //  console.log(test)
    // console.log(interestInfo.interest, interestInfo.length)
     


  }

  async getOpportunityByIndex(index: number) {          
    this.interests
    
    .subscribe( res => {
        this.interest = res[index];
        console.log(res)
     })
}

}
