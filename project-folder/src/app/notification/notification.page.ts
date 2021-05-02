import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {FirebaseService} from '../services/firebase.service'
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { notification } from '../models/notifications'
import { map } from 'rxjs/operators';
import { AlertController, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notificationList:Observable<notification[]>
  private notification: Observable<notification[]>;
  private notificationCollection:AngularFirestoreCollection<notification>;
  public uid:any
  public data:any
  constructor(private plt:Platform,private router: Router,private db: AngularFirestore, private auth: FirebaseService, private alertCtrl: AlertController) {
    this.plt.ready().then(async () => {
      this.uid = this.auth.uid
      this.notificationCollection = this.db.collection<notification>('users/'+this.auth.uid+'/notifications');
      this.notification = this.notificationCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          this.data = a.payload.doc.data();
          const id:any = a.payload.doc.id;
          console.log(this.data)
          // local notification schedule by weekday, hour, minute
          let date = new Date(new Date(this.data.time).setSeconds(0))
          let currentDate = new Date()
          // get days
          let day = this.data.numberbyDay
          let oneDay = 86400000
          console.log(date.getTime(), currentDate.getTime())
          let schedule = (Math.abs(date.getTime()-currentDate.getTime()))
          console.log(schedule)
          let every:boolean
          if (this.data.day !== 'Everyday') {
            every = true
          }
          let notificationTime = new Date(Date.now() + schedule + (oneDay * day))
          LocalNotifications.schedule({
            notifications: [
              {
                title: this.data.title,
                body: "Your notification at "+ this.data.standardTime,
                id: 1,
                schedule: {
                  at: notificationTime,
                  every: every? 'week' : 'day'
                },
                sound: null,
                attachments: null,
                actionTypeId: "",
                extra: null
              }
            ]
          });
          return {id, ...this.data}
        });
      }))
      this.notificationList = this.notification
    })
    
  }

  async ngOnInit() {
    
    if (!(await LocalNotifications.requestPermission()).granted) return;
    LocalNotifications.areEnabled().then(res=>{
      console.log(res)
    });
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


  async calculateNotificationTime(time:any) {
    let date = new Date(time)
    let currentDate = new Date()
    // get time set by ms
    let dif = Math.abs(date.getTime()-currentDate.getTime())
    return dif
  }

  addNotification(){
    this.router.navigate(["/add-notification"])
  }

  deleteNotification(id:any){
    this.db.collection("users/"+this.uid+"/notifications").doc(id).delete()
  }

}
