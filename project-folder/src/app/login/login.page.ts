import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginInfo: any;
  userID :any
  accountType:any
  constructor(private router: Router, private alertController: AlertController,private auth: AngularFireAuth, public afStore: AngularFirestore) { }
  
  ngOnInit() {}


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
  

  goRegister(){
    this.router.navigate(['register']);
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
