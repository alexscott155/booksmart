import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {
  private timer: any;
  private timerStart:boolean
  constructor() { 
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
        alert("Timer finished!");
      } else if(this.timerStart === false) {
        alert("paused")
      } 
      else if (this.timerStart === true){
        dateSeconds -= 1;
        this.timer = (new Date(dateSeconds * 1000).toISOString())
        this.StartTimer();
        }
    }, 1000);
  }
}
