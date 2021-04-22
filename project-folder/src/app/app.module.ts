import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/'
import { SETTINGS } from '@angular/fire/firestore'
import {AngularFirestoreModule } from '@angular/fire/firestore'
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

const firebaseConfig = {
  apiKey: "AIzaSyADndHN_dxAwLFGtO9exj2IymRwTNSylSA",
  authDomain: "booksmart-7f4db.firebaseapp.com",
  projectId: "booksmart-7f4db",
  storageBucket: "booksmart-7f4db.appspot.com",
  messagingSenderId: "1050161913100",
  appId: "1:1050161913100:web:e84b57fe2d145385a63d29",
  measurementId: "G-KV0J5EWSWY"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ReactiveFormsModule, FormsModule,CommonModule, AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule],
  providers: [BackgroundMode, AngularFirestoreModule, LocalNotifications,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide: SETTINGS, useValue:{},}],
  bootstrap: [AppComponent],
})
export class AppModule {}
