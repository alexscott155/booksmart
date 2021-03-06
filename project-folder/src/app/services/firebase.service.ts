import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  uid='';
  constructor(
    public auth: AngularFireAuth,
    public angularFirestore: AngularFirestore,
    private router: Router,
    private alertController: AlertController,
  ) 
  {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
      } else {
        console.log("not signed in")
      }
    });
  }
  
  async login(email:any, password:any) {
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
      return await this.auth.signInWithEmailAndPassword(email.value, password.value)
        .then(async (resp) => {
          localStorage.setItem('loggedin', 'true')
          localStorage.setItem('uid', this.uid)
          console.log("uid in fb",this.uid)
          this.router.navigateByUrl('tabs')
        })
        .catch((error) => {
          this.errorLogin(error)
        })
      })
  }

  returnUserID(){
    return (localStorage.getItem('uid'));
  }

  

  async errorLogin(error:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: error,
      buttons: ['OK']
    });
    await alert.present();
  }

  googleSignIn(){
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    var self = this;
    firebase.auth().signInWithPopup(googleAuthProvider).then((resp) => {
      // /** @type {firebase.auth.OAuthCredential} */
      localStorage.setItem('loggedin', 'true')
      localStorage.setItem('uid', self.uid)
      console.log("uid in fb",self.uid)
      self.router.navigateByUrl('tabs')
    }).catch((error) => {
      this.errorLogin(error)
    });
  }


}
