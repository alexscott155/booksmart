import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { InterestType } from '../models/interest.model'
import { FirebaseService } from '../services/firebase.service';
import { BookService } from '../services/book.service';


@Component({
  selector: 'app-interests',
  templateUrl: './interests.page.html',
  styleUrls: ['./interests.page.scss'],
})
export class InterestsPage implements OnInit {
  uid = this.firebaseService.uid
  userInterest:InterestType = {
    uid: this.firebaseService.uid,
    interest:''
  };
  temp:InterestType = {
    uid:'',
    interest:''
  };
  private interests: Observable<InterestType[]>;
  private interestCollection: AngularFirestoreCollection<InterestType>;

  constructor(
    private angularFirestore: AngularFirestore,
    public firebaseService: FirebaseService,
    public bookService: BookService
    ) {
    console.log("getting this user: ", this.uid)
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
  }

  ngOnInit() {
  }

  // addInterest(interest:string){
  //   var interests = document.getElementById("interest-list")
  //   interests.innerHTML += "<p>" + interest +"</p>"
  //   this.userInterest = ''
  // }

  // Push new interest to interests array
  createInterest(interest): Promise<DocumentReference>{
    // var interestObj = {
    //   interest: interest
    // }
    console.log("UID:", this.uid)
    let temp = Object.assign({}, interest);
    this.userInterest.interest = '';
    return this.interestCollection.add(temp);
    
  }

  logInterests(interests){
    console.log(interests[0]);
  }
}
