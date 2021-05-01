import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.page.html',
  styleUrls: ['./change-email.page.scss'],
})
export class ChangeEmailPage implements OnInit {
  email:string;
  newEmail:string;
  password:any
  constructor(
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }


  changeEm() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user=>{
      user.user.updateEmail(this.newEmail).then(function() {
        // Update successful.
        console.log("update successful")
          }).catch(function(error) {
            console.log("error updating email:",error)
        // An error happened.
          });
    })
    var user = firebase.auth().currentUser;

    

    var user = firebase.auth().currentUser;
var credential;

// Prompt the user to re-provide their sign-in credentials

user.reauthenticateWithCredential(credential).then(function() {
  // User re-authenticated.
}).catch(function(error) {
  // An error happened.
});

}}