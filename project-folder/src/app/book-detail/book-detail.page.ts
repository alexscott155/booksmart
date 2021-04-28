import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {
  book:any
  constructor(private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
  		book=>{
  			this.book = book;
  			console.log(this.book)
  		}
  		)
  }

}
