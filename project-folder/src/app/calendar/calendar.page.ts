import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DateType } from '../models/date.model';
import { BookService } from '../services/book.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  public dates: Observable<DateType[]>;
  constructor(
    public bookService: BookService,
    public firebaseService: FirebaseService
    ) { }

  ngOnInit() {



  }

  ionViewWillEnter(){
    this.dates = this.bookService.getDates();
    console.log(this.dates)
  }
}
