import { Injectable } from '@angular/core';
// import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: string;
  constructor( private http: HttpClient) { 
    this.books ='';
  }

  public prepRequest(): Observable<object> {
    const dataUrl = "https://www.googleapis.com/books/v1/volumes?q=search+terms"

    return this.http.get(dataUrl);
  }


}

