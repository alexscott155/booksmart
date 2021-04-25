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
  private interest:any
  private interests: Observable<InterestType[]>;
  private interestCollection: AngularFirestoreCollection<InterestType>;
  uid = this.firebaseService.uid
  interestsLength:any;
  books: string;
  constructor( private http: HttpClient,
    private angularFirestore: AngularFirestore,
    public firebaseService: FirebaseService) { 
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
        this.interestsLength = res.length;
        var interestIndex = Math.floor(Math.random() * this.interestsLength);
        this.interest = res[interestIndex];
     })

  }

  ngOnInit() {
    
  }

  public prepRequest(interest:any): Observable<object> {
    // this.interest
    console.log(interest)
    // this.pickBook(this.interests);
    // const dataUrl = "https://www.googleapis.com/books/v1/volumes?q=subject:"+this.interest.interest
    const dataUrl = "https://www.googleapis.com/books/v1/volumes?q="+interest
    
    return this.http.get(dataUrl);
  }

  async pickBook(interests: any){
    console.log(this.interestsLength)
    var interestIndex = Math.floor(Math.random() * 2);
    var bookIndex = Math.floor(Math.random() * 10);
    // var interestInfo:any = this.getOpportunityByIndex(interestIndex);
  //  var test = await this.getOpportunityByIndex(interestIndex)
  //  console.log(test)
    // console.log(interestInfo.interest, interestInfo.length)
    this.interests
    .subscribe( res => {
        this.interest = res[interestIndex];
        this.prepRequest(res[interestIndex]?.interest)
     })
     console.log(this.interest)
     
     


  }

  async getOpportunityByIndex(index: number) {          
    this.interests
    
    .subscribe( res => {
        this.interest = res[index];
        console.log(res)
     })
}

}
