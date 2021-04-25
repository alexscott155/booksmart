import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {FirebaseService} from '../services/firebase.service'
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { notification } from '../models/notifications'
import { map } from 'rxjs/operators';
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
  constructor(private router: Router,private db: AngularFirestore, private auth: FirebaseService, private localNotifications: LocalNotifications) {

      this.uid = this.auth.uid
      this.notificationCollection = this.db.collection<notification>('users/'+this.auth.uid+'/notifications');
      this.notification = this.notificationCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          this.data = a.payload.doc.data();
          const id:any = a.payload.doc.id;
          let hour = new Date(this.data.timer).getHours()
          let minute = new Date(this.data.timer).getMinutes()
          // local notification schedule by weekday, hour, minute
          this.localNotifications.schedule({
            id: id,
            title: this.data.title,
            trigger: {
              count: 1,
              every: {weekday: this.data.numberbyDay, hour: (hour), minute: minute}
            },
            foreground: true
          });
          return {id, ...this.data}
        });
      }))
      this.notificationList = this.notification
  }

  ngOnInit() {
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


  async calculateNotificationTime(time:any, title:any) {
    let date = new Date(time)
    let currentDate = new Date()
    let hour:number
    let minute:number 
    // get time set by ms
    let dif = Math.abs(date.getTime()-currentDate.getTime())
    await this.msToHourMinute(dif).then((result:any)=>{
      hour = result.hour
      minute = result.minute
    })
    this.localNotifications.schedule({
      title: title,
      id: 1,
      trigger: { every: {hour: hour, minute: minute} }
    });
  }

  addNotification(){
    this.router.navigate(["/add-notification"])
  }

  deleteNotification(id:any){
    console.log('deleting')
    this.db.collection("users/"+this.uid+"/notifications").doc(id).delete()
  }

}
