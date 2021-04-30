import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {
  private timer: any;
  private timerStart:boolean
  constructor( 
    public alertController: AlertController,
    public bookService: BookService
    ) { 
  }
  ngOnInit() {
  }

  async stopTimer() {
    this.timerStart = false
  }

  async StartTimer() {
    this.timerStart = true
    let date = new Date(await this.timer)
    let dateSeconds = Math.round(date.getTime()/1000);
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    setTimeout(() => {
      // console.log(hour,minute,second)
      if(hour !== 0 && minute !== 0 && second !== 0){
        // alert("Timer finished!");
        this.alertTimerDone();
        this.bookService.addToBookshelf();
      } else if(this.timerStart === false) {
        // alert("paused")
      } 
      else if (this.timerStart === true){
        dateSeconds -= 1;
        this.timer = (new Date(dateSeconds * 1000).toISOString())
        this.StartTimer();
        }
    }, 1000);
  }

  async alertTimerDone() {
    const alert = await this.alertController.create({
      message: 'You completed your reading goal!',
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
