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
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Everyday']
  public timer: any;
  public title:any
  public uid:any
  public day:any
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


  async setNotification() {
    if (!await this.title || !await this.timer || !await this.day) {
      await this.noTitleAlert()
      return;
    }
    let date = new Date(await this.timer)
    console.log(date.toLocaleTimeString())
    await this.addNotification(date.toLocaleTimeString())
  }

  
  async numberbyDay(day:string){
    let promiseday = new Promise((resolve,reject)=>{
      resolve(this.daysOfWeek.indexOf(day))
    })
    return promiseday
  }



  async addNotification(time:any){
    let numberbyDay:any
    await this.numberbyDay(this.day).then(result=>{
      numberbyDay = result
    })
    let date = new Date(await this.timer)
    let uid = await this.uid
    let addData = {}
    addData['date'] = date
    addData['title'] = this.title
    addData['day'] = this.day
    addData['time'] = time
    addData['numberbyDay'] = numberbyDay
    return await this.db.collection("users/"+uid+"/notifications").add(addData)
  }
  
}
