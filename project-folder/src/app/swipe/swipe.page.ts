import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import firebase from 'firebase/app';
@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.page.html',
  styleUrls: ['./swipe.page.scss'],
})
export class SwipePage implements OnInit {

  constructor(private menu: MenuController) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
      }
    });
  }

  ngOnInit() {
  }


  

}
