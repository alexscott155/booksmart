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

  constructor(
    public auth: AngularFireAuth,
    public angularFirestore: AngularFirestore,
    private router: Router,
    private alertController: AlertController
  ) { }

  async login(email:any, password:any) {
    this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(async () => {
    return await this.auth.signInWithEmailAndPassword(email.value, password.value)
      .then(async (user) => {
        this.router.navigateByUrl('tabs')
      })
      .catch((error) => {
        this.errorLogin(error)
      })
  })
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
}
