import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.page.html',
  styleUrls: ['./author.page.scss'],
})
export class AuthorPage implements OnInit {
  author:any
  parsedBooksByAuthor:any
  constructor(private router: Router, 
    private route:ActivatedRoute,
    private http: HttpClient,public bookService: BookService) { }

  ngOnInit() {
    this.route.params.subscribe(
  		author=>{
  			this.author = author;
        console.log(author.author)
        this.bookService.prepRequest(author.author).toPromise().then(async res=>{
          this.parsedBooksByAuthor = await(res['items']).filter((res: { id: any; })=>{
            return res.id != author.currentBookID
          })
          console.log(this.parsedBooksByAuthor)
        })
  		}
  		)
  }

  GoBookDetail(book:any){
    this.router.navigate(['/tabs/book-detail',book])
  }

}
