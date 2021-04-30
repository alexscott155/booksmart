import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { InterestType } from '../models/interest.model'
import { FirebaseService } from '../services/firebase.service';
import { BookService } from '../services/book.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-interests',
  templateUrl: './interests.page.html',
  styleUrls: ['./interests.page.scss'],
})
export class InterestsPage implements OnInit {
  interestsLength:any;
  noInterests:boolean = false;
  firstTime:boolean = false;
  
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
    public bookService: BookService,
    public alertController: AlertController,
    private router: Router
    ) {
    this.interestCollection = this.angularFirestore.collection<InterestType>('interests', ref=> ref.where('uid', "==", this.uid));
    console.log(this.interestCollection)
    this.interests = this.interestCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(interest => {
          const data = interest.payload.doc.data();
          const id = interest.payload.doc.id;
          return { id, ...data };
        });
      })
    )
     this.interests.subscribe(async interests=>{
       this.interestsLength = interests.length;
       console.log("interests this.interestsLength:",this.interestsLength)
       if(this.interestsLength < 10 && !this.firstTime){
        this.firstTime = true;
        // this.firstTime2 = false;
       }
      // this.interest = await this.pickInterest(res)
      // if(this.interest?.length==0){
      //   this.noInterests=false;
      // }else {
      //   console.log(this.interest?.interest)
     });
    console.log("interests:",this.interests[0])
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

  

  deleteInterest(id: string): Promise<void> {
    if(this.interestsLength <= 10){
      this.alertFailure("You need at least 10 interests");
    } else {


      
      return this.interestCollection.doc(id).delete();
    }
  }

  async alertFailure(error) {
    const alert = await this.alertController.create({
      message: error,
      buttons: [
    
      {
        text: 'Ok',
        handler:() => {
        
        }
      }
    ]
    });
    await alert.present();
  }

  goHome(){
    if(this.interestsLength < 10){
      this.alertFailure("You need at least 10 interests");
    } else {
      this.router.navigate(['/tabs/swipe']);
    }
   

  }
}
