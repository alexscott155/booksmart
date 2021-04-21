import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/app';
@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.page.html',
  styleUrls: ['./add-notification.page.scss'],
})
export class AddNotificationPage implements OnInit {
  private timer: any;
  private title:any
  public uid:any
  constructor(private router: Router, private localNotifications: LocalNotifications, public alertController: AlertController, private db: AngularFirestore, private auth: AngularFireAuth) { 
    
  }

  async ngOnInit() {
    this.auth.user.subscribe(user =>{
      this.uid =  user.uid
    })
  }

  async noTitleAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Make sure to fill in everything',
      buttons: ['OK']
    });
    await alert.present();
    await alert.onDidDismiss();

  }

  async msToHourMinute(ms:number){
    const setTime = new Promise((resolve, reject) => {
      let daysms=ms % (24*60*60*1000);
      let hours = Math.floor((daysms)/(60*60*1000));
      let hoursms=ms % (60*60*1000);
      let minutes = Math.floor((hoursms)/(60*1000));
      if (hours === 0 && minutes === 0) {
        hours = 12
      }
      resolve({hour:hours,minute:minutes})
    })
    return (setTime)
}

  async setNotification() {
    if (!await this.title || !await this.timer) {
      await this.noTitleAlert()
      return;
    }
    let date = new Date(await this.timer)
    let currentDate = new Date()
    let hour:number
    let minute:number 
    // get time set by ms
    let dif = Math.abs(date.getTime()-currentDate.getTime())
    await this.msToHourMinute(dif).then((result:any)=>{
      hour = result.hour
      minute = result.minute
    })
    await this.addNotification(hour,minute)
    this.localNotifications.schedule({
      title: this.title,
      id: 1,
      trigger: { every: {hour: hour, minute: minute} }
    });
  }

  async addNotification(hour:any,minute:any){
    let uid = await this.uid
    let addData = {}
    addData['title'] = this.title
    addData['hour'] = hour
    addData['minute'] = minute
    return await this.db.collection("users/"+uid+"/notifications").add(addData)
  }
  
}
