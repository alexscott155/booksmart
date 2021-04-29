import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-similar-books',
  templateUrl: './similar-books.page.html',
  styleUrls: ['./similar-books.page.scss'],
})
export class SimilarBooksPage implements OnInit {
  category:any
  parsedBooks:any
  constructor(private router: Router, 
    private route:ActivatedRoute, public bookService: BookService) { }

  ngOnInit() {
    this.route.params.subscribe(
  		category=>{
  			this.category = category;
        console.log(this.category[0])
        this.bookService.prepRequest(this.category[0]).toPromise().then(res=>{
          this.parsedBooks = (res['items'])
          console.log(this.parsedBooks)
        })
  		}
  		)
  }

}
