import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Storage } from '@ionic/storage-angular'

@Component({
  selector: 'app-streak',
  templateUrl: './streak.page.html',
  styleUrls: ['./streak.page.scss'],
})
export class StreakPage implements OnInit {

  private currentStreak: number  = 0;
  private highStreak: number = 0;


  constructor(private firebaseService: FirebaseService, private storage: Storage) {


   }

  async ngOnInit() {
    await this.storage.create()
    this.storage.get('originalTime').then((time) =>
    {
      if(time)
      {
        let originalDate = new Date(time);
        let currentDate = new Date();

        let difference = currentDate.getTime() - originalDate.getTime();
        let days = difference / ( 1000 * 60 * 60 * 24);

        this.currentStreak = Math.floor(days);
      }
    });

    this.storage.get('highStreak').then((streak) => 
    {
      if(streak)
      {
        this.highStreak = streak;
      }
    })
    
    
  }

  Missed()
  {
    console.log('test')
    if(this.currentStreak > this.highStreak)
    {
      this.highStreak = this.currentStreak;
      this.storage.set('highScore', this.currentStreak);
    }
 

    this.currentStreak = 0;

    let currentDate = new Date();
    //YYYY-MM-DD

    this.storage.set('originalTime', currentDate.toISOString());

    //set a new start time

  }

}
