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
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
      this.email,
      this.password
    );

    var self = this;

    user.reauthenticateWithCredential(credential).then(function() {
      user.updateEmail(self.newEmail).then(function() {
        self.alertSuccess();
        self.clearFields();
        console.log("update successful")
      }).catch(function(error) {
        self.clearFields();
        self.alertFailure(error);
        console.log("error updating email:",error)
      });
    }).catch(function(error) {
      self.alertFailure(error);
      self.clearFields();
      console.log("reauth error:",error)
    });

}

clearFields(){
  this.email = '';
  this.password = '';
  this.newEmail = '';
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