import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router,private auth: AngularFireAuth, private alertController:AlertController) { }

  ngOnInit() {
  }

  async register(email:any, password:any){
    await this.auth.createUserWithEmailAndPassword(email.value, password.value)
        .then(user => {
          this.router.navigate(['/interests'])
          localStorage.setItem('loggedin', 'true')
          localStorage.setItem('uid', user.user.uid)
        })
        .catch(error => {
          this.errorRegister(error)
      })
  }

  async errorRegister(error:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'error: ',
      message: error.message,
      buttons: ['OK']
    });
    await alert.present();
  }
  
}
