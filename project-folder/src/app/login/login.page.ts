import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { FirebaseService } from '../services/firebase.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router, 
    private alertController: AlertController,
    private auth: AngularFireAuth, 
    public afStore: AngularFirestore,
    public firebaseService: FirebaseService,
    public bookService: BookService) { }
  
  ngOnInit() {

  }
  

  goRegister(){
    this.router.navigate(['register']);
  }

}
