import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {
  book:any
  bookId:any
  parsedBook:any
  embedBook:any
  displayBook:any
  safeResourceUrl: SafeResourceUrl;
  constructor(
    private router: Router, 
    private route:ActivatedRoute,
    private http: HttpClient,
    private domSanitizer: DomSanitizer
    ) {
     
     }

  ngOnInit() {
    this.route.params.subscribe(
  		book=>{
  			this.book = book;
  			console.log(this.book)
        this.safeResourceUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("https://books.google.com/books?id=" + this.book.id + "&newbks=0&lpg=PP1&dq=tea&pg=PP1&output=embed")
  		}
  		)

        const dataUrl = this.book.selfLink
        this.http.get(dataUrl).toPromise().then(res=>{
          console.log("res in book detail:",res)
          this.parsedBook = res;
          this.embedBook = "https://books.google.com/books?id=" + this.parsedBook?.id + "&newbks=0&lpg=PP1&dq=tea&pg=PP1&output=embed"
        })

  }

}
