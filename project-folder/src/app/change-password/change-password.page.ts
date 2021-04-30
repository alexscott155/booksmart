import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  oldPassword:string;
  newPassword:string;
  constructor(
    public alertController: AlertController
  ) { }

  ngOnInit() {
    
  }


  changePw() {
    var user = firebase.auth().currentUser;
    console.log("old pw type:", typeof(this.oldPassword));
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      this.oldPassword
    );

    var self = this;

    user.reauthenticateWithCredential(credential).then(function() {
      user.updatePassword(self.newPassword).then(function() {
        self.clearPasswords();
        self.alertSuccess();



        console.log("update successful")
        // Update successful.
      }).catch(function(error) {
        self.alertFailure(error);
        // An error happened.
        self.clearPasswords();
        console.log("error updating pw:",error)

      });
      // User re-authenticated.
    }).catch(function(error) {
      self.alertFailure(error);
      self.clearPasswords();
      console.log("reauth error:",error)

      // An error happened.
    });
  }
  clearPasswords() {
    this.oldPassword = '';
    this.newPassword = '';
  }

  async alertSuccess() {
    const alert = await this.alertController.create({
      message: 'Update successful',
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
  }

